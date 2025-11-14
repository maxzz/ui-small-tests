import { type HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { appSettings } from "@/store/0-local-storage";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/shadcn/select";
import { Tooltip, TooltipTrigger } from "../ui/shadcn/shadcn-modified/tooltip";
import { themeNamesAtom } from "@/store/2-apply-theme";
import { ThemeTooltipContent } from "./5-header-toolbar-tooltip-contents";
import { ThemeColors } from "./6-header-toolbar-select-color-box";

export function SelectTheme({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const { themePreseetName } = useSnapshot(appSettings.appUi);
    const themeNames = useAtomValue(themeNamesAtom);

    return (
        <Tooltip open={true}>
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
