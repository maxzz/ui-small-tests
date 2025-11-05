"use client";
import { useCallback } from "react";
import { useSnapshot } from "valtio";
import { appSettings, type NodeId } from "@/store/0-local-storage";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/shadcn/sidebar";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";

export function GroupTwProps() {
    const { leftTree } = useSnapshot(appSettings.appUi);

    return (
        <SidebarGroup className="border-t border-border h-1/2">
            <SidebarGroupLabel>
                Tailwind CSS props
            </SidebarGroupLabel>

            <SidebarGroupContent>
                <ScrollArea className="size-full">
                    <div className="">123</div>
                </ScrollArea>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
