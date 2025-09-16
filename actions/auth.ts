import { z } from 'zod'
import { RegisterFormSchema, RegisterFormType } from "@/definitions/auth";

type State = FormState<RegisterFormType>;

export function register(initialState: State, formData: FormData): State {
  const data = Object.fromEntries(formData.entries());

  // Validate form fields
  const result = RegisterFormSchema.safeParse(data);

  // If any form fields are invalid, return early
  if (!result.success) {
    return z.treeifyError(result.error).properties;
  }
}
