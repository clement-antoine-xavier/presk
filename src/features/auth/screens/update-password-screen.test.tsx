import { render, fireEvent, waitFor, act } from '@testing-library/react-native';

import { routes } from '@/lib/routes';
import { supabase } from '@/services/supabase';

import { useAuth } from '../hooks/use-auth';
import UpdatePasswordScreen from './update-password-screen';

const mockReplace = jest.fn();
const mockUseLocalSearchParams = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({ replace: mockReplace }),
  useLocalSearchParams: () => mockUseLocalSearchParams(),
  Redirect: function Redirect({ href }: { href: string }) {
    /* eslint-disable @typescript-eslint/no-require-imports */
    const React = require('react');
    const { Text } = require('react-native');
    /* eslint-enable @typescript-eslint/no-require-imports */
    return React.createElement(Text, { testID: `redirect-${href}` }, href);
  },
  Link: ({ children }: { children: any }) => children,
}));

jest.mock('@/services/supabase');

const mockSupabaseAuth = supabase.auth as unknown as Record<string, jest.Mock>;

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

jest.mock('../hooks/use-auth', () => ({
  useAuth: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
  mockUseLocalSearchParams.mockReturnValue({});
  mockUseAuth.mockReturnValue({
    updatePassword: jest.fn().mockResolvedValue(undefined),
    signOut: jest.fn().mockResolvedValue(undefined),
    error: null,
    clearError: jest.fn(),
    user: null,
    session: null,
    isLoading: false,
    isAuthenticated: true,
    signIn: jest.fn(),
    signUp: jest.fn(),
    resetPassword: jest.fn(),
  });
});

const theme = { colors: { onSurface: '#000' } } as never;

describe('UpdatePasswordScreen', () => {
  it('exchanges a deep-link code on mount', async () => {
    mockUseLocalSearchParams.mockReturnValue({ code: 'recovery-code' });
    mockSupabaseAuth.exchangeCodeForSession.mockResolvedValue({ data: {}, error: null });

    await render(<UpdatePasswordScreen theme={theme} />);

    expect(mockSupabaseAuth.exchangeCodeForSession).toHaveBeenCalledWith('recovery-code');
  });

  it('submits a new password and redirects to sign-in', async () => {
    const updatePassword = jest.fn().mockResolvedValue(undefined);
    const signOut = jest.fn().mockResolvedValue(undefined);
    mockUseAuth.mockReturnValue({
      ...mockUseAuth(),
      updatePassword,
      signOut,
    } as ReturnType<typeof useAuth>);

    const { getByTestId } = await render(
      <UpdatePasswordScreen theme={theme} />
    );

    await act(async () => {
      fireEvent.changeText(getByTestId('update-password'), 'newpassword123');
      fireEvent.changeText(getByTestId('update-confirm-password'), 'newpassword123');
      fireEvent.press(getByTestId('update-password-submit'));
    });

    await waitFor(() => expect(updatePassword).toHaveBeenCalled());
    expect(updatePassword).toHaveBeenCalledWith({
      password: 'newpassword123',
      confirmPassword: 'newpassword123',
    });
    expect(signOut).toHaveBeenCalled();
    expect(mockReplace).toHaveBeenCalledWith(routes.signIn);
  });

  it('shows validation errors for mismatched passwords', async () => {
    const { getByTestId, findByText } = await render(
      <UpdatePasswordScreen theme={theme} />
    );

    await act(async () => {
      fireEvent.changeText(getByTestId('update-password'), 'password123');
      fireEvent.changeText(getByTestId('update-confirm-password'), 'different123');
      fireEvent.press(getByTestId('update-password-submit'));
    });

    expect(await findByText('Passwords do not match')).toBeTruthy();
  });

  it('shows validation error for a short password', async () => {
    const { getByTestId, findByText } = await render(
      <UpdatePasswordScreen theme={theme} />
    );

    await act(async () => {
      fireEvent.changeText(getByTestId('update-password'), 'short');
      fireEvent.changeText(getByTestId('update-confirm-password'), 'short');
      fireEvent.press(getByTestId('update-password-submit'));
    });

    expect(await findByText('Password must be at least 8 characters')).toBeTruthy();
  });

  it('displays an auth error', async () => {
    mockUseAuth.mockReturnValue({
      ...mockUseAuth(),
      error: new Error('Update failed'),
    } as ReturnType<typeof useAuth>);

    const { findByText } = await render(
      <UpdatePasswordScreen theme={theme} />
    );

    expect(await findByText('Update failed')).toBeTruthy();
  });
});
