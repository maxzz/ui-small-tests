import { type HoverStackEntry } from "./3-build-hover-stack";

export function printHoverStack(stack: HoverStackEntry[]): void {
    if (stack.length === 0) {
        console.log("hoverStack (empty)");
        return;
    }

    console.group("hoverStack");
    for (const entry of stack) {
        const classes = entry.classes.length > 0 ? `\n\t${entry.classes.join("\n\t")}` : "(no classes)";
        console.log("%c%s%c %s", "color: red;", entry.dataSlot, "color: inherit;", classes);
    }
    console.groupEnd();
}

export function formatHoverStackTooltip(stack: HoverStackEntry[] | undefined): string {
    if (!stack) {
        return "";
    }
    return stack
        .map(
            (entry, index) => {
                const classes = entry.classes.length > 0
                    ? `\n\t${entry.classes.join("\n\t")}`
                    : "\n\t(no classes)";
                return `${index + 1}. [${entry.dataSlot}]${classes}`;
            }
        )
        .join("\n");
}
