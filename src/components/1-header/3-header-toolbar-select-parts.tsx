import { type HTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { type RightSubViewId, RightSubViewItems, appSettings } from "@/store/0-local-storage";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/shadcn/select";

export function SelectPatrs({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const { rightSubView: rightView } = useSnapshot(appSettings.appUi);
    return (
        <Select defaultValue={rightView} onValueChange={(view) => appSettings.appUi.rightSubView = view as RightSubViewId}>
            <SelectTrigger className="px-2 h-7! text-xs rounded-sm w-[120px]" title="Select view">
                <SelectValue placeholder="Select view" />
            </SelectTrigger>

            <SelectContent align="end" alignOffset={-4} {...rest}>
                {RightSubViewItems.map(
                    ({ id, title, description, icon }) => (
                        <SelectItem key={id} className="text-xs" value={id}>
                            {icon} {title}
                        </SelectItem>
                    )
                )}
            </SelectContent>
        </Select>
    );
}
