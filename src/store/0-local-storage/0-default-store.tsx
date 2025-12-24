import { type ThemeMode } from "@/utils";
import { RightSubViewId, type LeftViewId } from "./9-types";

export type AppUISettings = {
    themeMode: ThemeMode;
    // accordionsOpened: Record<string, boolean>;
    resizable: Record<string, string>; // PanelGroupStorage serialized layout
    leftTree: LeftViewId;
    rightSubView: RightSubViewId;          // Right sub-view for mouse color tracking
    themePreseetName: string;
    zoom: number;
    sidebarLeftOpen: boolean;           // Main sidebar
    sidebarRightOpen: boolean;          // Right inner iframe sidebar
};

export const defaultAppUISettings: AppUISettings = {
    themeMode: 'light',
    // accordionsOpened: {},
    resizable: {},
    leftTree: "cards",
    rightSubView: "simple-cards",
    themePreseetName: "dafault",
    zoom: 1,
    sidebarLeftOpen: true,
    sidebarRightOpen: true,
};
