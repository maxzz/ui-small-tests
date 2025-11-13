export type NodeIdItem = {
    id: string;
    title: string;
    description?: string;
    icon?: string;
};

export const NodeIdItems = [
    { id: "Examples", title: "Examples", description: "Example notes demonstrating various features", icon: "📚" }    ,
    { id: "no-demo-yet", title: "No Demo Yet", description: "This note is not yet demoed", icon: "🚧" },
    { id: "Dashboard", title: "Dashboard", description: "Dashboard demo", icon: "📊" },
    { id: "Effect Hero Title", title: "Effect Hero Title", description: "Effect Hero Title demo", icon: "📊" },
    { id: "Cards", title: "Cards", description: "Cards demo", icon: "📊" },
    { id: "ListView", title: "List View", description: "List View demo", icon: "📊" },
] as const satisfies readonly NodeIdItem[];

/* NodeId becomes a union of the literal id strings */
export type NodeId = typeof NodeIdItems[number]["id"];

export type RightView = "Cards" | "Dashboard";

export function rightViewTypeGuard(rightView: RightView): string {
    return rightView;
}
