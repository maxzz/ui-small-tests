import { atom } from "jotai";
import { type HoverStackEntry } from "./3-build-hover-stack";

export type MousePos = { x: number; y: number; } | null;

export const hoverStackAtom = atom<HoverStackEntry[]>([]);
export const mousePosAtom = atom<MousePos>(null);
