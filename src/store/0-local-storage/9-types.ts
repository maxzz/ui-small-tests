export type NodeId = "Examples" | "no-demo-yet" | "Dashboard" | "Effect Hero Title" | "Cards" | "ListView";

export type RightView = "Cards" | "Dashboard";

export function rightViewTypeGuard(rightView: RightView): string {
    return rightView;
}
