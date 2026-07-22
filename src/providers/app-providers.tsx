import { type ReactNode } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider, Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';

import { useAppTheme } from '@/lib/theme';

SplashScreen.preventAutoHideAsync();

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  const theme = useAppTheme();

  return (
    <PaperProvider theme={theme}>
      <ThemeProvider value={theme}>
        {children}
      </ThemeProvider>
    </PaperProvider>
  );
}

export { Stack };
