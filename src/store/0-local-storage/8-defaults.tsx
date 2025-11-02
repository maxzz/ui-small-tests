import { type ThemeMode } from "@/utils";
import { type NodeId } from "./7-left-view";

export type AppUISettings = {
    themeMode: ThemeMode;
    // accordionsOpened: Record<string, boolean>;
    leftTree: NodeId;
};

export const defaultAppUISettings: AppUISettings = {
    themeMode: 'light',
    // accordionsOpened: {},
    leftTree: "Cards",
};
