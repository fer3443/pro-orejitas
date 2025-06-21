"use server";

import { CreatePostSchema, UpdatePostValues } from "@/interface";
import { getUserToken } from "../user/get-user-token";
import { verifyToken } from "@/lib/auth-token";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const updatePetPost = async (values:UpdatePostValues) => {

  const tokenData = await getUserToken();
  if(!tokenData.success) return {success:tokenData.success, message:"No se encontro token", status:401};

  const user = verifyToken(tokenData.token as string) as {id:string};
  if(!user || !user.id) return { success:false, message:"Token inválido", status: 401};

  const parsedResults = CreatePostSchema.safeParse(values);
  if(!parsedResults.success) return { success:false, message: parsedResults.error.issues[0].message, status: 400};

  try {
    const {id, image, ...rest} = parsedResults.data;
    if(!id)return {success:false, message:"No se encontró el post", status:404}
    const updatedPost = await prisma.petPost.update({
            where: {id},
            data: {
              ...rest,
              updatedAt: new Date()
            }
          })
      console.log("desde action", updatedPost)
      revalidatePath('/feed')
      return {success:true, message:'Publicación actualizada', status:200}
  } catch (error) {
    console.error("Error en updatePetPost", error);
    return {
      success:false, message:'Error inesperado', status: 500
    }
  }
};