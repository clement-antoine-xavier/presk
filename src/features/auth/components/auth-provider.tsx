import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import { supabase } from '@/services/supabase';

import { type AuthState } from '../types';

export type AuthContextValue = AuthState;

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

function mapUser(user: unknown): AuthState['user'] {
  if (!user || typeof user !== 'object') return null;

  const record = user as Record<string, unknown>;
  const id = typeof record.id === 'string' ? record.id : '';
  const email = typeof record.email === 'string' ? record.email : '';
  const metadata = (record.user_metadata as Record<string, unknown> | undefined) ?? {};
  const displayName =
    typeof metadata.display_name === 'string' ? metadata.display_name : undefined;

  return { id, email, displayName };
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    let isMounted = true;

    async function initialize() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!isMounted) return;

      setState({
        user: mapUser(session?.user ?? null),
        session: session ?? null,
        isLoading: false,
        isAuthenticated: Boolean(session?.user),
      });
    }

    initialize();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({
        user: mapUser(session?.user ?? null),
        session: session ?? null,
        isLoading: false,
        isAuthenticated: Boolean(session?.user),
      });
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
