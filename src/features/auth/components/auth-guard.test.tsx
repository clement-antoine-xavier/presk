import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { createContext, useContext } from 'react';

import { type AuthContextValue } from './auth-provider';
import { AuthGuard } from './auth-guard';

const TestAuthContext = createContext<AuthContextValue | undefined>(undefined);

function useMockAuthContext(): AuthContextValue {
  const context = useContext(TestAuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

const mockUseAuthContext = useMockAuthContext;

jest.mock('./auth-provider', () => ({
  ...(jest.requireActual('./auth-provider') as object),
  useAuthContext: () => mockUseAuthContext(),
}));

type MockAuthState = 'loading' | 'authenticated' | 'unauthenticated';

function MockProvider({
  state,
  children,
}: {
  state: MockAuthState;
  children: React.ReactNode;
}) {
  const value: AuthContextValue = {
    user: state === 'authenticated' ? { id: '1', email: 'a@b.com' } : null,
    session: state === 'authenticated' ? {} : null,
    isLoading: state === 'loading',
    isAuthenticated: state === 'authenticated',
  };

  return (
    <TestAuthContext.Provider value={value}>
      {children}
    </TestAuthContext.Provider>
  );
}

const ProtectedContent = () => <Text>Protected</Text>;

describe('AuthGuard', () => {
  it('renders nothing while loading', async () => {
    const { toJSON } = await render(
      <MockProvider state="loading">
        <AuthGuard>
          <ProtectedContent />
        </AuthGuard>
      </MockProvider>
    );
    expect(toJSON()).toBeNull();
  });

  it('redirects unauthenticated users to sign-in', async () => {
    const { getByTestId } = await render(
      <MockProvider state="unauthenticated">
        <AuthGuard>
          <ProtectedContent />
        </AuthGuard>
      </MockProvider>
    );
    expect(getByTestId('redirect-/(auth)/sign-in')).toBeTruthy();
  });

  it('renders children when authenticated', async () => {
    const { getByText } = await render(
      <MockProvider state="authenticated">
        <AuthGuard>
          <ProtectedContent />
        </AuthGuard>
      </MockProvider>
    );
    expect(getByText('Protected')).toBeTruthy();
  });
});
