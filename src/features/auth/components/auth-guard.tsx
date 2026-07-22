import { type ReactNode } from 'react';

import { routes } from '@/lib/routes';
import { Redirect } from 'expo-router';

type AuthGuardProps = {
  children: ReactNode;
};

/**
 * Placeholder auth guard.
 *
 * In production this should check the Supabase session (or equivalent)
 * and redirect unauthenticated users to the sign-in route.
 *
 * For now the app is treated as always authenticated so the UI can be
 * iterated on without a backend dependency.
 */
export function AuthGuard({ children }: AuthGuardProps) {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Redirect href={routes.signIn} />;
  }

  return children;
}
