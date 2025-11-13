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

export function GroupDemos() {
    const { leftTree } = useSnapshot(appSettings.appUi);

    const onItemClick = useCallback((nodeId: NodeId) => {
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

                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={() => onItemClick("Cards")} isActive={leftTree === "Cards"}>
                            Cards
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={() => onItemClick("Dashboard")} isActive={leftTree === "Dashboard"}>
                            Dashboard
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={() => onItemClick("Effect Hero Title")} isActive={leftTree === "Effect Hero Title"}>
                            Effect Hero Title
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={() => onItemClick("ListView")} isActive={leftTree === "ListView"}>
                             List View
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
