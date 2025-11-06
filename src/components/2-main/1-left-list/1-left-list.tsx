import { Sidebar, SidebarContent } from "@/components/ui/shadcn/sidebar";
import { GroupDemos } from "./2-group-demos";
import { GroupTwProps } from "./3-group-tw-props";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/shadcn/resizable";
import { classNames } from "@/utils";

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

                <ResizablePanelGroup className="min-h-[200px] max-w-md rounded-lg border md:min-w-[450px]" direction="vertical">
                    <ResizablePanel defaultSize={25}>
                        {/* <div className="flex h-full items-center justify-center p-6">
                            <span className="font-semibold">Header</span>
                        </div> */}
                        <GroupDemos />
                    </ResizablePanel>

                    <ResizableHandle className="w-8 hover:size-8 active:size-8 1bg-blue-800 hover:bg-green-500 active:bg-red-500" />

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

// export function ResizableHandleToys({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
//     return (
//         <div className={classNames("w-3 h-4 rounded-sm border bg-border flex items-center justify-center z-10", className)} {...rest}>
//             <DragHandleDots2Icon className="h-2.5 w-2.5" />
//         </div>
//     );
// }
