"use server"

import { LoginValues, loginSchema } from "@/interface";
import { comparePassword } from "@/lib/hash";
import { signToken } from "@/lib/auth-token";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

interface LoginResponse {
  success:boolean;
  message:string;
  status:number;
}

export const loginUser = async(values:LoginValues):Promise<LoginResponse> => {
  const parsedResult = loginSchema.safeParse(values);

  if(!parsedResult.success){
    return {
      success:false,
      message: parsedResult.error.issues[0].message,
      status: 400
    }
  }

  const { email, password } = parsedResult.data;
  try {
    const user = await prisma.user.findUnique({where: {email}});
    if(!user){
      return {
        success: false,
        message: "El email o la contraseña son incorrectos",
        status: 404
      }
    }

    const isValidPassword = await comparePassword(password, user.password);
    if(!isValidPassword){
      return {
        success: false,
        message: "El email o la contraseña son incorrectos",
        status: 404
      }
    }

    if(user.isBlocked){
      return {
        success:false,
        message: "El usuario se encuentra bloqueado, comunicate con soporte",
        status: 403
      }
    }

    const token = signToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    })

    const cookieStore = await cookies();

    cookieStore.set({
      name: "auth-user",
      value:token,
      maxAge: 60 * 60 * 24,
      secure: process.env.NODE_ENV === "production",
      path: '/'
    })
    

    return {
      success: true,
      message: "Inicio de sesión exitoso",
      status: 200,
    }

     
  } catch (error) {
    console.log("Error en login", error);
    return {
      success: false,
      message:"Error inesperado, intente nuevamente",
      status: 500
    }
  }

}