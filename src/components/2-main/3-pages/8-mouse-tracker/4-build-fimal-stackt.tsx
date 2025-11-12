import { type HoverStackEntry } from "./3-build-hover-stack";
import { isTwColorClass } from "./5-filter-tw-classes";

export function buildFinalStack(stack: HoverStackEntry[] | undefined): HoverStackEntry[] | undefined {
    if (!stack?.length) {
        return;
    }

    const rv = [];
    for (const entry of stack) {
        const filteredClasses = entry.classes.filter(isTwColorClass);
        if (filteredClasses.length > 0 || entry.dataSlot) {
            rv.push({
                dataSlot: entry.dataSlot,
                tag: entry.tag,
                classes: sortTwClasses(filteredClasses),
            });
        }
    }
    return rv.length > 0 ? rv : undefined;
}

function sortTwClasses(classes: string[]): string[] {
    return [...classes].sort(
        (a, b) => {
            const orderA = getOrder(a);
            const orderB = getOrder(b);
            return orderA !== orderB ? orderA - orderB : a.localeCompare(b);
        }
    );
}

/**
Sort order:
```
text-*
bg-*
border-*
outline-*
ring-*
shadow (plain)
shadow-*
Classes with variants (:)
Classes with custom selector prefix ([)
Everything else
Classes with data-[...] selectors
Classes with focus: and focus-visible: prefixes
Classes with dark: prefix
Classes with placeholder: prefix
Classes with aria- prefix (always last)
```
*/
const getOrder = (cls: string): number => {
    // Check special patterns first (highest priority)
    if (cls.includes('aria-')) return 13;
    if (cls.startsWith('placeholder:')) return 12;
    if (cls.startsWith('dark:')) return 11;
    if (cls.startsWith('focus:') || cls.startsWith('focus-visible:')) return 10;
    if (cls.includes('data-[')) return 9;

    // Extract base class (after last colon)
    const base = cls.split(':').pop() || cls;

    // Check plain shadow (no dash)
    if (base === 'shadow') return 5;

    // Extract prefix (up to and including first dash) for O(1) lookup
    const dashIndex = base.indexOf('-');
    if (dashIndex !== -1) {
        const prefix = base.slice(0, dashIndex + 1); // e.g., "text-", "bg-"
        const order = prefixOrder[prefix];
        if (order !== undefined) return order;
    }

    // Check for variant modifiers and custom selectors
    if (cls.includes(':')) return 7;
    if (cls.startsWith('[')) return 8;

    return 9; // Everything else
};

// Prefix to order mapping for base classes
const prefixOrder: Record<string, number> = {
    'text-': 0,
    'bg-': 1,
    'border-': 2,
    'outline-': 3,
    'ring-': 4,
    'shadow-': 6,
};
