import { atom } from "jotai";
import { type HoverStackEntry } from "./7-process-hover-stack";

export type MousePos = { x: number; y: number; } | null;

export const hoverStackAtom = atom<HoverStackEntry[]>([]);
export const mousePosAtom = atom<MousePos>(null);
