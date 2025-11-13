// Left view

export type LeftViewId = "cards" | "dashboard" | "hero-text" | "listview" | "not-yet";

export type LeftViewItem = {
    id: LeftViewId;
    title: string;
    description?: string;
    icon?: string;
};

export const LeftViewItems = [
    { id: "cards", title: "Cards", description: "Cards demo", icon: "📊" },
    { id: "dashboard", title: "Dashboard", description: "Dashboard demo", icon: "📊" },
    { id: "hero-text", title: "Effect Hero Title", description: "Effect Hero Title demo", icon: "📊" },
    { id: "listview", title: "List View", description: "List View demo", icon: "📊" },
    // { id: "examples", title: "Examples", description: "Example notes demonstrating various features", icon: "📚" },
    // { id: "not-yet", title: "No Demo Yet", description: "This note is not yet demoed", icon: "🚧" },
] as const satisfies readonly LeftViewItem[];

//export type LeftViewId = typeof LeftViewItems[number]["id"];

// Right view

export type RightViewId = "simple-cards" | "simple-dashboard";

export function rightViewTypeGuard(rightView: RightViewId): string {
    return rightView;
}
