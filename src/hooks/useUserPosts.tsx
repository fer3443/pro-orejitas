"use client";

import { createUpdatePetPost, getUserPost } from "@/actions";
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
  const loading = useUserPostStore(state => state.loading);
  const setLoading = useUserPostStore(state => state.setLoading);

  const [pages, setPages] = React.useState<number>();

  React.useEffect(() => {
    const getUserPosts = async () => {
      setLoading(true)
      const { data, totalPages } = await getUserPost({ page });
      setPost(data?.posts as PetPost[]);
      setPages(totalPages);
      setLoading(false);
    };

    getUserPosts();
  }, [page]);

  const handleCreateUpdatePost = async (data: PetPostValues) => {
    try {
      setLoading(true)
      const resp = await createUpdatePetPost(data);
      if(resp.success && resp.post){
        data.id ? updatePost(resp.post) : addPost(resp.post)
      }
    } catch (error) {
      console.log("Error al actualizar/crear el post",error)
    }finally{
      setLoading(false)
    }
    // if (resp.success && resp.post) {
    //   if (data.id) {
    //     updatePost(resp.post);
    //   } else {
    //     addPost(resp.post as PetPost);
    //   }
    // }
  };

  return {
    posts,
    handleCreateUpdatePost,
    pages,
    loading,
  };
};
