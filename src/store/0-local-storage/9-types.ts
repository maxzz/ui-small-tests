export type NodeId = "Examples" | "no-demo-yet" | "Dashboard" | "Effect Hero Title" | "Cards";

export type RightView = "Cards" | "Dashboard";

export function rightViewTypeGuard(rightView: RightView): string {
    return rightView;
}
