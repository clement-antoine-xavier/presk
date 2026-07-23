import { render, fireEvent, waitFor, act } from '@testing-library/react-native';

import { useAuth } from '../hooks/use-auth';
import ResetPasswordScreen from './reset-password-screen';

const mockPush = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: mockPush }),
  useLocalSearchParams: () => ({}),
  Redirect: function Redirect({ href }: { href: string }) {
    /* eslint-disable @typescript-eslint/no-require-imports */
    const React = require('react');
    const { Text } = require('react-native');
    /* eslint-enable @typescript-eslint/no-require-imports */
    return React.createElement(Text, { testID: `redirect-${href}` }, href);
  },
  Link: ({ children }: { children: any }) => children,
}));

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

jest.mock('../hooks/use-auth', () => ({
  useAuth: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
  mockUseAuth.mockReturnValue({
    resetPassword: jest.fn().mockResolvedValue(undefined),
    error: null,
    clearError: jest.fn(),
    user: null,
    session: null,
    isLoading: false,
    isAuthenticated: false,
    signIn: jest.fn(),
    signUp: jest.fn(),
    signOut: jest.fn(),
    updatePassword: jest.fn(),
  });
});

const theme = { colors: { onSurface: '#000' } } as never;

describe('ResetPasswordScreen', () => {
  it('submits email and shows success message', async () => {
    const resetPassword = jest.fn().mockResolvedValue(undefined);
    mockUseAuth.mockReturnValue({
      ...mockUseAuth(),
      resetPassword,
    } as ReturnType<typeof useAuth>);

    const { getByTestId } = await render(
      <ResetPasswordScreen theme={theme} />
    );

    await act(async () => {
      fireEvent.changeText(getByTestId('reset-password-email'), 'user@example.com');
      fireEvent.press(getByTestId('reset-password-submit'));
    });

    await waitFor(() => expect(resetPassword).toHaveBeenCalled());
    expect(resetPassword).toHaveBeenCalledWith({ email: 'user@example.com' });
    expect(getByTestId('reset-password-success')).toBeTruthy();
  });

  it('shows validation error for invalid email', async () => {
    const { getByTestId, findByText } = await render(
      <ResetPasswordScreen theme={theme} />
    );

    await act(async () => {
      fireEvent.changeText(getByTestId('reset-password-email'), 'not-an-email');
      fireEvent.press(getByTestId('reset-password-submit'));
    });

    expect(await findByText('Invalid email address')).toBeTruthy();
  });

  it('navigates back to sign-in', async () => {
    const { getByTestId } = await render(
      <ResetPasswordScreen theme={theme} />
    );

    await act(async () => {
      fireEvent.press(getByTestId('reset-password-to-sign-in'));
    });
    expect(mockPush).toHaveBeenCalledWith('/(auth)/sign-in');
  });
});
