import type { MouseEvent, RefObject } from "react";

export type HoverStackEntry = {
    dataSlot: string;
    classes: string[];
};

export function processHoverStack(x: number, y: number, currentTarget: HTMLElement, hoverStackRef: RefObject<HoverStackEntry[]>): void {
    const elementsAtPoint = document.elementsFromPoint(x, y);
    const zOrderedElements: HoverStackEntry[] = [];
    let reachedRoot = false;

    for (const element of elementsAtPoint) {
        if (!(element instanceof HTMLElement)) {
            continue;
        }

        const slotValue = element.getAttribute("data-slot");
        if (slotValue !== null) {
            zOrderedElements.push(describeElement(element, slotValue));
        }

        if (element === currentTarget) {
            reachedRoot = true;
            break;
        }
    }

    if (!reachedRoot) {
        return;
    }

    if (!areStacksEqual(hoverStackRef.current, zOrderedElements)) {
        hoverStackRef.current = zOrderedElements;
        printHoverStack(zOrderedElements);
    }
}

function areStacksEqual(prev: HoverStackEntry[], next: HoverStackEntry[]): boolean {
    if (prev.length !== next.length) {
        return false;
    }

    for (let index = 0; index < prev.length; index += 1) {
        const prevEntry = prev[index];
        const nextEntry = next[index];

        if (prevEntry.dataSlot !== nextEntry.dataSlot) {
            return false;
        }

        if (prevEntry.classes.length !== nextEntry.classes.length) {
            return false;
        }

        for (let classIndex = 0; classIndex < prevEntry.classes.length; classIndex += 1) {
            if (prevEntry.classes[classIndex] !== nextEntry.classes[classIndex]) {
                return false;
            }
        }

        if (prevEntry.classes.length === 0 && nextEntry.classes.length === 0) {
            continue;
        }

        if (prevEntry.classes.length === 0 || nextEntry.classes.length === 0) {
            return false;
        }
    }

    return true;
}

function describeElement(element: HTMLElement, slotValue: string): HoverStackEntry {
    return {
        dataSlot: slotValue,
        classes: Array.from(element.classList),
    };
}

function printHoverStack(stack: HoverStackEntry[]): void {
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
