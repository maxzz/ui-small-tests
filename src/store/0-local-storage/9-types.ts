// Left view

export type LeftViewId = "not-yet" | "dashboard" | "hero-text" | "cards" | "listview";

export type LeftViewItem = {
    id: LeftViewId;
    title: string;
    description?: string;
    icon?: string;
};

export const LeftViewItems = [
    // { id: "Examples", title: "Examples", description: "Example notes demonstrating various features", icon: "📚" },
    // { id: "no-demo-yet", title: "No Demo Yet", description: "This note is not yet demoed", icon: "🚧" },
    { id: "cards", title: "Cards", description: "Cards demo", icon: "📊" },
    { id: "dashboard", title: "Dashboard", description: "Dashboard demo", icon: "📊" },
    { id: "hero-text", title: "Effect Hero Title", description: "Effect Hero Title demo", icon: "📊" },
    { id: "listview", title: "List View", description: "List View demo", icon: "📊" },
] as const satisfies readonly LeftViewItem[];

//export type LeftViewId = typeof LeftViewItems[number]["id"];

// Right view

export type RightView = "Cards" | "Dashboard";

export function rightViewTypeGuard(rightView: RightView): string {
    return rightView;
}
