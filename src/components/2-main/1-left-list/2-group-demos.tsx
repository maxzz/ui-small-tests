"use client";
import { useCallback, useEffect, useRef } from "react";
import { useSnapshot } from "valtio";
import { appSettings, LeftViewItemsGroups, type LeftViewId } from "@/store/0-local-storage";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/shadcn/sidebar";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/utils";

const formatLabel = (key: string) => {
    return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
};

export function GroupDemos() {
    const { leftTree, expandedGroups } = useSnapshot(appSettings.appUi);
    const activeItemRef = useRef<HTMLLIElement>(null);

    const onItemClick = useCallback((nodeId: LeftViewId) => {
        appSettings.appUi.leftTree = nodeId;
    }, []);

    const onToggleGroup = useCallback((groupKey: string) => {
        const current = appSettings.appUi.expandedGroups || [];
        if (current.includes(groupKey)) {
            appSettings.appUi.expandedGroups = current.filter(k => k !== groupKey);
        } else {
            appSettings.appUi.expandedGroups = [...current, groupKey];
        }
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
                        {Object.entries(LeftViewItemsGroups).map(([groupKey, items]) => {
                            const isExpanded = expandedGroups?.includes(groupKey);
                            
                            return (
                                <div key={groupKey} className="mb-2">
                                    <SidebarMenuItem>
                                        <SidebarMenuButton 
                                            onClick={() => onToggleGroup(groupKey)}
                                            className="font-medium text-sidebar-foreground/70 h-8"
                                        >
                                            <ChevronRight 
                                                className={cn(
                                                    "transition-transform duration-200", 
                                                    isExpanded ? "rotate-90" : ""
                                                )} 
                                            />
                                            {formatLabel(groupKey)}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>

                                    <AnimatePresence initial={false}>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pl-4 border-l ml-3 my-1 border-sidebar-border">
                                                    {items.map(({ id, title, icon }) => {
                                                        const isActive = leftTree === id;
                                                        return (
                                                            <SidebarMenuItem 
                                                                key={id}
                                                                ref={isActive ? activeItemRef : null}
                                                            >
                                                                <SidebarMenuButton 
                                                                    onClick={() => onItemClick(id)} 
                                                                    isActive={isActive}
                                                                    size="sm"
                                                                >
                                                                    {icon} {title}
                                                                </SidebarMenuButton>
                                                            </SidebarMenuItem>
                                                        );
                                                    })}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </SidebarMenu>
                </ScrollArea>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
