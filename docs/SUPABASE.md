# Supabase

Presk is planned to use [Supabase](https://supabase.com/) as its primary backend for authentication, database, realtime updates, and file storage.

## Current State

Supabase is **not yet wired to the app**, but the project already has a local Supabase setup under the `/supabase` folder:

```
supabase/
  config.toml       # Supabase CLI configuration
  seed.sql          # Seed data for local development
  snippets/         # Useful SQL snippets
```

The app currently uses in-memory mock data for conversations and messages. This is temporary and will be replaced by Supabase-backed persistence and realtime subscriptions.

## Planned Responsibilities

| Service | Purpose |
|---------|---------|
| **Auth** | User sign-up, sign-in, password reset, and session management |
| **Database** | Conversations, messages, users, communities, profiles |
| **Realtime** | Live message updates and presence |
| **Storage** | User-generated images and media |

## Integration Plan

1. **Supabase client**
   - Add `src/services/supabase.ts` to initialize the Supabase client once.
   - Use environment variables for the Supabase URL and anon key.

2. **Auth guard**
   - Replace the placeholder `AuthGuard` in `src/features/auth/components/auth-guard.tsx` with a real Supabase session check.
   - Redirect unauthenticated users to `/(auth)/sign-in`.

3. **Conversations feature**
   - Replace the in-memory `conversations-store.ts` with React Query/SWR hooks backed by Supabase.
   - Add optimistic updates for sending messages.
   - Subscribe to realtime inserts on the `messages` table.

4. **Database schema**
   - Define tables for `users`, `conversations`, `conversation_participants`, and `messages`.
   - Use Row Level Security (RLS) so users can only access their own data.
   - Keep migrations in `/supabase/migrations`.

5. **Environment configuration**
   - Add `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` to environment files and EAS secrets.

## Local Development

When Supabase CLI integration begins, contributors will run:

```bash
npx supabase start
npx supabase db reset
npx supabase migration up
```

See the [Supabase CLI docs](https://supabase.com/docs/guides/cli) for details.

## Security Notes

- Always use RLS policies in production.
- Never expose the service role key in the mobile app.
- Validate data on the client with Zod schemas and on the server with Postgres constraints.

## Follow-Up

- Add `src/services/supabase.ts`.
- Implement real sign-in/sign-up screens.
- Replace mock conversation state with Supabase queries and subscriptions.
