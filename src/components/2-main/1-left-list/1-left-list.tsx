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

                    <ResizableHandle className="my-[3px] h-0.5! hover:bg-sky-500 active:bg-sky-500 transition-colors  delay-150 z-20" tabIndex={-1} withHandle />

                    <ResizablePanel defaultSize={75}>
                        <GroupTwProps />
                    </ResizablePanel>
                </ResizablePanelGroup>

            </SidebarContent>
        </Sidebar>
    );
}

const toysMiddleClasses = "invisible group-hover:visible transition-all delay-150";
