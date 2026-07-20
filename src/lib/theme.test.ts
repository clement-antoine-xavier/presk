import { useColorScheme } from 'react-native';
import {
  CombinedDarkTheme,
  CombinedDefaultTheme,
  useAppTheme,
} from './theme';

const mockedUseColorScheme = jest.mocked(useColorScheme);

describe('theme', () => {
  afterEach(() => {
    mockedUseColorScheme.mockReset();
  });

  it('returns combined default theme when color scheme is light', () => {
    mockedUseColorScheme.mockReturnValue('light');

    expect(useAppTheme()).toBe(CombinedDefaultTheme);
  });

  it('returns combined dark theme when color scheme is dark', () => {
    mockedUseColorScheme.mockReturnValue('dark');

    expect(useAppTheme()).toBe(CombinedDarkTheme);
  });

  it('returns combined default theme when color scheme is null', () => {
    mockedUseColorScheme.mockReturnValue(null as unknown as 'light' | 'dark' | 'unspecified');

    expect(useAppTheme()).toBe(CombinedDefaultTheme);
  });

  it('returns combined default theme when color scheme is undefined', () => {
    mockedUseColorScheme.mockReturnValue(undefined as unknown as 'light' | 'dark' | 'unspecified');

    expect(useAppTheme()).toBe(CombinedDefaultTheme);
  });
});
