import { z } from 'zod'
import { LoginFormSchema, LoginFormType, RegisterFormSchema, RegisterFormType } from "@/definitions/auth";

type RegisterState = FormState<RegisterFormType>;
type LoginState = FormState<LoginFormType>;

export function register(initialState: RegisterState, formData: FormData): RegisterState {
  const data = Object.fromEntries(formData.entries());

  // Validate form fields
  const result = RegisterFormSchema.safeParse(data);

  // If any form fields are invalid, return early
  if (!result.success) {
    return z.treeifyError(result.error).properties;
  }
}

export function login(initialState: LoginState, formData: FormData): LoginState {
  const data = Object.fromEntries(formData.entries());

  // Validate form fields
  const result = LoginFormSchema.safeParse(data);

  // If any form fields are invalid, return early
  if (!result.success) {
    return z.treeifyError(result.error).properties;
  }
}
