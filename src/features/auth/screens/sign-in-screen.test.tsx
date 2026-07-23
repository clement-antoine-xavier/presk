import { render, fireEvent, waitFor, act } from '@testing-library/react-native';

import { useAuth } from '../hooks/use-auth';
import SignInScreen from './sign-in-screen';

const mockPush = jest.fn();
const mockReplace = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: mockPush, replace: mockReplace }),
  useLocalSearchParams: () => ({}),
  Redirect: function Redirect({ href }: { href: string }) {
    /* eslint-disable @typescript-eslint/no-require-imports */
    const React = require('react');
    const { Text } = require('react-native');
    /* eslint-enable @typescript-eslint/no-require-imports */
    return React.createElement(Text, { testID: `redirect-${href}` }, href);
  },
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

jest.mock('../hooks/use-auth', () => ({
  useAuth: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
  mockUseAuth.mockReturnValue({
    signIn: jest.fn().mockResolvedValue(undefined),
    error: null,
    clearError: jest.fn(),
    user: null,
    session: null,
    isLoading: false,
    isAuthenticated: false,
    signUp: jest.fn(),
    signOut: jest.fn(),
    resetPassword: jest.fn(),
    updatePassword: jest.fn(),
  });
});

const theme = { colors: { onSurface: '#000' } } as never;

describe('SignInScreen', () => {
  it('submits valid credentials and navigates to conversations', async () => {
    const signIn = jest.fn().mockResolvedValue(undefined);
    mockUseAuth.mockReturnValue({
      ...mockUseAuth(),
      signIn,
    } as ReturnType<typeof useAuth>);

    const { getByTestId } = await render(<SignInScreen theme={theme} />);

    await act(async () => {
      fireEvent.changeText(getByTestId('sign-in-email'), 'user@example.com');
      fireEvent.changeText(getByTestId('sign-in-password'), 'password123');
      fireEvent.press(getByTestId('sign-in-submit'));
    });

    await waitFor(() => expect(signIn).toHaveBeenCalled());
    expect(signIn).toHaveBeenCalledWith({ email: 'user@example.com', password: 'password123' });
    expect(mockReplace).toHaveBeenCalledWith('/(app)/(tabs)/conversations');
  });

  it('shows validation errors for empty fields', async () => {
    const { getByTestId, findByText } = await render(<SignInScreen theme={theme} />);

    fireEvent.press(getByTestId('sign-in-submit'));

    expect(await findByText('Email is required')).toBeTruthy();
    expect(await findByText('Password is required')).toBeTruthy();
  });

  it('navigates to sign-up', async () => {
    const { getByTestId } = await render(<SignInScreen theme={theme} />);
    fireEvent.press(getByTestId('sign-in-to-sign-up'));
    expect(mockPush).toHaveBeenCalledWith('/(auth)/sign-up');
  });

  it('navigates to reset-password', async () => {
    const { getByTestId } = await render(<SignInScreen theme={theme} />);
    fireEvent.press(getByTestId('sign-in-to-reset-password'));
    expect(mockPush).toHaveBeenCalledWith('/(auth)/reset-password');
  });

});
