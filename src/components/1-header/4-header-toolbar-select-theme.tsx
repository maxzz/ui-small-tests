import { type HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { appSettings } from "@/store/0-local-storage";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/shadcn/select";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/shadcn/shadcn-modified/tooltip";
import { getPresetThemeStyles, themeNamesAtom } from "@/store/2-apply-theme";

export function SelectTheme({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const { themePreseetName } = useSnapshot(appSettings.appUi);
    const themeNames = useAtomValue(themeNamesAtom);

    return (
        <Tooltip>
            <Select defaultValue={themePreseetName} onValueChange={(name) => appSettings.appUi.themePreseetName = name}>
                <TooltipTrigger asChild>
                    <SelectTrigger className="px-2 h-7! text-xs rounded-sm" title="primary, accent, secondary, border">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                </TooltipTrigger>

                <SelectContent align="end" alignOffset={-4}>
                    {themeNames.map(
                        (name) => (
                            <SelectItem className="text-xs [&_span]:last:w-full [&_span]:last:block [&_span]:last:justify-between" value={name} key={name}>
                                {name}
                                <ThemeColors presetName={name} mode="light" />
                            </SelectItem>
                        )
                    )}
                </SelectContent>
            </Select>

            <ThemeTooltipContent presetName={themePreseetName} />
        </Tooltip>
    );
}

function ThemeColors({ presetName, mode }: { presetName: string; mode: "light" | "dark"; }) {
    const styles = getPresetThemeStyles(presetName)[mode];
    return (
        <div className="flex gap-0.5">
            <ColorBox color={styles.primary} />
            <ColorBox color={styles.accent} />
            <ColorBox color={styles.secondary} />
            <ColorBox color={styles.border} />
        </div>
    );
}

function ColorBox({ color }: { color: string; }) {
    return (
        <div className="size-4 rounded-sm border-foreground/30 border" style={{ backgroundColor: color }} />
    );
}

function ThemeTooltipContent({ presetName }: { presetName: string; }) {
    const mode = "light";
    const styles = getPresetThemeStyles(presetName)[mode];
    
    return (
        <TooltipContent side="bottom" sideOffset={5}>
            <div className="flex flex-col gap-1.5 max-w-xs">
                <div className="text-xs font-semibold border-b border-foreground/20 pb-1">{presetName}</div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10px]">
                    {Object.entries(styles).map(([key, value]) => (
                        <ThemeStyleItem key={key} name={key} value={value as string} />
                    ))}
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
            {isColor ? (
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
