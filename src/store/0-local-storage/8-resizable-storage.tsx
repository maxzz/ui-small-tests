import { type PanelGroupStorage } from "react-resizable-panels";
import { appSettings } from "@/store/0-local-storage";

export const panelsStorage: PanelGroupStorage = {
    getItem(name: string): string {
        return appSettings.appUi.resizable[name] || '';
    },
    setItem(name: string, value: string): void {
        appSettings.appUi.resizable[name] = value; // {"{\"defaultSize\":25},{\"defaultSize\":50}":{"expandToSizes":{},"layout":[50,50]}}
    }
};
