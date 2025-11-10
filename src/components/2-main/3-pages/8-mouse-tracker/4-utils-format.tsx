import { type HoverStackEntry } from "./3-build-hover-stack";
import { filteroutNonColorClasses } from "./5-filter-tw-classes";

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
