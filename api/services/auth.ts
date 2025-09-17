import http from "./http";
import type {
  LoginParams,
  RegisterParams,
  LoginResponse,
  RegisterResponse,
} from "@/api/types/auth";

export async function Register(
  params: RegisterParams
): Promise<RegisterResponse> {
  const response = await http.post<RegisterResponse>("register", params);
  return response.data;
}

export async function Login(params: LoginParams): Promise<LoginResponse> {
  const response = await http.post<LoginResponse>("login", params);
  return response.data;
}
