import { type HoverStackEntry } from "./3-build-hover-stack";

export function printHoverStack(stack: HoverStackEntry[] | undefined): void {
    if (!stack?.length) {
        //console.log("hoverStack (empty)");
        return;
    }

    console.group("Current:");
    for (const entry of stack) {
        if (!entry.dataSlot || entry.classes.length === 0) {
            continue;
        }
        const filteredClasses = filteroutNonColorClasses(entry.classes);
        const classes = filteredClasses.length > 0
            ? `\n\t${filteredClasses.join("\n\t")}`
            : "(no classes)";
        console.log("%c%s%c %s", "color: red;", entry.dataSlot, "color: inherit;", classes);
    }
    console.groupEnd();
}

export function formatHoverStackTooltip(stack: HoverStackEntry[] | undefined): string {
    if (!stack?.length) {
        return "";
    }
    return filterEntriesWithoutColorClasses(stack).map(
        (entry) => `${entry.dataSlot}\n\t${entry.classes.join("\n\t")}`
    ).join("\n");
}

function filterEntriesWithoutColorClasses(entries: HoverStackEntry[]): HoverStackEntry[] {
    const rv = entries
        .map(
            (entry, index) => {
                if (!entry.dataSlot || entry.classes.length === 0) {
                    return;
                }
                const filteredClasses = filteroutNonColorClasses(entry.classes);
                const classes = filteredClasses.length > 0
                    ? {
                        dataSlot: entry.dataSlot,
                        classes: filteredClasses,
                    }
                    : undefined;
                return classes;
            }
        )
        .filter(Boolean)
    return rv;
}

function filteroutNonColorClasses(classes: string[]): string[] {
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

    return classes.filter(cls => {
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
        const startsWithColorName = colorNames.some(colorName =>
            afterPrefix === colorName || afterPrefix.startsWith(colorName + '-')
        );

        return startsWithColorName;
    });
}
