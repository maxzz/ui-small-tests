import { type ThemeEditorState } from "./9-2-types-editor"; //"@/types/editor" 
import { type ThemeMode, type ThemeStyles, type ThemeStyleProps } from "./9-1-types-theme"; //"@/types/theme"
import { colorFormatter } from "./3-color-converter";
import { getShadowMap } from "./2-shadows";
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

function applyCommonStyles(root: HTMLElement, themeStyles: ThemeStyleProps): void {
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

function applyThemeColors(root: HTMLElement, themeStyles: ThemeStyles, mode: ThemeMode): void {
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
}

function setShadowVariables(themeEditorState: ThemeEditorState): void { // Function to set shadow CSS variables
    const root = document.documentElement;
    const shadows = getShadowMap(themeEditorState);
    Object.entries(shadows)
        .forEach(
            ([name, value]) => {
                applyStyleToElement(root, name, value);
            }
        );
}

function applyStyleToElement(element: HTMLElement, key: string, value: string): void {
    const currentStyle = element.getAttribute("style") || "";

    // Remove the existing variable definitions with the same name
    const cleanedStyle = currentStyle.replace(new RegExp(`--${key}:\\s*[^;]+;?`, "g"), "").trim();

    element.setAttribute("style", `${cleanedStyle}--${key}: ${value};`);
}
