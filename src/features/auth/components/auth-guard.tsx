import { type ReactNode } from 'react';

import { Redirect } from 'expo-router';

import { routes } from '@/lib/routes';

import { useAuthContext } from './auth-provider';

type AuthGuardProps = {
  children: ReactNode;
};

export function AuthGuard({ children }: AuthGuardProps) {
  const { isLoading, isAuthenticated } = useAuthContext();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Redirect href={routes.signIn} />;
  }

  return children;
}
