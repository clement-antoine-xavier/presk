import {
  signInSchema,
  signUpSchema,
  resetPasswordSchema,
  updatePasswordSchema,
} from './auth-schema';

const validSignIn = {
  email: 'user@example.com',
  password: 'password123',
};

const validSignUp = {
  email: 'user@example.com',
  password: 'password123',
  confirmPassword: 'password123',
  displayName: 'Jane Doe',
};

const validReset = {
  email: 'user@example.com',
};

const validUpdate = {
  password: 'newpassword123',
  confirmPassword: 'newpassword123',
};

describe('signInSchema', () => {
  it('accepts valid credentials', () => {
    expect(signInSchema.safeParse(validSignIn).success).toBe(true);
  });

  it('rejects an invalid email', () => {
    const result = signInSchema.safeParse({ ...validSignIn, email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('rejects an empty email', () => {
    const result = signInSchema.safeParse({ ...validSignIn, email: '' });
    expect(result.success).toBe(false);
  });

  it('rejects an empty password', () => {
    const result = signInSchema.safeParse({ ...validSignIn, password: '' });
    expect(result.success).toBe(false);
  });
});

describe('signUpSchema', () => {
  it('accepts valid data', () => {
    expect(signUpSchema.safeParse(validSignUp).success).toBe(true);
  });

  it('rejects a short password', () => {
    const result = signUpSchema.safeParse({
      ...validSignUp,
      password: 'short',
      confirmPassword: 'short',
    });
    expect(result.success).toBe(false);
  });

  it('rejects mismatched passwords', () => {
    const result = signUpSchema.safeParse({
      ...validSignUp,
      confirmPassword: 'different',
    });
    expect(result.success).toBe(false);
  });

  it('rejects an empty display name', () => {
    const result = signUpSchema.safeParse({ ...validSignUp, displayName: '' });
    expect(result.success).toBe(false);
  });

  it('rejects a whitespace-only display name', () => {
    const result = signUpSchema.safeParse({ ...validSignUp, displayName: '   ' });
    expect(result.success).toBe(false);
  });
});

describe('resetPasswordSchema', () => {
  it('accepts a valid email', () => {
    expect(resetPasswordSchema.safeParse(validReset).success).toBe(true);
  });

  it('rejects an invalid email', () => {
    const result = resetPasswordSchema.safeParse({ email: 'bad-email' });
    expect(result.success).toBe(false);
  });

  it('rejects an empty email', () => {
    const result = resetPasswordSchema.safeParse({ email: '' });
    expect(result.success).toBe(false);
  });
});

describe('updatePasswordSchema', () => {
  it('accepts a valid password pair', () => {
    expect(updatePasswordSchema.safeParse(validUpdate).success).toBe(true);
  });

  it('rejects a short password', () => {
    const result = updatePasswordSchema.safeParse({
      password: 'short',
      confirmPassword: 'short',
    });
    expect(result.success).toBe(false);
  });

  it('rejects mismatched passwords', () => {
    const result = updatePasswordSchema.safeParse({
      password: 'newpassword123',
      confirmPassword: 'different123',
    });
    expect(result.success).toBe(false);
  });
});
