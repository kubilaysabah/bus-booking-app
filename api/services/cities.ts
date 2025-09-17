import http from "./http";
import type { City } from "@/api/types/city";

export async function getCities(): Promise<City[]> {
  const response = await http.get<{ success: boolean; data: City[] }>("cities");
  return response.data.data;
}