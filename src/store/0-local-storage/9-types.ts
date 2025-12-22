// Left view

export type LeftViewId = 
    | "cards" 
    | "dashboard" 
    | "hero-text" 
    | "listview" 
    | "motion-variants-race"
    // AnimatePresence
    | "animate-presence"
    | "animate-presence-image-gallery"
    | "animate-presence-layout-animations-siblings"
    | "animate-presence-notifications-list"
    | "animate-presence-notifications-list-pop"
    | "animate-presence-parallel-children"
    | "animate-presence-siblings"
    | "animate-presence-switch"
    | "animate-presence-variants"
    | "animate-presence-wait"
    // Animation
    | "animation-animate"
    | "animation-keyframes"
    | "animation-spring-css"
    | "animation-stagger"
    | "animation-variants"
    | "animation-css-variables"
    | "animation-filter"
    | "animation-height-auto-padding"
    // Drag
    | "drag-draggable"
    | "drag-constraints-ref"
    | "drag-to-reorder"
    | "drag-use-drag-controls"
    | "drag-nested"
    // Events
    | "events-while-hover"
    | "events-while-tap"
    | "events-on-tap"
    | "not-yet";

export type LeftViewItem = {
    id: LeftViewId;
    title: string;
    description?: string;
    icon?: string;
};

export const LeftViewItems = [
    { id: "cards", title: "Cards", description: "Cards demo", icon: "📊" },
    { id: "dashboard", title: "Dashboard", description: "Dashboard demo", icon: "📊" },
    { id: "hero-text", title: "Effect Hero Title", description: "Effect Hero Title demo", icon: "📊" },
    { id: "listview", title: "List View", description: "List View demo", icon: "📊" },
    { id: "motion-variants-race", title: "Motion Variants Race", description: "Motion Variants Race demo", icon: "🏁" },
    // AnimatePresence examples
    { id: "animate-presence", title: "AnimatePresence", description: "Single-child AnimatePresence animation", icon: "🎬" },
    { id: "animate-presence-image-gallery", title: "Image Gallery", description: "Image gallery with AnimatePresence", icon: "🖼️" },
    { id: "animate-presence-layout-animations-siblings", title: "Layout Siblings", description: "AnimatePresence with shared layout", icon: "🎬" },
    { id: "animate-presence-notifications-list", title: "Notifications List", description: "Notifications with layout animations", icon: "🔔" },
    { id: "animate-presence-notifications-list-pop", title: "Notifications Pop", description: "Notifications with popLayout mode", icon: "🔔" },
    { id: "animate-presence-parallel-children", title: "Parallel Children", description: "Multiple children exiting together", icon: "🎬" },
    { id: "animate-presence-siblings", title: "Siblings", description: "Multiple AnimatePresence siblings", icon: "🎬" },
    { id: "animate-presence-switch", title: "Switch", description: "Switching between components", icon: "🔄" },
    { id: "animate-presence-variants", title: "Variants", description: "AnimatePresence with variants", icon: "🎬" },
    { id: "animate-presence-wait", title: "Wait Mode", description: "Wait for exit before entering", icon: "⏳" },
    // Animation examples
    { id: "animation-animate", title: "Animate", description: "Basic tween animation", icon: "✨" },
    { id: "animation-keyframes", title: "Keyframes", description: "Keyframe animations", icon: "🔑" },
    { id: "animation-spring-css", title: "Spring CSS", description: "Spring animations with CSS", icon: "🌊" },
    { id: "animation-stagger", title: "Stagger", description: "Staggered animations", icon: "📊" },
    { id: "animation-variants", title: "Variants", description: "Animation with variants", icon: "✨" },
    { id: "animation-css-variables", title: "CSS Variables", description: "Animating CSS variables", icon: "🎨" },
    { id: "animation-filter", title: "Filter", description: "Animating filter property", icon: "🎨" },
    { id: "animation-height-auto-padding", title: "Height Auto", description: "Auto height with padding", icon: "📏" },
    // Drag examples
    { id: "drag-draggable", title: "Draggable", description: "Basic draggable element", icon: "👆" },
    { id: "drag-constraints-ref", title: "Drag Constraints", description: "Drag with ref constraints", icon: "📦" },
    { id: "drag-to-reorder", title: "Drag to Reorder", description: "Reorderable list", icon: "📝" },
    { id: "drag-use-drag-controls", title: "Drag Controls", description: "External drag controls", icon: "🎮" },
    { id: "drag-nested", title: "Nested Drag", description: "Nested draggable elements", icon: "📦" },
    // Events examples
    { id: "events-while-hover", title: "While Hover", description: "Hover interactions", icon: "🖱️" },
    { id: "events-while-tap", title: "While Tap", description: "Tap interactions", icon: "👆" },
    { id: "events-on-tap", title: "On Tap", description: "Tap event handling", icon: "👆" },
] as const satisfies readonly LeftViewItem[];

