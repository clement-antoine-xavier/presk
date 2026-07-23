import { supabase } from '@/services/supabase';

import {
  type SignUpFormData,
  type SignInFormData,
  type ResetPasswordFormData,
  type UpdatePasswordFormData,
} from '../schemas/auth-schema';

export async function signIn({ email, password }: SignInFormData) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signUp({
  email,
  password,
  displayName,
}: SignUpFormData) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName,
      },
    },
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function resetPassword({ email }: ResetPasswordFormData) {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw error;
}

export async function updatePassword({ password }: UpdatePasswordFormData) {
  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  if (error) throw error;
  return data;
}
