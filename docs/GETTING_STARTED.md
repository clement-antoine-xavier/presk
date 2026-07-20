# Getting Started

This guide walks you through setting up the Presk development environment and running the app.

## Prerequisites

- [Node.js 26.4.0](https://nodejs.org/) (matching the CI workflow)
- [npm](https://www.npmjs.com/) or a compatible package manager
- [Expo CLI](https://docs.expo.dev/more/expo-cli/) (installed via the project dependencies)
- For iOS: macOS with Xcode installed
- For Android: Android Studio with an emulator or a physical device

## Install Dependencies

```bash
npm install
```

This installs Expo, React Native, Expo Router, React Native Paper, and all other project dependencies.

## Start the Development Server

```bash
npm run start
```

This launches the Expo development server. From the terminal UI you can press:

- `i` — open on iOS simulator
- `a` — open on Android emulator/device
- `w` — open on web

## Run on a Specific Platform

```bash
npm run ios
npm run android
npm run web
```

## Lint and Type Check

Before submitting changes, run the required checks:

```bash
npm run lint
npx tsc --noEmit
```

The CI workflow in `.github/workflows/expo.yml` runs `npm run lint` on every pull request.

## Troubleshooting

### Metro bundler errors

Try clearing the cache:

```bash
npx expo start --clear
```

Or use the reset script:

```bash
npm run reset-project
```

### iOS build issues

Make sure Xcode and its command line tools are installed and up to date.

### Android build issues

Ensure you have an Android emulator running or a device connected with USB debugging enabled.

### TypeScript path alias errors

The project uses `@/*` aliases configured in `tsconfig.json`. If your editor cannot resolve them, restart the TypeScript language server.
