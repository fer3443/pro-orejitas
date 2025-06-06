"use server";

import { prisma } from "@/lib/prisma";
// import { sendPassResetEmail } from "@/actions/send-email-reset";
import { generateTokenPair } from "@/lib/token";

export const requestPasswordReset = async ({email}: {email:string}) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return {success:false, message:"No se pudo completar la acción"};

    const expires = new Date(Date.now() + 1000 * 60 * 60); //1h
    const { token, tokenHash } = generateTokenPair();
    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt: expires,
      },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password?token=${token}`;
    const respEmail = {
      to: user.email,
      name: user.name,
      resetUrl,
    };
    return {
      success: true,
      message:"Link generado",
      respEmail
    };
  } catch (error) {
    console.error("Error en request password", error);
    return {
      success: false,
      message: "Error inesperado al generar link",
      error,
    };
  }
};
