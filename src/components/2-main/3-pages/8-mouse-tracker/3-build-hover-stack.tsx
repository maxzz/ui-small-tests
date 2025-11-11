export type HoverStackEntry = {
    dataSlot: string;
    tag: string;
    classes: string[];
};

export function buildnewHoverStack(x: number, y: number, currentTarget: HTMLElement, hoverStack: HoverStackEntry[] | undefined): HoverStackEntry[] | undefined {
    const elementsAtPoint = document.elementsFromPoint(x, y);

    const zOrderedElements: HoverStackEntry[] = [];

    let reachedRoot = false;
    for (const element of elementsAtPoint) {
        if (!(element instanceof HTMLElement)) {
            continue;
        }

        zOrderedElements.push({
            dataSlot: element.getAttribute("data-slot") ?? "",
            tag: element.tagName.toLowerCase(),
            classes: Array.from(element.classList),
        });

        if (element === currentTarget) {
            reachedRoot = true;
            break;
        }
    }
    if (!reachedRoot) {
        return undefined;
    }

    if (!areStacksEqual(hoverStack, zOrderedElements)) {
        return zOrderedElements;
    }

    return undefined;
}

function areStacksEqual(prev: HoverStackEntry[] | undefined, next: HoverStackEntry[]): boolean {
    if (prev?.length !== next.length) {
        return false;
    }

    for (let index = 0; index < prev.length; index += 1) {
        const prevEntry = prev[index];
        const nextEntry = next[index];

        if (prevEntry.dataSlot !== nextEntry.dataSlot) {
            return false;
        }

        if (prevEntry.tag !== nextEntry.tag) {
            return false;
        }

        if (prevEntry.classes.length !== nextEntry.classes.length) {
            return false;
        }

        // Compare class arrays efficiently using every()
        if (!prevEntry.classes.every((cls, idx) => cls === nextEntry.classes[idx])) {
            return false;
        }
    }

    return true;
}
