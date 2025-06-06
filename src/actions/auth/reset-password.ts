"use server";

import { hashPassword } from "@/lib/hash";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

interface ResetPasswordProps {
  token:string;
  newPassword:string;
}

export const resetPassword = async ({token, newPassword}:ResetPasswordProps) => {
  try {
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const tokenRecord = await prisma.passwordResetToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
      return {
        success: false,
        message: "Token inválido o expirado",
      };
    }

    const hashedPassword = await hashPassword(newPassword);

    await prisma.$transaction([
      prisma.user.update({
        where: {id: tokenRecord.userId},
        data: { password: hashedPassword}
      }),
      prisma.passwordResetToken.delete({
        where: {tokenHash}
      })
    ])

    return {
      success:true,
      message:"Contraseña actualizada correctamente"
    }
  } catch (error) {
    console.error("Error al resetear contraseña", error)
    return {
      success:false,
      message: "No se pudo actualizar la contraseña",
      error
    }
  }
};
