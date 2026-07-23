export type AuthCredentials = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: string;
  email: string;
  displayName?: string;
};

export type SignUpData = AuthCredentials & {
  confirmPassword: string;
  displayName: string;
};

export type ResetPasswordData = {
  email: string;
};

export type UpdatePasswordData = {
  password: string;
  confirmPassword: string;
};

export type AuthState = {
  user: AuthUser | null;
  session: unknown | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};
