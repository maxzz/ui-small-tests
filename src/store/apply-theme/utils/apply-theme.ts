import { ThemeEditorState } from "./editor"; //"@/types/editor" 
import { ThemeStyleProps, ThemeStyles } from "./theme"; //"@/types/theme"
import { colorFormatter } from "./color-converter";
import { setShadowVariables } from "./shadows";
import { applyStyleToElement } from "./apply-style-to-element";
import { COMMON_STYLES } from "./config/theme"; //"@/config/theme"

type Theme = "dark" | "light";

const COMMON_NON_COLOR_KEYS = COMMON_STYLES;

// Helper functions (not exported, used internally by applyThemeToElement)
const updateThemeClass = (root: HTMLElement, mode: Theme) => {
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

const applyThemeColors = (root: HTMLElement, themeStyles: ThemeStyles, mode: Theme) => {
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

// Exported function to apply theme styles to an element
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
