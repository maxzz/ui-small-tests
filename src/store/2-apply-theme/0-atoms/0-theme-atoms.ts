import { atom } from "jotai";
import { type ThemeEditorState, type ThemeStyles, defaultPresets, defaultThemeState } from "../utils";

// Theme state

const _themeStateAtom = atom<ThemeEditorState>(defaultThemeState);

export const themeStateAtom = atom(
    (get) => get(_themeStateAtom),
    (get, set, value: ThemeEditorState) => {
        set(_themeStateAtom, value);
    }
);

// Access theme name

export const themeNameAtom = atom(
    (get) => get(_themeStateAtom).preset,
    (get, set, value: string) => {
        const currentState = get(_themeStateAtom);
        set(_themeStateAtom, { ...currentState, preset: value });
    }
);

// Access theme mode

export const currentModeAtom = atom(
    (get) => get(_themeStateAtom).currentMode,
    (get, set, value: "light" | "dark") => {
        set(_themeStateAtom, { ...get(_themeStateAtom), currentMode: value });
    }
);

// All themes names

export const themeNamesAtom = atom<string[]>(
    (get) => {
        const rv = Object.keys(defaultPresets);
        return rv;
    }
);

// Theme styles access

export function getPresetThemeStyles(name: string): ThemeStyles {
    const defaultTheme = defaultThemeState.styles;
    if (name === "default") {
        return defaultTheme;
    }

    const preset = defaultPresets[name]; // const store = useThemePresetStore.getState(); const preset = store.getPreset(name);
    if (!preset) {
        return defaultTheme;
    }

    return {
        light: {
            ...defaultTheme.light,
            ...(preset.styles.light || {}),
        },
        dark: {
            ...defaultTheme.dark,
            ...(preset.styles.light || {}),
            ...(preset.styles.dark || {}),
        },
    };
}
