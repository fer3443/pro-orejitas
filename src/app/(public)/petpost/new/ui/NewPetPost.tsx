"use client";

// import { createUpdatePetPost } from "@/actions";
import { PetPostForm } from "@/components";
import { useUserPosts } from "@/hooks/useUserPosts";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const NewPetPost = () => {
  const router = useRouter();
  const {handleCreatedPost} = useUserPosts({
    userId: ""//!tengo que arreglar esta parte porque no es necesario el id, asi que creo que lo conveniente seria separar el customhook de useUserPosts
  })
  return (
    <PetPostForm
      onSubmit={async (values) => {
        toast.promise(handleCreatedPost(values), {
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