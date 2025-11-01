import { type HTMLAttributes } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/shadcn/select";
import { useAtom, useAtomValue } from "jotai";
import { getPresetThemeStyles, themeNameAtom, themeNamesAtom } from "@/store/apply-theme";

export function HeaderToolbar({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const [themeName, setThemeName] = useAtom(themeNameAtom);
    const themeNames = useAtomValue(themeNamesAtom);
    return (
        <div className="text-xs flex items-center gap-2">
            <Select defaultValue={themeName} onValueChange={setThemeName}>
                <SelectTrigger className="px-2 h-6! text-xs rounded-sm">
                    <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent align="end" alignOffset={-4}>
                    {themeNames.map(
                        (name) => (
                            <SelectItem className="text-xs flex items-center justify-between gap-0.5 [&_span]:last:w-full [&_span]:last:block [&_span]:last:justify-between" value={name} key={name}>
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
        <div className="size-4 rounded-sm border-muted border" style={{ backgroundColor: color }} />
    );
}
