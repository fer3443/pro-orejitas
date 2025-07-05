"use server"

import { PostsCount, User } from "@/interface";
import { prisma } from "@/lib/prisma";

interface GetUserResponse {
  success:boolean;
  message:string;
  user?:User
}

export const getUserById = async (id:string):Promise<GetUserResponse> => {
  if(!id){
    return {
      success:false,
      message: "No se proporcionó el id"
    }
  }

  try {
    const user = await prisma.user.findUnique({
      where: {id},
      select: {
        name:true,
        email:true,
        role:true,
        isBlocked:true,
        createdAt:true
      }
    })

    if(!user){
      return {
        success:false,
        message:"Usuario no encontrado"
      }
    }

    const groupedCounts = await prisma.petPost.groupBy({
      by:['status'],
      where: {userId: id},
      _count: {
        status:true
      }
    })

    const postCounts:PostsCount = {
      active: groupedCounts.find(p => p.status === 'ACTIVE')?._count.status || 0,
      resolved: groupedCounts.find(p => p.status === 'RESOLVED')?._count.status || 0,
      closed: groupedCounts.find(p => p.status === 'CLOSED')?._count.status || 0,
      total: groupedCounts.reduce((acc, curr) => acc + curr._count.status,0) ,
    }

    return {
      success:true,
      message:"Petición exitosa",
      user: {
        ...user,
        postsCount: postCounts
      }
    }
  } catch (error) {
    console.log("Error al obtenter usuario", error)
    return {
      success:false,
      message:"Error inesperado al obtener el usuario"
    }
  }
}