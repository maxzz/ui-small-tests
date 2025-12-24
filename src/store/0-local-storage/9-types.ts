import { type MotionExampleId, MotionExampleItems } from "../../components/2-main/3-pages/4-motion-examples/motion-examples-types";

// Left view

export type LeftViewId = 
    | "common-cards" 
    | "common-dashboard" 
    | "common-hero-text" 
    | "common-listview"
    | "common-motion-variants-race"
    | MotionExampleId
    | "thelast-not-yet";

export type LeftViewItem = {
    id: LeftViewId;
    title: string;
    description?: string;
    icon?: string;
};

export const LeftViewItems = [
    { id: "common-cards", title: "Cards", description: "Cards demo", icon: "📊" },
    { id: "common-dashboard", title: "Dashboard", description: "Dashboard demo", icon: "📊" },
    { id: "common-hero-text", title: "Effect Hero Title", description: "Effect Hero Title demo", icon: "📊" },
    { id: "common-listview", title: "List View", description: "List View demo", icon: "📊" },
    { id: "common-motion-variants-race", title: "Motion Variants Race", description: "Motion Variants Race demo", icon: "🏁" },
    ...MotionExampleItems,
] as const satisfies readonly LeftViewItem[];

//export type LeftViewId = typeof LeftViewItems[number]["id"];

// Right sub-view

export type RightSubViewId = 
    | "simple-cards" 
    | "simple-dashboard" 
    | "original-cards";

export type RightSubViewItem = {
    id: RightSubViewId;
    title: string;
    description?: string;
    icon?: string;
};

export const RightSubViewItems = [
    { id: "simple-cards", title: "Cards", description: "Cards demo", icon: "💻" },
    { id: "simple-dashboard", title: "Dashboard", description: "Dashboard demo", icon: "💻" },
    { id: "original-cards", title: "Original Cards", description: "Original Cards demo", icon: "💻" },
] as const satisfies readonly RightSubViewItem[];
