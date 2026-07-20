# Routing

Presk uses **Expo Router** for file-based routing. Routes are defined by the files under `src/app/`.

## Core Rule

`src/app/` is for routing only. Every route file should be a thin re-export of a feature screen.

```tsx
// src/app/(app)/(tabs)/conversations/index.tsx
export { default } from '@/features/conversations/screens/conversations-screen';
```

## Route Groups

Route groups let you organize navigation without adding a segment to the URL.

| Group | Purpose | Public URL segment |
|-------|---------|--------------------|
| `(auth)` | Unauthenticated auth flow | none |
| `(app)` | Authenticated app shell | none |
| `(tabs)` | Bottom tab navigation | none |
| `(modals)` | Modal-presented screens | none |

### `(auth)`

Contains sign-in, sign-up, and reset-password screens.

```
src/app/(auth)/
  _layout.tsx
  sign-in.tsx
  sign-up.tsx
  reset-password.tsx
```

Public paths: `/sign-in`, `/sign-up`, `/reset-password`.

### `(app)`

Wraps the authenticated part of the app. Currently contains `(tabs)`.

```
src/app/(app)/
  _layout.tsx
  (tabs)/
```

### `(tabs)`

Contains the bottom tab screens:

- `(news)`
- `discover`
- `conversations`
- `communities`
- `profile`

### `(modals)`

Contains screens presented as modals, such as `edit-profile`.

## `_layout.tsx` Files

Layouts define navigation shells and register screens with their options.

- `src/app/_layout.tsx` — root layout, wraps providers and the auth guard.
- `src/app/(app)/_layout.tsx` — authenticated app shell.
- `src/app/(app)/(tabs)/_layout.tsx` — bottom tabs shell.
- `src/app/(app)/(tabs)/conversations/_layout.tsx` — conversations stack with custom header actions.

Auth guards should be handled at the layout level, not duplicated across screens.

## Central Route Helpers

To avoid magic strings, route paths are centralized in `src/lib/routes.ts`:

```ts
import { routes } from '@/lib/routes';

router.push(routes.newConversation);
router.push(routes.conversation(conversationId));
router.push(routes.conversationSettings(conversationId));
```

## Deep Linking

Route groups do not appear in the URL, so deep links match the final segment. For example:

- `/conversations` → conversations list
- `/conversations/conversation?id=123` → conversation screen
- `/conversations/conversation-settings?id=123` → conversation settings
- `/edit-profile` → edit profile modal

See Expo Router docs for full deep-linking configuration via `app.json` and `expo-linking`.

## Typed Routes

Expo Router can generate TypeScript types for all routes. After adding or renaming routes, run:

```bash
npx expo-router typecheck
```

Use the typed `Href` helpers from `expo-router` in `src/lib/routes.ts` to keep navigation type-safe.
