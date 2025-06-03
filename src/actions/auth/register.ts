"use server";

import { registerSchema, RegisterValues } from "@/interface";
import { hashPassword } from "@/lib/hash";
import { prisma } from "@/lib/prisma";

interface RegisterResponse {
  success: boolean;
  message?: string;
  status: number;
}

export const registerUser = async (
  values: RegisterValues
): Promise<RegisterResponse> => {
  const parsedResult = registerSchema.safeParse(values);
  if (!parsedResult.success) {
    return {
      success: false,
      message: parsedResult.error.issues[0].message,
      status: 400,
    };
  }

  try {
    const userExist = await prisma.user.findUnique({
      where: {
        email: parsedResult.data.email,
      },
    });

    if (userExist) {
      return {
        success: false,
        message: "El email ya se encuentra registrado",
        status: 400,
      };
    }

    const { password, email, name } = parsedResult.data;
    const hashedPassword = await hashPassword(password);
    const user = {
      name,
      email: email.toLocaleLowerCase(),
      password: hashedPassword,
    };
    await prisma.user.create({
      data: user,
    });

    return {
      success: true,
      message: "Usuario creado correctamente",
      status: 200,
    };
  } catch (error) {
    console.log("Error en resgiterUser",error)
    return {
      success: false,
      message:
        "Error inesperado al crear el usuario, por favor intente más tarde",
      status: 500,
    };
  }
};