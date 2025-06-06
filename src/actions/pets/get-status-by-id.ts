"use server"

import { PostStatus } from "@/interface"
import { prisma } from "@/lib/prisma"

export const getStatusById = async(id:string):Promise<PostStatus> => {
  try {
    if(!id) throw new Error('No se encontro id de la publicacion')
      const resp = await prisma.petPost.findUnique({
        where: {
          id
        },
        select: {
          status: true
        }
      })

      return resp?.status ?? "CLOSED"
  } catch (error) {
    console.log(error)
    throw new Error('Hubo un problema al solicitar status')
  }
}