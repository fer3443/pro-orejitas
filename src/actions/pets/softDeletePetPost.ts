"use server"

import { prisma } from "@/lib/prisma"
import { deleteImages } from "../images/delete-images"
import { revalidatePath } from "next/cache"

export const softDeletePetPost = async (id:string) => {
  if(!id){
    return {success:false, message:"No hay id de post para eliminar"}
  }
//1. Busco el post
  try {
    const post = await prisma.petPost.findUnique({
      where: { id },
      select: {
        image: {
          select: {
            publicId:true
          }
        }
      }
    });
    if(!post){
      return {success:false, message:"No se encontró el post con el id proporcionado"}
    }

    //2. Saco los publicIds de las imagenes y las borro de cloudinary
    const publicIds = post.image.map(img => img.publicId)
    const deletedCloudinaryImage = await deleteImages({publicIds});
    if(!deletedCloudinaryImage.success){
      return {success:false, message:deletedCloudinaryImage.message}
    }

    //3. Borro las imagenes de la base
    await prisma.$transaction([
      prisma.imagePets.deleteMany({
        where: {
          petPostId: id
        }
      }),
      prisma.petPost.update({
        where: {id},
        data: {
          status: "CLOSED",
          deletedAt: new Date()
        }
      })
    ])
    revalidatePath('/feed')
    revalidatePath('/profile')
    return {success:true, message: "Post cerrado correctamente"}
  } catch (error) {
    console.error("Error al cerrar el post:", error)
    return {success:false, message:"Error al cerrar el post, intente más tarde"}
  }
}