//export type LeftViewId = typeof LeftViewItems[number]["id"];

// Right view

export type RightViewId = 
    | "simple-cards" 
    | "simple-dashboard" 
    | "original-cards" 
    | "motion-variants-race"
    // AnimatePresence
    | "animate-presence"
    | "animate-presence-image-gallery"
    | "animate-presence-layout-animations-siblings"
    | "animate-presence-notifications-list"
    | "animate-presence-notifications-list-pop"
    | "animate-presence-parallel-children"
    | "animate-presence-siblings"
    | "animate-presence-switch"
    | "animate-presence-variants"
    | "animate-presence-wait"
    // Animation
    | "animation-animate"
    | "animation-keyframes"
    | "animation-spring-css"
    | "animation-stagger"
    | "animation-variants"
    | "animation-css-variables"
    | "animation-filter"
    | "animation-height-auto-padding"
    // Drag
    | "drag-draggable"
    | "drag-constraints-ref"
    | "drag-to-reorder"
    | "drag-use-drag-controls"
    | "drag-nested"
    // Events
    | "events-while-hover"
    | "events-while-tap"
    | "events-on-tap";

export type RightViewItem = {
    id: RightViewId;
    title: string;
    description?: string;
    icon?: string;
};

export const RightViewItems = [
    { id: "simple-cards", title: "Cards", description: "Cards demo", icon: "💻" },
    { id: "simple-dashboard", title: "Dashboard", description: "Dashboard demo", icon: "💻" },
    { id: "original-cards", title: "Original Cards", description: "Original Cards demo", icon: "💻" },
    { id: "motion-variants-race", title: "Motion Variants Race", description: "Motion Variants Race demo", icon: "🏁" },
    // AnimatePresence examples
    { id: "animate-presence", title: "AnimatePresence", description: "Single-child AnimatePresence animation", icon: "🎬" },
    { id: "animate-presence-image-gallery", title: "Image Gallery", description: "Image gallery with AnimatePresence", icon: "🖼️" },
    { id: "animate-presence-layout-animations-siblings", title: "Layout Siblings", description: "AnimatePresence with shared layout", icon: "🎬" },
    { id: "animate-presence-notifications-list", title: "Notifications List", description: "Notifications with layout animations", icon: "🔔" },
    { id: "animate-presence-notifications-list-pop", title: "Notifications Pop", description: "Notifications with popLayout mode", icon: "🔔" },
    { id: "animate-presence-parallel-children", title: "Parallel Children", description: "Multiple children exiting together", icon: "🎬" },
    { id: "animate-presence-siblings", title: "Siblings", description: "Multiple AnimatePresence siblings", icon: "🎬" },
    { id: "animate-presence-switch", title: "Switch", description: "Switching between components", icon: "🔄" },
    { id: "animate-presence-variants", title: "Variants", description: "AnimatePresence with variants", icon: "🎬" },
    { id: "animate-presence-wait", title: "Wait Mode", description: "Wait for exit before entering", icon: "⏳" },
    // Animation examples
    { id: "animation-animate", title: "Animate", description: "Basic tween animation", icon: "✨" },
    { id: "animation-keyframes", title: "Keyframes", description: "Keyframe animations", icon: "🔑" },
    { id: "animation-spring-css", title: "Spring CSS", description: "Spring animations with CSS", icon: "🌊" },
    { id: "animation-stagger", title: "Stagger", description: "Staggered animations", icon: "📊" },
    { id: "animation-variants", title: "Variants", description: "Animation with variants", icon: "✨" },
    { id: "animation-css-variables", title: "CSS Variables", description: "Animating CSS variables", icon: "🎨" },
    { id: "animation-filter", title: "Filter", description: "Animating filter property", icon: "🎨" },
    { id: "animation-height-auto-padding", title: "Height Auto", description: "Auto height with padding", icon: "📏" },
    // Drag examples
    { id: "drag-draggable", title: "Draggable", description: "Basic draggable element", icon: "👆" },
    { id: "drag-constraints-ref", title: "Drag Constraints", description: "Drag with ref constraints", icon: "📦" },
    { id: "drag-to-reorder", title: "Drag to Reorder", description: "Reorderable list", icon: "📝" },
    { id: "drag-use-drag-controls", title: "Drag Controls", description: "External drag controls", icon: "🎮" },
    { id: "drag-nested", title: "Nested Drag", description: "Nested draggable elements", icon: "📦" },
    // Events examples
    { id: "events-while-hover", title: "While Hover", description: "Hover interactions", icon: "🖱️" },
    { id: "events-while-tap", title: "While Tap", description: "Tap interactions", icon: "👆" },
    { id: "events-on-tap", title: "On Tap", description: "Tap event handling", icon: "👆" },
] as const satisfies readonly RightViewItem[];

export function rightViewTypeGuard(rightView: RightViewId): string {
    return rightView;
}
