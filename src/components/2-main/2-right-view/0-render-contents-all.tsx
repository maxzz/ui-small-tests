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
import { RootComponents } from "../3-pages/shadcn-frontpage";
import { MotionVariantsRace } from "./3-motion-variants-race";
import * as MotionExamples from "../3-pages/4-motion-examples";
// import { CardsDemoWithTooltip } from "../../ui/local/8-mouse-tracker/x-nun-all-wrapper-w-tooltip";

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
            <LeftViewChildren />
        </div>
    );
}

function LeftViewChildren() {
    const { leftTree } = useSnapshot(appSettings.appUi);

    const Dashboard = useMemo(
        () => {
            return <div className="size-full">
                <DashboardAsIframe />
            </div>;
        }, []
    );

    switch (leftTree) {
        case "cards":
            return <RightViewWithMouseTracking />;
        case "dashboard":
            return <>{Dashboard}</>;
        case "hero-text":
            return <HeroTitleText />;
        case "listview":
            return <UserItemList />;
        case "motion-variants-race":
            return <MotionVariantsRace />;
        // AnimatePresence examples
        case "animate-presence":
            return <MotionExamples.AnimatePresenceDemo />;
        case "animate-presence-image-gallery":
            return <MotionExamples.AnimatePresenceImageGalleryDemo />;
        case "animate-presence-layout-animations-siblings":
            return <MotionExamples.AnimatePresenceLayoutAnimationsSiblingsDemo />;
        case "animate-presence-notifications-list":
            return <MotionExamples.AnimatePresenceNotificationsListDemo />;
        case "animate-presence-notifications-list-pop":
            return <MotionExamples.AnimatePresenceNotificationsListPopDemo />;
        case "animate-presence-parallel-children":
            return <MotionExamples.AnimatePresenceParallelChildrenDemo />;
        case "animate-presence-siblings":
            return <MotionExamples.AnimatePresenceSiblingsDemo />;
        case "animate-presence-switch":
            return <MotionExamples.AnimatePresenceSwitchDemo />;
        case "animate-presence-variants":
            return <MotionExamples.AnimatePresenceVariantsDemo />;
        case "animate-presence-wait":
            return <MotionExamples.AnimatePresenceWaitDemo />;
        // Animation examples
        case "animation-animate":
            return <MotionExamples.AnimationAnimateDemo />;
        case "animation-keyframes":
            return <MotionExamples.AnimationKeyframesDemo />;
        case "animation-spring-css":
            return <MotionExamples.AnimationSpringCssDemo />;
        case "animation-stagger":
            return <MotionExamples.AnimationStaggerDemo />;
        case "animation-variants":
            return <MotionExamples.AnimationVariantsDemo />;
        case "animation-css-variables":
            return <MotionExamples.AnimationCssVariablesDemo />;
        case "animation-filter":
            return <MotionExamples.AnimationFilterDemo />;
        case "animation-height-auto-padding":
            return <MotionExamples.AnimationHeightAutoPaddingDemo />;
        // Drag examples
        case "drag-draggable":
            return <MotionExamples.DragDraggableDemo />;
        case "drag-constraints-ref":
            return <MotionExamples.DragConstraintsRefDemo />;
        case "drag-to-reorder":
            return <MotionExamples.DragToReorderDemo />;
        case "drag-use-drag-controls":
            return <MotionExamples.DragUseDragControlsDemo />;
        case "drag-nested":
            return <MotionExamples.DragNestedDemo />;
        // Events examples
        case "events-while-hover":
            return <MotionExamples.EventsWhileHoverDemo />;
        case "events-while-tap":
            return <MotionExamples.EventsWhileTapDemo />;
        case "events-on-tap":
            return <MotionExamples.EventsOnTapDemo />;
        case "not-yet":
            return <div className="px-4 py-2 h-full text-xs text-green-950 bg-green-500/10 uppercase">Space for rent</div>;
        default: {
            const _exhaustiveCheck: never = leftTree;
            return null;
        }
    }
}

function RightViewWithMouseTracking() {
    const { zoom, rightView } = useSnapshot(appSettings.appUi);
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
    const { rightView } = useSnapshot(appSettings.appUi);
    switch (rightView) {
        case "simple-cards":
            return <CardsContents />;
        case "simple-dashboard":
            return <DashboardContents className="col-span-full" />;
        case "original-cards":
            return <RootComponents className="col-span-full" />;
        case "motion-variants-race":
            return <MotionVariantsRace />;
        // AnimatePresence examples
        case "animate-presence":
            return <MotionExamples.AnimatePresenceDemo />;
        case "animate-presence-image-gallery":
            return <MotionExamples.AnimatePresenceImageGalleryDemo />;
        case "animate-presence-layout-animations-siblings":
            return <MotionExamples.AnimatePresenceLayoutAnimationsSiblingsDemo />;
        case "animate-presence-notifications-list":
            return <MotionExamples.AnimatePresenceNotificationsListDemo />;
        case "animate-presence-notifications-list-pop":
            return <MotionExamples.AnimatePresenceNotificationsListPopDemo />;
        case "animate-presence-parallel-children":
            return <MotionExamples.AnimatePresenceParallelChildrenDemo />;
        case "animate-presence-siblings":
            return <MotionExamples.AnimatePresenceSiblingsDemo />;
        case "animate-presence-switch":
            return <MotionExamples.AnimatePresenceSwitchDemo />;
        case "animate-presence-variants":
            return <MotionExamples.AnimatePresenceVariantsDemo />;
        case "animate-presence-wait":
            return <MotionExamples.AnimatePresenceWaitDemo />;
        // Animation examples
        case "animation-animate":
            return <MotionExamples.AnimationAnimateDemo />;
        case "animation-keyframes":
            return <MotionExamples.AnimationKeyframesDemo />;
        case "animation-spring-css":
            return <MotionExamples.AnimationSpringCssDemo />;
        case "animation-stagger":
            return <MotionExamples.AnimationStaggerDemo />;
        case "animation-variants":
            return <MotionExamples.AnimationVariantsDemo />;
        case "animation-css-variables":
            return <MotionExamples.AnimationCssVariablesDemo />;
        case "animation-filter":
            return <MotionExamples.AnimationFilterDemo />;
        case "animation-height-auto-padding":
            return <MotionExamples.AnimationHeightAutoPaddingDemo />;
        // Drag examples
        case "drag-draggable":
            return <MotionExamples.DragDraggableDemo />;
        case "drag-constraints-ref":
            return <MotionExamples.DragConstraintsRefDemo />;
        case "drag-to-reorder":
            return <MotionExamples.DragToReorderDemo />;
        case "drag-use-drag-controls":
            return <MotionExamples.DragUseDragControlsDemo />;
        case "drag-nested":
            return <MotionExamples.DragNestedDemo />;
        // Events examples
        case "events-while-hover":
            return <MotionExamples.EventsWhileHoverDemo />;
        case "events-while-tap":
            return <MotionExamples.EventsWhileTapDemo />;
        case "events-on-tap":
            return <MotionExamples.EventsOnTapDemo />;
        default: {
            const _exhaustiveCheck: never = rightView;
            return null;
        }
    }
}
