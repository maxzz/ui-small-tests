"use client";
import { useCallback } from "react";
import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { TreeExpander, TreeIcon, TreeLabel, TreeNode, TreeNodeContent, TreeNodeProps, TreeNodeTrigger, TreeProvider, TreeView, } from "@/components/ui/nun/nun-kibo-ui-tree/kibo-ui/tree";
import { FileCode, FileJson, FileText } from "lucide-react";
import { appSettings, type NodeId } from "@/store/0-local-storage";
import { type TreeNodeData, initialTreeSpec } from "./7-tree-data";

export function LeftList() {
    const { leftTree } = useSnapshot(appSettings.appUi);
    
    const onItemClick = useCallback((nodeId: NodeId, e: React.MouseEvent<HTMLElement>) => {
        appSettings.appUi.leftTree = nodeId;
    }, []);

    return (
        <TreeProvider
            // defaultExpandedIds={[leftTree]}
            // selectedIds={[leftTree]}
            // defaultExpandedIds={["src", "components", "ui"]}
            // animateExpand={false}
            // onSelectionChange={(ids) => console.log("Selected:", ids)}
        >
            <TreeView className="[--border:var(--color-gray-500)]/30">
                {renderNodes(initialTreeSpec, 0, { onItemClick })}
            </TreeView>
        </TreeProvider>
    );
}

function renderNodes(nodes: TreeNodeData[], parentLevel = 0, options: { onItemClick?: (nodeId: NodeId, e: React.MouseEvent<HTMLElement>) => void; }): React.JSX.Element[] {
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
