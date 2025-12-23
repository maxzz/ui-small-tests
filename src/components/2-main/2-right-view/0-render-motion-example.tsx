import { ScrollArea } from "../../ui/shadcn/scroll-area";
import * as MotionExamples from "../3-pages/4-motion-examples";
import { demoSourceCodes } from "../3-pages/4-motion-examples/source-codes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn/tabs";
import { highlightTsxCode } from "@/utils/syntax-highlight-tsx";
import { MotionExampleId } from "@/store/0-local-storage";

// Wrapper component for demos with tabs (Demo + Source Code)
export function DemoWithTabs({ demoId, children }: { demoId: string; children: React.ReactNode; }) {
    const sourceCode = demoSourceCodes[demoId as keyof typeof demoSourceCodes];
    const isMissing = !sourceCode;

    // Debug info header
    const debugInfo = `// [DEBUG INFO]
// Requested Demo ID: "${demoId}"
// Found in map: ${isMissing ? "NO" : "YES"}
// Content type: ${typeof sourceCode}
// Content length: ${sourceCode?.length || 0}
// Content preview: ${sourceCode?.slice(0, 50).replace(/\n/g, '\\n')}...
// ----------------------------------------
`;

    const displayCode = isMissing
        ? `${debugInfo}\n// Available keys:\n// ${Object.keys(demoSourceCodes).filter(k => k.includes(demoId.split('-')[0])).join('\n// ')}`
        : `${debugInfo}\n${sourceCode}`;

    return (
        <Tabs defaultValue="demo" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-2 mx-2 mt-1">
                <TabsTrigger value="demo">Demo</TabsTrigger>
                <TabsTrigger value="source">Source Code</TabsTrigger>
            </TabsList>
            <TabsContent value="demo" className="flex-1 overflow-auto mt-0">
                {children}
            </TabsContent>
            <TabsContent value="source" className="flex-1 overflow-auto mt-0">
                <ScrollArea className="h-full">
                    <pre className="p-4 text-xs font-mono bg-muted/30 leading-relaxed">
                        <code>{highlightTsxCode(displayCode)}</code>
                    </pre>
                </ScrollArea>
            </TabsContent>
        </Tabs>
    );
}

