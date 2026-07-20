import { Redirect } from 'expo-router';

import { routes } from '@/lib/routes';

/**
 * Central entry point for the app.
 *
 * In the future this is where you would decide between onboarding,
 * authenticated app routes, and auth routes based on session state.
 *
 * For now we redirect authenticated users straight to the main app.
 */
export default function Index() {
  return <Redirect href={routes.conversations} />;
}
