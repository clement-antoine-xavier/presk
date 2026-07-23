
import * as authExports from './index';

test('exports auth public API', () => {
  expect(authExports.AuthGuard).toBeDefined();
  expect(authExports.AuthProvider).toBeDefined();
  expect(authExports.useAuthContext).toBeDefined();
  expect(authExports.useAuth).toBeDefined();
  expect(authExports.SignInScreen).toBeDefined();
  expect(authExports.SignUpScreen).toBeDefined();
  expect(authExports.ResetPasswordScreen).toBeDefined();
  expect(authExports.CheckEmailScreen).toBeDefined();
  expect(authExports.UpdatePasswordScreen).toBeDefined();
});
