export type MotionExampleId = 
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
    // New Animation
    | "animation-batch-read-writes"
    | "animation-between-value-types"
    | "animation-between-value-types-x"
    | "animation-box-shadow"
    | "animation-cleanup"
    | "animation-display-visibility"
    | "animation-height-auto-display-none"
    | "animation-height-auto-rotate-scale"
    | "animation-layout-delay-children"
    | "animation-layout-nested-position"
    | "animation-layout-scale-correction"
    | "animation-layout-separate-children"
    | "animation-layout-size"
    | "animation-layout-text-size"
    | "animation-layout-transform-template"
    | "animation-layout-update-stress"
    | "animation-repeat-spring"
    | "animation-reverse"
    | "animation-stagger-custom"
    | "animation-stress-mount"
    | "animation-transition-tween"
    | "animation-use-animate-initial-transform"
    // Drag
    | "drag-draggable"
    | "drag-constraints-ref"
    | "drag-to-reorder"
    | "drag-use-drag-controls"
    | "drag-nested"
    // New Drag
    | "drag-block-viewport-conditionally"
    | "drag-constraints-ref-small-container"
    | "drag-constraints-ref-small-container-layout"
    | "drag-constraints-relative"
    | "drag-constraints-resize"
    | "drag-external-handlers"
    | "drag-shared-layout"
    | "drag-svg"
    | "drag-use-drag-controls-snap-to-cursor"
    // Events
    | "events-while-hover"
    | "events-while-tap"
    | "events-on-tap"
    // New Events
    | "events-pan"
    | "events-while-focus"
    | "events-while-focus-variants"
    | "events-while-hover-unit-conversion"
    | "events-while-tap-cancel-on-scroll"
    | "events-while-tap-global"
    | "events-while-tap-variants"
    // Layout
    | "layout-rotate"
    | "layout-skew"
    | "layout-projection-scale-position"
    // New Layout
    | "layout-projection-correct-style-border-radius"
    | "layout-projection-custom-values"
    | "layout-projection-scale-correction-border-radius"
    | "layout-projection-scale-correction-shadow"
    | "layout-projection-scale-size"
    | "layout-svg"
    // Shared Layout
    | "shared-layout-continuity-crossfade"
    | "shared-layout-continuity"
    | "shared-layout-lightbox-crossfade"
    | "shared-layout-lightbox"
    | "shared-layout-lists"
    | "shared-layout-motion-value-continuity"
    | "shared-layout-nested-inset-elements-no-layout"
    | "shared-layout-nested-inset-elements"
    | "shared-layout-reparenting"
    | "shared-layout-reparenting-transform-template"
    | "shared-layout-rotate"
    | "shared-layout-sibling-to-child"
    | "shared-layout-skew"
    | "shared-layout-toggle-details"
    // SVG
    | "svg-layout-animation"
    | "svg-motion-value"
    | "svg-path"
    | "svg-text-motion-value-child"
    | "svg-transform"
    | "svg-without-initial-values"
    // Hooks
    | "hooks-use-animated-state"
    | "hooks-use-animation"
    | "hooks-use-instant-transition"
    | "hooks-use-presence"
    | "hooks-use-reduced-motion"
    | "hooks-use-spring"
    | "hooks-use-scroll"
    | "hooks-use-transform-with-use-layout-effect"
    | "hooks-use-velocity"
    | "hooks-use-viewport-scroll"
    // WAAPI
    | "waapi-background-color"
    | "waapi-interrupt"
    | "waapi-opacity-orchestration"
    | "waapi-opacity"
    // Misc
    | "misc-lazy-motion-async"
    | "misc-lazy-motion-sync"
    | "misc-motion-custom-tag"
    | "misc-motion-variants-race"
    | "misc-motion-config-is-static"
    | "misc-motion-config-nonce"
    | "misc-prop-ref"
    | "misc-prop-style"
    // Tests
    | "test-drag-propagation"
    | "test-svg-layout-animation-correction"
    | "test-layout-transform"
    | "test-layout-drag-transform"
    | "test-drag-set-state"
    | "test-drag-overdrag"
    | "test-drag-external-control"
    | "test-drag-device"
    | "test-drag-containing-input"
    | "test-drag-constraints-ref-smaller-than-child"
    | "test-drag-constraints-ref-scale"
    | "test-drag-constraints-ref"
    | "test-drag-constraints"
    | "test-drag-constraint-changes"
    | "test-drag-clickable"
    | "test-conditional-draggable"
    | "test-animate-stress-external-motion-value"
    | "test-animate-stress-empty-transforms"
    | "test-drag-controls"
    | "test-animate-stress-headless-x"
    | "test-animate-stress-headless-color";


