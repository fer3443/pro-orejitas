"use client";

import { createUpdatePetPost } from "@/actions";
import { PetPostForm } from "@/components";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const NewPetPost = () => {
  const router = useRouter()
  return (
    <PetPostForm
      onSubmit={async (values) => {
        toast.promise(createUpdatePetPost(values), {
          loading: "Creando publicación...",
          success: () => {
            router.push('/feed')
            return "Publicacion creada con éxito"
          },
          error: (error) => {
            console.log(error);
            return "Error al crear publicación";
          },
        });
      }}
    />
  );
};