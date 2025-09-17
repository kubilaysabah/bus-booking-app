import { z } from "zod";
import { RegisterFormSchema, LoginFormSchema } from "../definitions/auth";
import type { JWTPayload } from "jose";

// Register types derived from Zod schema
export type RegisterParams = z.infer<typeof RegisterFormSchema>;
export type RegisterResponse = {
  success: boolean;
  user?: User;
};

// Login types derived from Zod schema
export type LoginParams = z.infer<typeof LoginFormSchema>;
export type LoginResponse = {
  success: boolean;
  user?: User;
};

export type User = {
  readonly userId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phone: string;
  readonly gender: string;
  readonly birthDate: Date | string;
  readonly turkish_identity_number: string;
  readonly image: string | null;
};

export type Session = User & JWTPayload;