import { render, fireEvent, waitFor, act } from '@testing-library/react-native';

import { routes } from '@/lib/routes';

import { useAuth } from '../hooks/use-auth';
import SignUpScreen from './sign-up-screen';

const mockReplace = jest.fn();
const mockPush = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({ replace: mockReplace, push: mockPush }),
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
    signUp: jest.fn().mockResolvedValue(undefined),
    error: null,
    clearError: jest.fn(),
    user: null,
    session: null,
    isLoading: false,
    isAuthenticated: false,
    signIn: jest.fn(),
    signOut: jest.fn(),
    resetPassword: jest.fn(),
    updatePassword: jest.fn(),
  });
});

const theme = { colors: { onSurface: '#000' } } as never;

describe('SignUpScreen', () => {
  it('submits valid data and navigates to check-email screen', async () => {
    const signUp = jest.fn().mockResolvedValue(undefined);
    mockUseAuth.mockReturnValue({
      ...mockUseAuth(),
      signUp,
    } as ReturnType<typeof useAuth>);

    const { getByTestId } = await render(<SignUpScreen theme={theme} />);

    await act(async () => {
      fireEvent.changeText(getByTestId('sign-up-display-name'), 'Jane Doe');
      fireEvent.changeText(getByTestId('sign-up-email'), 'jane@example.com');
      fireEvent.changeText(getByTestId('sign-up-password'), 'password123');
      fireEvent.changeText(getByTestId('sign-up-confirm-password'), 'password123');
      fireEvent.press(getByTestId('sign-up-submit'));
    });

    await waitFor(() => expect(signUp).toHaveBeenCalled());
    expect(signUp).toHaveBeenCalledWith({
      displayName: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    });
    expect(mockReplace).toHaveBeenCalledWith(routes.checkEmail);
  });

  it('shows validation errors for invalid input', async () => {
    const { getByTestId, findByText } = await render(
      <SignUpScreen theme={theme} />
    );

    await act(async () => {
      fireEvent.changeText(getByTestId('sign-up-email'), 'invalid-email');
      fireEvent.changeText(getByTestId('sign-up-password'), 'short');
      fireEvent.changeText(getByTestId('sign-up-confirm-password'), 'different');
      fireEvent.press(getByTestId('sign-up-submit'));
    });

    expect(await findByText('Invalid email address')).toBeTruthy();
    expect(await findByText('Password must be at least 8 characters')).toBeTruthy();
    expect(await findByText('Passwords do not match')).toBeTruthy();
  });

  it('navigates to sign-in', async () => {
    const { getByTestId } = await render(<SignUpScreen theme={theme} />);
    await act(async () => {
      fireEvent.press(getByTestId('sign-up-to-sign-in'));
    });
    expect(mockPush).toHaveBeenCalledWith(routes.signIn);
  });
});
