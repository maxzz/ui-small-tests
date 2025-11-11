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
    const matchedPrefix = prefixMatch[0]; // text-
    const afterPrefix = className.slice(matchedPrefix.length); // red-500

    // Check if it's an arbitrary value like text-[#ff0000] or bg-[rgb(255,0,0)]
    if (afterPrefix.startsWith('[')) {
        return true;
    }

    // Check if it starts with a valid color name using the prebuilt regex
    return colorNameRegex.test(afterPrefix);
}

// Regex for known non-color `text-` classes (sizes, alignment, wrapping)
const nonColorTextRegex = /^text-(xs|sm|base|lg|xl|[2-9]xl|left|center|right|justify|start|end|wrap|nowrap|balance|pretty|ellipsis|clip)$/;

// Filter to only include color-specific Tailwind classes
// Handles modifiers (dark:), variants (hover:), and custom selectors ([&>div]:)
const colorPrefixRegex = /^(?:text-|bg-|(?:border-(?:t|r|b|l|x|y|s|e)-|border-)|fill-|stroke-|ring-|ring-offset-|accent-|caret-|divide-|outline-|shadow-|decoration-|from-|via-|to-)/;

// Tailwind color names
const colorNames = [
    'slate', 'gray', 'zinc', 'neutral', 'stone',
    'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan',
    'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose',
    'transparent', 'current', 'inherit', 'black', 'white'
];

// Regex for Tailwind color names: matches exact color names or color names followed by a dash and shade
// e.g., "red", "red-500", "slate-100", but not "redish" or "red500"
const colorNameRegex = /^(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|transparent|current|inherit|black|white)(?:-|$)/;
