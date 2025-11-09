import { type HoverStackEntry } from "./3-build-hover-stack";

export function printHoverStack(stack: HoverStackEntry[] | undefined): void {
    if (!stack?.length) {
        console.log("hoverStack (empty)");
        return;
    }

    console.group("hoverStack");
    for (const entry of stack) {
        const filteredClasses = filterColorClasses(entry.classes);
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
    return stack
        .map(
            (entry, index) => {
                const filteredClasses = filterColorClasses(entry.classes);
                const classes = filteredClasses.length > 0
                    ? `\n\t${filteredClasses.join("\n\t")}`
                    : "\n\t(no classes)";
                return `${index + 1}. [${entry.dataSlot}]${classes}`;
            }
        )
        .join("\n");
}

function filterColorClasses(classes: string[]): string[] {
    // Filter to only include color-specific Tailwind classes
    // Handles modifiers (dark:), variants (hover:), and custom selectors ([&>div]:)
    const colorPrefixes = [
        'text-', 'bg-', 'border-', 'fill-', 'stroke-',
        'ring-', 'accent-', 'caret-', 'divide-', 'outline-'
    ];
    return classes.filter(cls => {
        // Split by ':' to handle modifiers, variants, and custom selectors
        const parts = cls.split(':');
        // Get the last part (the actual class name after all modifiers)
        const className = parts[parts.length - 1];
        // Check if the class name starts with any color prefix
        return colorPrefixes.some(prefix => className.startsWith(prefix));
    });
}
