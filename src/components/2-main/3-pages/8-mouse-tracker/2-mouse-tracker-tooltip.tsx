import { useMemo } from "react";
import { useAtomValue } from "jotai";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/shadcn/tooltip";
// import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import { type HoverStackEntry } from "./3-build-hover-stack";
import { type MousePos } from "./7-hover-stack-atoms";
import { formatHoverStackTooltip } from "./6-utils-format";

export function MouseMoveTrackerTooltip({ hoverStackAtom, mousePosAtom }: { hoverStackAtom: PA<HoverStackEntry[]>; mousePosAtom: PA<MousePos>; }) {
    const hoverStack = useAtomValue(hoverStackAtom);
    const mousePos = useAtomValue(mousePosAtom);

    const tooltipContent = useMemo(() => formatHoverStackTooltip(hoverStack), [hoverStack]);
    const tooltipAnchorStyle = useMemo(() => tooltipPositionStyle(mousePos), [mousePos]);

    // Create a key that changes when mousePos changes to force Tooltip repositioning. This is OK but to much flickering.
    // const tooltipKey = useMemo(() => mousePos ? `${mousePos.x}-${mousePos.y}` : 'closed', [mousePos]);

    return (<>
        <Tooltip open={hoverStack.length > 0 && !!mousePos}> {/* key={tooltipKey} */}
            <TooltipTrigger asChild>
                <span aria-hidden={true} style={tooltipAnchorStyle} />
            </TooltipTrigger>

            <TooltipContent side="right" align="start" className="max-h-dvh whitespace-pre text-left p-0">
                {/* <ScrollArea className="max-h-[80dvh] max-w-[320px] p-2"> */}
                {tooltipContent}
                {/* </ScrollArea> */}
            </TooltipContent>
        </Tooltip>
    </>);
}

function tooltipPositionStyle(mousePos: { x: number; y: number; } | null): React.CSSProperties {
    return {
        position: "fixed",
        top: !mousePos ? -9999 : mousePos.y + 12,
        left: !mousePos ? -9999 : mousePos.x + 12,
        width: 0,
        height: 0,
        pointerEvents: "none",
    };
}
