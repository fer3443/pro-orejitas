"use server";

import { prisma } from "@/lib/prisma";


export const getPetPostId = async (id:string) => {
  try {
    const pet = await prisma.petPost.findUnique({
      where:{
        id: id
      },
      include: {
        image: {
          select: {
            url:true
          }
        },
        user: {
          select: {
            name:true
          }
        }
      },
  })
  if(!pet){
    return {
      success:false,
      message: "No se encontró la publicación",
      status: 404,
      data: null
    }
  }

  return {
    success: true,
    message: "Peticion exitosa",
    status:200,
    data: {
      ...pet,
      image: pet.image.map((img) => img.url)
    }
  }
  } catch (error) {
    console.log(error, "get pet by id error")
    return {
      success:false,
      message: "No se pudo realizar la petición",
      status: 500,
      data: null
    }
  }
}