export function isTwColorClass(cls: string): boolean {
    if (!cls.includes('-') && cls !== 'shadow') { // Color classes must have '-', i.e. text-, bg-, one of shadow wo/ dash.
        return false;
    }

    const parts = cls.split(':'); // dark:text-red-500
    const className = parts[parts.length - 1]; // text-red-500

    // Exclude known non-color text- classes (sizes, alignment, wrapping)
    if (/^text-(xs|sm|base|lg|xl|[2-9]xl|left|center|right|justify|start|end|wrap|nowrap|balance|pretty|ellipsis|clip)$/.test(className)) {
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
