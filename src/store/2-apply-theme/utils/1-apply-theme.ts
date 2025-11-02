import { type ThemeEditorState } from "./9-2-types-editor"; //"@/types/editor" 
import { type ThemeMode, type ThemeStyles, type ThemeStyleProps } from "./9-1-types-theme"; //"@/types/theme"
import { colorFormatter } from "./4-color-converter";
import { setShadowVariables } from "./3-shadows";
import { applyStyleToElement } from "./2-apply-style-to-element";
import { COMMON_STYLES as COMMON_NON_COLOR_KEYS } from "../config/defaults-theme"; //"@/config/theme"

export const applyThemeToElement = (themeState: ThemeEditorState, rootElement: HTMLElement) => {
    if (!rootElement) {
        return;
    }

    const { currentMode: mode, styles: themeStyles } = themeState;

    updateThemeClass(rootElement, mode);
    
    applyCommonStyles(rootElement, themeStyles.light); // Apply common styles (like border-radius) based on the 'light' mode definition
    applyThemeColors(rootElement, themeStyles, mode); // Apply mode-specific colors
    setShadowVariables(themeState); // Apply shadow variables
};

const updateThemeClass = (root: HTMLElement, mode: ThemeMode) => {
    if (mode === "light") {
        root.classList.remove("dark");
    } else {
        root.classList.add("dark");
    }
};

const applyCommonStyles = (root: HTMLElement, themeStyles: ThemeStyleProps) => {
    Object
        .entries(themeStyles)
        .filter(
            ([key]) => COMMON_NON_COLOR_KEYS.includes(key as (typeof COMMON_NON_COLOR_KEYS)[number])
        )
        .forEach(
            ([key, value]) => {
                if (typeof value === "string") {
                    applyStyleToElement(root, key, value);
                }
            }
        );
};

const applyThemeColors = (root: HTMLElement, themeStyles: ThemeStyles, mode: ThemeMode) => {
    Object
        .entries(themeStyles[mode])
        .forEach(
            ([key, value]) => {
                if (typeof value === "string" && !COMMON_NON_COLOR_KEYS.includes(key as (typeof COMMON_NON_COLOR_KEYS)[number])) {
                    const hslValue = colorFormatter(value, "hsl", "4");
                    applyStyleToElement(root, key, hslValue);
                }
            }
        );
};
