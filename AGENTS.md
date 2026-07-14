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

## Architecture & Conventions
- **Routing**: File-based routing via `src/app` (Expo Router).
- **Structure**: 
  - `src/app`: Routes and layouts.
  - `src/components`: Shared UI components.
  - `src/features`: Feature-specific logic (hooks, utils).
  - `src/constants`: App-wide constants and theme.
- **Backend**: Supabase integration (config in `/supabase`).
- **Styling**: Uses `@expo/ui` and standard React Native components.

## Verification Flow
- Run `npm run lint` before submitting changes.
- Use `expo start` to verify UI changes in a simulator/device.
