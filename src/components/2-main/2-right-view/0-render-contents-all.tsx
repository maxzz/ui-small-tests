import { useEffect, useMemo, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { appSettings, type LeftViewId } from "@/store/0-local-storage";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn/tabs";
// import { CardsDemoWithTooltip } from "../../ui/local/8-mouse-tracker/x-nun-all-wrapper-w-tooltip";

// Mapping of demo IDs to their source file paths
const demoSourceFiles: Record<string, string> = {
    // AnimatePresence examples
    "animate-presence": "src/components/2-main/3-pages/4-motion-examples/1-animate-presence/AnimatePresence.tsx",
    "animate-presence-image-gallery": "src/components/2-main/3-pages/4-motion-examples/1-animate-presence/AnimatePresence-image-gallery.tsx",
    "animate-presence-layout-animations-siblings": "src/components/2-main/3-pages/4-motion-examples/1-animate-presence/AnimatePresence-layout-animations-siblings.tsx",
    "animate-presence-notifications-list": "src/components/2-main/3-pages/4-motion-examples/1-animate-presence/AnimatePresence-notifications-list.tsx",
    "animate-presence-notifications-list-pop": "src/components/2-main/3-pages/4-motion-examples/1-animate-presence/AnimatePresence-notifications-list-pop.tsx",
    "animate-presence-parallel-children": "src/components/2-main/3-pages/4-motion-examples/1-animate-presence/AnimatePresence-parallel-children.tsx",
    "animate-presence-siblings": "src/components/2-main/3-pages/4-motion-examples/1-animate-presence/AnimatePresence-siblings.tsx",
    "animate-presence-switch": "src/components/2-main/3-pages/4-motion-examples/1-animate-presence/AnimatePresence-switch.tsx",
    "animate-presence-variants": "src/components/2-main/3-pages/4-motion-examples/1-animate-presence/AnimatePresence-variants.tsx",
    "animate-presence-wait": "src/components/2-main/3-pages/4-motion-examples/1-animate-presence/AnimatePresence-wait.tsx",
    // Animation examples
    "animation-animate": "src/components/2-main/3-pages/4-motion-examples/2-animation/Animation-animate.tsx",
    "animation-keyframes": "src/components/2-main/3-pages/4-motion-examples/2-animation/Animation-keyframes.tsx",
    "animation-spring-css": "src/components/2-main/3-pages/4-motion-examples/2-animation/Animation-spring-css.tsx",
    "animation-stagger": "src/components/2-main/3-pages/4-motion-examples/2-animation/Animation-stagger.tsx",
    "animation-variants": "src/components/2-main/3-pages/4-motion-examples/2-animation/Animation-variants.tsx",
    "animation-css-variables": "src/components/2-main/3-pages/4-motion-examples/2-animation/Animation-CSS-variables.tsx",
    "animation-filter": "src/components/2-main/3-pages/4-motion-examples/2-animation/Animation-filter.tsx",
    "animation-height-auto-padding": "src/components/2-main/3-pages/4-motion-examples/2-animation/Animation-height-auto-padding.tsx",
    // Drag examples
    "drag-draggable": "src/components/2-main/3-pages/4-motion-examples/3-drag/Drag-draggable.tsx",
    "drag-constraints-ref": "src/components/2-main/3-pages/4-motion-examples/3-drag/Drag-constraints-ref.tsx",
    "drag-to-reorder": "src/components/2-main/3-pages/4-motion-examples/3-drag/Drag-to-reorder.tsx",
    "drag-use-drag-controls": "src/components/2-main/3-pages/4-motion-examples/3-drag/Drag-useDragControls.tsx",
    "drag-nested": "src/components/2-main/3-pages/4-motion-examples/3-drag/Drag-nested.tsx",
    // Events examples
    "events-while-hover": "src/components/2-main/3-pages/4-motion-examples/4-events/Events-whileHover.tsx",
    "events-while-tap": "src/components/2-main/3-pages/4-motion-examples/4-events/Events-whileTap.tsx",
    "events-on-tap": "src/components/2-main/3-pages/4-motion-examples/4-events/Events-onTap.tsx",
};

// Wrapper component for demos with tabs (Demo + Source Code)
function DemoWithTabs({ demoId, children }: { demoId: LeftViewId; children: React.ReactNode }) {
    const [sourceCode, setSourceCode] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const loadSourceCode = async () => {
        const filePath = demoSourceFiles[demoId];
        if (!filePath || sourceCode) return; // Don't reload if already loaded
        
        setLoading(true);
        try {
            const response = await fetch(`/${filePath}`);
            const code = await response.text();
            setSourceCode(code);
        } catch (error) {
            setSourceCode(`// Error loading source code\n// ${error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Tabs defaultValue="demo" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="demo">Demo</TabsTrigger>
                <TabsTrigger value="source" onClick={loadSourceCode}>Source Code</TabsTrigger>
            </TabsList>
            <TabsContent value="demo" className="flex-1 overflow-auto">
                {children}
            </TabsContent>
            <TabsContent value="source" className="flex-1 overflow-auto">
                <ScrollArea className="h-full">
                    {loading ? (
                        <div className="p-4">Loading...</div>
                    ) : (
                        <pre className="p-4 text-xs">
                            <code>{sourceCode}</code>
                        </pre>
                    )}
                </ScrollArea>
            </TabsContent>
        </Tabs>
    );
}

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
            return <DemoWithTabs demoId="animate-presence"><MotionExamples.AnimatePresenceDemo /></DemoWithTabs>;
        case "animate-presence-image-gallery":
            return <DemoWithTabs demoId="animate-presence-image-gallery"><MotionExamples.AnimatePresenceImageGalleryDemo /></DemoWithTabs>;
        case "animate-presence-layout-animations-siblings":
            return <DemoWithTabs demoId="animate-presence-layout-animations-siblings"><MotionExamples.AnimatePresenceLayoutAnimationsSiblingsDemo /></DemoWithTabs>;
        case "animate-presence-notifications-list":
            return <DemoWithTabs demoId="animate-presence-notifications-list"><MotionExamples.AnimatePresenceNotificationsListDemo /></DemoWithTabs>;
        case "animate-presence-notifications-list-pop":
            return <DemoWithTabs demoId="animate-presence-notifications-list-pop"><MotionExamples.AnimatePresenceNotificationsListPopDemo /></DemoWithTabs>;
        case "animate-presence-parallel-children":
            return <DemoWithTabs demoId="animate-presence-parallel-children"><MotionExamples.AnimatePresenceParallelChildrenDemo /></DemoWithTabs>;
        case "animate-presence-siblings":
            return <DemoWithTabs demoId="animate-presence-siblings"><MotionExamples.AnimatePresenceSiblingsDemo /></DemoWithTabs>;
        case "animate-presence-switch":
            return <DemoWithTabs demoId="animate-presence-switch"><MotionExamples.AnimatePresenceSwitchDemo /></DemoWithTabs>;
        case "animate-presence-variants":
            return <DemoWithTabs demoId="animate-presence-variants"><MotionExamples.AnimatePresenceVariantsDemo /></DemoWithTabs>;
        case "animate-presence-wait":
            return <DemoWithTabs demoId="animate-presence-wait"><MotionExamples.AnimatePresenceWaitDemo /></DemoWithTabs>;
        // Animation examples
        case "animation-animate":
            return <DemoWithTabs demoId="animation-animate"><MotionExamples.AnimationAnimateDemo /></DemoWithTabs>;
        case "animation-keyframes":
            return <DemoWithTabs demoId="animation-keyframes"><MotionExamples.AnimationKeyframesDemo /></DemoWithTabs>;
        case "animation-spring-css":
            return <DemoWithTabs demoId="animation-spring-css"><MotionExamples.AnimationSpringCssDemo /></DemoWithTabs>;
        case "animation-stagger":
            return <DemoWithTabs demoId="animation-stagger"><MotionExamples.AnimationStaggerDemo /></DemoWithTabs>;
        case "animation-variants":
            return <DemoWithTabs demoId="animation-variants"><MotionExamples.AnimationVariantsDemo /></DemoWithTabs>;
        case "animation-css-variables":
            return <DemoWithTabs demoId="animation-css-variables"><MotionExamples.AnimationCssVariablesDemo /></DemoWithTabs>;
        case "animation-filter":
            return <DemoWithTabs demoId="animation-filter"><MotionExamples.AnimationFilterDemo /></DemoWithTabs>;
        case "animation-height-auto-padding":
            return <DemoWithTabs demoId="animation-height-auto-padding"><MotionExamples.AnimationHeightAutoPaddingDemo /></DemoWithTabs>;
        // Drag examples
        case "drag-draggable":
            return <DemoWithTabs demoId="drag-draggable"><MotionExamples.DragDraggableDemo /></DemoWithTabs>;
        case "drag-constraints-ref":
            return <DemoWithTabs demoId="drag-constraints-ref"><MotionExamples.DragConstraintsRefDemo /></DemoWithTabs>;
        case "drag-to-reorder":
            return <DemoWithTabs demoId="drag-to-reorder"><MotionExamples.DragToReorderDemo /></DemoWithTabs>;
        case "drag-use-drag-controls":
            return <DemoWithTabs demoId="drag-use-drag-controls"><MotionExamples.DragUseDragControlsDemo /></DemoWithTabs>;
        case "drag-nested":
            return <DemoWithTabs demoId="drag-nested"><MotionExamples.DragNestedDemo /></DemoWithTabs>;
        // Events examples
        case "events-while-hover":
            return <DemoWithTabs demoId="events-while-hover"><MotionExamples.EventsWhileHoverDemo /></DemoWithTabs>;
        case "events-while-tap":
            return <DemoWithTabs demoId="events-while-tap"><MotionExamples.EventsWhileTapDemo /></DemoWithTabs>;
        case "events-on-tap":
            return <DemoWithTabs demoId="events-on-tap"><MotionExamples.EventsOnTapDemo /></DemoWithTabs>;
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
