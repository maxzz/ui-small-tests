export function filterTwClasses(classes: string[]): string[] {
    const rv = classes.filter(isTwColorClass);
    return rv;
}

function isTwColorClass(cls: string): boolean {
    // Split by ':' to handle modifiers, variants, and custom selectors
    const parts = cls.split(':');
    // Get the last part (the actual class name after all modifiers)
    const className = parts[parts.length - 1];

    // Exclude known non-color classes
    if (nonColorTextClasses.includes(className)) {
        return false;
    }

    // Check if it starts with a color prefix
    const hasColorPrefix = colorPrefixes.some(prefix => className.startsWith(prefix));
    if (!hasColorPrefix) {
        return false;
    }

    // Extract the part after the prefix
    const matchedPrefix = colorPrefixes.find(prefix => className.startsWith(prefix));
    if (!matchedPrefix) {
        return false;
    }

    const afterPrefix = className.slice(matchedPrefix.length);

    // Check if it's an arbitrary value like text-[#ff0000] or bg-[rgb(255,0,0)]
    if (afterPrefix.startsWith('[')) {
        return true;
    }

    // Check if it starts with a valid color name
    const startsWithColorName = colorNames.some((colorName) => afterPrefix === colorName || afterPrefix.startsWith(colorName + '-'));

    return startsWithColorName;
}


// Filter to only include color-specific Tailwind classes
// Handles modifiers (dark:), variants (hover:), and custom selectors ([&>div]:)
const colorPrefixes = [
    'text-', 'bg-', 'border-', 'border-t-', 'border-r-', 'border-b-', 'border-l-',
    'border-x-', 'border-y-', 'border-s-', 'border-e-',
    'fill-', 'stroke-', 'ring-', 'ring-offset-',
    'accent-', 'caret-', 'divide-', 'outline-',
    'shadow-', 'decoration-', 'from-', 'via-', 'to-'
];

// Tailwind color names
const colorNames = [
    'slate', 'gray', 'zinc', 'neutral', 'stone',
    'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan',
    'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose',
    'transparent', 'current', 'inherit', 'black', 'white'
];

// Non-color text- classes to exclude
const nonColorTextClasses = [
    'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl',
    'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl',
    'text-7xl', 'text-8xl', 'text-9xl',
    'text-left', 'text-center', 'text-right', 'text-justify', 'text-start', 'text-end',
    'text-wrap', 'text-nowrap', 'text-balance', 'text-pretty',
    'text-ellipsis', 'text-clip'
];
