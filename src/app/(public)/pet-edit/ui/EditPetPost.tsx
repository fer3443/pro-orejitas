"use client";

import { createUpdatePetPost } from "@/actions";
import { PetPostForm } from "@/components";
import { PetPost } from "@/interface";
import React from "react";
import { toast } from "sonner";

interface Props {
  data: PetPost;
}
export const EditPetPost = ({ data }: Props) => {
  return (
    <PetPostForm
      initialValues={{
        ...data,
        image: data.image.map((img) => img),
      }}
      isEditing
      onSubmit={async (values) => {
        toast.promise(createUpdatePetPost(values), {
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