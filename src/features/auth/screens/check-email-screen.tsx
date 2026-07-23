import { StyleSheet, View } from 'react-native';
import { Button, MD3Theme, Text, withTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';

import { routes } from '@/lib/routes';

function CheckEmailScreen({ theme }: { theme: MD3Theme }) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={{ color: theme.colors.onSurface }}>
          Check your email
        </Text>

        <Text style={{ color: theme.colors.onSurfaceVariant }}>
          We sent you a confirmation link. Tap it to verify your account, then
          come back and sign in.
        </Text>

        <Button
          mode="contained"
          onPress={() => router.replace(routes.signIn)}
          testID="check-email-back-to-sign-in"
        >
          Back to sign in
        </Button>
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
    textAlign: 'center',
  },
});

export default withTheme(CheckEmailScreen);
