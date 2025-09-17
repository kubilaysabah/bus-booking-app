"use server";

import type { AxiosError } from "axios";
import { z } from "zod";
import {
  LoginFormSchema,
  RegisterFormSchema,
  type LoginFormType,
  type RegisterFormType,
} from "@/api/definitions/auth";
import { Register, Login } from "@/api/services/auth";
import { createSession, deleteSession } from "@/lib/session";

type RegisterState = FormState<RegisterFormType>;
type LoginState = FormState<LoginFormType>;

export async function registerAction(
  _initialState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const data = {
    turkish_identity_number: formData.get("turkish_identity_number"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    gender: formData.get("gender"),
    birthDate: formData.get("birthDate"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    password: formData.get("password"),
  } as const;

  const result = RegisterFormSchema.safeParse(data);
  if (!result.success) return z.treeifyError(result.error).properties;

  const parsed = RegisterFormSchema.parse(data);

  try {
    const response = await Register(parsed);

    if (response.success && response.data) {
      await createSession(response.data);
    }

    return response;
  } catch (e) {
    const error = e as AxiosError;
    console.log("error while register", error);
  }
}

export async function loginAction(
  _initialState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = LoginFormSchema.safeParse(data);
  if (!result.success) return z.treeifyError(result.error).properties;

  const parsed = LoginFormSchema.parse(data);

  try {
    const response = await Login(parsed);

    if (response.success && response.data) {
      await createSession(response.data);
    }

    return response;
  } catch (e) {
    const error = e as AxiosError;
    console.log("error while login", error);
  }
}

export async function logoutAction(): Promise<{ result: boolean }> {
  try {
    await deleteSession();
    return { result: true };
  } catch (error) {
    return { result: false };
  }
}
