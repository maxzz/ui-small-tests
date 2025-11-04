import { type HTMLAttributes, useRef, useCallback, type MouseEvent } from "react";
import { atom, useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { appSettings } from "@/store/0-local-storage";
import { type HoverStackEntry, buildnewHoverStack, printHoverStack } from "./7-process-hover-stack";

export const hoverStackAtom = atom<HoverStackEntry[]>([]);
export const mousePosAtom = atom<{ x: number; y: number; } | null>(null);

export function MouseMoveTracker({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const { zoom } = useSnapshot(appSettings.appUi);

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
            className={classNames("@3xl:grids-col-2 grid p-2 **:data-[slot=card]:shadow-none md:p-4 @3xl:gap-4 @5xl:grid-cols-10 @7xl:grid-cols-11", zoom === 0.5 ? "scale-50 origin-top-left" : "scale-100", className)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            {...rest}
        >
            {children}
        </div>
    );
}