export function MotionExampleRenderer({ viewId }: { viewId: string }) {
    // Type guard to check if viewId is a MotionExampleId could be useful, 
    // but for now we just switch on the string.
    
    switch (viewId) {
        // AnimatePresence examples
        case "animate-presence": return <DemoWithTabs demoId="animate-presence"><MotionExamples.AnimatePresenceDemo /></DemoWithTabs>;
        case "animate-presence-image-gallery": return <DemoWithTabs demoId="animate-presence-image-gallery"><MotionExamples.AnimatePresenceImageGalleryDemo /></DemoWithTabs>;
        case "animate-presence-layout-animations-siblings": return <DemoWithTabs demoId="animate-presence-layout-animations-siblings"><MotionExamples.AnimatePresenceLayoutAnimationsSiblingsDemo /></DemoWithTabs>;
        case "animate-presence-notifications-list": return <DemoWithTabs demoId="animate-presence-notifications-list"><MotionExamples.AnimatePresenceNotificationsListDemo /></DemoWithTabs>;
        case "animate-presence-notifications-list-pop": return <DemoWithTabs demoId="animate-presence-notifications-list-pop"><MotionExamples.AnimatePresenceNotificationsListPopDemo /></DemoWithTabs>;
        case "animate-presence-parallel-children": return <DemoWithTabs demoId="animate-presence-parallel-children"><MotionExamples.AnimatePresenceParallelChildrenDemo /></DemoWithTabs>;
        case "animate-presence-siblings": return <DemoWithTabs demoId="animate-presence-siblings"><MotionExamples.AnimatePresenceSiblingsDemo /></DemoWithTabs>;
        case "animate-presence-switch": return <DemoWithTabs demoId="animate-presence-switch"><MotionExamples.AnimatePresenceSwitchDemo /></DemoWithTabs>;
        case "animate-presence-variants": return <DemoWithTabs demoId="animate-presence-variants"><MotionExamples.AnimatePresenceVariantsDemo /></DemoWithTabs>;
        case "animate-presence-wait": return <DemoWithTabs demoId="animate-presence-wait"><MotionExamples.AnimatePresenceWaitDemo /></DemoWithTabs>;
        // Animation examples
        case "animation-animate": return <DemoWithTabs demoId="animation-animate"><MotionExamples.AnimationAnimateDemo /></DemoWithTabs>;
        case "animation-keyframes": return <DemoWithTabs demoId="animation-keyframes"><MotionExamples.AnimationKeyframesDemo /></DemoWithTabs>;
        case "animation-spring-css": return <DemoWithTabs demoId="animation-spring-css"><MotionExamples.AnimationSpringCssDemo /></DemoWithTabs>;
        case "animation-stagger": return <DemoWithTabs demoId="animation-stagger"><MotionExamples.AnimationStaggerDemo /></DemoWithTabs>;
        case "animation-variants": return <DemoWithTabs demoId="animation-variants"><MotionExamples.AnimationVariantsDemo /></DemoWithTabs>;
        case "animation-css-variables": return <DemoWithTabs demoId="animation-css-variables"><MotionExamples.AnimationCssVariablesDemo /></DemoWithTabs>;
        case "animation-filter": return <DemoWithTabs demoId="animation-filter"><MotionExamples.AnimationFilterDemo /></DemoWithTabs>;
        case "animation-height-auto-padding": return <DemoWithTabs demoId="animation-height-auto-padding"><MotionExamples.AnimationHeightAutoPaddingDemo /></DemoWithTabs>;
        // New Animation
        case "animation-batch-read-writes": return <DemoWithTabs demoId="animation-batch-read-writes"><MotionExamples.AnimationBatchReadWritesDemo /></DemoWithTabs>;
        case "animation-between-value-types": return <DemoWithTabs demoId="animation-between-value-types"><MotionExamples.AnimationBetweenValueTypesDemo /></DemoWithTabs>;
        case "animation-between-value-types-x": return <DemoWithTabs demoId="animation-between-value-types-x"><MotionExamples.AnimationBetweenValueTypesXDemo /></DemoWithTabs>;
        case "animation-box-shadow": return <DemoWithTabs demoId="animation-box-shadow"><MotionExamples.AnimationBoxShadowDemo /></DemoWithTabs>;
        case "animation-cleanup": return <DemoWithTabs demoId="animation-cleanup"><MotionExamples.AnimationCleanupDemo /></DemoWithTabs>;
        case "animation-display-visibility": return <DemoWithTabs demoId="animation-display-visibility"><MotionExamples.AnimationDisplayVisibilityDemo /></DemoWithTabs>;
        case "animation-height-auto-display-none": return <DemoWithTabs demoId="animation-height-auto-display-none"><MotionExamples.AnimationHeightAutoDisplayNoneDemo /></DemoWithTabs>;
        case "animation-height-auto-rotate-scale": return <DemoWithTabs demoId="animation-height-auto-rotate-scale"><MotionExamples.AnimationHeightAutoRotateScaleDemo /></DemoWithTabs>;
        case "animation-layout-delay-children": return <DemoWithTabs demoId="animation-layout-delay-children"><MotionExamples.AnimationLayoutDelayChildrenDemo /></DemoWithTabs>;
        case "animation-layout-nested-position": return <DemoWithTabs demoId="animation-layout-nested-position"><MotionExamples.AnimationLayoutNestedPositionDemo /></DemoWithTabs>;
        case "animation-layout-scale-correction": return <DemoWithTabs demoId="animation-layout-scale-correction"><MotionExamples.AnimationLayoutScaleCorrectionDemo /></DemoWithTabs>;
        case "animation-layout-separate-children": return <DemoWithTabs demoId="animation-layout-separate-children"><MotionExamples.AnimationLayoutSeparateChildrenDemo /></DemoWithTabs>;
        case "animation-layout-size": return <DemoWithTabs demoId="animation-layout-size"><MotionExamples.AnimationLayoutSizeDemo /></DemoWithTabs>;
        case "animation-layout-text-size": return <DemoWithTabs demoId="animation-layout-text-size"><MotionExamples.AnimationLayoutTextSizeDemo /></DemoWithTabs>;
        case "animation-layout-transform-template": return <DemoWithTabs demoId="animation-layout-transform-template"><MotionExamples.AnimationLayoutTransformTemplateDemo /></DemoWithTabs>;
        case "animation-layout-update-stress": return <DemoWithTabs demoId="animation-layout-update-stress"><MotionExamples.AnimationLayoutUpdateStressDemo /></DemoWithTabs>;
        case "animation-repeat-spring": return <DemoWithTabs demoId="animation-repeat-spring"><MotionExamples.AnimationRepeatSpringDemo /></DemoWithTabs>;
        case "animation-reverse": return <DemoWithTabs demoId="animation-reverse"><MotionExamples.AnimationReverseDemo /></DemoWithTabs>;
        case "animation-stagger-custom": return <DemoWithTabs demoId="animation-stagger-custom"><MotionExamples.AnimationStaggerCustomDemo /></DemoWithTabs>;
        case "animation-stress-mount": return <DemoWithTabs demoId="animation-stress-mount"><MotionExamples.AnimationStressMountDemo /></DemoWithTabs>;
        case "animation-transition-tween": return <DemoWithTabs demoId="animation-transition-tween"><MotionExamples.AnimationTransitionTweenDemo /></DemoWithTabs>;
        case "animation-use-animate-initial-transform": return <DemoWithTabs demoId="animation-use-animate-initial-transform"><MotionExamples.AnimationUseAnimateInitialTransformDemo /></DemoWithTabs>;

        // Drag examples
        case "drag-draggable": return <DemoWithTabs demoId="drag-draggable"><MotionExamples.DragDraggableDemo /></DemoWithTabs>;
        case "drag-constraints-ref": return <DemoWithTabs demoId="drag-constraints-ref"><MotionExamples.DragConstraintsRefDemo /></DemoWithTabs>;
        case "drag-to-reorder": return <DemoWithTabs demoId="drag-to-reorder"><MotionExamples.DragToReorderDemo /></DemoWithTabs>;
        case "drag-use-drag-controls": return <DemoWithTabs demoId="drag-use-drag-controls"><MotionExamples.DragUseDragControlsDemo /></DemoWithTabs>;
        case "drag-nested": return <DemoWithTabs demoId="drag-nested"><MotionExamples.DragNestedDemo /></DemoWithTabs>;
        // New Drag
        case "drag-block-viewport-conditionally": return <DemoWithTabs demoId="drag-block-viewport-conditionally"><MotionExamples.DragBlockViewportConditionallyDemo /></DemoWithTabs>;
        case "drag-constraints-ref-small-container": return <DemoWithTabs demoId="drag-constraints-ref-small-container"><MotionExamples.DragConstraintsRefSmallContainerDemo /></DemoWithTabs>;
        case "drag-constraints-ref-small-container-layout": return <DemoWithTabs demoId="drag-constraints-ref-small-container-layout"><MotionExamples.DragConstraintsRefSmallContainerLayoutDemo /></DemoWithTabs>;
        case "drag-constraints-relative": return <DemoWithTabs demoId="drag-constraints-relative"><MotionExamples.DragConstraintsRelativeDemo /></DemoWithTabs>;
        case "drag-constraints-resize": return <DemoWithTabs demoId="drag-constraints-resize"><MotionExamples.DragConstraintsResizeDemo /></DemoWithTabs>;
        case "drag-external-handlers": return <DemoWithTabs demoId="drag-external-handlers"><MotionExamples.DragExternalHandlersDemo /></DemoWithTabs>;
        case "drag-shared-layout": return <DemoWithTabs demoId="drag-shared-layout"><MotionExamples.DragSharedLayoutDemo /></DemoWithTabs>;
        case "drag-svg": return <DemoWithTabs demoId="drag-svg"><MotionExamples.DragSvgDemo /></DemoWithTabs>;
        case "drag-use-drag-controls-snap-to-cursor": return <DemoWithTabs demoId="drag-use-drag-controls-snap-to-cursor"><MotionExamples.DragUseDragControlsSnapToCursorDemo /></DemoWithTabs>;

        // Events examples
        case "events-while-hover": return <DemoWithTabs demoId="events-while-hover"><MotionExamples.EventsWhileHoverDemo /></DemoWithTabs>;
        case "events-while-tap": return <DemoWithTabs demoId="events-while-tap"><MotionExamples.EventsWhileTapDemo /></DemoWithTabs>;
        case "events-on-tap": return <DemoWithTabs demoId="events-on-tap"><MotionExamples.EventsOnTapDemo /></DemoWithTabs>;
        // New Events
        case "events-pan": return <DemoWithTabs demoId="events-pan"><MotionExamples.EventsPanDemo /></DemoWithTabs>;
        case "events-while-focus": return <DemoWithTabs demoId="events-while-focus"><MotionExamples.EventsWhileFocusDemo /></DemoWithTabs>;
        case "events-while-focus-variants": return <DemoWithTabs demoId="events-while-focus-variants"><MotionExamples.EventsWhileFocusVariantsDemo /></DemoWithTabs>;
        case "events-while-hover-unit-conversion": return <DemoWithTabs demoId="events-while-hover-unit-conversion"><MotionExamples.EventsWhileHoverUnitConversionDemo /></DemoWithTabs>;
        case "events-while-tap-cancel-on-scroll": return <DemoWithTabs demoId="events-while-tap-cancel-on-scroll"><MotionExamples.EventsWhileTapCancelOnScrollDemo /></DemoWithTabs>;
        case "events-while-tap-global": return <DemoWithTabs demoId="events-while-tap-global"><MotionExamples.EventsWhileTapGlobalDemo /></DemoWithTabs>;
        case "events-while-tap-variants": return <DemoWithTabs demoId="events-while-tap-variants"><MotionExamples.EventsWhileTapVariantsDemo /></DemoWithTabs>;

        // Layout examples
        case "layout-rotate": return <DemoWithTabs demoId="layout-rotate"><MotionExamples.LayoutRotateDemo /></DemoWithTabs>;
        case "layout-skew": return <DemoWithTabs demoId="layout-skew"><MotionExamples.LayoutSkewDemo /></DemoWithTabs>;
        case "layout-projection-scale-position": return <DemoWithTabs demoId="layout-projection-scale-position"><MotionExamples.LayoutProjectionScalePositionDemo /></DemoWithTabs>;
        // New Layout
        case "layout-projection-correct-style-border-radius": return <DemoWithTabs demoId="layout-projection-correct-style-border-radius"><MotionExamples.LayoutProjectionCorrectStyleBorderRadiusDemo /></DemoWithTabs>;
        case "layout-projection-custom-values": return <DemoWithTabs demoId="layout-projection-custom-values"><MotionExamples.LayoutProjectionCustomValuesDemo /></DemoWithTabs>;
        case "layout-projection-scale-correction-border-radius": return <DemoWithTabs demoId="layout-projection-scale-correction-border-radius"><MotionExamples.LayoutProjectionScaleCorrectionBorderRadiusDemo /></DemoWithTabs>;
        case "layout-projection-scale-correction-shadow": return <DemoWithTabs demoId="layout-projection-scale-correction-shadow"><MotionExamples.LayoutProjectionScaleCorrectionShadowDemo /></DemoWithTabs>;
        case "layout-projection-scale-size": return <DemoWithTabs demoId="layout-projection-scale-size"><MotionExamples.LayoutProjectionScaleSizeDemo /></DemoWithTabs>;
        case "layout-svg": return <DemoWithTabs demoId="layout-svg"><MotionExamples.LayoutSvgDemo /></DemoWithTabs>;

        // Shared Layout examples
        case "shared-layout-continuity": return <DemoWithTabs demoId="shared-layout-continuity"><MotionExamples.SharedLayoutContinuityDemo /></DemoWithTabs>;
        case "shared-layout-lightbox": return <DemoWithTabs demoId="shared-layout-lightbox"><MotionExamples.SharedLayoutLightboxDemo /></DemoWithTabs>;
        case "shared-layout-lists": return <DemoWithTabs demoId="shared-layout-lists"><MotionExamples.SharedLayoutListsDemo /></DemoWithTabs>;
        case "shared-layout-toggle-details": return <DemoWithTabs demoId="shared-layout-toggle-details"><MotionExamples.SharedLayoutToggleDetailsDemo /></DemoWithTabs>;
        // New Shared Layout
        case "shared-layout-continuity-crossfade": return <DemoWithTabs demoId="shared-layout-continuity-crossfade"><MotionExamples.SharedLayoutContinuityCrossfadeDemo /></DemoWithTabs>;
        case "shared-layout-lightbox-crossfade": return <DemoWithTabs demoId="shared-layout-lightbox-crossfade"><MotionExamples.SharedLayoutLightboxCrossfadeDemo /></DemoWithTabs>;
        case "shared-layout-motion-value-continuity": return <DemoWithTabs demoId="shared-layout-motion-value-continuity"><MotionExamples.SharedLayoutMotionValueContinuityDemo /></DemoWithTabs>;
        case "shared-layout-nested-inset-elements": return <DemoWithTabs demoId="shared-layout-nested-inset-elements"><MotionExamples.SharedLayoutNestedInsetElementsDemo /></DemoWithTabs>;
        case "shared-layout-nested-inset-elements-no-layout": return <DemoWithTabs demoId="shared-layout-nested-inset-elements-no-layout"><MotionExamples.SharedLayoutNestedInsetElementsNoLayoutDemo /></DemoWithTabs>;
        case "shared-layout-reparenting": return <DemoWithTabs demoId="shared-layout-reparenting"><MotionExamples.SharedLayoutReparentingDemo /></DemoWithTabs>;
        case "shared-layout-reparenting-transform-template": return <DemoWithTabs demoId="shared-layout-reparenting-transform-template"><MotionExamples.SharedLayoutReparentingTransformTemplateDemo /></DemoWithTabs>;
        case "shared-layout-rotate": return <DemoWithTabs demoId="shared-layout-rotate"><MotionExamples.SharedLayoutRotateDemo /></DemoWithTabs>;
        case "shared-layout-sibling-to-child": return <DemoWithTabs demoId="shared-layout-sibling-to-child"><MotionExamples.SharedLayoutSiblingToChildDemo /></DemoWithTabs>;
        case "shared-layout-skew": return <DemoWithTabs demoId="shared-layout-skew"><MotionExamples.SharedLayoutSkewDemo /></DemoWithTabs>;

        // SVG examples
        case "svg-path": return <DemoWithTabs demoId="svg-path"><MotionExamples.SvgPathDemo /></DemoWithTabs>;
        case "svg-layout-animation": return <DemoWithTabs demoId="svg-layout-animation"><MotionExamples.SvgLayoutAnimationDemo /></DemoWithTabs>;
        // New SVG
        case "svg-motion-value": return <DemoWithTabs demoId="svg-motion-value"><MotionExamples.SvgMotionValueDemo /></DemoWithTabs>;
        case "svg-text-motion-value-child": return <DemoWithTabs demoId="svg-text-motion-value-child"><MotionExamples.SvgTextMotionValueChildDemo /></DemoWithTabs>;
        case "svg-transform": return <DemoWithTabs demoId="svg-transform"><MotionExamples.SvgTransformDemo /></DemoWithTabs>;
        case "svg-without-initial-values": return <DemoWithTabs demoId="svg-without-initial-values"><MotionExamples.SvgWithoutInitialValuesDemo /></DemoWithTabs>;

        // Hooks examples
        case "hooks-use-scroll": return <DemoWithTabs demoId="hooks-use-scroll"><MotionExamples.HooksUseScrollDemo /></DemoWithTabs>;
        case "hooks-use-spring": return <DemoWithTabs demoId="hooks-use-spring"><MotionExamples.HooksUseSpringDemo /></DemoWithTabs>;
        case "hooks-use-animation": return <DemoWithTabs demoId="hooks-use-animation"><MotionExamples.HooksUseAnimationDemo /></DemoWithTabs>;
        // New Hooks
        case "hooks-use-animated-state": return <DemoWithTabs demoId="hooks-use-animated-state"><MotionExamples.HooksUseAnimatedStateDemo /></DemoWithTabs>;
        case "hooks-use-instant-transition": return <DemoWithTabs demoId="hooks-use-instant-transition"><MotionExamples.HooksUseInstantTransitionDemo /></DemoWithTabs>;
        case "hooks-use-presence": return <DemoWithTabs demoId="hooks-use-presence"><MotionExamples.HooksUsePresenceDemo /></DemoWithTabs>;
        case "hooks-use-reduced-motion": return <DemoWithTabs demoId="hooks-use-reduced-motion"><MotionExamples.HooksUseReducedMotionDemo /></DemoWithTabs>;
        case "hooks-use-transform-with-use-layout-effect": return <DemoWithTabs demoId="hooks-use-transform-with-use-layout-effect"><MotionExamples.HooksUseTransformWithUseLayoutEffectDemo /></DemoWithTabs>;
        case "hooks-use-velocity": return <DemoWithTabs demoId="hooks-use-velocity"><MotionExamples.HooksUseVelocityDemo /></DemoWithTabs>;
        case "hooks-use-viewport-scroll": return <DemoWithTabs demoId="hooks-use-viewport-scroll"><MotionExamples.HooksUseViewportScrollDemo /></DemoWithTabs>;

        // WAAPI examples
        case "waapi-background-color": return <DemoWithTabs demoId="waapi-background-color"><MotionExamples.WaapiBackgroundColorDemo /></DemoWithTabs>;
        case "waapi-opacity": return <DemoWithTabs demoId="waapi-opacity"><MotionExamples.WaapiOpacityDemo /></DemoWithTabs>;
        // New WAAPI
        case "waapi-interrupt": return <DemoWithTabs demoId="waapi-interrupt"><MotionExamples.WaapiInterruptDemo /></DemoWithTabs>;
        case "waapi-opacity-orchestration": return <DemoWithTabs demoId="waapi-opacity-orchestration"><MotionExamples.WaapiOpacityOrchestrationDemo /></DemoWithTabs>;

        // Misc examples
        case "misc-motion-custom-tag": return <DemoWithTabs demoId="misc-motion-custom-tag"><MotionExamples.MotionCustomTagDemo /></DemoWithTabs>;
        case "misc-lazy-motion-async": return <DemoWithTabs demoId="misc-lazy-motion-async"><MotionExamples.LazyMotionAsyncDemo /></DemoWithTabs>;
        // New Misc
        case "misc-lazy-motion-sync": return <DemoWithTabs demoId="misc-lazy-motion-sync"><MotionExamples.LazyMotionSyncDemo /></DemoWithTabs>;
        case "misc-motion-config-is-static": return <DemoWithTabs demoId="misc-motion-config-is-static"><MotionExamples.MotionConfigIsStaticDemo /></DemoWithTabs>;
        case "misc-motion-config-nonce": return <DemoWithTabs demoId="misc-motion-config-nonce"><MotionExamples.MotionConfigNonceDemo /></DemoWithTabs>;
        case "misc-prop-ref": return <DemoWithTabs demoId="misc-prop-ref"><MotionExamples.PropRefDemo /></DemoWithTabs>;
        case "misc-prop-style": return <DemoWithTabs demoId="misc-prop-style"><MotionExamples.PropStyleDemo /></DemoWithTabs>;

        default: return null;
    }
}
