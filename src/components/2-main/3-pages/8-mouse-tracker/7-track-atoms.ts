import { atom } from "jotai";
import { type HoverStackEntry } from "./3-build-hover-stack";
import { printHoverStack } from "./6-utils-format";

export type MousePos = { x: number; y: number; } | null;
export const mousePosAtom = atom<MousePos>(null);

const _hoverStackAtom = atom<HoverStackEntry[]>([]);
export const hoverStackAtom = atom(
    get => get(_hoverStackAtom),
    (get, set, newHoverStack: HoverStackEntry[] | ((prev: HoverStackEntry[]) => HoverStackEntry[])) => {
        const newStack = typeof newHoverStack === "function" ? newHoverStack(get(_hoverStackAtom)) : newHoverStack;
        set(_hoverStackAtom, newStack);
        printHoverStack(newStack);
    }
);
