// Import raw source files using Vite's ?raw feature
import { type MotionExampleId } from "@/store/0-local-storage/9-types";

// AnimatePresence examples
import animatePresence from "./1-animate-presence/AnimatePresence.tsx?raw";
import animatePresenceImageGallery from "./1-animate-presence/AnimatePresence-image-gallery.tsx?raw";
import animatePresenceLayoutAnimationsSiblings from "./1-animate-presence/AnimatePresence-layout-animations-siblings.tsx?raw";
import animatePresenceNotificationsList from "./1-animate-presence/AnimatePresence-notifications-list.tsx?raw";
import animatePresenceNotificationsListPop from "./1-animate-presence/AnimatePresence-notifications-list-pop.tsx?raw";
import animatePresenceParallelChildren from "./1-animate-presence/AnimatePresence-parallel-children.tsx?raw";
import animatePresenceSiblings from "./1-animate-presence/AnimatePresence-siblings.tsx?raw";
import animatePresenceSwitch from "./1-animate-presence/AnimatePresence-switch.tsx?raw";
import animatePresenceVariants from "./1-animate-presence/AnimatePresence-variants.tsx?raw";
import animatePresenceWait from "./1-animate-presence/AnimatePresence-wait.tsx?raw";

// Animation examples
import animationAnimate from "./2-animation/Animation-animate.tsx?raw";
import animationKeyframes from "./2-animation/Animation-keyframes.tsx?raw";
import animationSpringCss from "./2-animation/Animation-spring-css.tsx?raw";
import animationStagger from "./2-animation/Animation-stagger.tsx?raw";
import animationVariants from "./2-animation/Animation-variants.tsx?raw";
import animationCssVariables from "./2-animation/Animation-CSS-variables.tsx?raw";
import animationFilter from "./2-animation/Animation-filter.tsx?raw";
import animationHeightAutoPadding from "./2-animation/Animation-height-auto-padding.tsx?raw";
// New Animation
import animationBatchReadWrites from "./2-animation/Animation-batch-read-writes.tsx?raw";
import animationBetweenValueTypes from "./2-animation/Animation-between-value-types.tsx?raw";
import animationBetweenValueTypesX from "./2-animation/Animation-between-value-types-x.tsx?raw";
import animationBoxShadow from "./2-animation/Animation-boxShadow.tsx?raw";
import animationCleanup from "./2-animation/Animation-cleanup.tsx?raw";
import animationDisplayVisibility from "./2-animation/Animation-display-visibility.tsx?raw";
import animationHeightAutoDisplayNone from "./2-animation/Animation-height-auto-display-none.tsx?raw";
import animationHeightAutoRotateScale from "./2-animation/Animation-height-auto-rotate-scale.tsx?raw";
import animationLayoutDelayChildren from "./2-animation/Animation-layout-delay-children.tsx?raw";
import animationLayoutNestedPosition from "./2-animation/Animation-layout-nested-position.tsx?raw";
import animationLayoutScaleCorrection from "./2-animation/Animation-layout-scale-correction.tsx?raw";
import animationLayoutSeparateChildren from "./2-animation/Animation-layout-seperate-children.tsx?raw";
import animationLayoutSize from "./2-animation/Animation-layout-size.tsx?raw";
import animationLayoutTextSize from "./2-animation/Animation-layout-text-size.tsx?raw";
import animationLayoutTransformTemplate from "./2-animation/Animation-layout-transform-template.tsx?raw";
import animationLayoutUpdateStress from "./2-animation/Animation-layout-update-stress.tsx?raw";
import animationRepeatSpring from "./2-animation/Animation-repeat-spring.tsx?raw";
import animationReverse from "./2-animation/Animation-reverse.tsx?raw";
import animationStaggerCustom from "./2-animation/Animation-stagger-custom.tsx?raw";
import animationStressMount from "./2-animation/Animation-stress-mount.tsx?raw";
import animationTransitionTween from "./2-animation/Animation-transition-tween.tsx?raw";
import animationUseAnimateInitialTransform from "./2-animation/Animation-useAnimate-initial-transform.tsx?raw";

