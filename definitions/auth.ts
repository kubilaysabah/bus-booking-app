import * as z from "zod";

export const RegisterFormSchema = z.strictObject({
  firstName: z
    .string()
    .min(2, { error: "Firstname must be at least 2 characters." })
    .max(30, { error: "Firstname must be at most 30 characters." })
    .trim(),
  lastName: z
    .string()
    .min(2, { error: "Lastname must be at least 2 characters." })
    .max(30, { error: "Lastname must be at most 30 characters." })
    .trim(),
  turkish_identity_number: z
    .string()
    .min(11, { error: "Turkish identity number must be 11 characters." })
    .max(11, { error: "Turkish identity number must be 11 characters." })
    .regex(/^\d{11}$/, { error: "Turkish identity number must be a valid 11-digit number." })
    .trim(),
  birthDate: z.string().trim(),
  gender: z.enum(["male", "female", "other"]),
  phone: z.string()
    .min(10, { error: "Phone number must be at least 10 characters." })
    .max(15, { error: "Phone number must be at most 15 characters." })
    .regex(/^\+?[0-9]{10,15}$/, { error: "Please enter a valid phone number." })
    .trim(),
  email: z.email({ error: "Please enter a valid email." }),
  password: z
    .string()
    .regex(/[a-zA-Z]/, { error: "Contain at least one letter." })
    .regex(/[0-9]/, { error: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      error: "Contain at least one special character.",
    })
});

export type RegisterFormType = z.infer<typeof RegisterFormSchema>;
