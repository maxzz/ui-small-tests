import { useEffect, useMemo, useRef } from "react";
import { useSnapshot } from "valtio";
import { appSettings } from "@/store/0-local-storage";
import { HeroTitleText } from "../2-main/2-pages/3-controls/1-hero-title-text/0-all";
import { DashboardAsIframe } from "../2-main/2-pages/2-dashboard-iframe";
import { ScrollArea } from "../ui/shadcn/scroll-area";
import { applyThemeToElement, type ThemeEditorState } from "@/store/2-apply-theme/utils";
import { getPresetThemeStyles } from "@/store/2-apply-theme";
import { CardsDemoWithTooltip } from "../2-main/2-pages/8-mouse-tracker/x-nun-all-wrapper-w-tooltip";
import { MouseMoveTrackerTooltip } from "../2-main/2-pages/8-mouse-tracker/2-mouse-tracker-tooltip";
import { CardsContents } from "../2-main/2-pages/1-demo-contents/1-cards/0-demo-contents";
import { hoverStackAtom, mousePosAtom } from "../2-main/2-pages/8-mouse-tracker/7-hover-stack-atoms";
import { MouseTracker } from "../2-main/2-pages/8-mouse-tracker/1-mouse-tracker";

export function RenderDemo() {
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
            <RenderDemoComponent />
        </div>
    );
}

function RenderDemoComponent() {
    const { leftTree } = useSnapshot(appSettings.appUi);

    const Dashboard = useMemo(
        () => {
            return <div className="size-full">
                <DashboardAsIframe />
            </div>;
        }, []
    );

    switch (leftTree) {
        case "Hero Title":
            return <HeroTitleText />;
        case "Dashboard":
            return <>{Dashboard}</>;
        case "Cards":
            return <CardsContainer />;
        default:
            return <div className="px-4 py-2 h-full text-xs text-green-950 bg-green-500/10 uppercase">Space for rent</div>;
    }
}

function CardsContainer() {
    const { zoom } = useSnapshot(appSettings.appUi);
    return (
        <ScrollArea className="size-full">
            <MouseTracker className={zoom === 0.5 ? "scale-50 origin-top-left" : "scale-100"}>
                <CardsContents />
            </MouseTracker>

            <MouseMoveTrackerTooltip hoverStackAtom={hoverStackAtom} mousePosAtom={mousePosAtom} />
        </ScrollArea>
    );
}
