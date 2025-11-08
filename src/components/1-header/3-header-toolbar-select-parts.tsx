import { type HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { type RightView, appSettings, rightViewTypeGuard } from "@/store/0-local-storage";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/shadcn/select";
import { Button } from "../ui/shadcn/button";
import { getPresetThemeStyles, themeNamesAtom } from "@/store/2-apply-theme";
// import { TestTargetWindowPositionWReset } from "../ui/local/3-test-target-position-w-reset";

export function SelectPatrs({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const { rightView } = useSnapshot(appSettings.appUi);
    return (
        <Select defaultValue={rightView} onValueChange={(view) => appSettings.appUi.rightView = view as RightView}>
            <SelectTrigger className="px-2 h-7! text-xs rounded-sm w-[120px]" title="Select view">
                <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent align="end" alignOffset={-4} {...rest}>
                <SelectItem className="text-xs" value={rightViewTypeGuard("Cards")}>
                    Cards
                </SelectItem>
                <SelectItem className="text-xs" value={rightViewTypeGuard("Dashboard")}>
                    Dashboard
                </SelectItem>
            </SelectContent>
        </Select>
    );
}
