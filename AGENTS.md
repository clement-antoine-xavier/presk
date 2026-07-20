# Presk Agent Instructions

## Project Overview

Expo (React Native) app using Expo Router and Supabase.

## Developer Commands

- `npm run start`: Start dev server
- `npm run android`: Start on Android
- `npm run ios`: Start on iOS
- `npm run web`: Start on Web
- `npm run lint`: Run ESLint
- `npm run reset-project`: Reset project via script

## Folder Structure & Boundaries

```
src/
  app/                 # Expo Router routes ONLY — no business logic
  components/ui/       # Truly shared, cross-feature presentational components
  features/            # Domain modules: components, screens, hooks, state
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

### `src/app` — routing only

- Contains Expo Router route files, `_layout.tsx` files, and route groups.
- **Must not** contain business logic, API calls, heavy hooks, validation schemas, or screen implementations.
- Every route file should be thin and re-export a screen from a feature module.

Example route file:

```tsx
// src/app/(app)/(tabs)/conversations/index.tsx
export { default } from '@/features/conversations/screens/conversations-screen';
```

### Route groups

Groups organize navigation without appearing in the URL segment.

| Group | Purpose |
|-------|---------|
| `(auth)` | Unauthenticated auth flow: sign-in, sign-up, reset-password. |
| `(app)` | Authenticated app shell; wraps `(tabs)` and any app-level stacks. |
| `(tabs)` | Bottom tab navigation: news, discover, conversations, communities, profile. |
| `(modals)` | Modal-presented screens such as edit-profile. |

### `_layout.tsx` files

- Define navigation shells (Stack, Tabs).
- Register screens and their options.
- Handle auth guards at group level, not per screen.
- The root layout (`src/app/_layout.tsx`) only wraps app-level providers and the auth guard.

### `src/features`

- Each feature owns its internal components, hooks, services, schemas, types, screens, and local state.
- Features should not import internals from other features. Use the feature's public `index.ts` or a shared global folder.
- Example feature: `src/features/conversations/`.

### `src/components/ui`

- **Cross-feature** presentational components only.
- Current examples: `controlled-searchbar.tsx`, `controlled-text-input.tsx`.
- Do **not** put feature-specific components here.

### `src/lib`

- Library setup and global helpers.
- Examples: theme merging (`theme.ts`), typed route builders (`routes.ts`), API client config, analytics, i18n, storage wrappers, Sentry.

### `src/providers`

- App-level React providers.
- The root layout should consume these and avoid inline provider setup.

### `src/store`

- **Global** app-wide state only.
- Do not create a bloated global store for feature-local concerns.
- Feature-local state should live inside the owning feature.

### `src/services`

- Global API clients and integrations that are truly cross-feature (e.g. Supabase client, push notifications).

### `src/hooks`

- Shared custom hooks used by multiple features.

### `src/utils`

- Pure utility functions with no React or business logic dependencies.

### `src/constants`

- App-wide constants such as API endpoints, config flags, and design tokens.
- Do **not** put feature-specific mock data here.

### `src/types`

- Global/shared TypeScript types.
- Feature-specific types belong in the feature folder.

### `src/theme`

- Design tokens, color palette, spacing scale, typography helpers.

### `src/assets`

- Fonts, images, icons, and other static assets.

## Architectural Rules

1. **Route files are thin.** Re-export feature screens; no business logic in `src/app`.
2. **Move by domain.** Group code by feature, not by file type.
3. **Low coupling.** Avoid importing another feature's internal files. Use shared folders or public exports.
4. **No circular imports.** Keep dependencies one-directional: routes → features → shared infrastructure.
5. **Prefer explicit imports** when they improve clarity. Avoid barrel exports that hide boundaries.
6. **Co-locate state.** Feature-local state lives in the feature. Global state only in `src/store/`.
7. **Co-locate types and schemas.** Feature types and validation schemas live with the feature.
8. **Auth guards at layout level.** Use `(app)` layout or root layout for protected route checks.

## How to Add a New Feature

1. Create `src/features/<feature>/` with the standard subfolders:
   - `components/` — feature UI components
   - `screens/` — full screen components
   - `hooks/` — feature hooks
   - `services/` — feature API logic
   - `schemas/` — validation schemas
   - `types.ts` — feature types
   - `index.ts` — public exports
2. If the feature needs local state, add `store/<feature>-store.ts` inside the feature.
3. Add route files under `src/app/` that re-export the feature screens.

## How to Add a New Route

1. Create or update the route file in `src/app/` under the correct group.
2. Keep the file minimal:

```tsx
export { default } from '@/features/<feature>/screens/<screen-name>-screen';
```

1. Register the route in the relevant `_layout.tsx` if it needs custom options.

## Shared UI vs Feature-Specific UI

- **Shared UI** (`src/components/ui/`): components used by multiple features (forms, buttons, inputs).
- **Feature UI** (`src/features/<feature>/components/`): components only meaningful within one domain.

## State Rules

- **Feature-local state:** `src/features/<feature>/store/`
- **Global app state:** `src/store/`
- Do not put feature concerns in the global store.

## Import Boundaries & Anti-Patterns

### Do

- Import shared UI from `@/components/ui/...`
- Import route helpers from `@/lib/routes`
- Import a feature's public API from `@/features/<feature>`

### Don't

- Import another feature's internal component directly.
- Put business logic in `src/app` route files.
- Create a `src/components/<feature>/` folder; use `src/features/<feature>/components/`.
- Add feature mock data to `src/constants/`.

## Verification Flow

- Run `npm run lint` before submitting changes.
- Run `npx tsc --noEmit` to check TypeScript.
- Use `expo start` to verify UI changes in a simulator/device.
