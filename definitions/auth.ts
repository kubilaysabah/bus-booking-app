import { z } from "zod";

export const RegisterFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { error: "Firstname must be at least 2 characters long." })
    .max(50, { error: "Firstname must be at most 50 characters long." })
    .trim(),
  lastName: z
    .string()
    .min(2, { error: "Lastname must be at least 2 characters long." })
    .max(50, { error: "Lastname must be at most 50 characters long." })
    .trim(),
  turkish_identity_number: z
    .string()
    .min(11, {
      error: "Turkish identity number must be exactly 11 characters long.",
    })
    .max(11, {
      error: "Turkish identity number must be exactly 11 characters long.",
    })
    .trim(),
  birthDate: z.string().trim(),
  gender: z.enum(["male", "female", "other"]),
  phone: z.string().trim(),
  email: z.email({ error: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { error: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { error: "Contain at least one letter." })
    .regex(/[0-9]/, { error: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      error: "Contain at least one special character.",
    })
    .trim(),
});

export type RegisterFormType = z.infer<typeof RegisterFormSchema>;
