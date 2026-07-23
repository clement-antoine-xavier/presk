import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, MD3Theme, Text, withTheme } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';

import { ControlledTextInput } from '@/components/ui/controlled-text-input';
import { routes } from '@/lib/routes';

import { useAuth } from '../hooks/use-auth';
import { signInSchema, type SignInFormData } from '../schemas/auth-schema';

function SignInScreen({ theme }: { theme: MD3Theme }) {
  const router = useRouter();
  const { signIn, error, clearError } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = useCallback(
    async (data: SignInFormData) => {
      clearError();
      await signIn(data);
      router.replace(routes.conversations);
    },
    [clearError, signIn, router]
  );

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text variant="headlineMedium" style={{ color: theme.colors.onSurface }}>
          Sign In
        </Text>

        <ControlledTextInput
          control={control}
          name="email"
          label="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
          testID="sign-in-email"
        />
        {errors.email && (
          <HelperText type="error">{errors.email.message}</HelperText>
        )}

        <ControlledTextInput
          control={control}
          name="password"
          label="Password"
          secureTextEntry
          autoComplete="password"
          testID="sign-in-password"
        />
        {errors.password && (
          <HelperText type="error">{errors.password.message}</HelperText>
        )}

        {error && <HelperText type="error">{error.message}</HelperText>}

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
          disabled={isSubmitting}
          testID="sign-in-submit"
        >
          Sign In
        </Button>

        <Button
          mode="text"
          onPress={() => router.push(routes.signUp)}
          testID="sign-in-to-sign-up"
        >
          Create an account
        </Button>

        <Button
          mode="text"
          onPress={() => router.push(routes.resetPassword)}
          testID="sign-in-to-reset-password"
        >
          Forgot password?
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
  form: {
    gap: 12,
  },
});

export default withTheme(SignInScreen);
