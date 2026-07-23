import { AppProviders, Stack } from '@/providers/app-providers';
import { AuthGuard } from '@/features/auth/components/auth-guard';
import { AuthProvider } from '@/features/auth/components/auth-provider';

export default function RootLayout() {
  return (
    <AppProviders>
      <AuthProvider>
        <AuthGuard>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(app)" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen
              name="(modals)"
              options={{ presentation: 'modal', headerShown: false }}
            />
          </Stack>
        </AuthGuard>
      </AuthProvider>
    </AppProviders>
  );
}
