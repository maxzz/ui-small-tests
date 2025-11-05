import { type ThemeMode } from "@/utils";
import { RightView, type NodeId } from "./9-types";

export type AppUISettings = {
    themeMode: ThemeMode;
    // accordionsOpened: Record<string, boolean>;
    leftTree: NodeId;
    rightView: RightView;
    themePreseetName: string;
    zoom: number;
};

export const defaultAppUISettings: AppUISettings = {
    themeMode: 'light',
    // accordionsOpened: {},
    leftTree: "Cards",
    rightView: "Cards",
    themePreseetName: "dafault",
    zoom: 1,
};
