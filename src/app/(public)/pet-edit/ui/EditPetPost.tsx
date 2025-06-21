"use client";

import { useUserPosts } from "@/hooks/useUserPosts";
import { PetPost } from "@/interface";
import React from "react";
import { toast } from "sonner";
import { UpdatePostForm } from "./UpdatePostForm";

interface Props {
  data: PetPost;
}
export const EditPetPost = ({ data }: Props) => {
  const { handleUpdatedPost } = useUserPosts({});
  const { image, ...rest} = data;

  return (
    <UpdatePostForm
      initialValues={rest}
      images={image}
      onSubmit={async (values) => {
        toast.promise(handleUpdatedPost(values, image), {
          loading: "Editando publicación...",
          success: (resp) => {
            return resp?.message
          },
          error: (error) => {
            console.log(error);
            return "Error al editar la publicación";
          },
        });
      }}
    />
  );
};