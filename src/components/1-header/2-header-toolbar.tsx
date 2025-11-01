import { type HTMLAttributes } from "react";
import { classNames, cn } from "@/utils";
import { Select, SelectContent, selectItemClasses, SelectTrigger, SelectValue } from "../ui/shadcn/select";
import * as SelectPrimitive from "@radix-ui/react-select";
import { useAtom, useAtomValue } from "jotai";
import { getPresetThemeStyles, themeNameAtom, themeNamesAtom, themeStateAtom } from "@/store/apply-theme";
import { CheckIcon } from "lucide-react";

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
                            <SelectItem className="text-xs flex items-center justify-between gap-0.5" value={name} key={name}>
                                <div className="flex-1 text-right">
                                    {name}
                                </div>
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

function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
    return (
        <SelectPrimitive.Item data-slot="select-item" className={cn(selectItemClasses, className)} {...props}>

            <span className="absolute right-2 flex size-3.5 items-center justify-center">
                <SelectPrimitive.ItemIndicator>
                    <CheckIcon className="size-4" />
                </SelectPrimitive.ItemIndicator>
            </span>

            <div className="w-full 1flex items-center justify-between gap-2">
                <SelectPrimitive.ItemText className="">
                    <span className="flex items-center gap-2">
                        {children}
                        <ThemeColors presetName={props.value} mode="light" />
                    </span>
                </SelectPrimitive.ItemText>
            </div>
        </SelectPrimitive.Item>
    );
}