export const MotionExampleItems = [
    // AnimatePresence examples
    { id: "animate-presence", title: "AnimatePresence", description: "Single-child AnimatePresence animation", icon: "🎬" },
    { id: "animate-presence-image-gallery", title: "Image Gallery", description: "Image gallery with AnimatePresence", icon: "🎬" },
    { id: "animate-presence-layout-animations-siblings", title: "Layout Siblings", description: "AnimatePresence with shared layout", icon: "🎬" },
    { id: "animate-presence-notifications-list", title: "Notifications List", description: "Notifications with layout animations", icon: "🎬" },
    { id: "animate-presence-notifications-list-pop", title: "Notifications Pop", description: "Notifications with popLayout mode", icon: "🎬" },
    { id: "animate-presence-parallel-children", title: "Parallel Children", description: "Multiple children exiting together", icon: "🎬" },
    { id: "animate-presence-siblings", title: "Siblings", description: "Multiple AnimatePresence siblings", icon: "🎬" },
    { id: "animate-presence-switch", title: "Switch", description: "Switching between components", icon: "🎬" },
    { id: "animate-presence-variants", title: "Variants", description: "AnimatePresence with variants", icon: "🎬" },
    { id: "animate-presence-wait", title: "Wait Mode", description: "Wait for exit before entering", icon: "🎬" },
    // Animation examples
    { id: "animation-animate", title: "Animate", description: "Basic tween animation", icon: "📐" },//✨
    { id: "animation-keyframes", title: "Keyframes", description: "Keyframe animations", icon: "📐" },
    { id: "animation-spring-css", title: "Spring CSS", description: "Spring animations with CSS", icon: "📐" },
    { id: "animation-stagger", title: "Stagger", description: "Staggered animations", icon: "📐" },
    { id: "animation-variants", title: "Variants", description: "Animation with variants", icon: "📐" },
    { id: "animation-css-variables", title: "CSS Variables", description: "Animating CSS variables", icon: "📐" },
    { id: "animation-filter", title: "Filter", description: "Animating filter property", icon: "📐" },
    { id: "animation-height-auto-padding", title: "Height Auto", description: "Auto height with padding", icon: "📐" },
    // New Animation
    { id: "animation-batch-read-writes", title: "Batch Read/Writes", description: "Batch read/writes example", icon: "📐" },
    { id: "animation-between-value-types", title: "Value Types", description: "Animate between value types", icon: "📐" },
    { id: "animation-between-value-types-x", title: "Value Types X", description: "Animate between value types X", icon: "📐" },
    { id: "animation-box-shadow", title: "Box Shadow", description: "Animate box shadow", icon: "📐" },
    { id: "animation-cleanup", title: "Cleanup", description: "Animation cleanup", icon: "📐" },
    { id: "animation-display-visibility", title: "Display Visibility", description: "Animate display/visibility", icon: "📐" },
    { id: "animation-height-auto-display-none", title: "Height Auto None", description: "Height auto with display none", icon: "📐" },
    { id: "animation-height-auto-rotate-scale", title: "Height Rotate Scale", description: "Height auto with rotate scale", icon: "📐" },
    { id: "animation-layout-delay-children", title: "Layout Delay", description: "Layout animation delay children", icon: "📐" },
    { id: "animation-layout-nested-position", title: "Nested Position", description: "Nested layout position", icon: "📐" },
    { id: "animation-layout-scale-correction", title: "Scale Correction", description: "Layout scale correction", icon: "📐" },
    { id: "animation-layout-separate-children", title: "Separate Children", description: "Layout separate children", icon: "📐" },
    { id: "animation-layout-size", title: "Layout Size", description: "Layout size animation", icon: "📐" },
    { id: "animation-layout-text-size", title: "Text Size", description: "Layout text size", icon: "📐" },
    { id: "animation-layout-transform-template", title: "Transform Template", description: "Layout transform template", icon: "📐" },
    { id: "animation-layout-update-stress", title: "Update Stress", description: "Layout update stress test", icon: "📐" },
    { id: "animation-repeat-spring", title: "Repeat Spring", description: "Repeating spring animation", icon: "📐" },
    { id: "animation-reverse", title: "Reverse", description: "Reversing animation", icon: "📐" },
    { id: "animation-stagger-custom", title: "Custom Stagger", description: "Custom stagger effect", icon: "📐" },
    { id: "animation-stress-mount", title: "Stress Mount", description: "Stress test mounting", icon: "📐" },
    { id: "animation-transition-tween", title: "Tween Transition", description: "Tween transition example", icon: "📐" },
    { id: "animation-use-animate-initial-transform", title: "Initial Transform", description: "useAnimate initial transform", icon: "📐" },
    // Drag examples
    { id: "drag-draggable", title: "Draggable", description: "Basic draggable element", icon: "👆" },
    { id: "drag-constraints-ref", title: "Drag Constraints", description: "Drag with ref constraints", icon: "👆" },
    { id: "drag-to-reorder", title: "Drag to Reorder", description: "Reorderable list", icon: "👆" },
    { id: "drag-use-drag-controls", title: "Drag Controls", description: "External drag controls", icon: "👆" },
    { id: "drag-nested", title: "Nested Drag", description: "Nested draggable elements", icon: "👆" },
    // New Drag
    { id: "drag-block-viewport-conditionally", title: "Block Viewport", description: "Conditionally block viewport", icon: "👆" },
    { id: "drag-constraints-ref-small-container", title: "Small Container", description: "Constraints in small container", icon: "👆" },
    { id: "drag-constraints-ref-small-container-layout", title: "Small Layout", description: "Constraints layout", icon: "👆" },
    { id: "drag-constraints-relative", title: "Relative Constraints", description: "Relative drag constraints", icon: "👆" },
    { id: "drag-constraints-resize", title: "Constraints Resize", description: "Constraints on resize", icon: "👆" },
    { id: "drag-external-handlers", title: "External Handlers", description: "Drag external handlers", icon: "👆" },
    { id: "drag-shared-layout", title: "Shared Layout Drag", description: "Drag with shared layout", icon: "👆" },
    { id: "drag-svg", title: "SVG Drag", description: "Draggable SVG", icon: "👆" },
    { id: "drag-use-drag-controls-snap-to-cursor", title: "Snap to Cursor", description: "Drag snap to cursor", icon: "👆" },
    // Events examples
    { id: "events-while-hover", title: "While Hover", description: "Hover interactions", icon: "🖱️" },
    { id: "events-while-tap", title: "While Tap", description: "Tap interactions", icon: "🖱️" },
    { id: "events-on-tap", title: "On Tap", description: "Tap event handling", icon: "🖱️" },
    // New Events
    { id: "events-pan", title: "Pan", description: "Pan events", icon: "🖱️" },
    { id: "events-while-focus", title: "While Focus", description: "Focus interactions", icon: "🖱️" },
    { id: "events-while-focus-variants", title: "Focus Variants", description: "Focus with variants", icon: "🖱️" },
    { id: "events-while-hover-unit-conversion", title: "Hover Units", description: "Hover unit conversion", icon: "🖱️" },
    { id: "events-while-tap-cancel-on-scroll", title: "Tap Cancel Scroll", description: "Tap cancel on scroll", icon: "🖱️" },
    { id: "events-while-tap-global", title: "Global Tap", description: "Global tap target", icon: "🖱️" },
    { id: "events-while-tap-variants", title: "Tap Variants", description: "Tap variants", icon: "🖱️" },
    // Layout examples
    { id: "layout-rotate", title: "Layout Rotate", description: "Layout animation with rotation", icon: "✏️" },
    { id: "layout-skew", title: "Layout Skew", description: "Layout animation with skew", icon: "✏️" },
    { id: "layout-projection-scale-position", title: "Scale Position", description: "Projection based layout animation", icon: "✏️" },
    // New Layout
    { id: "layout-projection-correct-style-border-radius", title: "Border Radius", description: "Correct style border radius", icon: "✏️" },
    { id: "layout-projection-custom-values", title: "Custom Values", description: "Projection custom values", icon: "✏️" },
    { id: "layout-projection-scale-correction-border-radius", title: "Scale Radius", description: "Scale correction border radius", icon: "✏️" },
    { id: "layout-projection-scale-correction-shadow", title: "Scale Shadow", description: "Scale correction shadow", icon: "✏️" },
    { id: "layout-projection-scale-size", title: "Scale Size", description: "Scale size projection", icon: "✏️" },
    { id: "layout-svg", title: "Layout SVG", description: "SVG layout animation", icon: "✏️" },
    // Shared Layout examples
    { id: "shared-layout-continuity-crossfade", title: "Continuity Crossfade", description: "Shared layout crossfade", icon: "🔗" },
    { id: "shared-layout-continuity", title: "Shared Layout Continuity", description: "Shared layout continuity", icon: "🔗" },
    { id: "shared-layout-lightbox-crossfade", title: "Lightbox Crossfade", description: "Lightbox with crossfade", icon: "🔗" },
    { id: "shared-layout-lightbox", title: "Lightbox", description: "Shared layout lightbox", icon: "🔗" },
    { id: "shared-layout-lists", title: "Lists", description: "Shared layout lists", icon: "🔗" },
    { id: "shared-layout-motion-value-continuity", title: "Motion Value", description: "Shared motion value continuity", icon: "🔗" },
    { id: "shared-layout-nested-inset-elements-no-layout", title: "Nested No Layout", description: "Nested inset without layout", icon: "🔗" },
    { id: "shared-layout-nested-inset-elements", title: "Nested Inset", description: "Nested inset elements", icon: "🔗" },
    { id: "shared-layout-reparenting", title: "Reparenting", description: "Shared layout reparenting", icon: "🔗" },
    { id: "shared-layout-reparenting-transform-template", title: "Reparent Transform", description: "Reparenting transform template", icon: "🔗" },
    { id: "shared-layout-rotate", title: "Shared Rotate", description: "Shared layout rotation", icon: "🔗" },
    { id: "shared-layout-sibling-to-child", title: "Sibling to Child", description: "Sibling to child animation", icon: "🔗" },
    { id: "shared-layout-skew", title: "Shared Skew", description: "Shared layout skew", icon: "🔗" },
    { id: "shared-layout-toggle-details", title: "Toggle Details", description: "Shared layout toggle details", icon: "🔗" },
    // SVG examples
    { id: "svg-layout-animation", title: "SVG Layout", description: "SVG layout animation", icon: "🧩" },
    { id: "svg-motion-value", title: "Motion Value", description: "SVG MotionValue", icon: "🧩" },
    { id: "svg-path", title: "SVG Path", description: "SVG path animation", icon: "🧩" },
    { id: "svg-text-motion-value-child", title: "Text Child", description: "SVG Text MotionValue Child", icon: "🧩" },
    { id: "svg-transform", title: "Transform", description: "SVG Transform", icon: "🧩" },
    { id: "svg-without-initial-values", title: "No Initial", description: "SVG without initial values", icon: "🧩" },
    // Hooks examples
    { id: "hooks-use-animated-state", title: "useAnimatedState", description: "useAnimatedState hook", icon: "🪝" },
    { id: "hooks-use-animation", title: "useAnimation", description: "Animation control hook", icon: "🪝" },
    { id: "hooks-use-instant-transition", title: "useInstantTransition", description: "useInstantTransition hook", icon: "🪝" },
    { id: "hooks-use-presence", title: "usePresence", description: "usePresence hook", icon: "🪝" },
    { id: "hooks-use-reduced-motion", title: "useReducedMotion", description: "useReducedMotion hook", icon: "🪝" },
    { id: "hooks-use-scroll", title: "useScroll", description: "Scroll animation hook", icon: "🪝" },
    { id: "hooks-use-spring", title: "useSpring", description: "Spring animation hook", icon: "🪝" },
    { id: "hooks-use-transform-with-use-layout-effect", title: "useTransform Layout", description: "useTransform with useLayoutEffect", icon: "🪝" },
    { id: "hooks-use-velocity", title: "useVelocity", description: "useVelocity hook", icon: "🪝" },
    { id: "hooks-use-viewport-scroll", title: "useViewportScroll", description: "useViewportScroll hook", icon: "🪝" },
    // WAAPI examples
    { id: "waapi-background-color", title: "WAAPI Color", description: "Web Animations API color", icon: "🌊" },
    { id: "waapi-interrupt", title: "Interrupt", description: "WAAPI Interrupt", icon: "🌊" },
    { id: "waapi-opacity-orchestration", title: "Opacity Orchestration", description: "WAAPI Opacity Orchestration", icon: "🌊" },
    { id: "waapi-opacity", title: "WAAPI Opacity", description: "Web Animations API opacity", icon: "🌊" },
    // Misc examples
    { id: "misc-lazy-motion-async", title: "Lazy Motion", description: "Async lazy loading", icon: "🏁" },
    { id: "misc-lazy-motion-sync", title: "Lazy Motion Sync", description: "Sync lazy loading", icon: "🏁" },
    { id: "misc-motion-custom-tag", title: "Custom Tag", description: "Custom motion component", icon: "🏁" },
    { id: "misc-motion-variants-race", title: "Variants Race", description: "Variants race example", icon: "🏁" },
    { id: "misc-motion-config-is-static", title: "Is Static", description: "MotionConfig isStatic", icon: "🏁" },
    { id: "misc-motion-config-nonce", title: "Nonce", description: "MotionConfig nonce", icon: "🏁" },
    { id: "misc-prop-ref", title: "Prop Ref", description: "Prop ref example", icon: "🏁" },
    { id: "misc-prop-style", title: "Prop Style", description: "Prop style example", icon: "🏁" },
    // Tests
    { id: "test-drag-propagation", title: "Drag Propagation", description: "Test Drag Propagation", icon: "🧪" },
    { id: "test-svg-layout-animation-correction", title: "SVG Layout Correction", description: "Test SVG Layout Animation Correction", icon: "🧪" },
    { id: "test-layout-transform", title: "Layout Transform", description: "Test Layout Transform", icon: "🧪" },
    { id: "test-layout-drag-transform", title: "Layout Drag Transform", description: "Test Layout Drag Transform", icon: "🧪" },
    { id: "test-drag-set-state", title: "Drag Set State", description: "Test Drag Set State", icon: "🧪" },
    { id: "test-drag-overdrag", title: "Drag Overdrag", description: "Test Drag Overdrag", icon: "🧪" },
    { id: "test-drag-external-control", title: "Drag External Control", description: "Test Drag External Control", icon: "🧪" },
    { id: "test-drag-device", title: "Drag Device", description: "Test Drag Device", icon: "🧪" },
    { id: "test-drag-containing-input", title: "Drag Containing Input", description: "Test Drag Containing Input", icon: "🧪" },
    { id: "test-drag-constraints-ref-smaller-than-child", title: "Drag Constraints Ref Small", description: "Test Drag Constraints Ref Smaller Than Child", icon: "🧪" },
    { id: "test-drag-constraints-ref-scale", title: "Drag Constraints Ref Scale", description: "Test Drag Constraints Ref Scale", icon: "🧪" },
    { id: "test-drag-constraints-ref", title: "Drag Constraints Ref", description: "Test Drag Constraints Ref", icon: "🧪" },
    { id: "test-drag-constraints", title: "Drag Constraints", description: "Test Drag Constraints", icon: "🧪" },
    { id: "test-drag-constraint-changes", title: "Drag Constraint Changes", description: "Test Drag Constraint Changes", icon: "🧪" },
    { id: "test-drag-clickable", title: "Drag Clickable", description: "Test Drag Clickable", icon: "🧪" },
    { id: "test-conditional-draggable", title: "Conditional Draggable", description: "Test Conditional Draggable", icon: "🧪" },
    { id: "test-animate-stress-external-motion-value", title: "Stress External Motion Value", description: "Test Animate Stress External Motion Value", icon: "🧪" },
    { id: "test-animate-stress-empty-transforms", title: "Stress Empty Transforms", description: "Test Animate Stress Empty Transforms", icon: "🧪" },
    { id: "test-drag-controls", title: "Drag Controls", description: "Test Drag Controls", icon: "🧪" },
    { id: "test-animate-stress-headless-x", title: "Stress Headless X", description: "Test Animate Stress Headless X", icon: "🧪" },
    { id: "test-animate-stress-headless-color", title: "Stress Headless Color", description: "Test Animate Stress Headless Color", icon: "🧪" },
] as const satisfies readonly { id: MotionExampleId; title: string; description?: string; icon?: string; }[];
