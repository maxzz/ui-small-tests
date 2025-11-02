export type NodeId = "" | "Examples" | "no-demo-yet" | "Dashboard" | "Hero Title" | "Cards";

export type TreeData<T = string> = {
    id: T;
    children?: TreeData<T>[];
    //TODO: label: string;
    //TODO: icon: string;
    //TODO: expanded: boolean;
};

export const treeData: TreeData<NodeId> = {
    id: "Examples",
    children: [
        {
            id: "Cards",
        },
        {
            id: "Dashboard",
        },
        {
            id: "Hero Title",
        },
    ],
};

export type TreeNodeData = {
    id: string;
    label: React.ReactNode;
    icon?: React.ReactNode;
    level: number;
    children: TreeNodeData[];
};

function consvertTreeDataToTreeSpec(data: TreeData, level = 0): TreeNodeData {
    return {
        id: data.id,
        level,
        label: data.id,
        children: data.children ? data.children.map(child => consvertTreeDataToTreeSpec(child, level + 1)) : [],
    };
}

export const initialTreeSpec: TreeNodeData[] = [
    consvertTreeDataToTreeSpec(treeData, 0)
];
