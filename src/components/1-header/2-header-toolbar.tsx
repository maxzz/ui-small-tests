import { type HTMLAttributes } from "react";
import { classNames, cn } from "@/utils";
import { Select, SelectContent, SelectTrigger, SelectValue } from "../ui/shadcn/select";
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
                                {/* <ThemeColors presetName={name} mode="light" /> */}
                            </SelectItem>
                        )
                    )}
                </SelectContent>
                {/* <ThemeColors presetName={themeName || "default"} mode="light" /> */}
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
        <SelectPrimitive.Item
            data-slot="select-item"
            className={cn("focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", className)}
            {...props}
        >
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

                {/* <SelectPrimitive.ItemText className="w-full">{children}</SelectPrimitive.ItemText> */}
                {/* {children} */}
                {/* <ThemeColors presetName={props.value} mode="light" /> */}
            </div>
        </SelectPrimitive.Item>
    );
}
