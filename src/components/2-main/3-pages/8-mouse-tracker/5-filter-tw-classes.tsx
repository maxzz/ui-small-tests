export function isTwColorClass(cls: string): boolean {
    if (!cls.includes('-') && cls !== 'shadow') { // Color classes must have '-', i.e. text-, bg-, one of shadow wo/ dash.
        return false;
    }

    const parts = cls.split(':'); // dark:text-red-500
    const className = parts[parts.length - 1]; // text-red-500

    // Exclude known non-color text- classes (sizes, alignment, wrapping)
    if (nonColorTextRegex.test(className)) {
        return false;
    }

    // Check if it starts with a color prefix using the prebuilt regex
    const prefixMatch = className.match(colorPrefixRegex);
    if (!prefixMatch) {
        return false;
    }

    // The matched prefix is the first match; slice it off to get the remainder
    const matchedPrefix = prefixMatch[0];
    const afterPrefix = className.slice(matchedPrefix.length);

    // Check if it's an arbitrary value like text-[#ff0000] or bg-[rgb(255,0,0)]
    if (afterPrefix.startsWith('[')) {
        return true;
    }

    // Check if it starts with a valid color name
    const startsWithColorName = colorNames.some((colorName) => afterPrefix === colorName || afterPrefix.startsWith(colorName + '-'));

    return startsWithColorName;
}


// Regex for known non-color `text-` classes (sizes, alignment, wrapping)
const nonColorTextRegex = /^text-(xs|sm|base|lg|xl|[2-9]xl|left|center|right|justify|start|end|wrap|nowrap|balance|pretty|ellipsis|clip)$/;

// Filter to only include color-specific Tailwind classes
// Handles modifiers (dark:), variants (hover:), and custom selectors ([&>div]:)
const colorPrefixes = [
    'text-', 'bg-', 'border-', 'border-t-', 'border-r-', 'border-b-', 'border-l-',
    'border-x-', 'border-y-', 'border-s-', 'border-e-',
    'fill-', 'stroke-', 'ring-', 'ring-offset-',
    'accent-', 'caret-', 'divide-', 'outline-',
    'shadow-', 'decoration-', 'from-', 'via-', 'to-'
];

// Prebuilt regex for color prefixes (built from the `colorPrefixes` list).
// This is faster than iterating the array for each check and keeps the
// matching logic centralized.
const colorPrefixRegex = /^(?:text-|bg-|border-|border-t-|border-r-|border-b-|border-l-|border-x-|border-y-|border-s-|border-e-|fill-|stroke-|ring-|ring-offset-|accent-|caret-|divide-|outline-|shadow-|decoration-|from-|via-|to-)/;

// Tailwind color names
const colorNames = [
    'slate', 'gray', 'zinc', 'neutral', 'stone',
    'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan',
    'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose',
    'transparent', 'current', 'inherit', 'black', 'white'
];
