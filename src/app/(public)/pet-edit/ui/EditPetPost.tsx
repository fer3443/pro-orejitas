"use client";

import { PetPostForm } from "@/components";
import { useUserPosts } from "@/hooks/useUserPosts";
import { PetPost } from "@/interface";
import React from "react";
import { toast } from "sonner";

interface Props {
  data: PetPost;
}
export const EditPetPost = ({ data }: Props) => {
  const { handleUpdatedPost } = useUserPosts({});

  return (
    <PetPostForm
      initialValues={{
        ...data,
        image: Array.isArray(data.image) ? data.image.map((img) => img) : [],
      }}
      isEditing
      onSubmit={async (values) => {
        toast.promise(handleUpdatedPost(values), {
          loading: "Editando publicación...",
          success: (resp) => resp?.message,
          error: (error) => {
            console.log(error);
            return "Error al editar la publicación";
          },
        });
      }}
    />
  );
};