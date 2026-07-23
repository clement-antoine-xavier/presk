import { render, fireEvent, act } from '@testing-library/react-native';

import { routes } from '@/lib/routes';

import CheckEmailScreen from './check-email-screen';

const mockReplace = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({ replace: mockReplace }),
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

beforeEach(() => {
  jest.clearAllMocks();
});

const theme = { colors: { onSurface: '#000' } } as never;

describe('CheckEmailScreen', () => {
  it('renders the check your email message', async () => {
    const { getByText } = await render(
      <CheckEmailScreen theme={theme} />
    );
    expect(getByText('Check your email')).toBeTruthy();
  });

  it('navigates back to sign-in', async () => {
    const { getByTestId } = await render(
      <CheckEmailScreen theme={theme} />
    );
    await act(async () => {
      fireEvent.press(getByTestId('check-email-back-to-sign-in'));
    });
    expect(mockReplace).toHaveBeenCalledWith(routes.signIn);
  });
});
