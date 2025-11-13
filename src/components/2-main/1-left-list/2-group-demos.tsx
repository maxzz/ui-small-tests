"use client";
import { useCallback } from "react";
import { useSnapshot } from "valtio";
import { appSettings, LeftViewItems, type LeftViewId } from "@/store/0-local-storage";
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

export function GroupDemos() {
    const { leftTree } = useSnapshot(appSettings.appUi);

    const onItemClick = useCallback((nodeId: LeftViewId) => {
        appSettings.appUi.leftTree = nodeId;
        console.log('onItemClick', nodeId);
    }, []);

    return (
        <SidebarGroup>
            <SidebarGroupLabel>
                Colors
            </SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {LeftViewItems.map(
                        ({ id, title, description, icon }) => (
                            <SidebarMenuItem key={id}>
                                <SidebarMenuButton onClick={() => onItemClick(id)} isActive={leftTree === id}>
                                    {icon} {title}
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    )}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
