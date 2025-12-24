import { type MotionExampleId, MotionExampleItems } from "../../components/2-main/3-pages/4-motion-examples/9-motion-example-types";

// Re-export for backward compatibility
export type { MotionExampleId };
export { MotionExampleItems };

// Left view

export type LeftViewId = 
    | "cards" 
    | "dashboard" 
    | "hero-text" 
    | "listview"
    | "motion-variants-race"
    | MotionExampleId
    | "not-yet";

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
    { id: "motion-variants-race", title: "Motion Variants Race", description: "Motion Variants Race demo", icon: "🏁" },
    ...MotionExampleItems,
] as const satisfies readonly LeftViewItem[];

//export type LeftViewId = typeof LeftViewItems[number]["id"];

// Right view

export type RightViewId = 
    | "simple-cards" 
    | "simple-dashboard" 
    | "original-cards"
    | "motion-variants-race"
    | MotionExampleId;

export type RightViewItem = {
    id: RightViewId;
    title: string;
    description?: string;
    icon?: string;
};

export const RightViewItems = [
    { id: "simple-cards", title: "Cards", description: "Cards demo", icon: "💻" },
    { id: "simple-dashboard", title: "Dashboard", description: "Dashboard demo", icon: "💻" },
    { id: "original-cards", title: "Original Cards", description: "Original Cards demo", icon: "💻" },
    { id: "motion-variants-race", title: "Motion Variants Race", description: "Motion Variants Race demo", icon: "🏁" },
    ...MotionExampleItems,
] as const satisfies readonly RightViewItem[];

export function rightViewTypeGuard(rightView: RightViewId): string {
    return rightView;
}
