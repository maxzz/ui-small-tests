import { useCallback, useEffect, useRef } from "react";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { appSettings, leftViewItemsGroups, type LeftViewId, type LeftViewItem, type LeftViewItemsGroups } from "@/store/0-local-storage";
import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, } from "@/components/ui/shadcn/sidebar";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function GroupDemos() {
    const { leftTree: currentItemId, expandedGroups } = useSnapshot(appSettings.appUi);
    const activeItemRef = useRef<HTMLLIElement>(null);

    const onItemClick = useCallback(
        (nodeId: LeftViewId) => {
            appSettings.appUi.leftTree = nodeId;
        }, []
    );

    const onToggleGroup = useCallback(
        (groupKey: string) => {
            const current = appSettings.appUi.expandedGroups || [];
            if (current.includes(groupKey)) {
                appSettings.appUi.expandedGroups = current.filter(k => k !== groupKey);
            } else {
                appSettings.appUi.expandedGroups = [...current, groupKey];
            }
        }, []
    );

    useEffect( // Scroll active item into view when it changes
        () => {
            activeItemRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        }, [currentItemId]
    );

    return (
        <SidebarGroup className="h-full flex flex-col">
            {/* <SidebarGroupLabel>
                Demos
            </SidebarGroupLabel> */}

            <SidebarGroupContent className="flex-1 overflow-hidden">
                <ScrollArea className="h-full pr-3">
                    <SidebarMenu className="gap-0">
                        {Object.entries(leftViewItemsGroups).map(
                            ([groupKey, items]) => (
                                <GroupItem
                                    items={items}
                                    key={groupKey}
                                    groupKey={groupKey}
                                    expandedGroups={(expandedGroups || []) as string[]}
                                    currentItemId={currentItemId}
                                    activeItemRef={activeItemRef}
                                    onToggleGroup={onToggleGroup}
                                    onItemClick={onItemClick}
                                />
                            )
                        )}
                    </SidebarMenu>
                </ScrollArea>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}

type GroupItemProps = {
    items: readonly LeftViewItem[] | LeftViewItemsGroups;   // The items to display in the group.
    expandedGroups: string[];                               // The groups that are expanded like ["common", "motionExamples"].
    currentItemId: LeftViewId;                              // The current item id like "common-cards" or "motion-variants-race".
    groupKey: string;                                       // The key of the group like "common" or "motionExamples" or "miscellaneous".
    onToggleGroup: (key: string) => void;                   // The function to collapse or expand the group.
    onItemClick: (id: LeftViewId) => void;                  // The function to select the item.
    activeItemRef: React.RefObject<HTMLLIElement | null>;   // The ref of the active item so that it can be scrolled into view when it changes.
    depth?: number;                                         // The depth of the group like 0 for the main group, 1 for the sub-groups.
};

function GroupItem({ groupKey, items, expandedGroups, currentItemId, activeItemRef, onToggleGroup, onItemClick, depth = 0 }: GroupItemProps) {
    const isExpanded = expandedGroups?.includes(groupKey);
    return (
        <div className="">
            <SidebarMenuItem>
                <SidebarMenuButton className="font-medium text-sidebar-foreground/70" size="xs" onClick={() => onToggleGroup(groupKey)}>
                    <ChevronRight className={classNames("transition-transform duration-200", isExpanded && "rotate-90")} />
                    <span className="truncate">
                        {formatLabel(groupKey)}
                    </span>
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
                        <div className="ml-4 pl-1 border-sidebar-border border-l">
                            {Array.isArray(items)
                                ? (
                                    items.map(
                                        ({ id, title, icon }) => {
                                            const isActive = currentItemId === id;
                                            return (
                                                <SidebarMenuItem ref={isActive ? activeItemRef : null} key={id}>
                                                    <SidebarMenuButton className="py-0" isActive={isActive} size="xs" onClick={() => onItemClick(id)} title={id}>
                                                        {icon} <span className="truncate">{title}</span>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            );
                                        }
                                    )
                                ) : (
                                    Object.entries(items).map(
                                        ([subGroupKey, subItems]) => (
                                            <GroupItem
                                                key={subGroupKey}
                                                items={subItems}
                                                expandedGroups={expandedGroups}
                                                currentItemId={currentItemId}
                                                groupKey={subGroupKey}
                                                onToggleGroup={onToggleGroup}
                                                onItemClick={onItemClick}
                                                activeItemRef={activeItemRef}
                                                depth={depth + 1}
                                            />
                                        )
                                    )
                                )
                            }
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/**
 * Format a string to a human readable label.
 * @param key - like "motionExamples"
 * @returns The formatted label like "Motion Examples".
 */
function formatLabel(key: string) {
    return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
}
