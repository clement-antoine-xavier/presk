import { Redirect } from 'expo-router';

import { useAuthContext } from '@/features/auth/components/auth-provider';
import { routes } from '@/lib/routes';

/**
 * Central entry point for the app.
 *
 * Redirects authenticated users to the main app and unauthenticated users
 * to the sign-in flow.
 */
export default function Index() {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return null;
  }

  return <Redirect href={isAuthenticated ? routes.conversations : routes.signIn} />;
}
