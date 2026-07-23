import { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, MD3Theme, Text, withTheme } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useLocalSearchParams } from 'expo-router';

import { ControlledTextInput } from '@/components/ui/controlled-text-input';
import { routes } from '@/lib/routes';
import { supabase } from '@/services/supabase';

import { useAuth } from '../hooks/use-auth';
import { updatePasswordSchema, type UpdatePasswordFormData } from '../schemas/auth-schema';

function UpdatePasswordScreen({ theme }: { theme: MD3Theme }) {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { updatePassword, signOut, error, clearError } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    const code = typeof params.code === 'string' ? params.code : undefined;
    if (code) {
      supabase.auth.exchangeCodeForSession(code).catch(() => {
        // The deep-link code exchange is best-effort. If it fails the user
        // can still sign in again from the auth flow.
      });
    }
  }, [params.code]);

  const onSubmit = useCallback(
    async (data: UpdatePasswordFormData) => {
      clearError();
      await updatePassword(data);
      await signOut();
      router.replace(routes.signIn);
    },
    [clearError, updatePassword, signOut, router]
  );

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text variant="headlineMedium" style={{ color: theme.colors.onSurface }}>
          Update Password
        </Text>

        <Text style={{ color: theme.colors.onSurfaceVariant }}>
          Choose a new password for your account.
        </Text>

        <ControlledTextInput
          control={control}
          name="password"
          label="New password"
          secureTextEntry
          autoComplete="new-password"
          testID="update-password"
        />
        {errors.password && (
          <HelperText type="error">{errors.password.message}</HelperText>
        )}

        <ControlledTextInput
          control={control}
          name="confirmPassword"
          label="Confirm new password"
          secureTextEntry
          autoComplete="new-password"
          testID="update-confirm-password"
        />
        {errors.confirmPassword && (
          <HelperText type="error">{errors.confirmPassword.message}</HelperText>
        )}

        {error && <HelperText type="error">{error.message}</HelperText>}

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
          disabled={isSubmitting}
          testID="update-password-submit"
        >
          Update Password
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

export default withTheme(UpdatePasswordScreen);
