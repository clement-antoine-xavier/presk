# Presk

Presk is a mobile application built with **Expo** and **React Native** using **Expo Router** for file-based navigation. It is designed as a social/messaging app where users can follow news, discover content, chat with friends, join communities, and manage their profile.

The project follows a **feature-based modular architecture**: business logic, UI components, data hooks, and state are grouped by domain inside `src/features/`, while routing concerns live only inside `src/app/`.

> Backend services are planned to be powered by **Supabase** (Auth, Database, Realtime, and Storage). The local Supabase setup lives in `/supabase`.

## Tech Stack

- [Expo SDK 57](https://docs.expo.dev/)
- [React Native 0.86](https://reactnative.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [React Native Paper](https://callstack.github.io/react-native-paper/) (Material Design 3)
- [React Hook Form](https://react-hook-form.com/)
- [Supabase](https://supabase.com/) (planned backend)
- [TypeScript](https://www.typescriptlang.org/)

## Quick Start

```bash
# Install dependencies
npm install

# Start the development server
npm run start

# Run on a specific platform
npm run ios
npm run android
npm run web
```

See [`docs/GETTING_STARTED.md`](docs/GETTING_STARTED.md) for detailed environment setup and troubleshooting.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run start` | Start the Expo development server |
| `npm run ios` | Start on iOS simulator/device |
| `npm run android` | Start on Android emulator/device |
| `npm run web` | Start the web preview |
| `npm run lint` | Run ESLint |
| `npm run reset-project` | Reset project via script |

## Project Structure

```
src/
  app/                 # Expo Router routes only
  components/ui/       # Cross-feature UI components
  features/            # Domain modules (components, screens, hooks, state)
  lib/                 # Library setup, theme, and route helpers
  providers/           # App-level React providers
  store/               # Global app-wide state (use sparingly)
  services/            # Global API clients and integrations
  hooks/               # Shared custom hooks
  utils/               # Pure utility functions
  constants/           # App-wide constants
  types/               # Global/shared TypeScript types
  theme/               # Design tokens, colors, spacing, typography
```

For the full architecture guide, see [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Navigation

The app uses Expo Router with route groups:

- `(auth)` — sign-in, sign-up, reset-password
- `(app)` — authenticated app shell, wraps `(tabs)`
- `(tabs)` — bottom tabs: news, discover, conversations, communities, profile
- `(modals)` — modal screens such as edit-profile

See [`docs/ROUTING.md`](docs/ROUTING.md) for details on route groups, `_layout.tsx` files, and deep linking.

## Contributing

We welcome contributions. Please read [`CONTRIBUTING.md`](CONTRIBUTING.md) for our workflow:

1. Open a GitHub Issue first using one of the provided templates.
2. Create a branch named `<issue-number>-<issue-title>` from the issue.
3. Open a Pull Request and ensure the CI checks pass.
4. We squash and merge to `main`.

## Documentation

- [`docs/GETTING_STARTED.md`](docs/GETTING_STARTED.md) — environment setup and run commands
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — folder structure, boundaries, and rules
- [`docs/ROUTING.md`](docs/ROUTING.md) — routing conventions and examples
- [`docs/FEATURES.md`](docs/FEATURES.md) — how to add a feature or a route
- [`docs/SUPABASE.md`](docs/SUPABASE.md) — planned Supabase integration
- [`AGENTS.md`](AGENTS.md) — agent/AI-specific instructions and conventions

## License

Private — see `package.json`.
