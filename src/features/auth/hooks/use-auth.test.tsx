import { renderHook, act, waitFor } from '@testing-library/react-native';
import { ReactNode } from 'react';

import { AuthProvider } from '@/features/auth/components/auth-provider';
import { supabase } from '@/services/supabase';

import * as authService from '../services/auth-service';
import { useAuth } from './use-auth';

jest.mock('@/services/supabase');

const mockSupabaseAuth = supabase.auth as unknown as Record<string, jest.Mock>;

const signInSpy = jest.spyOn(authService, 'signIn');
const signUpSpy = jest.spyOn(authService, 'signUp');
const signOutSpy = jest.spyOn(authService, 'signOut');
const resetPasswordSpy = jest.spyOn(authService, 'resetPassword');
const updatePasswordSpy = jest.spyOn(authService, 'updatePassword');

function wrapper({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

beforeEach(() => {
  jest.clearAllMocks();
  mockSupabaseAuth.getSession.mockResolvedValue({ data: { session: null } });
  mockSupabaseAuth.onAuthStateChange.mockReturnValue({
    data: { subscription: { unsubscribe: jest.fn() } },
  });
  signInSpy.mockResolvedValue({} as never);
  signUpSpy.mockResolvedValue({} as never);
  signOutSpy.mockResolvedValue(undefined);
  resetPasswordSpy.mockResolvedValue(undefined);
  updatePasswordSpy.mockResolvedValue({} as never);
});

describe('useAuth', () => {
  it('exposes auth state from context', async () => {
    mockSupabaseAuth.getSession.mockImplementation(() => new Promise(() => {}));
    const { result } = await renderHook(() => useAuth(), { wrapper });
    expect(result.current.isLoading).toBe(true);
  });

  it('reflects unauthenticated state after initialization', async () => {
    mockSupabaseAuth.getSession.mockResolvedValue({ data: { session: null } });
    const { result } = await renderHook(() => useAuth(), { wrapper });
    await act(async () => {
      await Promise.resolve();
    });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('updates error when signIn fails', async () => {
    const error = new Error('Invalid login');
    signInSpy.mockRejectedValue(error);

    const { result } = await renderHook(() => useAuth(), { wrapper });
    await act(async () => {
      await Promise.resolve();
    });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await expect(
        result.current.signIn({ email: 'a@b.com', password: 'pass' })
      ).rejects.toThrow(error);
    });

    expect(result.current.error).toEqual(error);
  });

  it('updates error when signUp fails', async () => {
    const error = new Error('Email taken');
    signUpSpy.mockRejectedValue(error);

    const { result } = await renderHook(() => useAuth(), { wrapper });
    await act(async () => {
      await Promise.resolve();
    });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await expect(
        result.current.signUp({ email: 'a@b.com', password: 'password123', confirmPassword: 'password123', displayName: 'Jane' })
      ).rejects.toThrow(error);
    });

    expect(result.current.error).toEqual(error);
  });

  it('clears error on successful signIn', async () => {
    const { result } = await renderHook(() => useAuth(), { wrapper });
    await act(async () => {
      await Promise.resolve();
    });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    result.current.clearError();
    await act(async () => {
      await result.current.signIn({ email: 'a@b.com', password: 'pass' });
    });

    expect(result.current.error).toBeNull();
    expect(signInSpy).toHaveBeenCalledWith({ email: 'a@b.com', password: 'pass' });
  });

  it('calls signOut service', async () => {
    const { result } = await renderHook(() => useAuth(), { wrapper });
    await act(async () => {
      await Promise.resolve();
    });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await result.current.signOut();
    });

    await waitFor(() => expect(signOutSpy).toHaveBeenCalled());
  });

  it('updates error when signOut fails', async () => {
    const error = new Error('Sign out failed');
    signOutSpy.mockRejectedValue(error);

    const { result } = await renderHook(() => useAuth(), { wrapper });
    await act(async () => {
      await Promise.resolve();
    });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await expect(result.current.signOut()).rejects.toThrow(error);
    });

    expect(result.current.error).toEqual(error);
  });

  it('calls resetPassword service', async () => {
    const { result } = await renderHook(() => useAuth(), { wrapper });
    await act(async () => {
      await Promise.resolve();
    });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await result.current.resetPassword({ email: 'a@b.com' });
    });

    expect(resetPasswordSpy).toHaveBeenCalledWith({ email: 'a@b.com' });
  });

  it('updates error when resetPassword fails', async () => {
    const error = new Error('Reset failed');
    resetPasswordSpy.mockRejectedValue(error);

    const { result } = await renderHook(() => useAuth(), { wrapper });
    await act(async () => {
      await Promise.resolve();
    });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await expect(result.current.resetPassword({ email: 'a@b.com' })).rejects.toThrow(error);
    });

    expect(result.current.error).toEqual(error);
  });

  it('calls updatePassword service', async () => {
    const { result } = await renderHook(() => useAuth(), { wrapper });
    await act(async () => {
      await Promise.resolve();
    });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await result.current.updatePassword({ password: 'newpass123', confirmPassword: 'newpass123' });
    });

    expect(updatePasswordSpy).toHaveBeenCalledWith({ password: 'newpass123', confirmPassword: 'newpass123' });
  });

  it('updates error when updatePassword fails', async () => {
    const error = new Error('Update failed');
    updatePasswordSpy.mockRejectedValue(error);

    const { result } = await renderHook(() => useAuth(), { wrapper });
    await act(async () => {
      await Promise.resolve();
    });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await expect(result.current.updatePassword({ password: 'newpass123', confirmPassword: 'newpass123' })).rejects.toThrow(error);
    });

    expect(result.current.error).toEqual(error);
  });
});
