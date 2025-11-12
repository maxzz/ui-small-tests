export type HoverStackEntry = {
    dataSlot: string;
    tag: string;
    classes: string[];
};

export function buildnewHoverStack(x: number, y: number, currentTarget: HTMLElement, hoverStack: HoverStackEntry[] | undefined): HoverStackEntry[] | undefined {
    const elementsAtPoint = document.elementsFromPoint(x, y);
    
    console.log('Elements at point:', elementsAtPoint.map(
        e => {
            if (e instanceof HTMLElement) {
                return `<${e.tagName.toLowerCase()} data-slot="${e.getAttribute("data-slot") ?? ""}">`;
            }
            return e;
        }
    ).join('\n'));

    // Get the topmost element at the point
    const topElement = elementsAtPoint.find(e => e instanceof HTMLElement) as HTMLElement | undefined;
    if (!topElement) {
        return undefined;
    }

    const zOrderedElements: HoverStackEntry[] = [];
    let currentElement: HTMLElement | null = topElement;
    let reachedRoot = false;

    // Traverse up the DOM tree by parent relationships
    while (currentElement) {
        zOrderedElements.push({
            dataSlot: currentElement.getAttribute("data-slot") ?? "",
            tag: currentElement.tagName.toLowerCase(),
            classes: Array.from(currentElement.classList),
        });

        if (currentElement === currentTarget) {
            reachedRoot = true;
            break;
        }

        currentElement = currentElement.parentElement;
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

        if (!prevEntry.classes.every((cls, idx) => cls === nextEntry.classes[idx])) {
            return false;
        }
    }

    return true;
}

export function absolete_buildnewHoverStack(x: number, y: number, currentTarget: HTMLElement, hoverStack: HoverStackEntry[] | undefined): HoverStackEntry[] | undefined {
    const elementsAtPoint = document.elementsFromPoint(x, y);
    
    console.log('Elements at point:', elementsAtPoint.map(
        e => {
            if (e instanceof HTMLElement) {
                return `<${e.tagName.toLowerCase()} data-slot="${e.getAttribute("data-slot") ?? ""}">`;
            }
            return e;
        }
    ).join('\n'));

    const zOrderedElements: HoverStackEntry[] = [];

    let reachedRoot = false;
    for (const element of elementsAtPoint) {
        if (!(element instanceof HTMLElement)) {
            continue;
        }
        //console.log('Element:', element.tagName.toLowerCase(), element.getAttribute("data-slot"));

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
