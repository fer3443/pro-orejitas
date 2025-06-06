"use client";

import { createUpdatePetPost, getUserPost, updatePetPost } from "@/actions";
import { PetPost, PetPostValues } from "@/interface";
import { useUserPostStore } from "@/store";
import React from "react";

interface Props {
  page?: number;
}

export const useUserPosts = ({ page = 1 }: Props) => {
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
      const { data, totalPages } = await getUserPost({ page });
      setPost(data?.posts as PetPost[]);
      setPages(totalPages);
      setLoading(false);
    };

    getUserPosts();
  }, [page]);

  const handleCreatedPost = async (data: PetPostValues) => {
    try {
      setLoading(true);
      const resp = await createUpdatePetPost(data);
      addPost(resp.post as PetPost);
      return { message: resp.message };
    } catch (error) {
      console.log("Error al crear el post", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatedPost = async (data: PetPostValues) => {
    try {
      setLoading(true);
      const resp = await updatePetPost(data);
      if(resp.success) updatePost(data);
      return { message: resp.message };
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
