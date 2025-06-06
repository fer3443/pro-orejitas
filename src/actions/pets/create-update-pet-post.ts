"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

import { PetPost, petPostSchema, PetPostValues } from "@/interface";
import { verifyToken } from "@/lib/auth-token";
import { getUserToken } from "../user/get-user-token";

interface PetPostResposne {
  success: boolean;
  message: string;
  status: number;
  post?: PetPost
}

interface TokenPayload {
  id: string;
  email: string;
  name: string;
  role: string;
}

export const createUpdatePetPost = async (
  values: PetPostValues
): Promise<PetPostResposne> => {
  const tokenData = await getUserToken();
  if (!tokenData.success) {
    return {
      ...tokenData,
      status: 401,
    };
  }
  const user = verifyToken(tokenData.token as string) as TokenPayload;

  if (!user || !user.id) {
    return { success: false, message: "Token inválido", status: 401 };
  }

  const parsedResult = petPostSchema.safeParse(values);
  if (!parsedResult.success) {
    return {
      success: false,
      message: parsedResult.error.issues[0].message,
      status: 400,
    };
  }
  const { id, image, ...rest } = parsedResult.data;
  try {
    const post = await prisma.$transaction(async (tx) => {
      //si hay id de post, actualizo
      if (id) {
        const updated = await prisma.petPost.update({
          where: { id: id },
          data: {
            ...rest,
            updatedAt: new Date(),
          },
        });

        await tx.imagePets.deleteMany({
          where: { petPostId: values.id },
        });

        await tx.imagePets.createMany({
          data: image.map((url) => ({
            url,
            petPostId: values.id!,
          })),
        });
        return {
          success:true,
          message:"Post actualizado",
          status: 200,
          updated
        }
      } else {
        //si no creo
        const created = await prisma.petPost.create({
          data: {
            ...rest,
            userId: user.id,
            image: {
              create: image.map((url) => ({ url })),
            },
          },
        });
        
        return {
          success:true,
          message:"Todo listo",
          status: 200,
          created
        };
      }
    });

    revalidatePath(`/petpost/${id}`);

    return post;
  } catch (error) {
    console.log("Error inesperado al crear/actualizar publicación", error);
    return {
      success: false,
      message: "No se pudo realizar la operación",
      status: 500,
    };
  }
};