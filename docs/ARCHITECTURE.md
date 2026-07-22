# Architecture

Presk is organized as a **feature-based modular** React Native application. The goal is to keep routing, domain logic, shared infrastructure, and UI clearly separated so the codebase stays maintainable as it grows.

## High-Level Principles

1. **Route files are thin.** `src/app/` only contains Expo Router routes, layouts, and groups. Screens are implemented in `src/features/` and re-exported by route files.
2. **Code is grouped by domain, not file type.** A feature owns its components, screens, hooks, services, schemas, types, and local state.
3. **Low coupling.** Features should not import internals from other features. Use shared folders or a feature's public `index.ts` for cross-feature needs.
4. **No circular imports.** Dependencies flow one direction: routes → features → shared infrastructure.
5. **State is co-located.** Feature-local state lives in the feature. Global app-wide state lives in `src/store/` and is used sparingly.

## Folder Structure

```
src/
  app/                 # Expo Router routes ONLY — no business logic
  components/ui/       # Truly shared, cross-feature presentational components
  features/            # Domain modules
  lib/                 # Library setup and route helpers
  providers/           # App-level React providers
  store/               # Global app-wide state (use sparingly)
  services/            # Global API clients and external integrations
  hooks/               # Shared cross-feature custom hooks
  utils/               # Pure utility functions
  constants/           # App-wide constants (not feature mock data)
  types/               # Global/shared TypeScript types
  theme/               # Design tokens, colors, spacing, typography
```

## Folder Boundaries

### `src/app`

- Route files, `_layout.tsx` files, and route groups only.
- No business logic, API calls, heavy hooks, validation schemas, or screen implementations.
- A typical route file is a single re-export:

```tsx
// src/app/(app)/(tabs)/conversations/index.tsx
export { default } from '@/features/conversations/screens/conversations-screen';
```

### `src/features`

Each feature owns its internal structure. Example: `src/features/conversations/` contains:

- `components/` — UI components used only by the conversations feature
- `screens/` — full screen components
- `hooks/` — domain hooks
- `services/` — API logic (when connected to Supabase)
- `store/` — feature-local state
- `schemas/` — validation schemas
- `types.ts` — feature types
- `constants/` — feature-specific mock data or constants
- `utils/` — pure helpers for the feature
- `index.ts` — public exports

### `src/components/ui`

Cross-feature presentational components only. Current examples:

- `controlled-searchbar.tsx`
- `controlled-text-input.tsx`

### `src/lib`

Library setup and global helpers. Examples:

- `theme.ts` — combined React Native Paper + React Navigation theme
- `routes.ts` — typed route builders used across the app

### `src/providers`

App-level React providers such as `app-providers.tsx`, which wraps Paper and Expo Router theme providers.

### `src/store`

Reserved for global app-wide state. Do not put feature concerns here.

### `src/services`

Global API clients and integrations that are truly cross-feature, such as the Supabase client or push notification service.

### `src/hooks`

Shared custom hooks used by multiple features.

### `src/utils`

Pure utility functions with no React or business logic dependencies.

### `src/constants`

App-wide constants such as API endpoints, config flags, and design tokens. Do not put feature-specific mock data here.

### `src/types`

Global/shared TypeScript types. Feature-specific types belong in the feature folder.

### `src/theme`

Design tokens, color palette, spacing scale, and typography helpers.

## State Management

- **Feature-local state:** `src/features/<feature>/store/`
- **Global app state:** `src/store/`

For example, the conversations feature keeps its in-memory mock state in `src/features/conversations/store/conversations-store.ts`. Once Supabase is integrated, this store will be replaced by server state (React Query/SWR) while keeping optimistic UI updates.

## Import Boundaries

### Do

- Import shared UI from `@/components/ui/...`
- Import route helpers from `@/lib/routes`
- Import a feature's public API from `@/features/<feature>`

### Don't

- Import another feature's internal component directly.
- Put business logic in `src/app` route files.
- Create a `src/components/<feature>/` folder.
- Add feature mock data to `src/constants/`.

## Adding a Feature

See [`docs/FEATURES.md`](FEATURES.md) for the step-by-step guide.
