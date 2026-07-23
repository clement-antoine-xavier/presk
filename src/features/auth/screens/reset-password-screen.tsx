import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, MD3Theme, Text, withTheme } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';

import { ControlledTextInput } from '@/components/ui/controlled-text-input';
import { routes } from '@/lib/routes';

import { useAuth } from '../hooks/use-auth';
import { resetPasswordSchema, type ResetPasswordFormData } from '../schemas/auth-schema';

function ResetPasswordScreen({ theme }: { theme: MD3Theme }) {
  const router = useRouter();
  const { resetPassword, error, clearError } = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      clearError();
      await resetPassword(data);
      setIsSuccess(true);
    },
    [clearError, resetPassword]
  );

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text variant="headlineMedium" style={{ color: theme.colors.onSurface }}>
          Reset Password
        </Text>

        <Text style={{ color: theme.colors.onSurfaceVariant }}>
          Enter your email and we will send you a link to reset your password.
        </Text>

        <ControlledTextInput
          control={control}
          name="email"
          label="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
          testID="reset-password-email"
        />
        {errors.email && (
          <HelperText type="error">{errors.email.message}</HelperText>
        )}

        {error && <HelperText type="error">{error.message}</HelperText>}

        {isSuccess && (
          <HelperText type="info" testID="reset-password-success">
            If an account exists, a reset link has been sent. Check your email.
          </HelperText>
        )}

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
          disabled={isSubmitting || isSuccess}
          testID="reset-password-submit"
        >
          Send Reset Link
        </Button>

        <Button
          mode="text"
          onPress={() => router.push(routes.signIn)}
          testID="reset-password-to-sign-in"
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
  form: {
    gap: 12,
  },
});

export default withTheme(ResetPasswordScreen);
