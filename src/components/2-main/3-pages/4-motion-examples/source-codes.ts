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
};

