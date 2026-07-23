import { render } from '@testing-library/react-native';

import Index from '@/app/index';

const mockUseAuthContext = jest.fn();

jest.mock('@/features/auth/components/auth-provider', () => ({
  useAuthContext: () => mockUseAuthContext(),
}));

describe('Index', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('redirects authenticated users to conversations', async () => {
    mockUseAuthContext.mockReturnValue({ isAuthenticated: true, isLoading: false });
    const { getByTestId } = await render(<Index />);
    expect(getByTestId('redirect-/(app)/(tabs)/conversations')).toBeTruthy();
  });

  it('redirects unauthenticated users to sign-in', async () => {
    mockUseAuthContext.mockReturnValue({ isAuthenticated: false, isLoading: false });
    const { getByTestId } = await render(<Index />);
    expect(getByTestId('redirect-/(auth)/sign-in')).toBeTruthy();
  });

  it('renders nothing while loading', async () => {
    mockUseAuthContext.mockReturnValue({ isAuthenticated: false, isLoading: true });
    const { toJSON } = await render(<Index />);
    expect(toJSON()).toBeNull();
  });
});
