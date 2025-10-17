"use client";
import { useSetAtom } from "jotai";
import { TreeExpander, TreeIcon, TreeLabel, TreeNode, TreeNodeContent, TreeNodeProps, TreeNodeTrigger, TreeProvider, TreeView, } from "@/components/ui/kibo-ui/tree";
import { FileCode, FileJson, FileText } from "lucide-react";
import { LeftItem } from "./8-left-item";

export function LeftList() {
    const setLeftItem = useSetAtom(LeftItem);
    const defaultClick = (nodeId: string, e: React.MouseEvent<HTMLElement>) => {
        // console.log("Button clicked", e, "nodeid=", (e.currentTarget as HTMLElement).dataset["nodeid"]);
        // console.log(`node id="${nodeId}"`, e);
        setLeftItem(nodeId);
    };

    console.log('render LeftList');

    return (
        <TreeProvider
        // defaultExpandedIds={["src", "components", "ui"]}
        // animateExpand={false}
        // onSelectionChange={(ids) => console.log("Selected:", ids)}
        >
            <TreeView>
                <TreeNode nodeId="public" className="[--border:var(--color-red-500)]">
                    <TreeNodeTrigger>
                        <TreeExpander hasChildren />
                        <TreeIcon hasChildren />
                        <TreeLabel>public</TreeLabel>
                    </TreeNodeTrigger>

                    <TreeNodeContent hasChildren>
                        <TreeNode isLast level={1} nodeId="images">

                            <TreeNodeTrigger>
                                <TreeExpander hasChildren />
                                <TreeIcon hasChildren />
                                <TreeLabel>images</TreeLabel>
                            </TreeNodeTrigger>

                            <TreeNodeContent hasChildren>
                                <RenderTreeNode level={2} label="logo.svg" nodeId="logo.svg" onItemClick={defaultClick} icon={<FileText className="size-4" />} />
                                <RenderTreeNode isLast level={2} label="hero.png" nodeId="hero.png" onItemClick={defaultClick} icon={<FileText className="size-4" />} />
                            </TreeNodeContent>
                        </TreeNode>
                    </TreeNodeContent>
                </TreeNode>
            </TreeView>
        </TreeProvider>
    );
}

//

function RenderTreeNode({ nodeId, label, icon, level, isLast, className, onItemClick }: { nodeId: string; level?: number; isLast?: boolean; label: React.ReactNode; icon?: React.ReactNode; onItemClick?: (nodeId: string, e: React.MouseEvent<HTMLElement>) => void; className?: string; }) {
    return (
        <TreeNode nodeId={nodeId} level={level} isLast={isLast}>
            <TreeNodeTrigger data-nodeid={nodeId} className={className} onClick={(e) => onItemClick?.(nodeId, e)}>
                <TreeExpander />
                <TreeIcon icon={icon ? icon : <FileCode className="size-4" />} />
                <TreeLabel>{label}</TreeLabel>
            </TreeNodeTrigger>
        </TreeNode>
    );
}

//

type TreeSpec = {
    id: string;
    level: number;
    label: React.ReactNode;
    children: TreeSpec[];
};

function renderNodes(nodes: TreeSpec[], parentLevel = 0) {
    return nodes.map(
        (node, idx) => {
            const hasChildren = node.children.length > 0;
            const isLast = idx === nodes.length - 1;
            return (
                <TreeNode key={node.id} nodeId={node.id} level={node.level} isLast={isLast}>
                    <TreeNodeTrigger className="py-0.5">
                        <TreeExpander hasChildren={hasChildren} />
                        <TreeLabel>{node.label}</TreeLabel>
                    </TreeNodeTrigger>
                    {hasChildren && (
                        <TreeNodeContent hasChildren>
                            {renderNodes(node.children, parentLevel + 1)}
                        </TreeNodeContent>
                    )}
                </TreeNode>
            );
        }
    );
}