// Import raw source files using Vite's ?raw feature
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

// Drag examples
import dragDraggable from "./3-drag/Drag-draggable.tsx?raw";
import dragConstraintsRef from "./3-drag/Drag-constraints-ref.tsx?raw";
import dragToReorder from "./3-drag/Drag-to-reorder.tsx?raw";
import dragUseDragControls from "./3-drag/Drag-useDragControls.tsx?raw";
import dragNested from "./3-drag/Drag-nested.tsx?raw";

// Events examples
import eventsWhileHover from "./4-events/Events-whileHover.tsx?raw";
import eventsWhileTap from "./4-events/Events-whileTap.tsx?raw";
import eventsOnTap from "./4-events/Events-onTap.tsx?raw";

// Layout examples
import layoutRotate from "./5-layout/Layout-rotate.tsx?raw";
import layoutSkew from "./5-layout/Layout-skew.tsx?raw";
import layoutProjectionScalePosition from "./5-layout/Layout-Projection-scale-position.tsx?raw";

// Shared Layout examples
import sharedLayoutContinuity from "./6-shared-layout/Shared-layout-continuity.tsx?raw";
import sharedLayoutLightbox from "./6-shared-layout/Shared-layout-lightbox.tsx?raw";
import sharedLayoutLists from "./6-shared-layout/Shared-layout-lists.tsx?raw";
import sharedLayoutToggleDetails from "./6-shared-layout/Shared-layout-toggle-details.tsx?raw";

// SVG examples
import svgPath from "./7-svg/SVG-path.tsx?raw";
import svgLayoutAnimation from "./7-svg/SVG-layout-animation.tsx?raw";

// Hooks examples
import hooksUseScroll from "./8-hooks/useScroll.tsx?raw";
import hooksUseSpring from "./8-hooks/useSpring.tsx?raw";
import hooksUseAnimation from "./8-hooks/useAnimation.tsx?raw";

// WAAPI examples
import waapiBackgroundColor from "./9-waapi/WAAPI-background-color.tsx?raw";
import waapiOpacity from "./9-waapi/WAAPI-opacity.tsx?raw";

// Misc examples
import miscMotionCustomTag from "./10-misc/motion-custom-tag.tsx?raw";
import miscLazyMotionAsync from "./10-misc/LazyMotion-async.tsx?raw";

// Export as a map
export const demoSourceCodes: Record<string, string> = {
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
    // Drag examples
    "drag-draggable": dragDraggable,
    "drag-constraints-ref": dragConstraintsRef,
    "drag-to-reorder": dragToReorder,
    "drag-use-drag-controls": dragUseDragControls,
    "drag-nested": dragNested,
    // Events examples
    "events-while-hover": eventsWhileHover,
    "events-while-tap": eventsWhileTap,
    "events-on-tap": eventsOnTap,
    // Layout examples
    "layout-rotate": layoutRotate,
    "layout-skew": layoutSkew,
    "layout-projection-scale-position": layoutProjectionScalePosition,
    // Shared Layout examples
    "shared-layout-continuity": sharedLayoutContinuity,
    "shared-layout-lightbox": sharedLayoutLightbox,
    "shared-layout-lists": sharedLayoutLists,
    "shared-layout-toggle-details": sharedLayoutToggleDetails,
    // SVG examples
    "svg-path": svgPath,
    "svg-layout-animation": svgLayoutAnimation,
    // Hooks examples
    "hooks-use-scroll": hooksUseScroll,
    "hooks-use-spring": hooksUseSpring,
    "hooks-use-animation": hooksUseAnimation,
    // WAAPI examples
    "waapi-background-color": waapiBackgroundColor,
    "waapi-opacity": waapiOpacity,
    // Misc examples
    "misc-motion-custom-tag": miscMotionCustomTag,
    "misc-lazy-motion-async": miscLazyMotionAsync,
};

// Debug: Log available keys to console
console.log("[SourceCodes] Loaded", Object.keys(demoSourceCodes).length, "examples");
if (Object.keys(demoSourceCodes).length > 0) {
    const firstKey = Object.keys(demoSourceCodes)[0];
    const firstContent = demoSourceCodes[firstKey];
    console.log("[SourceCodes] Sample key:", firstKey);
    console.log("[SourceCodes] Content type:", typeof firstContent);
    console.log("[SourceCodes] Content start:", firstContent?.slice(0, 100));
}
