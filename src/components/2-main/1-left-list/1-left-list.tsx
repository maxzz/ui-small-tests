"use client";
import { useCallback } from "react";
import { useSnapshot } from "valtio";
import { appSettings, type NodeId } from "@/store/0-local-storage";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/shadcn/command";

export function LeftList() {
    const { leftTree } = useSnapshot(appSettings.appUi);
    
    const onItemClick = useCallback((nodeId: string) => {
        appSettings.appUi.leftTree = nodeId as NodeId;
        console.log('onItemClick', nodeId);
    }, []);

    return (
        <Command>
            {/* <CommandInput placeholder="Type a command or search..." /> */}
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Colors">
                    <CommandItem onSelect={onItemClick} value={asNodeId("Cards")}>Cards</CommandItem>
                    <CommandItem onSelect={onItemClick} value={asNodeId("Dashboard")}>Dashboard</CommandItem>
                    <CommandItem onSelect={onItemClick} value={asNodeId("Hero Title")}>Hero Title</CommandItem>
                </CommandGroup>
            </CommandList>
        </Command>
    );
}

function asNodeId(value: NodeId): string {
    return value;
}