// Drag examples
import dragDraggable from "./3-drag/Drag-draggable.tsx?raw";
import dragConstraintsRef from "./3-drag/Drag-constraints-ref.tsx?raw";
import dragToReorder from "./3-drag/Drag-to-reorder.tsx?raw";
import dragUseDragControls from "./3-drag/Drag-useDragControls.tsx?raw";
import dragNested from "./3-drag/Drag-nested.tsx?raw";
// New Drag
import dragBlockViewportConditionally from "./3-drag/Drag-block-viewport-conditionally.tsx?raw";
import dragConstraintsRefSmallContainer from "./3-drag/Drag-constraints-ref-small-container.tsx?raw";
import dragConstraintsRefSmallContainerLayout from "./3-drag/Drag-constraints-ref-small-container-layout.tsx?raw";
import dragConstraintsRelative from "./3-drag/Drag-constraints-relative.tsx?raw";
import dragConstraintsResize from "./3-drag/Drag-constraints-resize.tsx?raw";
import dragExternalHandlers from "./3-drag/Drag-external-handlers.tsx?raw";
import dragSharedLayout from "./3-drag/Drag-SharedLayout.tsx?raw";
import dragSvg from "./3-drag/Drag-svg.tsx?raw";
import dragUseDragControlsSnapToCursor from "./3-drag/Drag-useDragControls-snapToCursor.tsx?raw";

// Events examples
import eventsWhileHover from "./4-events/Events-whileHover.tsx?raw";
import eventsWhileTap from "./4-events/Events-whileTap.tsx?raw";
import eventsOnTap from "./4-events/Events-onTap.tsx?raw";
// New Events
import eventsPan from "./4-events/Events-pan.tsx?raw";
import eventsWhileFocus from "./4-events/Events-whileFocus.tsx?raw";
import eventsWhileFocusVariants from "./4-events/Events-whileFocus-variants.tsx?raw";
import eventsWhileHoverUnitConversion from "./4-events/Events-whileHover-unit-conversion.tsx?raw";
import eventsWhileTapCancelOnScroll from "./4-events/Events-whileTap-cancel-on-scroll.tsx?raw";
import eventsWhileTapGlobal from "./4-events/Events-whileTap-global.tsx?raw";
import eventsWhileTapVariants from "./4-events/Events-whileTap-variants.tsx?raw";

// Layout examples
import layoutRotate from "./5-layout/Layout-rotate.tsx?raw";
import layoutSkew from "./5-layout/Layout-skew.tsx?raw";
import layoutProjectionScalePosition from "./5-layout/Layout-Projection-scale-position.tsx?raw";
// New Layout
import layoutProjectionCorrectStyleBorderRadius from "./5-layout/Layout-Projection-correct-style-border-radius.tsx?raw";
import layoutProjectionCustomValues from "./5-layout/Layout-Projection-custom-values.tsx?raw";
import layoutProjectionScaleCorrectionBorderRadius from "./5-layout/Layout-Projection-scale-correction-border-radius.tsx?raw";
import layoutProjectionScaleCorrectionShadow from "./5-layout/Layout-Projection-scale-correction-shadow.tsx?raw";
import layoutProjectionScaleSize from "./5-layout/Layout-Projection-scale-size.tsx?raw";
import layoutSvg from "./5-layout/Layout-SVG.tsx?raw";

