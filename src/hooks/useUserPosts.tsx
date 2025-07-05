"use client";

import { createUpdatePetPost, getUserPost, updatePetPost } from "@/actions";
import { CreatePostValues, PetImages, PetPost, UpdatePostValues } from "@/interface";
import { useUserPostStore } from "@/store";
import React from "react";

interface Props {
  page?: number;
  userId:string;
}

export const useUserPosts = ({ page = 1, userId }: Props) => {
  const setPost = useUserPostStore((state) => state.setPosts);
  const posts = useUserPostStore((state) => state.posts);
  const addPost = useUserPostStore((state) => state.addPost);
  const updatePost = useUserPostStore((state) => state.updatePost);
  const loading = useUserPostStore((state) => state.loading);
  const setLoading = useUserPostStore((state) => state.setLoading);

  const [pages, setPages] = React.useState<number>();

  React.useEffect(() => {
    const getUserPosts = async () => {
      setLoading(true);
      const { data, totalPages } = await getUserPost({ page, userId });
      setPost(data?.posts as PetPost[]);
      setPages(totalPages);
      setLoading(false);
    };

    getUserPosts();
  }, [page]);

  const handleCreatedPost = async (data: CreatePostValues) => {
    try {
      setLoading(true);
      const resp = await createUpdatePetPost(data);
      console.log(resp)
      addPost(resp.post as PetPost);
      return { message: resp.message };
    } catch (error) {
      console.log("Error al crear el post", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatedPost = async (data: UpdatePostValues, images:PetImages[]) => {
    try {
      setLoading(true);
      const resp = await updatePetPost(data);
      if(resp.success) {
        const updatedData = {
          ...data,
          image: images,
          user: {id: userId}
        }
        updatePost(updatedData)
        return { message: resp.message };
      }else{
        return {message: resp.message, status: resp.status}
      }
    } catch (error) {
      console.log("Error al actualizar el post", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    posts,
    handleCreatedPost,
    handleUpdatedPost,
    pages,
    loading,
  };
};
