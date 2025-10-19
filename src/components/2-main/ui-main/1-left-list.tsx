"use client";
import { useCallback } from "react";
import { useSetAtom } from "jotai";
import { TreeExpander, TreeIcon, TreeLabel, TreeNode, TreeNodeContent, TreeNodeProps, TreeNodeTrigger, TreeProvider, TreeView, } from "@/components/ui/kibo-ui/tree";
import { FileCode, FileJson, FileText } from "lucide-react";
import { LeftItemAtom } from "./8-left-item-atom";
import { type NodeId, type TreeData, treeData } from "./7-tree-data";

export function LeftList() {
    const setLeftItem = useSetAtom(LeftItemAtom);
    const defaultClick = useCallback((nodeId: NodeId, e: React.MouseEvent<HTMLElement>) => {
        // console.log("Button clicked", e, "nodeid=", (e.currentTarget as HTMLElement).dataset["nodeid"]);
        // console.log(`node id="${nodeId}"`, e);
        setLeftItem(nodeId);
    }, []);

    // console.log('render LeftList');

    return (
        <TreeProvider
            // defaultExpandedIds={["src", "components", "ui"]}
            // animateExpand={false}
            // onSelectionChange={(ids) => console.log("Selected:", ids)}
        >
            <TreeView className="[--border:var(--color-gray-500)]/30">
                {renderNodes(initialTreeSpec, 0, { onItemClick: defaultClick })}
            </TreeView>
        </TreeProvider>
    );
}

const initialTreeSpec: TreeSpec[] = [consvertTreeDataToTreeSpec(treeData, 0)];

function consvertTreeDataToTreeSpec(data: TreeData, level = 0): TreeSpec {
    return {
        id: data.id,
        level,
        label: data.id,
        children: data.children ? data.children.map(child => consvertTreeDataToTreeSpec(child, level + 1)) : [],
    };
}

type TreeSpec = {
    id: string;
    label: React.ReactNode;
    icon?: React.ReactNode;
    level: number;
    children: TreeSpec[];
};

function renderNodes(nodes: TreeSpec[], parentLevel = 0, options: { onItemClick?: (nodeId: NodeId, e: React.MouseEvent<HTMLElement>) => void; }) {
    return nodes.map(
        (node, idx) => {
            const hasChildren = node.children.length > 0;
            const isLast = idx === nodes.length - 1;
            return (
                <TreeNode key={node.id} nodeId={node.id} level={node.level} isLast={isLast}>

                    <TreeNodeTrigger data-nodeid={node.id} className="py-0.5" onClick={options.onItemClick && ((e) => options.onItemClick?.(node.id as NodeId, e))}>
                        <TreeExpander hasChildren={hasChildren} />
                        <TreeIcon icon={node.icon ? node.icon : <FileCode className="size-4" />} hasChildren={hasChildren} />
                        <TreeLabel>{node.label}</TreeLabel>
                    </TreeNodeTrigger>

                    {hasChildren && (
                        <TreeNodeContent hasChildren>
                            {renderNodes(node.children, parentLevel + 1, options)}
                        </TreeNodeContent>
                    )}

                </TreeNode>
            );
        }
    );
}
