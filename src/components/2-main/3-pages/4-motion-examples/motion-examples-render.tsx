import * as MotionExamples from ".";
import { type MotionExampleId, MotionExampleItems } from "@/store/0-local-storage";
import { DemoWithTabs } from "../../2-right-view/1-demo-with-tabs";

export function isMotionExampleId(id: string): id is MotionExampleId {
    return motionExampleIds.has(id as MotionExampleId);
}

export function MotionExampleRenderer({ viewId }: { viewId: MotionExampleId }) {
    const Component = MotionExampleComponents[viewId];
    return <DemoWithTabs demoId={viewId}><Component /></DemoWithTabs>;
}

const motionExampleIds = new Set(MotionExampleItems.map(item => item.id));

const MotionExampleComponents: Record<MotionExampleId, React.ComponentType> = {
    // AnimatePresence examples
    "animate-presence": MotionExamples.AnimatePresenceDemo,
    "animate-presence-image-gallery": MotionExamples.AnimatePresenceImageGalleryDemo,
    "animate-presence-layout-animations-siblings": MotionExamples.AnimatePresenceLayoutAnimationsSiblingsDemo,
    "animate-presence-notifications-list": MotionExamples.AnimatePresenceNotificationsListDemo,
    "animate-presence-notifications-list-pop": MotionExamples.AnimatePresenceNotificationsListPopDemo,
    "animate-presence-parallel-children": MotionExamples.AnimatePresenceParallelChildrenDemo,
    "animate-presence-siblings": MotionExamples.AnimatePresenceSiblingsDemo,
    "animate-presence-switch": MotionExamples.AnimatePresenceSwitchDemo,
    "animate-presence-variants": MotionExamples.AnimatePresenceVariantsDemo,
    "animate-presence-wait": MotionExamples.AnimatePresenceWaitDemo,
    // Animation examples
    "animation-animate": MotionExamples.AnimationAnimateDemo,
    "animation-keyframes": MotionExamples.AnimationKeyframesDemo,
    "animation-spring-css": MotionExamples.AnimationSpringCssDemo,
    "animation-stagger": MotionExamples.AnimationStaggerDemo,
    "animation-variants": MotionExamples.AnimationVariantsDemo,
    "animation-css-variables": MotionExamples.AnimationCssVariablesDemo,
    "animation-filter": MotionExamples.AnimationFilterDemo,
    "animation-height-auto-padding": MotionExamples.AnimationHeightAutoPaddingDemo,
    // New Animation
    "animation-batch-read-writes": MotionExamples.AnimationBatchReadWritesDemo,
    "animation-between-value-types": MotionExamples.AnimationBetweenValueTypesDemo,
    "animation-between-value-types-x": MotionExamples.AnimationBetweenValueTypesXDemo,
    "animation-box-shadow": MotionExamples.AnimationBoxShadowDemo,
    "animation-cleanup": MotionExamples.AnimationCleanupDemo,
    "animation-display-visibility": MotionExamples.AnimationDisplayVisibilityDemo,
    "animation-height-auto-display-none": MotionExamples.AnimationHeightAutoDisplayNoneDemo,
    "animation-height-auto-rotate-scale": MotionExamples.AnimationHeightAutoRotateScaleDemo,
    "animation-layout-delay-children": MotionExamples.AnimationLayoutDelayChildrenDemo,
    "animation-layout-nested-position": MotionExamples.AnimationLayoutNestedPositionDemo,
    "animation-layout-scale-correction": MotionExamples.AnimationLayoutScaleCorrectionDemo,
    "animation-layout-separate-children": MotionExamples.AnimationLayoutSeparateChildrenDemo,
    "animation-layout-size": MotionExamples.AnimationLayoutSizeDemo,
    "animation-layout-text-size": MotionExamples.AnimationLayoutTextSizeDemo,
    "animation-layout-transform-template": MotionExamples.AnimationLayoutTransformTemplateDemo,
    "animation-layout-update-stress": MotionExamples.AnimationLayoutUpdateStressDemo,
    "animation-repeat-spring": MotionExamples.AnimationRepeatSpringDemo,
    "animation-reverse": MotionExamples.AnimationReverseDemo,
    "animation-stagger-custom": MotionExamples.AnimationStaggerCustomDemo,
    "animation-stress-mount": MotionExamples.AnimationStressMountDemo,
    "animation-transition-tween": MotionExamples.AnimationTransitionTweenDemo,
    "animation-use-animate-initial-transform": MotionExamples.AnimationUseAnimateInitialTransformDemo,
    // Drag examples
    "drag-draggable": MotionExamples.DragDraggableDemo,
    "drag-constraints-ref": MotionExamples.DragConstraintsRefDemo,
    "drag-to-reorder": MotionExamples.DragToReorderDemo,
    "drag-use-drag-controls": MotionExamples.DragUseDragControlsDemo,
    "drag-nested": MotionExamples.DragNestedDemo,
    // New Drag
    "drag-block-viewport-conditionally": MotionExamples.DragBlockViewportConditionallyDemo,
    "drag-constraints-ref-small-container": MotionExamples.DragConstraintsRefSmallContainerDemo,
    "drag-constraints-ref-small-container-layout": MotionExamples.DragConstraintsRefSmallContainerLayoutDemo,
    "drag-constraints-relative": MotionExamples.DragConstraintsRelativeDemo,
    "drag-constraints-resize": MotionExamples.DragConstraintsResizeDemo,
    "drag-external-handlers": MotionExamples.DragExternalHandlersDemo,
    "drag-shared-layout": MotionExamples.DragSharedLayoutDemo,
    "drag-svg": MotionExamples.DragSvgDemo,
    "drag-use-drag-controls-snap-to-cursor": MotionExamples.DragUseDragControlsSnapToCursorDemo,
    // Events examples
    "events-while-hover": MotionExamples.EventsWhileHoverDemo,
    "events-while-tap": MotionExamples.EventsWhileTapDemo,
    "events-on-tap": MotionExamples.EventsOnTapDemo,
    // New Events
    "events-pan": MotionExamples.EventsPanDemo,
    "events-while-focus": MotionExamples.EventsWhileFocusDemo,
    "events-while-focus-variants": MotionExamples.EventsWhileFocusVariantsDemo,
    "events-while-hover-unit-conversion": MotionExamples.EventsWhileHoverUnitConversionDemo,
    "events-while-tap-cancel-on-scroll": MotionExamples.EventsWhileTapCancelOnScrollDemo,
    "events-while-tap-global": MotionExamples.EventsWhileTapGlobalDemo,
    "events-while-tap-variants": MotionExamples.EventsWhileTapVariantsDemo,
    // Layout examples
    "layout-rotate": MotionExamples.LayoutRotateDemo,
    "layout-skew": MotionExamples.LayoutSkewDemo,
    "layout-projection-scale-position": MotionExamples.LayoutProjectionScalePositionDemo,
    // New Layout
    "layout-projection-correct-style-border-radius": MotionExamples.LayoutProjectionCorrectStyleBorderRadiusDemo,
    "layout-projection-custom-values": MotionExamples.LayoutProjectionCustomValuesDemo,
    "layout-projection-scale-correction-border-radius": MotionExamples.LayoutProjectionScaleCorrectionBorderRadiusDemo,
    "layout-projection-scale-correction-shadow": MotionExamples.LayoutProjectionScaleCorrectionShadowDemo,
    "layout-projection-scale-size": MotionExamples.LayoutProjectionScaleSizeDemo,
    "layout-svg": MotionExamples.LayoutSvgDemo,
    // Shared Layout examples
    "shared-layout-continuity": MotionExamples.SharedLayoutContinuityDemo,
    "shared-layout-lightbox": MotionExamples.SharedLayoutLightboxDemo,
    "shared-layout-lists": MotionExamples.SharedLayoutListsDemo,
    "shared-layout-toggle-details": MotionExamples.SharedLayoutToggleDetailsDemo,
    // New Shared Layout
    "shared-layout-continuity-crossfade": MotionExamples.SharedLayoutContinuityCrossfadeDemo,
    "shared-layout-lightbox-crossfade": MotionExamples.SharedLayoutLightboxCrossfadeDemo,
    "shared-layout-motion-value-continuity": MotionExamples.SharedLayoutMotionValueContinuityDemo,
    "shared-layout-nested-inset-elements": MotionExamples.SharedLayoutNestedInsetElementsDemo,
    "shared-layout-nested-inset-elements-no-layout": MotionExamples.SharedLayoutNestedInsetElementsNoLayoutDemo,
    "shared-layout-reparenting": MotionExamples.SharedLayoutReparentingDemo,
    "shared-layout-reparenting-transform-template": MotionExamples.SharedLayoutReparentingTransformTemplateDemo,
    "shared-layout-rotate": MotionExamples.SharedLayoutRotateDemo,
    "shared-layout-sibling-to-child": MotionExamples.SharedLayoutSiblingToChildDemo,
    "shared-layout-skew": MotionExamples.SharedLayoutSkewDemo,
    // SVG examples
    "svg-path": MotionExamples.SvgPathDemo,
    "svg-layout-animation": MotionExamples.SvgLayoutAnimationDemo,
    // New SVG
    "svg-motion-value": MotionExamples.SvgMotionValueDemo,
    "svg-text-motion-value-child": MotionExamples.SvgTextMotionValueChildDemo,
    "svg-transform": MotionExamples.SvgTransformDemo,
    "svg-without-initial-values": MotionExamples.SvgWithoutInitialValuesDemo,
    // Hooks examples
    "hooks-use-scroll": MotionExamples.HooksUseScrollDemo,
    "hooks-use-spring": MotionExamples.HooksUseSpringDemo,
    "hooks-use-animation": MotionExamples.HooksUseAnimationDemo,
    // New Hooks
    "hooks-use-animated-state": MotionExamples.HooksUseAnimatedStateDemo,
    "hooks-use-instant-transition": MotionExamples.HooksUseInstantTransitionDemo,
    "hooks-use-presence": MotionExamples.HooksUsePresenceDemo,
    "hooks-use-reduced-motion": MotionExamples.HooksUseReducedMotionDemo,
    "hooks-use-transform-with-use-layout-effect": MotionExamples.HooksUseTransformWithUseLayoutEffectDemo,
    "hooks-use-velocity": MotionExamples.HooksUseVelocityDemo,
    "hooks-use-viewport-scroll": MotionExamples.HooksUseViewportScrollDemo,
    // WAAPI examples
    "waapi-background-color": MotionExamples.WaapiBackgroundColorDemo,
    "waapi-opacity": MotionExamples.WaapiOpacityDemo,
    // New WAAPI
    "waapi-interrupt": MotionExamples.WaapiInterruptDemo,
    "waapi-opacity-orchestration": MotionExamples.WaapiOpacityOrchestrationDemo,
    // Misc examples
    "misc-motion-custom-tag": MotionExamples.MotionCustomTagDemo,
    "misc-lazy-motion-async": MotionExamples.LazyMotionAsyncDemo,
    // New Misc
    "misc-lazy-motion-sync": MotionExamples.LazyMotionSyncDemo,
    "misc-motion-config-is-static": MotionExamples.MotionConfigIsStaticDemo,
    "misc-motion-config-nonce": MotionExamples.MotionConfigNonceDemo,
    "misc-prop-ref": MotionExamples.PropRefDemo,
    "misc-prop-style": MotionExamples.PropStyleDemo,
};
