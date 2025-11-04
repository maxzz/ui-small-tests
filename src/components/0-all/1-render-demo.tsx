import { useEffect, useMemo, useRef } from "react";
import { useSnapshot } from "valtio";
import { appSettings } from "@/store/0-local-storage";
import { HeroTitleText } from "../2-main/2-pages/3-controls/1-hero-title-text/0-all";
import { Demo_Dashboard } from "../2-main/2-pages/2-dashboard";
import { ScrollArea } from "../ui/shadcn/scroll-area";
import { applyThemeToElement, type ThemeEditorState } from "@/store/2-apply-theme/utils";
import { getPresetThemeStyles } from "@/store/2-apply-theme";
import { CardsDemoWithTooltip } from "../2-main/2-pages/8-mouse-tracker/1-all-wrapper-w-tooltip";
import { CardsDemoWithState } from "../2-main/2-pages/8-mouse-tracker/2-all-wrapper-w-state";
import { DemoContents } from "../2-main/2-pages/1-cards/0-demo-contents";

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
        <div ref={demoRef} className="@container min-h-0 px-4 py-3 bg-gray-100 1scale-50 origin-top-left">
            <RenderDemoComponent />
        </div>
    );
}

function RenderDemoComponent() {
    const { leftTree } = useSnapshot(appSettings.appUi);

    const Dashboard = useMemo(
        () => {
            return <div className="size-full">
                <Demo_Dashboard />
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
    return (
        <ScrollArea className="size-full bg-pink-100">
            {/* 
            <CardsDemoWithTooltip>
                <DemoContents />
            </CardsDemoWithTooltip>
             */}

            <CardsDemoWithState>
                <DemoContents />
            </CardsDemoWithState>
        </ScrollArea>
    );
}
