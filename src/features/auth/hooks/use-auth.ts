import { useCallback, useState } from 'react';

import {
  signIn as signInService,
  signUp as signUpService,
  signOut as signOutService,
  resetPassword as resetPasswordService,
  updatePassword as updatePasswordService,
} from '../services/auth-service';
import {
  type SignInFormData,
  type SignUpFormData,
  type ResetPasswordFormData,
  type UpdatePasswordFormData,
} from '../schemas/auth-schema';
import { useAuthContext } from '../components/auth-provider';

export type UseAuthReturn = ReturnType<typeof useAuthContext> & {
  error: Error | null;
  clearError: () => void;
  signIn: (data: SignInFormData) => ReturnType<typeof signInService>;
  signUp: (data: SignUpFormData) => ReturnType<typeof signUpService>;
  signOut: () => Promise<void>;
  resetPassword: (data: ResetPasswordFormData) => Promise<void>;
  updatePassword: (data: UpdatePasswordFormData) => ReturnType<typeof updatePasswordService>;
};

export function useAuth(): UseAuthReturn {
  const state = useAuthContext();
  const [error, setError] = useState<Error | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const signIn = useCallback(
    async (data: SignInFormData) => {
      try {
        clearError();
        return await signInService(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Sign in failed'));
        throw err;
      }
    },
    [clearError]
  );

  const signUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        clearError();
        return await signUpService(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Sign up failed'));
        throw err;
      }
    },
    [clearError]
  );

  const signOut = useCallback(async () => {
    try {
      clearError();
      await signOutService();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Sign out failed'));
      throw err;
    }
  }, [clearError]);

  const resetPassword = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        clearError();
        await resetPasswordService(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Reset password failed')
        );
        throw err;
      }
    },
    [clearError]
  );

  const updatePassword = useCallback(
    async (data: UpdatePasswordFormData) => {
      try {
        clearError();
        return await updatePasswordService(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Update password failed')
        );
        throw err;
      }
    },
    [clearError]
  );

  return {
    ...state,
    error,
    clearError,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
  };
}
