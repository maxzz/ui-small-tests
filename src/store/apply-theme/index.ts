import { atom } from "jotai";
import { type ThemeEditorState, type ThemeStyles, defaultPresets, defaultThemeState } from "./utils";

const _themeStateAtom = atom<ThemeEditorState>(defaultThemeState);

export const themeStateAtom = atom(
    (get) => get(_themeStateAtom),
    (get, set, value: ThemeEditorState) => {
        console.log("Selected:", value);
        set(_themeStateAtom, value);
    }
);

export const themeNameAtom = atom(
    (get) => get(_themeStateAtom).preset,
    (get, set, value: string) => {
        const currentState = get(_themeStateAtom);
        set(_themeStateAtom, { ...currentState, preset: value });
    }
);

export const themeNamesAtom = atom<string[]>(
    (get) => {
        const rv = Object.keys(defaultPresets);
        return rv;
    }
);

//

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
