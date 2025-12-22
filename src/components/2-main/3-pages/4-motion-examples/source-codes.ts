// Import all source files using Vite's import.meta.glob with ?raw
// This ensures we get the source code string for each example
const sourceModules = import.meta.glob<string>([
    './1-animate-presence/*.tsx',
    './2-animation/*.tsx', 
    './3-drag/*.tsx',
    './4-events/*.tsx',
], { query: '?raw', import: 'default', eager: true });

// Convert file paths to demo IDs
function pathToDemoId(path: string): string {
    // Extract filename without extension
    const filename = path.split('/').pop()?.replace('.tsx', '') || '';
    
    // Convert to kebab-case and lowercase
    let demoId = filename
        // Insert dash before uppercase letters (for camelCase conversion if needed)
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .toLowerCase();
    
    // Handle specific prefixes/fixes to match the IDs in 9-types.ts
    
    // Fix: CSS -> css (already handled by toLowerCase)
    // Animation-CSS-variables -> animation-css-variables
    
    return demoId;
}

// Build the source codes map
export const demoSourceCodes: Record<string, string> = {};

for (const [path, content] of Object.entries(sourceModules)) {
    const demoId = pathToDemoId(path);
    demoSourceCodes[demoId] = content;
}

// Debug: Log available keys to console
console.log("[SourceCodes] Loaded", Object.keys(demoSourceCodes).length, "examples");
// console.log("[SourceCodes] Keys:", Object.keys(demoSourceCodes));
