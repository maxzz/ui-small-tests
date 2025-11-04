import { type HTMLAttributes, type MouseEvent, useCallback, useMemo, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { appSettings } from "@/store/0-local-storage";
import { formatHoverStackTooltip, type HoverStackEntry, printHoverStack, buildnewHoverStack } from "./7-process-hover-stack";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/shadcn/tooltip";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";

export function CardsDemoWithState({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const { zoom } = useSnapshot(appSettings.appUi);

    const hoverStackRef = useRef<HoverStackEntry[]>([]);

    const [hoverStack, setHoverStack] = useState<HoverStackEntry[]>([]);
    const [mousePos, setMousePos] = useState<{ x: number; y: number; } | null>(null);

    const handleMouseMove = useCallback(
        (event: MouseEvent<HTMLDivElement>) => {
            const zOrderedElements = buildnewHoverStack(event.clientX, event.clientY, event.currentTarget, hoverStackRef.current);

            if (zOrderedElements?.length) {
                hoverStackRef.current = zOrderedElements;
                setHoverStack(zOrderedElements);
                printHoverStack(zOrderedElements);
            }

            setMousePos({ x: event.clientX, y: event.clientY });
        }, []
    );

    const handleMouseLeave = useCallback(
        () => {
            hoverStackRef.current = [];
            setHoverStack([]);
            setMousePos(null);
        }, []
    );

    const tooltipContent = useMemo(() => formatHoverStackTooltip(hoverStack), [hoverStack]);
    const tooltipAnchorStyle = useMemo(() => tooltipPositionStyle(mousePos), [mousePos?.x, mousePos?.y]);

    return (
        <Tooltip open={hoverStack.length > 0 && !!mousePos}>

            <div
                className={classNames("@3xl:grids-col-2 grid p-2 **:data-[slot=card]:shadow-none md:p-4 @3xl:gap-4 @5xl:grid-cols-10 @7xl:grid-cols-11", zoom === 0.5 ? "scale-50 origin-top-left" : "scale-100", className)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                {...rest}
            >
                {children}
            </div>

            <TooltipTrigger asChild>
                <span aria-hidden={true} style={tooltipAnchorStyle} />
            </TooltipTrigger>

            <TooltipContent side="right" align="start" className="max-h-dvh whitespace-pre text-left p-0">
                <ScrollArea className="max-h-[80dvh] max-w-[320px] p-2">
                    {tooltipContent}
                </ScrollArea>
            </TooltipContent>

        </Tooltip>
    );
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
