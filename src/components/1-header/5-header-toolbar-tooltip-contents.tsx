import { TooltipContent } from "../ui/shadcn/shadcn-modified/tooltip";
import { getPresetThemeStyles } from "@/store/2-apply-theme";
import { ColorBox } from "./6-header-toolbar-select-color-box";

export function ThemeTooltipContent({ presetName }: { presetName: string; }) {
    const mode = "light";
    const styles = getPresetThemeStyles(presetName)[mode];
    const entries = Object.entries(styles);
    const numRows = Math.ceil(entries.length / 2);

    return (
        <TooltipContent side="bottom" sideOffset={5} className="bg-muted border-foreground/20 border shadow">
            <div className="flex flex-col gap-1.5 max-w-xs">
                <div className="text-xs font-semibold border-b border-foreground/20 pb-1">{presetName}</div>
                <div 
                    className="grid grid-flow-col gap-x-3 gap-y-1 text-[10px]"
                    style={{ gridTemplateRows: `repeat(${numRows}, minmax(0, 1fr))` }}
                >
                    {entries.map(
                        ([key, value]) => (
                            <ThemeStyleItem key={key} name={key} value={value as string} />
                        )
                    )}
                </div>
            </div>
        </TooltipContent>
    );
}

function ThemeStyleItem({ name, value }: { name: string; value: string; }) {
    const isColor = isColorValue(value);

    return (
        <div className="flex items-center justify-between gap-2">
            <span className="text-foreground/70 truncate">{name}:</span>
            {isColor
                ? (
                    <ColorBox color={value} />
                ) : (
                    <span className="text-foreground font-mono text-[9px] truncate">{value}</span>
                )}
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
