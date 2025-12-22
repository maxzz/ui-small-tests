import { useEffect, useMemo, useRef } from "react";
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
import { demoSourceCodes } from "../3-pages/4-motion-examples/source-codes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn/tabs";
// import { CardsDemoWithTooltip } from "../../ui/local/8-mouse-tracker/x-nun-all-wrapper-w-tooltip";

// Simple syntax highlighter for TSX code
function highlightCode(code: string): React.ReactNode[] {
    const lines = code.split('\n');
    
    return lines.map((line, lineIndex) => {
        // Step 1: Escape HTML to prevent XSS and confusion
        let safeLine = line
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        // Step 2: Extract strings and comments to placeholders so they aren't processed by other regexes
        const tokens: { type: string, content: string }[] = [];
        const placeholders: string[] = [];
        
        const storeToken = (type: string, content: string) => {
            const id = `__TOKEN_${tokens.length}__`;
            tokens.push({ type, content });
            placeholders.push(id);
            return id;
        };

        // Replace comments first
        let processedLine = safeLine
            .replace(/(\/\/.*$)/g, (match) => storeToken('comment', match))
            .replace(/(\/\*[\s\S]*?\*\/)/g, (match) => storeToken('comment', match));

        // Replace strings
        processedLine = processedLine
            .replace(/(&quot;(?:[^&]|&(?!quot;))*&quot;)/g, (match) => storeToken('string', match))
            .replace(/(&#39;(?:[^&]|&(?!#39;))*&#39;)/g, (match) => storeToken('string', match))
            .replace(/(`(?:[^`\\]|\\.)*`)/g, (match) => storeToken('string', match));

        // Step 3: Highlight keywords and other elements in the remaining text
        // (Now safe because strings/comments are hidden)
        
        processedLine = processedLine
            // Keywords
            .replace(/\b(import|export|from|const|let|var|function|return|if|else|switch|case|default|break|continue|for|while|do|try|catch|finally|throw|new|typeof|instanceof|class|extends|implements|interface|type|enum|async|await|yield|static|get|set|public|private|protected|readonly|as|is)\b/g, 
                '<span class="text-purple-600 dark:text-purple-400 font-medium">$1</span>')
            // React/JSX hooks
            .replace(/\b(React|useState|useEffect|useRef|useMemo|useCallback|useContext|useReducer|forwardRef)\b/g, 
                '<span class="text-cyan-600 dark:text-cyan-400">$1</span>')
            // Types
            .replace(/\b(string|number|boolean|null|undefined|void|any|never|unknown|object|Array|Promise|Record)\b/g, 
                '<span class="text-sky-600 dark:text-sky-400">$1</span>')
            // Numbers (careful not to match inside existing tags, though tags should mostly be class names now)
            // We use a lookahead to ensure we aren't inside a tag attribute if possible, but placeholders help.
            // Actually, we inserted HTML tags above. "text-purple-600" contains "600".
            // So we MUST mask the HTML tags we just added too!
            
            // Wait, simpler approach: Don't add HTML tags yet. Add placeholders for EVERYTHING.
            
        // ... (Re-thinking strategy to be fully safe) ...
        
        // Let's go back to single-pass replacements but be very careful about order and matches.
        // OR better: Just use the placeholders for the HTML tags too?
        
        // Let's refine the placeholder strategy:
        // 1. Comments -> PLACEHOLDER
        // 2. Strings -> PLACEHOLDER
        // 3. Keywords -> PLACEHOLDER
        // 4. ...
        // 5. Restore all placeholders with their final HTML.
        
        // Actually, the "600" inside "text-purple-600" is the main culprit visible in the screenshot.
        // If I perform all replacements and *then* re-insert them, I avoid matching inside the HTML.
        
        // Let's do the "Mask everything then Unmask" approach.
        
        return (
            <div key={lineIndex} className="flex hover:bg-muted/50">
                <span className="w-12 text-right pr-4 text-muted-foreground/50 select-none border-r border-border/50 mr-4">{lineIndex + 1}</span>
                <span dangerouslySetInnerHTML={{ __html: simpleHighlight(safeLine) }} />
            </div>
        );
    });
}

function simpleHighlight(line: string): string {
    // 1. Mask strings and comments
    const tokens: string[] = [];
    const mask = (str: string) => {
        const id = `___TOKEN_${tokens.length}___`;
        tokens.push(str);
        return id;
    };

    let temp = line
        .replace(/(\/\/.*$)/g, m => mask(`<span class="text-emerald-600 dark:text-emerald-400">${m}</span>`))
        .replace(/(&quot;.*?&quot;|&#39;.*?&#39;|`.*?`)/g, m => mask(`<span class="text-amber-600 dark:text-amber-400">${m}</span>`));

    // 2. Highlight Keywords (now safe from strings/comments)
    temp = temp
        .replace(/\b(import|export|from|const|let|var|function|return|if|else|switch|case|default|break|continue|for|while|do|try|catch|finally|throw|new|typeof|instanceof|class|extends|implements|interface|type|enum|async|await|yield|static|get|set|public|private|protected|readonly|as|is)\b/g, 
            m => mask(`<span class="text-purple-600 dark:text-purple-400 font-medium">${m}</span>`))
        .replace(/\b(React|useState|useEffect|useRef|useMemo|useCallback|useContext|useReducer|forwardRef)\b/g, 
            m => mask(`<span class="text-cyan-600 dark:text-cyan-400">${m}</span>`))
        .replace(/\b(string|number|boolean|null|undefined|void|any|never|unknown|object|Array|Promise|Record)\b/g, 
            m => mask(`<span class="text-sky-600 dark:text-sky-400">${m}</span>`))
        .replace(/\b(\d+)\b/g, 
            m => mask(`<span class="text-orange-500 dark:text-orange-400">${m}</span>`))
        .replace(/\b(true|false)\b/g, 
            m => mask(`<span class="text-orange-600 dark:text-orange-400 font-medium">${m}</span>`));

    // 3. Restore all tokens
    // We need to restore recursively or loop because we replaced with masks that contain the content?
    // No, we stored the *final HTML* in the tokens array.
    // So we just replace the placeholder IDs with the stored HTML.
    
    // Reverse order restoration isn't strictly necessary if IDs are unique, but good practice.
    // However, since we masked sequentially, we can just replace all occurrences.
    
    tokens.forEach((content, i) => {
        temp = temp.replace(`___TOKEN_${i}___`, content);
    });

    return temp;
}

// Wrapper component for demos with tabs (Demo + Source Code)
function DemoWithTabs({ demoId, children }: { demoId: LeftViewId; children: React.ReactNode }) {
    const sourceCode = demoSourceCodes[demoId];
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
                        <code>{highlightCode(displayCode)}</code>
                    </pre>
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
        case "events-while-hover":
            return <DemoWithTabs demoId="events-while-hover"><MotionExamples.EventsWhileHoverDemo /></DemoWithTabs>;
        case "events-while-tap":
            return <DemoWithTabs demoId="events-while-tap"><MotionExamples.EventsWhileTapDemo /></DemoWithTabs>;
        case "events-on-tap":
            return <DemoWithTabs demoId="events-on-tap"><MotionExamples.EventsOnTapDemo /></DemoWithTabs>;
        // New Events
        case "events-pan": return <DemoWithTabs demoId="events-pan"><MotionExamples.EventsPanDemo /></DemoWithTabs>;
        case "events-while-focus": return <DemoWithTabs demoId="events-while-focus"><MotionExamples.EventsWhileFocusDemo /></DemoWithTabs>;
        case "events-while-focus-variants": return <DemoWithTabs demoId="events-while-focus-variants"><MotionExamples.EventsWhileFocusVariantsDemo /></DemoWithTabs>;
        case "events-while-hover-unit-conversion": return <DemoWithTabs demoId="events-while-hover-unit-conversion"><MotionExamples.EventsWhileHoverUnitConversionDemo /></DemoWithTabs>;
        case "events-while-tap-cancel-on-scroll": return <DemoWithTabs demoId="events-while-tap-cancel-on-scroll"><MotionExamples.EventsWhileTapCancelOnScrollDemo /></DemoWithTabs>;
        case "events-while-tap-global": return <DemoWithTabs demoId="events-while-tap-global"><MotionExamples.EventsWhileTapGlobalDemo /></DemoWithTabs>;
        case "events-while-tap-variants": return <DemoWithTabs demoId="events-while-tap-variants"><MotionExamples.EventsWhileTapVariantsDemo /></DemoWithTabs>;

        // Layout examples
        case "layout-rotate":
            return <DemoWithTabs demoId="layout-rotate"><MotionExamples.LayoutRotateDemo /></DemoWithTabs>;
        case "layout-skew":
            return <DemoWithTabs demoId="layout-skew"><MotionExamples.LayoutSkewDemo /></DemoWithTabs>;
        case "layout-projection-scale-position":
            return <DemoWithTabs demoId="layout-projection-scale-position"><MotionExamples.LayoutProjectionScalePositionDemo /></DemoWithTabs>;
        // New Layout
        case "layout-projection-correct-style-border-radius": return <DemoWithTabs demoId="layout-projection-correct-style-border-radius"><MotionExamples.LayoutProjectionCorrectStyleBorderRadiusDemo /></DemoWithTabs>;
        case "layout-projection-custom-values": return <DemoWithTabs demoId="layout-projection-custom-values"><MotionExamples.LayoutProjectionCustomValuesDemo /></DemoWithTabs>;
        case "layout-projection-scale-correction-border-radius": return <DemoWithTabs demoId="layout-projection-scale-correction-border-radius"><MotionExamples.LayoutProjectionScaleCorrectionBorderRadiusDemo /></DemoWithTabs>;
        case "layout-projection-scale-correction-shadow": return <DemoWithTabs demoId="layout-projection-scale-correction-shadow"><MotionExamples.LayoutProjectionScaleCorrectionShadowDemo /></DemoWithTabs>;
        case "layout-projection-scale-size": return <DemoWithTabs demoId="layout-projection-scale-size"><MotionExamples.LayoutProjectionScaleSizeDemo /></DemoWithTabs>;
        case "layout-svg": return <DemoWithTabs demoId="layout-svg"><MotionExamples.LayoutSvgDemo /></DemoWithTabs>;

        // Shared Layout examples
        case "shared-layout-continuity":
            return <DemoWithTabs demoId="shared-layout-continuity"><MotionExamples.SharedLayoutContinuityDemo /></DemoWithTabs>;
        case "shared-layout-lightbox":
            return <DemoWithTabs demoId="shared-layout-lightbox"><MotionExamples.SharedLayoutLightboxDemo /></DemoWithTabs>;
        case "shared-layout-lists":
            return <DemoWithTabs demoId="shared-layout-lists"><MotionExamples.SharedLayoutListsDemo /></DemoWithTabs>;
        case "shared-layout-toggle-details":
            return <DemoWithTabs demoId="shared-layout-toggle-details"><MotionExamples.SharedLayoutToggleDetailsDemo /></DemoWithTabs>;
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
        case "svg-path":
            return <DemoWithTabs demoId="svg-path"><MotionExamples.SvgPathDemo /></DemoWithTabs>;
        case "svg-layout-animation":
            return <DemoWithTabs demoId="svg-layout-animation"><MotionExamples.SvgLayoutAnimationDemo /></DemoWithTabs>;
        // New SVG
        case "svg-motion-value": return <DemoWithTabs demoId="svg-motion-value"><MotionExamples.SvgMotionValueDemo /></DemoWithTabs>;
        case "svg-text-motion-value-child": return <DemoWithTabs demoId="svg-text-motion-value-child"><MotionExamples.SvgTextMotionValueChildDemo /></DemoWithTabs>;
        case "svg-transform": return <DemoWithTabs demoId="svg-transform"><MotionExamples.SvgTransformDemo /></DemoWithTabs>;
        case "svg-without-initial-values": return <DemoWithTabs demoId="svg-without-initial-values"><MotionExamples.SvgWithoutInitialValuesDemo /></DemoWithTabs>;

        // Hooks examples
        case "hooks-use-scroll":
            return <DemoWithTabs demoId="hooks-use-scroll"><MotionExamples.HooksUseScrollDemo /></DemoWithTabs>;
        case "hooks-use-spring":
            return <DemoWithTabs demoId="hooks-use-spring"><MotionExamples.HooksUseSpringDemo /></DemoWithTabs>;
        case "hooks-use-animation":
            return <DemoWithTabs demoId="hooks-use-animation"><MotionExamples.HooksUseAnimationDemo /></DemoWithTabs>;
        // New Hooks
        case "hooks-use-animated-state": return <DemoWithTabs demoId="hooks-use-animated-state"><MotionExamples.HooksUseAnimatedStateDemo /></DemoWithTabs>;
        case "hooks-use-instant-transition": return <DemoWithTabs demoId="hooks-use-instant-transition"><MotionExamples.HooksUseInstantTransitionDemo /></DemoWithTabs>;
        case "hooks-use-presence": return <DemoWithTabs demoId="hooks-use-presence"><MotionExamples.HooksUsePresenceDemo /></DemoWithTabs>;
        case "hooks-use-reduced-motion": return <DemoWithTabs demoId="hooks-use-reduced-motion"><MotionExamples.HooksUseReducedMotionDemo /></DemoWithTabs>;
        case "hooks-use-transform-with-use-layout-effect": return <DemoWithTabs demoId="hooks-use-transform-with-use-layout-effect"><MotionExamples.HooksUseTransformWithUseLayoutEffectDemo /></DemoWithTabs>;
        case "hooks-use-velocity": return <DemoWithTabs demoId="hooks-use-velocity"><MotionExamples.HooksUseVelocityDemo /></DemoWithTabs>;
        case "hooks-use-viewport-scroll": return <DemoWithTabs demoId="hooks-use-viewport-scroll"><MotionExamples.HooksUseViewportScrollDemo /></DemoWithTabs>;

        // WAAPI examples
        case "waapi-background-color":
            return <DemoWithTabs demoId="waapi-background-color"><MotionExamples.WaapiBackgroundColorDemo /></DemoWithTabs>;
        case "waapi-opacity":
            return <DemoWithTabs demoId="waapi-opacity"><MotionExamples.WaapiOpacityDemo /></DemoWithTabs>;
        // New WAAPI
        case "waapi-interrupt": return <DemoWithTabs demoId="waapi-interrupt"><MotionExamples.WaapiInterruptDemo /></DemoWithTabs>;
        case "waapi-opacity-orchestration": return <DemoWithTabs demoId="waapi-opacity-orchestration"><MotionExamples.WaapiOpacityOrchestrationDemo /></DemoWithTabs>;

        // Misc examples
        case "misc-motion-custom-tag":
            return <DemoWithTabs demoId="misc-motion-custom-tag"><MotionExamples.MotionCustomTagDemo /></DemoWithTabs>;
        case "misc-lazy-motion-async":
            return <DemoWithTabs demoId="misc-lazy-motion-async"><MotionExamples.LazyMotionAsyncDemo /></DemoWithTabs>;
        // New Misc
        case "misc-lazy-motion-sync": return <DemoWithTabs demoId="misc-lazy-motion-sync"><MotionExamples.LazyMotionSyncDemo /></DemoWithTabs>;
        case "misc-motion-config-is-static": return <DemoWithTabs demoId="misc-motion-config-is-static"><MotionExamples.MotionConfigIsStaticDemo /></DemoWithTabs>;
        case "misc-motion-config-nonce": return <DemoWithTabs demoId="misc-motion-config-nonce"><MotionExamples.MotionConfigNonceDemo /></DemoWithTabs>;
        case "misc-prop-ref": return <DemoWithTabs demoId="misc-prop-ref"><MotionExamples.PropRefDemo /></DemoWithTabs>;
        case "misc-prop-style": return <DemoWithTabs demoId="misc-prop-style"><MotionExamples.PropStyleDemo /></DemoWithTabs>;

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
        case "events-while-hover":
            return <DemoWithTabs demoId="events-while-hover"><MotionExamples.EventsWhileHoverDemo /></DemoWithTabs>;
        case "events-while-tap":
            return <DemoWithTabs demoId="events-while-tap"><MotionExamples.EventsWhileTapDemo /></DemoWithTabs>;
        case "events-on-tap":
            return <DemoWithTabs demoId="events-on-tap"><MotionExamples.EventsOnTapDemo /></DemoWithTabs>;
        // New Events
        case "events-pan": return <DemoWithTabs demoId="events-pan"><MotionExamples.EventsPanDemo /></DemoWithTabs>;
        case "events-while-focus": return <DemoWithTabs demoId="events-while-focus"><MotionExamples.EventsWhileFocusDemo /></DemoWithTabs>;
        case "events-while-focus-variants": return <DemoWithTabs demoId="events-while-focus-variants"><MotionExamples.EventsWhileFocusVariantsDemo /></DemoWithTabs>;
        case "events-while-hover-unit-conversion": return <DemoWithTabs demoId="events-while-hover-unit-conversion"><MotionExamples.EventsWhileHoverUnitConversionDemo /></DemoWithTabs>;
        case "events-while-tap-cancel-on-scroll": return <DemoWithTabs demoId="events-while-tap-cancel-on-scroll"><MotionExamples.EventsWhileTapCancelOnScrollDemo /></DemoWithTabs>;
        case "events-while-tap-global": return <DemoWithTabs demoId="events-while-tap-global"><MotionExamples.EventsWhileTapGlobalDemo /></DemoWithTabs>;
        case "events-while-tap-variants": return <DemoWithTabs demoId="events-while-tap-variants"><MotionExamples.EventsWhileTapVariantsDemo /></DemoWithTabs>;

        // Layout examples
        case "layout-rotate":
            return <DemoWithTabs demoId="layout-rotate"><MotionExamples.LayoutRotateDemo /></DemoWithTabs>;
        case "layout-skew":
            return <DemoWithTabs demoId="layout-skew"><MotionExamples.LayoutSkewDemo /></DemoWithTabs>;
        case "layout-projection-scale-position":
            return <DemoWithTabs demoId="layout-projection-scale-position"><MotionExamples.LayoutProjectionScalePositionDemo /></DemoWithTabs>;
        // New Layout
        case "layout-projection-correct-style-border-radius": return <DemoWithTabs demoId="layout-projection-correct-style-border-radius"><MotionExamples.LayoutProjectionCorrectStyleBorderRadiusDemo /></DemoWithTabs>;
        case "layout-projection-custom-values": return <DemoWithTabs demoId="layout-projection-custom-values"><MotionExamples.LayoutProjectionCustomValuesDemo /></DemoWithTabs>;
        case "layout-projection-scale-correction-border-radius": return <DemoWithTabs demoId="layout-projection-scale-correction-border-radius"><MotionExamples.LayoutProjectionScaleCorrectionBorderRadiusDemo /></DemoWithTabs>;
        case "layout-projection-scale-correction-shadow": return <DemoWithTabs demoId="layout-projection-scale-correction-shadow"><MotionExamples.LayoutProjectionScaleCorrectionShadowDemo /></DemoWithTabs>;
        case "layout-projection-scale-size": return <DemoWithTabs demoId="layout-projection-scale-size"><MotionExamples.LayoutProjectionScaleSizeDemo /></DemoWithTabs>;
        case "layout-svg": return <DemoWithTabs demoId="layout-svg"><MotionExamples.LayoutSvgDemo /></DemoWithTabs>;

        // Shared Layout examples
        case "shared-layout-continuity":
            return <DemoWithTabs demoId="shared-layout-continuity"><MotionExamples.SharedLayoutContinuityDemo /></DemoWithTabs>;
        case "shared-layout-lightbox":
            return <DemoWithTabs demoId="shared-layout-lightbox"><MotionExamples.SharedLayoutLightboxDemo /></DemoWithTabs>;
        case "shared-layout-lists":
            return <DemoWithTabs demoId="shared-layout-lists"><MotionExamples.SharedLayoutListsDemo /></DemoWithTabs>;
        case "shared-layout-toggle-details":
            return <DemoWithTabs demoId="shared-layout-toggle-details"><MotionExamples.SharedLayoutToggleDetailsDemo /></DemoWithTabs>;
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
        case "svg-path":
            return <DemoWithTabs demoId="svg-path"><MotionExamples.SvgPathDemo /></DemoWithTabs>;
        case "svg-layout-animation":
            return <DemoWithTabs demoId="svg-layout-animation"><MotionExamples.SvgLayoutAnimationDemo /></DemoWithTabs>;
        // New SVG
        case "svg-motion-value": return <DemoWithTabs demoId="svg-motion-value"><MotionExamples.SvgMotionValueDemo /></DemoWithTabs>;
        case "svg-text-motion-value-child": return <DemoWithTabs demoId="svg-text-motion-value-child"><MotionExamples.SvgTextMotionValueChildDemo /></DemoWithTabs>;
        case "svg-transform": return <DemoWithTabs demoId="svg-transform"><MotionExamples.SvgTransformDemo /></DemoWithTabs>;
        case "svg-without-initial-values": return <DemoWithTabs demoId="svg-without-initial-values"><MotionExamples.SvgWithoutInitialValuesDemo /></DemoWithTabs>;

        // Hooks examples
        case "hooks-use-scroll":
            return <DemoWithTabs demoId="hooks-use-scroll"><MotionExamples.HooksUseScrollDemo /></DemoWithTabs>;
        case "hooks-use-spring":
            return <DemoWithTabs demoId="hooks-use-spring"><MotionExamples.HooksUseSpringDemo /></DemoWithTabs>;
        case "hooks-use-animation":
            return <DemoWithTabs demoId="hooks-use-animation"><MotionExamples.HooksUseAnimationDemo /></DemoWithTabs>;
        // New Hooks
        case "hooks-use-animated-state": return <DemoWithTabs demoId="hooks-use-animated-state"><MotionExamples.HooksUseAnimatedStateDemo /></DemoWithTabs>;
        case "hooks-use-instant-transition": return <DemoWithTabs demoId="hooks-use-instant-transition"><MotionExamples.HooksUseInstantTransitionDemo /></DemoWithTabs>;
        case "hooks-use-presence": return <DemoWithTabs demoId="hooks-use-presence"><MotionExamples.HooksUsePresenceDemo /></DemoWithTabs>;
        case "hooks-use-reduced-motion": return <DemoWithTabs demoId="hooks-use-reduced-motion"><MotionExamples.HooksUseReducedMotionDemo /></DemoWithTabs>;
        case "hooks-use-transform-with-use-layout-effect": return <DemoWithTabs demoId="hooks-use-transform-with-use-layout-effect"><MotionExamples.HooksUseTransformWithUseLayoutEffectDemo /></DemoWithTabs>;
        case "hooks-use-velocity": return <DemoWithTabs demoId="hooks-use-velocity"><MotionExamples.HooksUseVelocityDemo /></DemoWithTabs>;
        case "hooks-use-viewport-scroll": return <DemoWithTabs demoId="hooks-use-viewport-scroll"><MotionExamples.HooksUseViewportScrollDemo /></DemoWithTabs>;

        // WAAPI examples
        case "waapi-background-color":
            return <DemoWithTabs demoId="waapi-background-color"><MotionExamples.WaapiBackgroundColorDemo /></DemoWithTabs>;
        case "waapi-opacity":
            return <DemoWithTabs demoId="waapi-opacity"><MotionExamples.WaapiOpacityDemo /></DemoWithTabs>;
        // New WAAPI
        case "waapi-interrupt": return <DemoWithTabs demoId="waapi-interrupt"><MotionExamples.WaapiInterruptDemo /></DemoWithTabs>;
        case "waapi-opacity-orchestration": return <DemoWithTabs demoId="waapi-opacity-orchestration"><MotionExamples.WaapiOpacityOrchestrationDemo /></DemoWithTabs>;

        // Misc examples
        case "misc-motion-custom-tag":
            return <DemoWithTabs demoId="misc-motion-custom-tag"><MotionExamples.MotionCustomTagDemo /></DemoWithTabs>;
        case "misc-lazy-motion-async":
            return <DemoWithTabs demoId="misc-lazy-motion-async"><MotionExamples.LazyMotionAsyncDemo /></DemoWithTabs>;
        // New Misc
        case "misc-lazy-motion-sync": return <DemoWithTabs demoId="misc-lazy-motion-sync"><MotionExamples.LazyMotionSyncDemo /></DemoWithTabs>;
        case "misc-motion-config-is-static": return <DemoWithTabs demoId="misc-motion-config-is-static"><MotionExamples.MotionConfigIsStaticDemo /></DemoWithTabs>;
        case "misc-motion-config-nonce": return <DemoWithTabs demoId="misc-motion-config-nonce"><MotionExamples.MotionConfigNonceDemo /></DemoWithTabs>;
        case "misc-prop-ref": return <DemoWithTabs demoId="misc-prop-ref"><MotionExamples.PropRefDemo /></DemoWithTabs>;
        case "misc-prop-style": return <DemoWithTabs demoId="misc-prop-style"><MotionExamples.PropStyleDemo /></DemoWithTabs>;

        default: {
            const _exhaustiveCheck: never = rightView;
            return null;
        }
    }
}
