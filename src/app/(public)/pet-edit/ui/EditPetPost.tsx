"use client";

import { useUserPosts } from "@/hooks/useUserPosts";
import { PetPost } from "@/interface";
import React from "react";
import { toast } from "sonner";
import { UpdatePostForm } from "./UpdatePostForm";
import { useRouter } from "next/navigation";

interface Props {
  data: PetPost;
}
export const EditPetPost = ({ data }: Props) => {
  const { handleUpdatedPost } = useUserPosts({});
  const { image, ...rest} = data;
  const router = useRouter()

  return (
    <UpdatePostForm
      initialValues={rest}
      images={image}
      onSubmit={async (values) => {
        toast.promise(handleUpdatedPost(values, image), {
          loading: "Editando publicación...",
          success: (resp) => {
            router.push('/profile')
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