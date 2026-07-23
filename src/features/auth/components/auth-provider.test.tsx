import { render, waitFor, act } from '@testing-library/react-native';
import { Text } from 'react-native';

import { supabase } from '@/services/supabase';

import { AuthProvider, useAuthContext } from './auth-provider';

jest.mock('@/services/supabase');

const mockSupabaseAuth = supabase.auth as unknown as Record<string, jest.Mock>;

function TestConsumer() {
  const { user, isAuthenticated, isLoading } = useAuthContext();
  return (
    <>
      <Text testID="loading">{isLoading ? 'loading' : 'ready'}</Text>
      <Text testID="authenticated">{isAuthenticated ? 'yes' : 'no'}</Text>
      <Text testID="email">{user?.email ?? 'none'}</Text>
      <Text testID="displayName">{user?.displayName ?? 'none'}</Text>
    </>
  );
}

const unsubscribe = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  mockSupabaseAuth.onAuthStateChange.mockReturnValue({
    data: { subscription: { unsubscribe } },
  });
});

describe('AuthProvider', () => {
  it('starts in loading state', async () => {
    mockSupabaseAuth.getSession.mockImplementation(() => new Promise(() => {}));

    const screen = await render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    expect(screen.getByTestId('loading').children[0]).toBe('loading');
  });

  it('reflects an authenticated session with display name metadata', async () => {
    mockSupabaseAuth.getSession.mockResolvedValue({
      data: {
        session: {
          user: {
            id: '1',
            email: 'user@example.com',
            user_metadata: { display_name: 'Jane' },
          },
        },
      },
    });

    const screen = await render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await act(async () => {
      await Promise.resolve();
    });

    await waitFor(() => expect(screen.getByTestId('loading').children[0]).toBe('ready'));
    expect(screen.getByTestId('authenticated').children[0]).toBe('yes');
    expect(screen.getByTestId('email').children[0]).toBe('user@example.com');
    expect(screen.getByTestId('displayName').children[0]).toBe('Jane');
  });

  it('reflects an unauthenticated session', async () => {
    mockSupabaseAuth.getSession.mockResolvedValue({ data: { session: null } });

    const screen = await render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await act(async () => {
      await Promise.resolve();
    });

    await waitFor(() => expect(screen.getByTestId('loading').children[0]).toBe('ready'));
    expect(screen.getByTestId('authenticated').children[0]).toBe('no');
    expect(screen.getByTestId('email').children[0]).toBe('none');
  });

  it('unsubscribes on unmount', async () => {
    mockSupabaseAuth.getSession.mockResolvedValue({ data: { session: null } });

    const screen = await render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await act(async () => {
      await Promise.resolve();
    });

    await waitFor(() => expect(mockSupabaseAuth.getSession).toHaveBeenCalled());
    await act(async () => {
      screen.unmount();
    });
    expect(unsubscribe).toHaveBeenCalled();
  });

  it('handles missing user_metadata gracefully', async () => {
    mockSupabaseAuth.getSession.mockResolvedValue({
      data: {
        session: {
          user: {
            id: '1',
            email: 'user@example.com',
          },
        },
      },
    });

    const screen = await render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await act(async () => {
      await Promise.resolve();
    });

    await waitFor(() => expect(screen.getByTestId('loading').children[0]).toBe('ready'));
    expect(screen.getByTestId('displayName').children[0]).toBe('none');
  });

  it('updates state when auth state changes', async () => {
    let authChangeCallback: ((event: string, session: { user: { id: string; email: string } } | null) => void) | undefined;
    mockSupabaseAuth.getSession.mockResolvedValue({ data: { session: null } });
    mockSupabaseAuth.onAuthStateChange.mockImplementation((callback: any) => {
      authChangeCallback = callback;
      return { data: { subscription: { unsubscribe } } };
    });

    const screen = await render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await act(async () => {
      await Promise.resolve();
    });

    await waitFor(() => expect(screen.getByTestId('loading').children[0]).toBe('ready'));

    await act(async () => {
      authChangeCallback?.('SIGNED_IN', {
        user: { id: '2', email: 'new@example.com' },
      } as any);
      await Promise.resolve();
    });

    expect(screen.getByTestId('authenticated').children[0]).toBe('yes');
    expect(screen.getByTestId('email').children[0]).toBe('new@example.com');
  });

  it('handles a user with missing id and email', async () => {
    function RawConsumer() {
      const { user } = useAuthContext();
      return <Text testID="raw-user">{JSON.stringify({ id: user?.id, email: user?.email })}</Text>;
    }

    mockSupabaseAuth.getSession.mockResolvedValue({
      data: {
        session: {
          user: { user_metadata: { display_name: 'Jane' } },
        },
      },
    });

    const screen = await render(
      <AuthProvider>
        <RawConsumer />
      </AuthProvider>
    );

    await act(async () => {
      await Promise.resolve();
    });

    await waitFor(() => expect(screen.getByTestId('raw-user').children[0]).toBe(JSON.stringify({ id: '', email: '' })));
  });

  it('does not set state after unmount', async () => {
    mockSupabaseAuth.getSession.mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve({ data: { session: null } }), 100)));

    const screen = await render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await act(async () => {
      screen.unmount();
      await Promise.resolve();
    });

    expect(mockSupabaseAuth.getSession).toHaveBeenCalled();
  });

  it('clears auth state on sign-out event', async () => {
    let authChangeCallback: ((event: string, session: { user: { id: string; email: string } } | null) => void) | undefined;
    mockSupabaseAuth.getSession.mockResolvedValue({
      data: {
        session: {
          user: { id: '1', email: 'user@example.com' },
        },
      },
    });
    mockSupabaseAuth.onAuthStateChange.mockImplementation((callback: any) => {
      authChangeCallback = callback;
      return { data: { subscription: { unsubscribe } } };
    });

    const screen = await render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await act(async () => {
      await Promise.resolve();
    });

    await waitFor(() => expect(screen.getByTestId('authenticated').children[0]).toBe('yes'));

    await act(async () => {
      authChangeCallback?.('SIGNED_OUT', null);
      await Promise.resolve();
    });

    expect(screen.getByTestId('authenticated').children[0]).toBe('no');
  });
});

describe('useAuthContext', () => {
  it('throws when used outside a provider', async () => {
    function Consumer() {
      useAuthContext();
      return null;
    }
    await expect(render(<Consumer />)).rejects.toThrow('useAuthContext must be used within an AuthProvider');
  });
});
