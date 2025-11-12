import { type HTMLAttributes, useRef, useCallback, type MouseEvent } from "react";
import { useSetAtom } from "jotai";
import { classNames } from "@/utils";
import { type HoverStackEntry, buildnewHoverStack } from "./3-build-hover-stack";
import { hoverStackAtom, mousePosAtom } from "./7-hover-stack-atoms";
import { printHoverStack } from "./6-utils-format";

/**
 * Tracks mouse movement and builds a hover stack of elements under the cursor.
 * This component wraps its children in a div that listens for mouse events and maintains:
 * - A stack of elements currently under the mouse cursor (z-order aware)
 * - The current mouse position coordinates
 * - Automatic cleanup when the mouse leaves the component area
 * ```
 */
export function MouseTracker({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const setHoverStack = useSetAtom(hoverStackAtom);
    const setMousePos = useSetAtom(mousePosAtom);

    const hoverStackRef = useRef<HoverStackEntry[]>([]);

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

    return (
        <div
            className={classNames("@3xl:grids-col-2 grid p-2 **:data-[slot=card]:shadow-none md:p-4 @3xl:gap-4 @5xl:grid-cols-10 @7xl:grid-cols-11", className)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            {...rest}
        >
            {children}
        </div>
    );
}
