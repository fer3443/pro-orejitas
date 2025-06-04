"use server";

import { verifyToken } from "@/lib/auth-token";
import { PetPost } from "@/interface";
import { prisma } from "@/lib/prisma";
import { getUserToken } from "./get-user-token";

interface PaginationOptions {
  page?: number;
  take?: number;
}

interface GetUserPostResponse {
  success: boolean;
  message: string;
  data?: {
    posts: PetPost[];
  };
  totalPages?: number;
  currentPage?: number;
  status: number;
}

export const getUserPost = async ({
  page = 1,
  take = 5,
}: PaginationOptions): Promise<GetUserPostResponse> => {
  if (page < 1) page = 1;
  if (isNaN(Number(page))) page = 1;

  const { token } = await getUserToken();
  if (!token) return { success: false, message: "Sin token", status: 401 };

  const data = verifyToken(token) as { id: string };
  if (!data) return { success: false, message: "No autorizado", status: 401 };

  try {
    const [posts, total] = await Promise.all([
      prisma.petPost.findMany({
        where: { userId: data.id },
        take,
        skip: (page - 1) * take,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          image: {
            select: {
              id: true,
              url: true,
            },
          },
        },
      }),
      prisma.petPost.count({ where: { userId: data.id } }),
    ]);
    const totalPages = Math.ceil(total / take);
    return {
      success: true,
      message: "Posteos obtenidos",
      data: {
        posts: posts.map((post) => ({
          ...post,
          breed: post.breed || "",
          age: post.age || "",
          image: post.image.map((img) => (img.id, img.url)),
        }))
      },
      totalPages,
      currentPage: page,
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "No se pudo realizar la peticon",
      status: 500,
    };
  }
};