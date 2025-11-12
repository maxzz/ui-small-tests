import { type HoverStackEntry } from "./3-build-hover-stack";
import { buildFinalStack } from "./4-build-fimal-stackt";

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
