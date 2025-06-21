"use server";

import { PetPost } from "@/interface";
import { prisma } from "@/lib/prisma";
import { PetPostType } from "@prisma/client";

interface GetPetPostResponse {
  success: boolean;
  message: string;
  status: number;
  data?: PetPost[];
  currentPage?: number;
  totalPages?: number;
}

interface PaginationOptions {
  page?: number;
  take?: number;
  typest?: PetPostType;
}

export const getPetPost = async ({
  page = 1,
  take = 10,
  typest
}: PaginationOptions): Promise<GetPetPostResponse> => {
  if (page < 1) page = 1;
  if (isNaN(Number(page))) page = 1;
  try {
    const results = await Promise.all([
      prisma.petPost.findMany({
        take,
        skip: (page - 1) * take,
        orderBy: {
          createdAt: "desc",
        },
         where: {
          type: typest,
          NOT: {
            status: "CLOSED"
          }
        },
        include: {
          user: {
            select: {
              name: true,
              id: true,
            },
          },
          image: true
        }       
      }),
      prisma.petPost.count({
        where: {type: typest, NOT: { status:"CLOSED"}}
      }),
    ]);
    const totalPage = Math.ceil(results[1] / take);
    // const petPost =
    // const totalCount =
    return {
      success: true,
      message: "Peticion exitosa",
      status: 200,
      currentPage: page,
      data: results[0].map((pet) => ({
        ...pet,
        breed: pet.breed ?? "",
        age: pet.age ?? "",
        image: pet.image.map((img) => ({
          url:img.url,
          publicId: img.publicId,
          id: img.id
        })),
      })),
      totalPages: totalPage,
    };
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: "No se pudo realizar la peticon",
      status: 500,
    };
  }
};