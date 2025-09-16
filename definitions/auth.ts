import { z } from "zod";

export const RegisterFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Firstname must be at least 2 characters long." })
    .trim(),
  lastName: z
    .string()
    .min(2, { message: "Lastname must be at least 2 characters long." })
    .trim(),
  turkish_identity_number: z.string().min(11).max(11).trim(),
  birthDate: z.string().trim(),
  gender: z.enum(["male", "female", "other"]),
  phone: z.string().trim(),
  email: z.email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export type FormState = any;
