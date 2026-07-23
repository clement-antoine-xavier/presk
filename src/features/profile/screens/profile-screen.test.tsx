import { render, fireEvent, act } from '@testing-library/react-native';

import { routes } from '@/lib/routes';

import { useAuth } from '@/features/auth/hooks/use-auth';

import ProfileScreen from './profile-screen';

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

jest.mock('@/features/auth/hooks/use-auth', () => ({
  useAuth: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

const theme = { colors: { onSurface: '#000' } } as never;

describe('ProfileScreen — authenticated', () => {
  it('displays display name when available', async () => {
    mockUseAuth.mockReturnValue({
      user: { id: '1', email: 'user@example.com', displayName: 'Jane Doe' },
      isAuthenticated: true,
      signOut: jest.fn(),
      session: null,
      isLoading: false,
      signIn: jest.fn(),
      signUp: jest.fn(),
      resetPassword: jest.fn(),
      updatePassword: jest.fn(),
      error: null,
      clearError: jest.fn(),
    });

    const { getByTestId } = await render(
      <ProfileScreen theme={theme} />
    );
    expect(getByTestId('profile-name').children[0]).toBe('Jane Doe');
  });

  it('falls back to email when display name is missing', async () => {
    mockUseAuth.mockReturnValue({
      user: { id: '1', email: 'user@example.com' },
      isAuthenticated: true,
      signOut: jest.fn(),
      session: null,
      isLoading: false,
      signIn: jest.fn(),
      signUp: jest.fn(),
      resetPassword: jest.fn(),
      updatePassword: jest.fn(),
      error: null,
      clearError: jest.fn(),
    });

    const { getByTestId } = await render(
      <ProfileScreen theme={theme} />
    );
    expect(getByTestId('profile-name').children[0]).toBe('user@example.com');
  });

  it('navigates to update-password and calls sign-out', async () => {
    const signOut = jest.fn();
    mockUseAuth.mockReturnValue({
      user: { id: '1', email: 'user@example.com', displayName: 'Jane' },
      isAuthenticated: true,
      signOut,
      session: null,
      isLoading: false,
      signIn: jest.fn(),
      signUp: jest.fn(),
      resetPassword: jest.fn(),
      updatePassword: jest.fn(),
      error: null,
      clearError: jest.fn(),
    });

    const { getByTestId } = await render(
      <ProfileScreen theme={theme} />
    );

    await act(async () => {
      fireEvent.press(getByTestId('profile-update-password'));
    });
    expect(mockPush).toHaveBeenCalledWith(routes.updatePassword);

    await act(async () => {
      fireEvent.press(getByTestId('profile-sign-out'));
    });
    expect(signOut).toHaveBeenCalled();
  });
});

describe('ProfileScreen — unauthenticated', () => {
  it('shows sign-in and sign-up buttons', async () => {
    mockUseAuth.mockReturnValue({
      user: null,
      isAuthenticated: false,
      signOut: jest.fn(),
      session: null,
      isLoading: false,
      signIn: jest.fn(),
      signUp: jest.fn(),
      resetPassword: jest.fn(),
      updatePassword: jest.fn(),
      error: null,
      clearError: jest.fn(),
    });

    const { getByTestId } = await render(
      <ProfileScreen theme={theme} />
    );

    await act(async () => {
      fireEvent.press(getByTestId('profile-sign-in'));
    });
    expect(mockPush).toHaveBeenCalledWith(routes.signIn);

    await act(async () => {
      fireEvent.press(getByTestId('profile-sign-up'));
    });
    expect(mockPush).toHaveBeenCalledWith(routes.signUp);
  });
});
