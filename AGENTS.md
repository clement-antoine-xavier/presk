# AGENTS.md

## Expo Framework

- **Version**: v57.0.x. Read exact versioned docs at <https://docs.expo.dev/versions/v57.0.0/> before writing code.

## Commands

- `npm run start`: Start dev server
- `npm run android` / `ios` / `web`: Start on specific platform
- `npm run lint`: Run `expo lint`

## Architecture

- **Routing**: File-based routing using Expo Router located in `src/app/`.
- **Core Logic**:
  - `src/app/`: Routes, layouts, and screens.
  - `src/constants/`: Theme and global constants.

## Verification

- Run `npm run lint` after changes to ensure style compliance.
