import { type HoverStackEntry } from "./3-build-hover-stack";
import { isTwColorClass } from "./5-filter-tw-classes";

function buildFinalStack(stack: HoverStackEntry[] | undefined): HoverStackEntry[] | undefined {
    if (!stack?.length) {
        return;
    }

    const rv = [];
    for (const entry of stack) {
        const filteredClasses = entry.classes.filter(isTwColorClass);
        if (filteredClasses.length > 0) {
            rv.push({
                dataSlot: entry.dataSlot,
                tag: entry.tag,
                classes: filteredClasses,
            });
        }
    }
    return rv.length > 0 ? rv : undefined;
}

export function printHoverStack(stack: HoverStackEntry[] | undefined): void {
    const finalStack = buildFinalStack(stack);
    if (!finalStack?.length) {
        return;
    }

    if (finalStack.length > 0) {
        console.group("Current:");
        for (const entry of finalStack) {
            console.log(
                '💻%s %s', `<${entry.dataSlot || entry.tag}>`, 
                entry.classes.map((cls) => `%c${cls}%c`).join(', '),
                ...entry.classes.flatMap(() => ['color: red;', 'color: inherit;'])
            );
        }
        console.groupEnd();
    }
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
                // console.log('entry', `<${entry.dataSlot}>`, JSON.stringify(entry.classes));

                const filteredClasses = entry.classes.filter(isTwColorClass);
                const classes = filteredClasses.length > 0
                    ? {
                        dataSlot: entry.dataSlot,
                        tag: entry.tag,
                        classes: filteredClasses,
                    }
                    : entry.dataSlot
                        ? {
                            dataSlot: entry.dataSlot,
                            tag: entry.tag,
                            classes: [],
                        }
                        : undefined;
                return classes;
            }
        )
        .filter(Boolean);
    return rv;
}
