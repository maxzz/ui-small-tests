"use client";
import { TreeExpander, TreeIcon, TreeLabel, TreeNode, TreeNodeContent, TreeNodeProps, TreeNodeTrigger, TreeProvider, TreeView, } from "@/components/ui/kibo-ui/tree";
import { FileCode, FileJson, FileText } from "lucide-react";

export function TreeExample() {
    return (
        <TreeProvider
            // defaultExpandedIds={["src", "components", "ui"]}
            // animateExpand={false}
            // onSelectionChange={(ids) => console.log("Selected:", ids)}
        >
            <TreeView>
                <TreeNode nodeId="src">
                    <TreeNodeTrigger>
                        <TreeExpander hasChildren />
                        <TreeIcon hasChildren />
                        <TreeLabel>src</TreeLabel>
                    </TreeNodeTrigger>
                    <TreeNodeContent hasChildren>
                        <TreeNode level={1} nodeId="components">
                            <TreeNodeTrigger>
                                <TreeExpander hasChildren />
                                <TreeIcon hasChildren />
                                <TreeLabel>components</TreeLabel>
                            </TreeNodeTrigger>
                            <TreeNodeContent hasChildren>
                                <TreeNode level={2} nodeId="ui">
                                    <TreeNodeTrigger onClick={() => console.log("Button clicked")}>
                                        <TreeExpander hasChildren />
                                        <TreeIcon hasChildren />
                                        <TreeLabel>ui</TreeLabel>
                                    </TreeNodeTrigger>
                                    <TreeNodeContent hasChildren>
                                        <TreeNode level={3} nodeId="button.tsx">
                                            <TreeNodeTrigger onClick={(e) => console.log("Button clicked", e, "id=", (e.currentTarget as HTMLElement).dataset["uuid"])} data-uuid="button.tsx">
                                                <TreeExpander />
                                                <TreeIcon icon={<FileCode className="h-4 w-4" />} />
                                                <TreeLabel>button.tsx</TreeLabel>
                                            </TreeNodeTrigger>
                                        </TreeNode>
                                        <TreeNode level={3} nodeId="card.tsx">
                                            <TreeNodeTrigger>
                                                <TreeExpander />
                                                <TreeIcon icon={<FileCode className="h-4 w-4" />} />
                                                <TreeLabel>card.tsx</TreeLabel>
                                            </TreeNodeTrigger>
                                        </TreeNode>
                                        <TreeNode isLast level={3} nodeId="dialog.tsx">
                                            <TreeNodeTrigger>
                                                <TreeExpander />
                                                <TreeIcon icon={<FileCode className="h-4 w-4" />} />
                                                <TreeLabel>dialog.tsx</TreeLabel>
                                            </TreeNodeTrigger>
                                        </TreeNode>
                                    </TreeNodeContent>
                                </TreeNode>
                                <TreeNode isLast level={2} nodeId="layout">
                                    <TreeNodeTrigger>
                                        <TreeExpander hasChildren />
                                        <TreeIcon hasChildren />
                                        <TreeLabel>layout</TreeLabel>
                                    </TreeNodeTrigger>
                                    <TreeNodeContent hasChildren>
                                        <TreeNode level={3} nodeId="header.tsx">
                                            <TreeNodeTrigger>
                                                <TreeExpander />
                                                <TreeIcon icon={<FileCode className="h-4 w-4" />} />
                                                <TreeLabel>header.tsx</TreeLabel>
                                            </TreeNodeTrigger>
                                        </TreeNode>
                                        <TreeNode isLast level={3} nodeId="footer.tsx">
                                            <TreeNodeTrigger>
                                                <TreeExpander />
                                                <TreeIcon icon={<FileCode className="h-4 w-4" />} />
                                                <TreeLabel>footer.tsx</TreeLabel>
                                            </TreeNodeTrigger>
                                        </TreeNode>
                                    </TreeNodeContent>
                                </TreeNode>
                            </TreeNodeContent>
                        </TreeNode>
                    </TreeNodeContent>
                </TreeNode>
                <TreeNode nodeId="public">
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
                                <TreeNode level={2} nodeId="logo.svg">
                                    <TreeNodeTrigger>
                                        <TreeExpander />
                                        <TreeIcon icon={<FileText className="h-4 w-4" />} />
                                        <TreeLabel>logo.svg</TreeLabel>
                                    </TreeNodeTrigger>
                                </TreeNode>
                                <TreeNode isLast level={2} nodeId="hero.png">
                                    <TreeNodeTrigger>
                                        <TreeExpander />
                                        <TreeIcon icon={<FileText className="h-4 w-4" />} />
                                        <TreeLabel>hero.png</TreeLabel>
                                    </TreeNodeTrigger>
                                </TreeNode>
                            </TreeNodeContent>
                        </TreeNode>
                    </TreeNodeContent>
                </TreeNode>
                <RenderTreeNode label="package.json" nodeId="package.json" onItemClick={defaultClick} icon={<FileJson className="size-4" />} />
                <RenderTreeNode label="tsconfig.json" nodeId="tsconfig.json" onItemClick={defaultClick} icon={<FileJson className="size-4" />} />
                <RenderTreeNode label="README.md" nodeId="README.md" onItemClick={defaultClick} icon={<FileJson className="size-4" />} />
            </TreeView>
        </TreeProvider>
    );
}

//

const defaultClick = (nodeId: string, e: React.MouseEvent<HTMLElement>) => {
    console.log("Button clicked", e, "nodeid=", (e.currentTarget as HTMLElement).dataset["nodeid"]);
    console.log(`node id="${nodeId}"`, e);
};

function RenderTreeNode({ nodeId, label, icon, className, onItemClick, hasChildren, level, isLast }: { nodeId: string; label: React.ReactNode; icon?: React.ReactNode; onItemClick?: (nodeId: string, e: React.MouseEvent<HTMLElement>) => void; className?: string; hasChildren?: boolean; level?: number; isLast?: boolean; }) {
    return (
        <TreeNode nodeId={nodeId} level={level} isLast={isLast}>
            <RenderTreeNodeTrigger nodeId={nodeId} label={label} icon={icon} className={className} onItemClick={onItemClick} hasChildren={hasChildren} />
        </TreeNode>
    );
}

function RenderTreeNodeTrigger({ nodeId, label, hasChildren, icon, className, onItemClick }: { nodeId: string; label: React.ReactNode; icon?: React.ReactNode; onItemClick?: (nodeId: string, e: React.MouseEvent<HTMLElement>) => void; className?: string; hasChildren?: boolean; }) {
    return (
        <TreeNodeTrigger data-nodeid={nodeId} className={className} onClick={(e) => onItemClick?.(nodeId, e)}>
            <TreeExpander hasChildren={hasChildren} />
            <TreeIcon icon={icon ? icon : <FileCode className="size-4" />} hasChildren={hasChildren} />
            <TreeLabel>{label}</TreeLabel>
        </TreeNodeTrigger>
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