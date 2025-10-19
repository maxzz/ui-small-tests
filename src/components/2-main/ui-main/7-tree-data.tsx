export type NodeId = "" | "Examples" | "no-demo-yet" | "Dashboard" | "Hero Title";

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
            id: "Hero Title",
        },
        {
            id: "Dashboard",
        },
    ],
};
