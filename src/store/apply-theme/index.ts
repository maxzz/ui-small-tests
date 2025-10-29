import { atom } from "jotai";
import { type ThemeEditorState, defaultThemeState } from "./utils";

export const themeStateAtom = atom<ThemeEditorState>(defaultThemeState);
