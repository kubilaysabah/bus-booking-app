"use server";

import * as z from "zod";
import {
  LoginFormSchema,
  LoginFormType,
  RegisterFormSchema,
  RegisterFormType,
} from "@/api/definitions/auth";
import { Register, Login } from "@/api/services/auth";
import type { AxiosError } from "axios";

type RegisterState = FormState<RegisterFormType>;
type LoginState = FormState<LoginFormType>;

export async function registerAction(
  initialState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const data = {
    turkish_identity_number: formData.get("turkish_identity_number"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    gender: formData.get("gender"),
    birthDate: formData.get("birthdate"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    password: formData.get("password"),
  };

  // Validate form fields
  const result = RegisterFormSchema.safeParse(data);

  // If any form fields are invalid, return early
  if (!result.success) {
    return z.treeifyError(result.error).properties;
  }

  const parsedSafeData = RegisterFormSchema.parse(data);

  try {
    const response = await Register(parsedSafeData);
    console.log("register response", response);
  } catch (e) {
    const error = e as AxiosError;
    console.log("action error", error);
  }
}

export async function loginAction(
  initialState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const data = {
    email: formData.get('email'),
    password: formData.get('password')
  }

  // Validate form fields
  const result = LoginFormSchema.safeParse(data);

  // If any form fields are invalid, return early
  if (!result.success) {
    return z.treeifyError(result.error).properties;
  }

  const parsedData = LoginFormSchema.parse(data);

  try {
    const response = await Login(parsedData);
    console.log("login response", response);
  } catch (e) {
    const error = e as AxiosError;
    console.log("action error", error);
  }
}
