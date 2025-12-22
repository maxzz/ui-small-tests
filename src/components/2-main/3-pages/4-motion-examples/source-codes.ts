// Import all source files using Vite's import.meta.glob with ?raw
const sourceModules = import.meta.glob<string>([
    './1-animate-presence/*.tsx',
    './2-animation/*.tsx', 
    './3-drag/*.tsx',
    './4-events/*.tsx',
], { query: '?raw', import: 'default', eager: true });

// Convert file paths to demo IDs
// e.g. "./1-animate-presence/AnimatePresence.tsx" -> "animate-presence"
// e.g. "./1-animate-presence/AnimatePresence-image-gallery.tsx" -> "animate-presence-image-gallery"
// e.g. "./2-animation/Animation-animate.tsx" -> "animation-animate"
// e.g. "./3-drag/Drag-draggable.tsx" -> "drag-draggable"
// e.g. "./4-events/Events-whileHover.tsx" -> "events-while-hover"
function pathToDemoId(path: string): string {
    // Extract filename without extension
    const filename = path.split('/').pop()?.replace('.tsx', '') || '';
    
    // Convert to kebab-case and lowercase
    let demoId = filename
        // Insert dash before uppercase letters (for camelCase conversion)
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .toLowerCase();
    
    // Handle specific prefixes to match the expected demo IDs
    // AnimatePresence -> animate-presence
    // Animation -> animation
    // Drag -> drag
    // Events -> events
    
    return demoId;
}

// Build the source codes map
export const demoSourceCodes: Record<string, string> = {};

for (const [path, content] of Object.entries(sourceModules)) {
    const demoId = pathToDemoId(path);
    demoSourceCodes[demoId] = content;
    // Also log each mapping for debugging
    console.log(`Mapped: ${path} -> "${demoId}" (${content?.length || 0} chars)`);
}

// Debug: log what was imported
console.log("Total source codes loaded:", Object.keys(demoSourceCodes).length);
console.log("All demo IDs:", Object.keys(demoSourceCodes));
