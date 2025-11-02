import { type ThemeMode } from "@/utils";
import { type NodeId } from "./1-left-view";

export type AppUISettings = {
    themeMode: ThemeMode;
    // accordionsOpened: Record<string, boolean>;
    leftTree: NodeId;
    themePreseetName: string;
    zoom: number;
};

export const defaultAppUISettings: AppUISettings = {
    themeMode: 'light',
    // accordionsOpened: {},
    leftTree: "Cards",
    themePreseetName: "dafault",
    zoom: 1,
};
