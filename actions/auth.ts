import { RegisterFormSchema, FormState } from "@/definitions/auth";
import { ZodError } from 'zod'

export async function register(state: FormState, formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  // Validate form fields
  const validatedFields = RegisterFormSchema.safeParse(data);

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return validatedFields.error!.issues
  }

  // Call the provider or db to create a user...

  return data;
}
