"use client";

import { PetPostForm } from "@/components";
import { useUserPosts } from "@/hooks/useUserPosts";
import { PetPostValues } from "@/interface";
import React from "react";
import { toast } from "sonner";

interface Props {
  id: string;
}
export const EditPetPost = ({ id }: Props) => {
  const { handleCreateUpdatePost, posts } = useUserPosts({});
  const data = posts.find((post) => post.id === id ? post : {})

  return (
    <PetPostForm
      initialValues={{
        ...data,
        image: data!.image.map((img) => img),
      } as PetPostValues}
      isEditing
      onSubmit={async (values) => {
        toast.promise(handleCreateUpdatePost(values), {
          loading: "Editando publicación...",
          success: "Publicacion editada con éxito",
          error: (error) => {
            console.log(error);
            return "Error al editar la publicación";
          },
        });
      }}
    />
  );
};