import { type HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { appSettings } from "@/store/0-local-storage";
import { Button } from "../ui/shadcn/button";
import { themeNamesAtom } from "@/store/2-apply-theme";
import { SelectPatrs } from "./3-header-toolbar-select-parts";
import { SelectTheme } from "./4-header-toolbar-select-theme";
//import { TestTargetWindowPositionWReset } from "../ui/local/3-test-target-position-w-reset";

export function HeaderToolbar({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const { themePreseetName } = useSnapshot(appSettings.appUi);
    const themeNames = useAtomValue(themeNamesAtom);

    return (
        <div className={classNames("text-xs flex items-center gap-2", className)} {...rest}>
            <Button size="sm" variant="outline" className="px-2 h-7! text-xs" onClick={() => appSettings.appUi.zoom = appSettings.appUi.zoom === 1 ? 0.5 : 1}>
                Zoom
            </Button>

            {/* <TestTargetWindowPositionWReset className="block ml-2 align-middle" style={{ zIndex: 9999 }} /> */}

            <SelectPatrs />
            <SelectTheme />
        </div>
    );
}
