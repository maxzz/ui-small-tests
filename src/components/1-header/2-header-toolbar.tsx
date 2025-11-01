import { type HTMLAttributes } from "react";
import { classNames } from "@/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/shadcn/select";
import { useAtom, useAtomValue } from "jotai";
import { getPresetThemeStyles, themeNameAtom, themeNamesAtom, themeStateAtom } from "@/store/apply-theme";

export function HeaderToolbar({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const [themeName, setThemeName] = useAtom(themeNameAtom);
    const themeNames = useAtomValue(themeNamesAtom);
    return (
        <div className="text-xs flex items-center gap-2">
            <Select defaultValue={themeName} onValueChange={setThemeName}>
                <SelectTrigger className="px-2 h-6! text-xs rounded-sm">
                    <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent>
                    {themeNames.map(
                        (name, idx) => (
                            <div className="flex items-center gap-0.5" key={idx}>
                                <SelectItem key={name} className="text-xs flex! gap-0.5" value={name}>
                                    {name}
                                    <ThemeColors presetName={name} mode="light" />
                                </SelectItem>

                            </div>
                        )
                    )}
                </SelectContent>
            </Select>

            {/* <ThemeColors presetName={themeName || "default"} mode="light" /> */}
        </div>
    );
}

function ThemeColors({ presetName, mode }: { presetName: string; mode: "light" | "dark"; }) {
    const styles = getPresetThemeStyles(presetName)[mode];
    console.log(presetName, mode, styles);
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
        <div className="border-muted h-3 w-3 rounded-sm border" style={{ backgroundColor: color }} />
    );
}
