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

export function LeftList() {
    const { leftTree } = useSnapshot(appSettings.appUi);

    const onItemClick = useCallback((nodeId: NodeId) => {
        appSettings.appUi.leftTree = nodeId;
        console.log('onItemClick', nodeId);
    }, []);

    return (
        <Sidebar>
            <SidebarContent className="flex flex-col justify-between">

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

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup className="border-t border-border">
                    <SidebarGroupLabel>
                        Colors2
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
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
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>



            </SidebarContent>
        </Sidebar>
    );
}
