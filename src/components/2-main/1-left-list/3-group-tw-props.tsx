import { useMemo } from "react";
import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { appSettings } from "@/store/0-local-storage";
import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from "@/components/ui/shadcn/sidebar";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import { hoverStackAtom } from "../2-pages/8-mouse-tracker/7-hover-stack-atoms";
import { formatHoverStackTooltip } from "../2-pages/8-mouse-tracker/8-utils-format";
// import { TestTargetWindowPositionWReset } from "@/components/ui/local/3-test-target-position-w-reset";

export function GroupTwProps() {
    const { leftTree } = useSnapshot(appSettings.appUi);
    const hoverStack = useAtomValue(hoverStackAtom);
    const tooltipContent = useMemo(() => formatHoverStackTooltip(hoverStack), [hoverStack]);

    return (
        <SidebarGroup className="1border-t border-border h-1/2 overflow-hidden flex flex-col">
            <SidebarGroupLabel>
                Tailwind CSS props
                {/* <TestTargetWindowPositionWReset className="inline-block ml-2 align-middle" /> */}
            </SidebarGroupLabel>

            <SidebarGroupContent>
                <ScrollArea className="size-full">
                    <div className="p-0 whitespace-pre">
                        {tooltipContent}
                    </div>
                </ScrollArea>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
