import { useEffect, useMemo, useRef } from "react";
import { useSnapshot } from "valtio";
import { appSettings } from "@/store/0-local-storage";
import { getPresetThemeStyles } from "@/store/2-apply-theme";
import { applyThemeToElement, type ThemeEditorState } from "@/store/2-apply-theme/utils";
import { ScrollArea } from "../../ui/shadcn/scroll-area";
import { HeroTitleText } from "../3-pages/3-controls/1-effect-hero-title/0-all";
import { DashboardAsIframe } from "../3-pages/2-dashboard-iframe";
import { CardsContents } from "./1-cards-contents";
import { DashboardContents } from "./2-dashboard-contents";
import { hoverStackAtom, MouseMoveTrackerTooltip, mousePosAtom, MouseTracker } from "@/components/ui/local/8-mouse-tracker";
import { UserItemList } from "../3-pages/3-controls/2-listview-commands/1-users-list";
// import { CardsDemoWithTooltip } from "../../ui/local/8-mouse-tracker/x-nun-all-wrapper-w-tooltip";

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
        case "hero-text":
            return <HeroTitleText />;
        case "dashboard":
            return <>{Dashboard}</>;
        case "cards":
            return <CardsContainer />;
        case "listview":
            return <UserItemList />;
        default:
            return <div className="px-4 py-2 h-full text-xs text-green-950 bg-green-500/10 uppercase">Space for rent</div>;
    }
}

function CardsContainer() {
    const { zoom, rightView } = useSnapshot(appSettings.appUi);
    return (
        <ScrollArea className="size-full">
            {rightView === "Cards"
                ? (<>
                    <MouseTracker className={zoom === 0.5 ? "scale-50 origin-top-left" : "scale-100"}>
                        <CardsContents />
                    </MouseTracker>

                    <MouseMoveTrackerTooltip hoverStackAtom={hoverStackAtom} mousePosAtom={mousePosAtom} />
                </>)
                : (
                    <DashboardContents />
                )
            }
        </ScrollArea>
    );
}
