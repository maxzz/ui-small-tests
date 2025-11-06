import { type HTMLAttributes } from "react";
import { Sidebar, SidebarContent } from "@/components/ui/shadcn/sidebar";
import { GroupDemos } from "./2-group-demos";
import { GroupTwProps } from "./3-group-tw-props";
import { IconRadix_DragHandleDots2 } from "@/components/ui/icons";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/shadcn/resizable";
import { classNames } from "@/utils";
import { type PanelGroupStorage } from "react-resizable-panels";
import { appSettings } from "@/store/0-local-storage";

// export function LeftList() {
//     return (
//         <Sidebar>
//             <SidebarContent className="flex flex-col justify-between">
//                 <GroupDemos />
//                 <GroupTwProps/>
//             </SidebarContent>
//         </Sidebar>
//     );
// }

export function LeftList() {
    return (
        <Sidebar>
            <SidebarContent className="flex flex-col justify-between">

                <ResizablePanelGroup className="1md:min-w-[450px] 1min-h-[200px] max-w-md rounded-lg border" direction="vertical" autoSaveId="main" storage={panelsStorage}>
                    <ResizablePanel defaultSize={25}>
                        {/* <div className="flex h-full items-center justify-center p-6">
                            <span className="font-semibold">Header</span>
                        </div> */}
                        <GroupDemos />
                    </ResizablePanel>

                    {/* <ResizableHandle className="w-8 hover:size-8 active:size-8 1bg-blue-800 hover:bg-green-500 active:bg-red-500" /> */}
                    
                    <ResizableHandle className="my-[3px] 1pb-4 1items-end z-20" tabIndex={-1} withHandle>
                        <div className="flex items-center gap-1">
                            {/* <button className={toysArrowClasses} onClick={() => togglePanels(refA, refB, true)}>
                                <IconChevronLeft />
                            </button> */}

                            <ResizableHandleToys className={toysMiddleClasses} />

                            {/* <button className={toysArrowClasses} onClick={() => togglePanels(refA, refB, false)}>
                                <IconChevronLeft className="rotate-180" />
                            </button> */}
                        </div>
                    </ResizableHandle>

                    <ResizablePanel defaultSize={75}>
                        {/* <div className="flex h-full items-center justify-center p-6">
                            <span className="font-semibold">Content</span>
                        </div> */}
                        <GroupTwProps />
                    </ResizablePanel>
                </ResizablePanelGroup>

            </SidebarContent>
        </Sidebar>
    );
}

function ResizableHandleToys({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("w-3 h-4 rounded-sm border bg-border flex items-center justify-center z-10", className)} {...rest}>
            <IconRadix_DragHandleDots2 className="h-2.5 w-2.5 text-red-500" />
        </div>
    );
}

const toysMiddleClasses = "invisible group-hover:visible transition-all delay-150";

const panelsStorage: PanelGroupStorage = {
    getItem(name: string): string {
        return appSettings.appUi.leftVerticalDivider[name] || '';
    },
    setItem(name: string, value: string): void {
        appSettings.appUi.leftVerticalDivider[name] = value; // {"{\"defaultSize\":25},{\"defaultSize\":50}":{"expandToSizes":{},"layout":[50,50]}}
    }
};
