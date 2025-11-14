# UI Small Tests - AI Coding Instructions

## Project Overview

React + Vite + TypeScript playground for testing UI components. A demo viewer app with **dual-entry architecture**: main viewer (`index.html`) and isolated dashboard demo (`index-dashboard.html`).

## Architecture & Structure

### Dual-Entry Points
- **Main app** (`src/main.tsx` → `index.html`): Full viewer with sidebar, header, footer, and resizable panels
- **Dashboard demo** (`src/main-dashboard-entry.tsx` → `index-dashboard.html`): Standalone isolated demo for iframe embedding
- Configured in `vite.config.ts` rollup input options

### Component Hierarchy (Numbered Sections)
Components use numbered prefixes for execution/render order:
- `0-all/0-app.tsx` - Root application component
- `1-header/` - Header with toolbar and theme/view selectors
- `2-main/` - Main content area split into:
  - `1-left-list/` - Sidebar with resizable demo/props groups
  - `2-right-view/` - Content renderer (cards, dashboard, etc.)
  - `3-pages/` - Individual demo pages
- `3-footer/` - Footer component

### State Management (Valtio)
Primary state in `src/store/0-local-storage/`:
- **`1-load-save.ts`**: Global `appSettings` proxy with localStorage sync
- **`0-default-store.tsx`**: `AppUISettings` type definition
- **`9-types.ts`**: View types with literal unions (see Type Patterns below)
- Pattern: `proxy()` + `subscribe()` for auto-save to localStorage under versioned key `ui-small-tests.v1`
- Theme changes auto-apply via `themeApplyMode()` subscription

### UI Component Organization
Three distinct UI directories in `src/components/ui/`:
1. **`shadcn/`** - shadcn/ui components (standard, aliased to `@/components/ui/shadcn` in `components.json`)
2. **`local/`** - Custom project-specific components (dnd-target, mouse-tracker)
3. **`nun/`** - Utility components like `iframe-portal.tsx` for rendering React into same-origin iframes

### IframePortal Pattern
`src/components/ui/nun/iframe-portal.tsx` renders children into iframe via React portal:
- Copies parent stylesheets (including Tailwind) into iframe head
- Ensures isolated styling for embedded demos
- Used for dashboard/demo isolation in right panel

## Development Workflows

### Commands
```bash
pnpm dev          # Dev server on :3000
pnpm build        # TypeScript check + Vite build
pnpm tsc          # Watch mode TypeScript compilation
pnpm test         # Vitest
pnpm preview      # Preview production build
```

### Path Aliases
- `@/*` → `src/*` (configured in `tsconfig.json` + `vite.config.ts`)
- Import from `@/store/0-local-storage`, `@/utils`, `@/components/ui/shadcn`

### TypeScript Config
- Project references: `tsconfig.app.json` (app code) + `tsconfig.node.json` (build config)
- Base config in `tsconfig.json` with paths

## Type Patterns & Conventions

### Literal Union Types with `as const satisfies`
Pattern in `src/store/0-local-storage/9-types.ts`:
```typescript
export type LeftViewItem = {
    id: LeftViewId;
    title: string;
    description?: string;
    icon?: string;
};

export const LeftViewItems = [
    { id: "cards", title: "Cards", description: "Cards demo", icon: "📊" },
    { id: "dashboard", title: "Dashboard", /*...*/ },
] as const satisfies readonly LeftViewItem[];

export type LeftViewId = typeof LeftViewItems[number]["id"]; // "cards" | "dashboard" | ...
```
- Use `as const satisfies readonly Type[]` to **validate structure** while **preserving literal types**
- Extract literal union with `typeof Items[number]["id"]`
- Never use explicit `Type[]` annotation on const arrays meant for literal extraction

### Valtio State Access
Always use `useSnapshot()` for reactive reads in components:
```typescript
const { sidebarLeftOpen } = useSnapshot(appSettings.appUi);
```
Direct mutation for writes: `appSettings.appUi.sidebarLeftOpen = open`

## Styling Conventions

### Tailwind v4
- Uses `@tailwindcss/vite` plugin (Tailwind v4)
- Custom plugins: `tailwindcss-plugin-debug-screens-tw4`, `tw-animate-css`
- Theme mode applied via `dark` class on `<html>` element
- Prefix `1` on classes for debugging/temporary styles (e.g., `1bg-red-500`)

### Class String Formatting
Multi-line template string pattern for complex classes:
```typescript
const classes = "\
px-4 h-10 \
text-gray-500 dark:text-slate-600 \
border-b \
";
```

### Motion/Framer Motion
Uses `motion/react` (modern import path) for animations:
- `AnimatePresence` for conditional rendering transitions
- Example: header toolbar fade-in based on `leftTree` state

## Key Integration Points

### Resizable Panels
Uses `react-resizable-panels` with custom storage adapter:
- `src/store/0-local-storage/8-resizable-storage.tsx` implements `PanelGroupStorage` interface
- Pass `storage={panelsStorage}` and `autoSaveId` to persist layouts
- Pattern: `ResizablePanelGroup` → `ResizablePanel` + `ResizableHandle`

### Theme System
- Mode stored in `appSettings.appUi.themeMode` ("dark" | "light" | "system")
- Applied via `themeApplyMode()` in `src/utils/theme-apply.ts`
- Auto-subscription in `1-load-save.ts` syncs mode changes to DOM

### Icon Libraries
- Primary: `lucide-react` for UI icons
- Alternative: `@tabler/icons-react` available
- Custom icons in `src/components/ui/icons/`

## Component Authoring

### Export Pattern
Use barrel exports with `index.ts`:
```typescript
export * from "./1-component";
export * from "./2-another";
```

### Props Pattern
Extend HTML attributes for semantic elements:
```typescript
export function Section1_Header({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return <header className={classNames(baseClasses, className)} {...rest}>
}
```

### Snapshot + Callback Pattern
For Valtio state with UI callbacks:
```typescript
const { sidebarLeftOpen } = useSnapshot(appSettings.appUi);
const onSidebarLeftOpenChange = useCallback(
    (open: boolean) => appSettings.appUi.sidebarLeftOpen = open, 
    []
);
```

## Testing & Validation

- Vitest configured but minimal test coverage
- TypeScript strict mode enabled
- Run `pnpm tsc` before committing to catch type errors
- Check `:3000` for HMR during development

## Codebase Philosophy

This is a **rapid prototyping playground** for UI patterns and component experimentation. Prioritize:
1. Fast iteration over perfect abstraction
2. Visual debugging (notice `debug-screens` and `1`-prefixed classes)
3. Type safety via literal unions and `satisfies`
4. Component isolation (dual entries, iframe portals)
5. Persistent UI state across sessions
