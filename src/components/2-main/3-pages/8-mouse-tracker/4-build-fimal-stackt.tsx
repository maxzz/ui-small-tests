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
function sortTwClasses(classes: string[]): string[] {
    const getOrder = (cls: string): number => {
        // Check for aria- prefix (should be last)
        if (cls.includes('aria-')) return 13;
        
        // Check for placeholder: prefix (before aria-)
        if (cls.startsWith('placeholder:')) return 12;
        
        // Check for dark: prefix (before placeholder:)
        if (cls.startsWith('dark:')) return 11;
        
        // Check for focus: or focus-visible: prefix (before dark:)
        if (cls.startsWith('focus:') || cls.startsWith('focus-visible:')) return 10;
        
        // Check for data-[...] attributes (before focus:)
        if (cls.includes('data-[')) return 9;
        
        // Remove variant prefixes (hover:, dark:, etc.) for checking
        const base = cls.split(':').pop() || cls;
        
        if (base.startsWith('text-')) return 0;
        if (base.startsWith('bg-')) return 1;
        if (base.startsWith('border-')) return 2;
        if (base.startsWith('outline-')) return 3;
        if (base.startsWith('ring-')) return 4;
        if (base === 'shadow') return 5;
        if (base.startsWith('shadow-')) return 6;
        if (cls.includes(':')) return 7; // Has variant modifier
        if (cls.startsWith('[')) return 8; // Has custom selector prefix
        return 9; // Everything else (same as data-[...] now)
    };

    return [...classes].sort((a, b) => {
        const orderA = getOrder(a);
        const orderB = getOrder(b);
        
        // If same order category, sort alphabetically
        if (orderA === orderB) {
            return a.localeCompare(b);
        }
        
        return orderA - orderB;
    });
}
