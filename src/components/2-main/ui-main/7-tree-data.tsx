export type NodeId = "" | "public" | "images" | "logo.svg" | "dashboard";

export type TreeData<T = string> = {
    id: T;
    children?: TreeData<T>[];
};

export const treeData: TreeData<NodeId> = {
    id: "images",
    children: [
        {
            id: "logo.svg",
        },
        {
            id: "dashboard",
        },
    ],
};
