import { type HoverStackEntry } from "./3-build-hover-stack";
import { isTwColorClass } from "./5-filter-tw-classes";

function buildFinalStack(stack: HoverStackEntry[] | undefined): HoverStackEntry[] | undefined {
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
    // Sort order: text/bg first, then border, then ring, then shadow (no dash), then shadow-, then with variant (:), then with prefix ([), then data-[...] selectors last
    const getOrder = (cls: string): number => {
        // Check for data-[...] attributes first (should be last)
        if (cls.includes('data-[')) return 9;
        
        // Remove variant prefixes (hover:, dark:, etc.) for checking
        const base = cls.split(':').pop() || cls;
        
        if (base.startsWith('text-')) return 0;
        if (base.startsWith('bg-')) return 1;
        if (base.startsWith('border-')) return 2;
        if (base.startsWith('ring-')) return 3;
        if (base === 'shadow') return 4;
        if (base.startsWith('shadow-')) return 5;
        if (cls.includes(':')) return 6; // Has variant modifier
        if (cls.startsWith('[')) return 7; // Has custom selector prefix
        return 8; // Everything else
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

export function printHoverStack(stack: HoverStackEntry[] | undefined): void {
    const finalStack = buildFinalStack(stack);
    if (!finalStack?.length) {
        return;
    }

    console.group("Current:");
    for (const entry of finalStack) {
        const label = entry.dataSlot || entry.tag;
        const labelColor = entry.dataSlot ? 'color: red;' : 'color: blue;';
        console.log(
            '💻%c%s%c %s', labelColor, `<${label}>`, 'color: inherit;',
            entry.classes.map((cls) => `%c${cls}%c`).join(', '),
            ...entry.classes.flatMap(() => ['color: green;', 'color: inherit;'])
        );
    }
    console.groupEnd();
}

/* Build the following:
<>
  <div>
    <div className="title">header</div>
    <div className="text-xs">text-white</div>
    <div className="text-xs">bg-blue-500</div>
  </div>
  <div>
    <div className="title">div</div>
    <div className="text-xs">flex</div>
    <div className="text-xs">items-center</div>
  </div>
</>
*/
export function formatHoverStackTooltip(stack: HoverStackEntry[] | undefined): React.JSX.Element | string {
    const finalStack = buildFinalStack(stack);
    if (!finalStack?.length) {
        return "No hover stack";
    }

    return (
    <div className="p-4">
        {finalStack.map(
            (entry, index) => (
                <div key={index}>
                    {entry.dataSlot && <div className="text-red-500 font-bold">{entry.dataSlot}</div>}
                    {entry.tag && <div className="text-blue-500 font-bold">{entry.tag}</div>}
                    {entry.classes.map(
                        (cls, clsIndex) => (
                            <div key={clsIndex} className="ml-4 text-xs">{cls}</div>
                        )
                    )}
                </div>
            )
        )}
    </div>
    );
}
