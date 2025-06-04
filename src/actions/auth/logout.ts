"use server";

import { cookies } from "next/headers";

interface LogoutResponse {
  success: boolean;
  message: string;
  status: number;
}

export const logoutUser = async (): Promise<LogoutResponse> => {
  const cookiesStore = await cookies();
  if (cookiesStore.has("auth-user")) {
    cookiesStore.delete("auth-user");
    return {
      success: true,
      message: "Sesión cerrada correctamente",
      status: 200,
    };
  }
  return {
    success: false,
    message: "No hay sesión activa",
    status: 400,
  };
};