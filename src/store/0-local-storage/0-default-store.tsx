import { type ThemeMode } from "@/utils";
import { RightView, type LeftViewId } from "./9-types";

export type AppUISettings = {
    themeMode: ThemeMode;
    // accordionsOpened: Record<string, boolean>;
    resizable: Record<string, string>; // PanelGroupStorage serialized layout
    leftTree: LeftViewId;
    rightView: RightView;
    themePreseetName: string;
    zoom: number;
    sidebarLeftOpen: boolean;   // main sidebar
    sidebarRightOpen: boolean;  // right inner iframe sidebar
};

export const defaultAppUISettings: AppUISettings = {
    themeMode: 'light',
    // accordionsOpened: {},
    resizable: {},
    leftTree: "cards",
    rightView: "Cards",
    themePreseetName: "dafault",
    zoom: 1,
    sidebarLeftOpen: true,
    sidebarRightOpen: true,
};
