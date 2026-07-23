import { useColorScheme } from 'react-native';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  Theme as NavigationTheme,
} from "expo-router/react-navigation";
import {
  MD3DarkTheme,
  MD3LightTheme,
  MD3Theme,
  adaptNavigationTheme,
} from 'react-native-paper';
import merge from 'deepmerge';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme) as MD3Theme & NavigationTheme;
export const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme) as MD3Theme & NavigationTheme;

export type AppTheme = MD3Theme & NavigationTheme;

export function useAppTheme(): AppTheme {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme;
}
