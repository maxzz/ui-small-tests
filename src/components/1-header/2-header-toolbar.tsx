import { type HTMLAttributes } from "react";
import { useAtom, useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { appSettings } from "@/store/0-local-storage";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/shadcn/select";
import { getPresetThemeStyles, themeNameAtom, themeNamesAtom } from "@/store/2-apply-theme";

export function HeaderToolbar({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const { themePreseetName } = useSnapshot(appSettings.appUi);
    const themeNames = useAtomValue(themeNamesAtom);

    return (
        <div className={classNames("text-xs flex items-center gap-2", className)} {...rest}>
            <Select defaultValue={themePreseetName} onValueChange={(name) => appSettings.appUi.themePreseetName = name}>
                <SelectTrigger className="px-2 h-7! text-xs rounded-sm" title="primary, accent, secondary, border">
                    <SelectValue placeholder="Select" />
                </SelectTrigger>

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
        </div>
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
