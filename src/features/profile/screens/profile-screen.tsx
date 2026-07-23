import { StyleSheet, View } from 'react-native';
import { Button, MD3Theme, Text, withTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';

import { useAuth } from '@/features/auth/hooks/use-auth';
import { routes } from '@/lib/routes';

function ProfileScreen({ theme }: { theme: MD3Theme }) {
  const router = useRouter();
  const { user, isAuthenticated, signOut } = useAuth();

  const displayName = user?.displayName ?? user?.email ?? 'User';

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={{ color: theme.colors.onSurface }}>
          Profile
        </Text>

        {isAuthenticated ? (
          <>
            <Text style={{ color: theme.colors.onSurface }} testID="profile-name">
              {displayName}
            </Text>

            <Button
              mode="outlined"
              onPress={() => router.push(routes.updatePassword)}
              testID="profile-update-password"
            >
              Update password
            </Button>

            <Button
              mode="contained"
              onPress={signOut}
              testID="profile-sign-out"
            >
              Sign out
            </Button>
          </>
        ) : (
          <>
            <Text style={{ color: theme.colors.onSurfaceVariant }}>
              Sign in to access your profile and personal data.
            </Text>

            <Button
              mode="contained"
              onPress={() => router.push(routes.signIn)}
              testID="profile-sign-in"
            >
              Sign in
            </Button>

            <Button
              mode="outlined"
              onPress={() => router.push(routes.signUp)}
              testID="profile-sign-up"
            >
              Sign up
            </Button>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    gap: 16,
    alignItems: 'center',
  },
});

export default withTheme(ProfileScreen);
