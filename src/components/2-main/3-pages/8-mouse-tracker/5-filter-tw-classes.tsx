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

    // Check if it's an arbitrary CSS color value in square brackets
    // e.g., text-[#000], text-[#ff0000], bg-[rgb(255,0,0)], bg-[oklch(0.5,0.2,180)]
    if (afterPrefix.startsWith('[')) {
        return arbitraryColorRegex.test(afterPrefix);
    }

    // Accept any other value after a valid color prefix (for custom colors like bg-card)
    return true;
}

// Regex for known non-color `text-` classes (sizes, alignment, wrapping)
const nonColorTextRegex = /^text-(xs|sm|base|lg|xl|[2-9]xl|left|center|right|justify|start|end|wrap|nowrap|balance|pretty|ellipsis|clip)$/;

// Filter to only include color-specific Tailwind classes
// Handles modifiers (dark:), variants (hover:), and custom selectors ([&>div]:)
// Note: shadow can be used with or without a dash (shadow, shadow-none, shadow-red-500)
const colorPrefixRegex = /^(?:text-|bg-|(?:border-(?:t|r|b|l|x|y|s|e)-|border-)|fill-|stroke-|ring-|ring-offset-|accent-|caret-|divide-|outline-|shadow-?|decoration-|from-|via-|to-)/;

// Regex for Tailwind color names: matches exact color names or color names followed by a dash and shade,
// optionally with opacity modifier (e.g., "red", "red-500", "red-500/50", "slate-100/75")
// Also handles special cases like empty string (for "shadow") and "none" (for "shadow-none")
const colorNameRegex = /^(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|transparent|current|inherit|black|white|none)(?:-|$|\/)|^$/;

// Regex for arbitrary CSS color values in square brackets
// Matches: [#000], [#ff0000], [rgb(...)], [rgba(...)], [hsl(...)], [oklch(...)], etc.
const arbitraryColorRegex = /^\[(?:#[0-9a-fA-F]{3,8}|(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklch|oklab|color)\([^)]*\))\]$/;
