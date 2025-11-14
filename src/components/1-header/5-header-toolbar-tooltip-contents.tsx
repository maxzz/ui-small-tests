import { getPresetThemeStyles } from "@/store/2-apply-theme";
import { TooltipContent } from "../ui/shadcn/shadcn-modified/tooltip";
import { ColorBox } from "./6-header-toolbar-select-color-box";

export function ThemeTooltipContent({ presetName }: { presetName: string; }) {
    const mode = "light";
    const styles = getPresetThemeStyles(presetName)[mode];
    const entries = sortThemeStyleEntries(styles);
    const numRows = Math.ceil(entries.length / 2);

    return (
        <TooltipContent className="mx-4 py-0 bg-muted border-foreground/10 border-[1.5px] shadow cursor-default" side="bottom" sideOffset={5} hideTooltip>
            <div className="-mx-3 py-2 text-xs text-center text-foreground font-semibold border-foreground/10 border-b-[1.5px]">
                {presetName}
            </div>

            <div className="relative">
                <div className="py-2 text-[10px] grid grid-flow-col gap-x-12 gap-y-1" style={{ gridTemplateRows: `repeat(${numRows}, minmax(0, 1fr))` }}>
                    {entries.map(
                        ([key, value]) => (
                            <ThemeStyleItem key={key} name={key} value={value as string} />
                        )
                    )}
                </div>

                {/* Column separator */}
                <div className="absolute top-0 bottom-0 w-px bg-foreground/10" style={{ left: '50%' }} />
            </div>
        </TooltipContent>
    );
}

function ThemeStyleItem({ name, value }: { name: string; value: string; }) {
    const isColor = isColorValue(value);
    const isFont = name.startsWith("font-");
    const isHighlighted = ["primary", "accent", "secondary", "border"].includes(name);

    return (
        <div className="flex items-center justify-between gap-2">
            <span className={`text-foreground/70 truncate ${isHighlighted ? "font-bold" : ""}`}>
                {name}:
            </span>
            {isColor
                ? <ColorBox color={value} />
                : isFont
                    ? <span className="max-w-12 text-[9px] text-foreground font-mono truncate" title={value}>{value}</span>
                    : <span className="text-[9px] text-foreground font-mono truncate">{value}</span>
            }
        </div>
    );
}

function isColorValue(value: string): boolean {
    if (!value) return false;
    return value.startsWith("#") ||
        value.startsWith("rgb") ||
        value.startsWith("hsl") ||
        value.includes("var(--");
}

function sortThemeStyleEntries(styles: Record<string, string>): [string, string][] {
    return Object.entries(styles).sort(
        ([keyA, valueA], [keyB, valueB]) => {
            const aIsColor = isColorValue(valueA);
            const bIsColor = isColorValue(valueB);
            const aIsFont = keyA.startsWith("font-");
            const bIsFont = keyB.startsWith("font-");

            // Colors first
            if (aIsColor && !bIsColor) return -1;
            if (!aIsColor && bIsColor) return 1;

            // Among non-colors: non-font items before font items
            if (!aIsColor && !bIsColor) {
                if (!aIsFont && bIsFont) return -1;
                if (aIsFont && !bIsFont) return 1;
            }

            return 0;
        }
    );
}
