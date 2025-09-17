import * as z from "zod";
import {
  LoginFormSchema,
  LoginFormType,
  RegisterFormSchema,
  RegisterFormType,
} from "@/api/definitions/auth";
import { Register, Login } from "@/api/services/auth";
import { AxiosError } from "axios";

type RegisterState = FormState<RegisterFormType>;
type LoginState = FormState<LoginFormType>;

export async function registerAction(
  initialState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const data = Object.fromEntries(formData.entries());

  // Validate form fields
  const result = RegisterFormSchema.safeParse(data);

  // If any form fields are invalid, return early
  if (!result.success) {
    return z.treeifyError(result.error).properties;
  }

  const parsedData = RegisterFormSchema.parse(data);

  try {
    const response = await Register(parsedData);
    console.log("register response", response);
  } catch (e) {
    const error = e as AxiosError;
  }
}

export async function loginAction(
  initialState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const data = Object.fromEntries(formData.entries());

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
  }
}
