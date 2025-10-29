import { atom } from "jotai";
import { type ThemeEditorState, defaultThemeState } from "./utils";

const _themeStateAtom = atom<ThemeEditorState>(defaultThemeState);

export const themeStateAtom = atom(
    (get) => get(_themeStateAtom),
    (get, set, value: ThemeEditorState) => {
        console.log("Selected:", value)
        set(_themeStateAtom, value);
    }
);
