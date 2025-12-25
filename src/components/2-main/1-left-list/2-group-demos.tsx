"use client";
import { useCallback, useEffect, useRef } from "react";
import { useSnapshot } from "valtio";
import { cn } from "@/utils";
import { appSettings, leftViewItemsGroups, type LeftViewId, type LeftViewItem, type LeftViewItemsGroups } from "@/store/0-local-storage";
import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, } from "@/components/ui/shadcn/sidebar";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const formatLabel = (key: string) => {
    return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
};

const GroupItem = ({ 
    groupKey, 
    items, 
    expandedGroups, 
    leftTree, 
    activeItemRef, 
    onToggleGroup, 
    onItemClick,
    depth = 0
}: { 
    groupKey: string, 
    items: readonly LeftViewItem[] | LeftViewItemsGroups, 
    expandedGroups: string[], 
    leftTree: LeftViewId, 
    activeItemRef: React.RefObject<HTMLLIElement | null>,
    onToggleGroup: (key: string) => void,
    onItemClick: (id: LeftViewId) => void,
    depth?: number
}) => {
    const isExpanded = expandedGroups?.includes(groupKey);

    return (
        <div className="mb-2">
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
                            {Array.isArray(items) ? (
                                items.map(({ id, title, icon }) => {
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
                                })
                            ) : (
                                Object.entries(items).map(([subGroupKey, subItems]) => (
                                    <GroupItem 
                                        key={subGroupKey}
                                        groupKey={subGroupKey}
                                        items={subItems}
                                        expandedGroups={expandedGroups}
                                        leftTree={leftTree}
                                        activeItemRef={activeItemRef}
                                        onToggleGroup={onToggleGroup}
                                        onItemClick={onItemClick}
                                        depth={depth + 1}
                                    />
                                ))
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
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
                        {Object.entries(leftViewItemsGroups).map(([groupKey, items]) => (
                            <GroupItem 
                                key={groupKey}
                                groupKey={groupKey}
                                items={items}
                                expandedGroups={(expandedGroups || []) as string[]}
                                leftTree={leftTree}
                                activeItemRef={activeItemRef}
                                onToggleGroup={onToggleGroup}
                                onItemClick={onItemClick}
                            />
                        ))}
                    </SidebarMenu>
                </ScrollArea>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
