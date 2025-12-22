"use client";
import { useCallback, useEffect, useRef } from "react";
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
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";

export function GroupDemos() {
    const { leftTree } = useSnapshot(appSettings.appUi);
    const activeItemRef = useRef<HTMLLIElement>(null);

    const onItemClick = useCallback((nodeId: LeftViewId) => {
        appSettings.appUi.leftTree = nodeId;
        console.log('onItemClick', nodeId);
    }, []);

    // Scroll active item into view when it changes
    useEffect(() => {
        if (activeItemRef.current) {
            activeItemRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'nearest'
            });
        }
    }, [leftTree]);

    return (
        <SidebarGroup className="h-full flex flex-col">
            <SidebarGroupLabel>
                Demos
            </SidebarGroupLabel>

            <SidebarGroupContent className="flex-1 overflow-hidden">
                <ScrollArea className="h-full pr-3">
                    <SidebarMenu>
                        {LeftViewItems.map(
                            ({ id, title, description, icon }) => {
                                const isActive = leftTree === id;
                                return (
                                    <SidebarMenuItem 
                                        key={id}
                                        ref={isActive ? activeItemRef : null}
                                    >
                                        <SidebarMenuButton onClick={() => onItemClick(id)} isActive={isActive}>
                                            {icon} {title}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            }
                        )}
                    </SidebarMenu>
                </ScrollArea>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