// Shared Layout examples
import sharedLayoutContinuity from "./6-shared-layout/Shared-layout-continuity.tsx?raw";
import sharedLayoutLightbox from "./6-shared-layout/Shared-layout-lightbox.tsx?raw";
import sharedLayoutLists from "./6-shared-layout/Shared-layout-lists.tsx?raw";
import sharedLayoutToggleDetails from "./6-shared-layout/Shared-layout-toggle-details.tsx?raw";
// New Shared Layout
import sharedLayoutContinuityCrossfade from "./6-shared-layout/Shared-layout-continuity-crossfade.tsx?raw";
import sharedLayoutLightboxCrossfade from "./6-shared-layout/Shared-layout-lightbox-crossfade.tsx?raw";
import sharedLayoutMotionValueContinuity from "./6-shared-layout/Shared-layout-motion-value-continuity.tsx?raw";
import sharedLayoutNestedInsetElements from "./6-shared-layout/Shared-layout-nested-inset-elements.tsx?raw";
import sharedLayoutNestedInsetElementsNoLayout from "./6-shared-layout/Shared-layout-nested-inset-elements-no-layout.tsx?raw";
import sharedLayoutReparenting from "./6-shared-layout/Shared-layout-reparenting.tsx?raw";
import sharedLayoutReparentingTransformTemplate from "./6-shared-layout/Shared-layout-reparenting-transform-template.tsx?raw";
import sharedLayoutRotate from "./6-shared-layout/Shared-layout-rotate.tsx?raw";
import sharedLayoutSiblingToChild from "./6-shared-layout/Shared-layout-sibling-to-child.tsx?raw";
import sharedLayoutSkew from "./6-shared-layout/Shared-layout-skew.tsx?raw";

// SVG examples
import svgPath from "./7-svg/SVG-path.tsx?raw";
import svgLayoutAnimation from "./7-svg/SVG-layout-animation.tsx?raw";
// New SVG
import svgMotionValue from "./7-svg/SVG-MotionValue.tsx?raw";
import svgTextMotionValueChild from "./7-svg/SVG-Text-MotionValue-Child.tsx?raw";
import svgTransform from "./7-svg/SVG-transform.tsx?raw";
import svgWithoutInitialValues from "./7-svg/SVG-without-initial-values.tsx?raw";

// Hooks examples
import hooksUseScroll from "./8-hooks/useScroll.tsx?raw";
import hooksUseSpring from "./8-hooks/useSpring.tsx?raw";
import hooksUseAnimation from "./8-hooks/useAnimation.tsx?raw";
// New Hooks
import hooksUseAnimatedState from "./8-hooks/useAnimatedState.tsx?raw";
import hooksUseInstantTransition from "./8-hooks/useInstantTransition.tsx?raw";
import hooksUsePresence from "./8-hooks/usePresence.tsx?raw";
import hooksUseReducedMotion from "./8-hooks/useReducedMotion.tsx?raw";
import hooksUseTransformWithUseLayoutEffect from "./8-hooks/useTransform-with-useLayoutEffect.tsx?raw";
import hooksUseVelocity from "./8-hooks/useVelocity.tsx?raw";
import hooksUseViewportScroll from "./8-hooks/useViewportScroll.tsx?raw";

// WAAPI examples
import waapiBackgroundColor from "./9-waapi/WAAPI-background-color.tsx?raw";
import waapiOpacity from "./9-waapi/WAAPI-opacity.tsx?raw";
// New WAAPI
import waapiInterrupt from "./9-waapi/WAAPI-interrupt.tsx?raw";
import waapiOpacityOrchestration from "./9-waapi/WAAPI-opacity-orchestration.tsx?raw";

// Misc examples
import miscMotionCustomTag from "./10-misc/motion-custom-tag.tsx?raw";
import miscLazyMotionAsync from "./10-misc/LazyMotion-async.tsx?raw";
// New Misc
import miscLazyMotionSync from "./10-misc/LazyMotion-sync.tsx?raw";
import miscMotionConfigIsStatic from "./10-misc/MotionConfig-isStatic.tsx?raw";
import miscMotionConfigNonce from "./10-misc/MotionConfig-nonce.tsx?raw";
import miscPropRef from "./10-misc/Prop-ref.tsx?raw";
import miscPropStyle from "./10-misc/Prop-style.tsx?raw";

