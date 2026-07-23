import { supabase } from '@/services/supabase';

import {
  signIn,
  signUp,
  signOut,
  resetPassword,
  updatePassword,
} from './auth-service';

jest.mock('@/services/supabase');

const mockSupabaseAuth = supabase.auth as unknown as Record<string, jest.Mock>;
  

beforeEach(() => {
  jest.clearAllMocks();
});

describe('signIn', () => {
  it('returns data on success', async () => {
    const data = { session: { user: { id: '1' } }, user: { id: '1' } };
    mockSupabaseAuth.signInWithPassword.mockResolvedValue({ data, error: null });

    await expect(
      signIn({ email: 'a@b.com', password: 'password123' })
    ).resolves.toEqual(data);

    expect(mockSupabaseAuth.signInWithPassword).toHaveBeenCalledWith({
      email: 'a@b.com',
      password: 'password123',
    });
  });

  it('throws on error', async () => {
    const error = new Error('Invalid credentials');
    mockSupabaseAuth.signInWithPassword.mockResolvedValue({ data: null, error });

    await expect(
      signIn({ email: 'a@b.com', password: 'wrong' })
    ).rejects.toThrow(error);
  });
});

describe('signUp', () => {
  it('passes display name in metadata', async () => {
    const data = { user: { id: '1' }, session: null };
    mockSupabaseAuth.signUp.mockResolvedValue({ data, error: null });

    await expect(
      signUp({
        email: 'a@b.com',
        password: 'password123',
        confirmPassword: 'password123',
        displayName: 'Jane',
      })
    ).resolves.toEqual(data);

    expect(mockSupabaseAuth.signUp).toHaveBeenCalledWith({
      email: 'a@b.com',
      password: 'password123',
      options: {
        data: { display_name: 'Jane' },
      },
    });
  });

  it('throws on error', async () => {
    const error = new Error('Email taken');
    mockSupabaseAuth.signUp.mockResolvedValue({ data: null, error });

    await expect(
      signUp({
        email: 'a@b.com',
        password: 'password123',
        confirmPassword: 'password123',
        displayName: 'Jane',
      })
    ).rejects.toThrow(error);
  });
});

describe('signOut', () => {
  it('resolves on success', async () => {
    mockSupabaseAuth.signOut.mockResolvedValue({ error: null });
    await expect(signOut()).resolves.toBeUndefined();
  });

  it('throws on error', async () => {
    const error = new Error('Sign out failed');
    mockSupabaseAuth.signOut.mockResolvedValue({ error });
    await expect(signOut()).rejects.toThrow(error);
  });
});

describe('resetPassword', () => {
  it('calls resetPasswordForEmail', async () => {
    mockSupabaseAuth.resetPasswordForEmail.mockResolvedValue({ error: null });
    await resetPassword({ email: 'a@b.com' });
    expect(mockSupabaseAuth.resetPasswordForEmail).toHaveBeenCalledWith('a@b.com');
  });

  it('throws on error', async () => {
    const error = new Error('Reset failed');
    mockSupabaseAuth.resetPasswordForEmail.mockResolvedValue({ error });
    await expect(resetPassword({ email: 'a@b.com' })).rejects.toThrow(error);
  });
});

describe('updatePassword', () => {
  it('returns data on success', async () => {
    const data = { user: { id: '1' } };
    mockSupabaseAuth.updateUser.mockResolvedValue({ data, error: null });

    await expect(
      updatePassword({ password: 'newpass123', confirmPassword: 'newpass123' })
    ).resolves.toEqual(data);

    expect(mockSupabaseAuth.updateUser).toHaveBeenCalledWith({ password: 'newpass123' });
  });

  it('throws on error', async () => {
    const error = new Error('Weak password');
    mockSupabaseAuth.updateUser.mockResolvedValue({ data: null, error });

    await expect(
      updatePassword({ password: 'newpass123', confirmPassword: 'newpass123' })
    ).rejects.toThrow(error);
  });
});
