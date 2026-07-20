# Adding a Feature or Route

This guide explains how to add a new feature module and expose it through Expo Router without putting business logic in `src/app/`.

## Adding a New Feature

Create a folder under `src/features/<domain>/` with the standard structure:

```
src/features/<domain>/
  components/           # feature-specific UI components
  screens/              # full screen components
  hooks/                # feature hooks
  services/             # feature API logic (e.g. Supabase calls)
  schemas/              # validation schemas (Zod, Yup, etc.)
  store/                # feature-local state, if needed
  constants/            # feature-specific mock data or constants
  utils/                # pure helpers
  types.ts              # feature TypeScript types
  index.ts              # public exports
```

Not every feature needs all folders. Start with what you need and add more as the feature grows.

### Example: creating a `notifications` feature

1. Create the folder structure:

```bash
mkdir -p src/features/notifications/components
mkdir -p src/features/notifications/screens
mkdir -p src/features/notifications/hooks
mkdir -p src/features/notifications/types.ts
```

1. Add the screen:

```tsx
// src/features/notifications/screens/notifications-screen.tsx
import { StyleSheet, Text, View } from 'react-native';
import { MD3Theme, withTheme } from 'react-native-paper';

function NotificationsScreen({ theme }: { theme: MD3Theme }) {
  return (
    <View style={styles.container}>
      <Text style={{ color: theme.colors.onSurface }}>Notifications</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withTheme(NotificationsScreen);
```

1. Add the public export:

```ts
// src/features/notifications/index.ts
export { default as NotificationsScreen } from './screens/notifications-screen';
```

## Adding a New Route

1. Create a thin route file under the correct route group.
2. Re-export the feature screen.
3. Register the route in the relevant `_layout.tsx` if it needs custom options.

### Example: adding a `/notifications` route inside the app tabs

1. Create the route file:

```tsx
// src/app/(app)/(tabs)/notifications/index.tsx
export { default } from '@/features/notifications/screens/notifications-screen';
```

1. Register it in the tabs layout:

```tsx
// src/app/(app)/(tabs)/_layout.tsx
<Tabs.Screen
  name="notifications"
  options={{
    title: 'Notifications',
    tabBarIcon: ({ focused, color, size }) => (
      <MaterialDesignIcons
        name={focused ? 'bell' : 'bell-outline'}
        color={color}
        size={size}
      />
    ),
  }}
/>
```

## Shared UI vs Feature UI

- **Shared UI** (`src/components/ui/`): components used by multiple features, such as form wrappers or generic buttons.
- **Feature UI** (`src/features/<domain>/components/`): components only meaningful within one domain, such as `MessageBubble` or `ConversationListItem`.

If you are unsure, ask: "Would another feature ever use this component?" If yes, put it in `src/components/ui/`. Otherwise, keep it in the feature.

## State Placement

- **Feature-local state:** `src/features/<domain>/store/` for data that belongs to one domain, such as the conversations list.
- **Global state:** `src/store/` only for app-wide concerns, such as the current user session or global UI flags.

## Import Boundaries

### Do

- Import shared UI from `@/components/ui/...`
- Import route helpers from `@/lib/routes`
- Import a feature's public API from `@/features/<domain>`

### Don't

- Import another feature's internal component directly.
- Put business logic in `src/app` route files.
- Add feature mock data to `src/constants/`.
