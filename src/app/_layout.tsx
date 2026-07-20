import { AppProviders, Stack } from '@/providers/app-providers';
import { AuthGuard } from '@/features/auth/components/auth-guard';

export default function RootLayout() {
  return (
    <AppProviders>
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
    </AppProviders>
  );
}
