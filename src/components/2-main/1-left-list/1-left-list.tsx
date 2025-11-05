"use client";
import {
    Sidebar,
    SidebarContent
} from "@/components/ui/shadcn/sidebar";
import { GroupDemos } from "./2-group-demos";
import { GroupTwProps } from "./3-group-tw-props";

export function LeftList() {
    return (
        <Sidebar>
            <SidebarContent className="flex flex-col justify-between">
                <GroupDemos />
                <GroupTwProps/>
            </SidebarContent>
        </Sidebar>
    );
}
