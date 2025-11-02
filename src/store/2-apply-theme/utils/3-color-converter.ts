import * as culori from "culori";
import { Hsl } from "culori";

export type ColorFormat = "hex" | "rgb" | "hsl" | "oklch"; //import { ColorFormat } from "../types";

export function colorFormatter(colorValue: string, format: ColorFormat = "hsl", tailwindVersion: "3" | "4" = "3"): string {
    try {
        const color = culori.parse(colorValue);
        if (!color) {
            throw new Error("Invalid color input");
        }

        switch (format) {
            case "hsl": {
                const hsl = culori.converter("hsl")(color);
                return (
                    tailwindVersion === "4"
                        ? formatHsl(hsl)
                        : `${formatNumber(hsl.h)} ${formatNumber(hsl.s * 100)}% ${formatNumber(hsl.l * 100)}%`
                );
            }
            case "rgb": {
                return culori.formatRgb(color); // e.g., "rgb(64, 128, 192)"
            }
            case "oklch": {
                const oklch = culori.converter("oklch")(color);
                return `oklch(${formatNumber(oklch.l)} ${formatNumber(oklch.c)} ${formatNumber(oklch.h)})`;
            }
            case "hex": {
                return culori.formatHex(color); // e.g., "#4080c0"
            }
            default: {
                return colorValue;
            }
        }
    } catch (error) {
        console.error(`Failed to convert color: ${colorValue}`, error);
        return colorValue;
    }
}

export function convertToHSL(colorValue: string): string {
    return colorFormatter(colorValue, "hsl");
}

export function formatNumber(num?: number) {
    return !num ? "0" : num % 1 === 0 ? num : num.toFixed(4);
}

export function formatHsl(hsl: Hsl) {
    return `hsl(${formatNumber(hsl.h)} ${formatNumber(hsl.s * 100)}% ${formatNumber(hsl.l * 100)}%)`;
}
