import { z } from "zod";
import { RegisterFormSchema, LoginFormSchema } from "../definitions/auth";

// Register types derived from Zod schema
export type RegisterParams = z.infer<typeof RegisterFormSchema>;
export type RegisterResponse = {
  success: boolean;
};

// Login types derived from Zod schema
export type LoginParams = z.infer<typeof LoginFormSchema>;
export type LoginResponse = {
  success: boolean;
};