// Export as a map
export const demoSourceCodes: Record<MotionExampleId, string> = {
    // AnimatePresence examples
    "animate-presence": animatePresence,
    "animate-presence-image-gallery": animatePresenceImageGallery,
    "animate-presence-layout-animations-siblings": animatePresenceLayoutAnimationsSiblings,
    "animate-presence-notifications-list": animatePresenceNotificationsList,
    "animate-presence-notifications-list-pop": animatePresenceNotificationsListPop,
    "animate-presence-parallel-children": animatePresenceParallelChildren,
    "animate-presence-siblings": animatePresenceSiblings,
    "animate-presence-switch": animatePresenceSwitch,
    "animate-presence-variants": animatePresenceVariants,
    "animate-presence-wait": animatePresenceWait,
    // Animation examples
    "animation-animate": animationAnimate,
    "animation-keyframes": animationKeyframes,
    "animation-spring-css": animationSpringCss,
    "animation-stagger": animationStagger,
    "animation-variants": animationVariants,
    "animation-css-variables": animationCssVariables,
    "animation-filter": animationFilter,
    "animation-height-auto-padding": animationHeightAutoPadding,
    "animation-batch-read-writes": animationBatchReadWrites,
    "animation-between-value-types": animationBetweenValueTypes,
    "animation-between-value-types-x": animationBetweenValueTypesX,
    "animation-box-shadow": animationBoxShadow,
    "animation-cleanup": animationCleanup,
    "animation-display-visibility": animationDisplayVisibility,
    "animation-height-auto-display-none": animationHeightAutoDisplayNone,
    "animation-height-auto-rotate-scale": animationHeightAutoRotateScale,
    "animation-layout-delay-children": animationLayoutDelayChildren,
    "animation-layout-nested-position": animationLayoutNestedPosition,
    "animation-layout-scale-correction": animationLayoutScaleCorrection,
    "animation-layout-separate-children": animationLayoutSeparateChildren,
    "animation-layout-size": animationLayoutSize,
    "animation-layout-text-size": animationLayoutTextSize,
    "animation-layout-transform-template": animationLayoutTransformTemplate,
    "animation-layout-update-stress": animationLayoutUpdateStress,
    "animation-repeat-spring": animationRepeatSpring,
    "animation-reverse": animationReverse,
    "animation-stagger-custom": animationStaggerCustom,
    "animation-stress-mount": animationStressMount,
    "animation-transition-tween": animationTransitionTween,
    "animation-use-animate-initial-transform": animationUseAnimateInitialTransform,
    // Drag examples
    "drag-draggable": dragDraggable,
    "drag-constraints-ref": dragConstraintsRef,
    "drag-to-reorder": dragToReorder,
    "drag-use-drag-controls": dragUseDragControls,
    "drag-nested": dragNested,
    "drag-block-viewport-conditionally": dragBlockViewportConditionally,
    "drag-constraints-ref-small-container": dragConstraintsRefSmallContainer,
    "drag-constraints-ref-small-container-layout": dragConstraintsRefSmallContainerLayout,
    "drag-constraints-relative": dragConstraintsRelative,
    "drag-constraints-resize": dragConstraintsResize,
    "drag-external-handlers": dragExternalHandlers,
    "drag-shared-layout": dragSharedLayout,
    "drag-svg": dragSvg,
    "drag-use-drag-controls-snap-to-cursor": dragUseDragControlsSnapToCursor,
    // Events examples
    "events-while-hover": eventsWhileHover,
    "events-while-tap": eventsWhileTap,
    "events-on-tap": eventsOnTap,
    "events-pan": eventsPan,
    "events-while-focus": eventsWhileFocus,
    "events-while-focus-variants": eventsWhileFocusVariants,
    "events-while-hover-unit-conversion": eventsWhileHoverUnitConversion,
    "events-while-tap-cancel-on-scroll": eventsWhileTapCancelOnScroll,
    "events-while-tap-global": eventsWhileTapGlobal,
    "events-while-tap-variants": eventsWhileTapVariants,
    // Layout examples
    "layout-rotate": layoutRotate,
    "layout-skew": layoutSkew,
    "layout-projection-scale-position": layoutProjectionScalePosition,
    "layout-projection-correct-style-border-radius": layoutProjectionCorrectStyleBorderRadius,
    "layout-projection-custom-values": layoutProjectionCustomValues,
    "layout-projection-scale-correction-border-radius": layoutProjectionScaleCorrectionBorderRadius,
    "layout-projection-scale-correction-shadow": layoutProjectionScaleCorrectionShadow,
    "layout-projection-scale-size": layoutProjectionScaleSize,
    "layout-svg": layoutSvg,
    // Shared Layout examples
    "shared-layout-continuity": sharedLayoutContinuity,
    "shared-layout-lightbox": sharedLayoutLightbox,
    "shared-layout-lists": sharedLayoutLists,
    "shared-layout-toggle-details": sharedLayoutToggleDetails,
    "shared-layout-continuity-crossfade": sharedLayoutContinuityCrossfade,
    "shared-layout-lightbox-crossfade": sharedLayoutLightboxCrossfade,
    "shared-layout-motion-value-continuity": sharedLayoutMotionValueContinuity,
    "shared-layout-nested-inset-elements": sharedLayoutNestedInsetElements,
    "shared-layout-nested-inset-elements-no-layout": sharedLayoutNestedInsetElementsNoLayout,
    "shared-layout-reparenting": sharedLayoutReparenting,
    "shared-layout-reparenting-transform-template": sharedLayoutReparentingTransformTemplate,
    "shared-layout-rotate": sharedLayoutRotate,
    "shared-layout-sibling-to-child": sharedLayoutSiblingToChild,
    "shared-layout-skew": sharedLayoutSkew,
    // SVG examples
    "svg-path": svgPath,
    "svg-layout-animation": svgLayoutAnimation,
    "svg-motion-value": svgMotionValue,
    "svg-text-motion-value-child": svgTextMotionValueChild,
    "svg-transform": svgTransform,
    "svg-without-initial-values": svgWithoutInitialValues,
    // Hooks examples
    "hooks-use-scroll": hooksUseScroll,
    "hooks-use-spring": hooksUseSpring,
    "hooks-use-animation": hooksUseAnimation,
    "hooks-use-animated-state": hooksUseAnimatedState,
    "hooks-use-instant-transition": hooksUseInstantTransition,
    "hooks-use-presence": hooksUsePresence,
    "hooks-use-reduced-motion": hooksUseReducedMotion,
    "hooks-use-transform-with-use-layout-effect": hooksUseTransformWithUseLayoutEffect,
    "hooks-use-velocity": hooksUseVelocity,
    "hooks-use-viewport-scroll": hooksUseViewportScroll,
    // WAAPI examples
    "waapi-background-color": waapiBackgroundColor,
    "waapi-opacity": waapiOpacity,
    "waapi-interrupt": waapiInterrupt,
    "waapi-opacity-orchestration": waapiOpacityOrchestration,
    // Misc examples
    "misc-motion-custom-tag": miscMotionCustomTag,
    "misc-lazy-motion-async": miscLazyMotionAsync,
    "misc-lazy-motion-sync": miscLazyMotionSync,
    "misc-motion-config-is-static": miscMotionConfigIsStatic,
    "misc-motion-config-nonce": miscMotionConfigNonce,
    "misc-prop-ref": miscPropRef,
    "misc-prop-style": miscPropStyle,
};

// Debug: Log available keys to console
console.log("[SourceCodes] Loaded", Object.keys(demoSourceCodes).length, "examples");

if (Object.keys(demoSourceCodes).length > 0) {
    const firstKey = Object.keys(demoSourceCodes)[0];
    const firstContent = demoSourceCodes[firstKey as MotionExampleId];
    
    console.log("[SourceCodes] Sample key:", firstKey);
    console.log("[SourceCodes] Content type:", typeof firstContent);
    console.log("[SourceCodes] Content start:", firstContent?.slice(0, 100));
}
