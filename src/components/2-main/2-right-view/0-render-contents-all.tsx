import { useEffect, useMemo, useRef } from "react";
import { useSnapshot } from "valtio";
import { appSettings } from "@/store/0-local-storage";
import { getPresetThemeStyles } from "@/store/2-apply-theme";
import { applyThemeToElement, type ThemeEditorState } from "@/store/2-apply-theme/utils";
import { ScrollArea } from "../../ui/shadcn/scroll-area";

import { UserItemList } from "../3-pages/3-controls/2-listview-commands/1-users-list";
import { DashboardContents } from "./20-dashboard-contents";
import { RootComponents } from "../3-pages/shadcn-frontpage";
import { MotionVariantsRace } from "./30-motion-variants-race";
import { CardsContents } from "./10-cards-contents";
// import { CardsDemoWithTooltip } from "../../ui/local/8-mouse-tracker/x-nun-all-wrapper-w-tooltip";
import { hoverStackAtom, MouseMoveTrackerTooltip, mousePosAtom, MouseTracker } from "@/components/ui/local/8-mouse-tracker";
import { HeroTitleText } from "../3-pages/3-controls/1-effect-hero-title/0-all";
import { DashboardAsIframe } from "../3-pages/2-dashboard-iframe";

import { MotionExampleRenderer, isMotionExampleId } from "../3-pages/4-motion-examples/motion-examples-render";

export function Section2_RenderContents() {
    const { themePreseetName } = useSnapshot(appSettings.appUi);
    const demoRef = useRef<HTMLDivElement>(null);

    useEffect(
        () => {
            if (!demoRef.current) {
                return;
            }

            const styles = getPresetThemeStyles(themePreseetName);
            const theseState: ThemeEditorState = {
                styles,
                currentMode: "light",
            };

            applyThemeToElement(theseState, demoRef.current);
        }, [themePreseetName]
    );

    return (
        <div ref={demoRef} className="@container min-h-0">
            <RightView />
        </div>
    );
}

function RightView() {
    const { leftTree } = useSnapshot(appSettings.appUi);

    const Dashboard = useMemo(
        () => {
            return <div className="size-full">
                <DashboardAsIframe />
            </div>;
        }, []
    );

    if (isMotionExampleId(leftTree)) {
        return <MotionExampleRenderer viewId={leftTree} />;
    }

    switch (leftTree) {
        case "cards": return <RightViewWithMouseTracking />;
        case "dashboard": return <>{Dashboard}</>;
        case "hero-text": return <HeroTitleText />;
        case "listview": return <UserItemList />;
        case "motion-variants-race": return <MotionVariantsRace />;
        
        case "not-yet":
            return <div className="px-4 py-2 h-full text-xs text-green-950 bg-green-500/10 uppercase">Space for rent</div>;
        default: {
            const _exhaustiveCheck: never = leftTree;
            return null;
        }
    }
}

function RightViewWithMouseTracking() {
    const { zoom } = useSnapshot(appSettings.appUi);
    return (
        <ScrollArea className="size-full">
            <MouseTracker className={zoom === 0.5 ? "scale-50 origin-top-left" : "scale-100"}>
                <RightViewChildren />
            </MouseTracker>

            <MouseMoveTrackerTooltip hoverStackAtom={hoverStackAtom} mousePosAtom={mousePosAtom} />
        </ScrollArea>
    );
}

function RightViewChildren() {
    const { rightSubView: rightView } = useSnapshot(appSettings.appUi);

    if (isMotionExampleId(rightView)) {
        return <MotionExampleRenderer viewId={rightView} />;
    }

    switch (rightView) {
        case "simple-cards":
            return <CardsContents />;
        case "simple-dashboard":
            return <DashboardContents className="col-span-full" />;
        case "original-cards":
            return <RootComponents className="col-span-full" />;
        case "motion-variants-race":
            return <MotionVariantsRace />;
        
        default: {
            const _exhaustiveCheck: never = rightView;
            return null;
        }
    }
}
