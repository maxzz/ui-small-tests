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

            <TooltipContent side="bottom" sideOffset={5}>
                <div className="flex flex-col gap-1">
                    <div className="text-xs font-semibold">{themePreseetName}</div>
                    <ThemeColors presetName={themePreseetName} mode="light" />
                </div>
            </TooltipContent>
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
