import { z } from "zod";
import { RegisterFormSchema, LoginFormSchema } from "../definitions/auth";

// Register types derived from Zod schema
export type RegisterParams = z.infer<typeof RegisterFormSchema>;
export type RegisterResponse = {
  success: boolean;
  data?: User;
  message?: string;
};

// Login types derived from Zod schema
export type LoginParams = z.infer<typeof LoginFormSchema>;
export type LoginResponse = {
  success: boolean;
  data?: User;
  message?: string;
};

export type User = {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phone: string;
  readonly gender: string;
  readonly birthDate: Date | string;
  readonly turkish_identity_number: string;
  readonly image: string | null;
};