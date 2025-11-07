import { type HTMLAttributes } from "react";
import { Sidebar, SidebarContent } from "@/components/ui/shadcn/sidebar";
import { GroupDemos } from "./2-group-demos";
import { GroupTwProps } from "./3-group-tw-props";
import { IconRadix_DragHandleDots2 } from "@/components/ui/icons";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/shadcn/resizable";
import { classNames } from "@/utils";
import { panelsStorage } from "@/store/0-local-storage";

export function LeftList() {
    return (
        <Sidebar>
            <SidebarContent className="flex flex-col justify-between">

                <ResizablePanelGroup className="1md:min-w-[450px] 1min-h-[200px] max-w-md rounded-lg border" direction="vertical" autoSaveId="main" storage={panelsStorage}>
                    <ResizablePanel defaultSize={25}>
                        <GroupDemos />
                    </ResizablePanel>

                    <ResizableHandle className={resizableHandleClasses} tabIndex={-1} withHandle />

                    <ResizablePanel defaultSize={75}>
                        <GroupTwProps />
                    </ResizablePanel>
                </ResizablePanelGroup>

            </SidebarContent>
        </Sidebar>
    );
}

const resizableHandleClasses = "\
my-[3px] \
1group \
hover:bg-red-500 \
active:bg-sky-500 \
[&_div]:invisible \
[&_div]:hover:visible \
[&_div]:hover:bg-border/30 \
1[&_div]:hover:bg-red-400 \
[&_div]:active:bg-sky-400 \
transition-all delay-150 z-20"; //"invisible group-hover:visible transition-all delay-150";
