"use server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface DeleteImagesParams {
  publicIds: string[];
}

interface DeleteImagesResponse {
  success: boolean;
  message: string;
}

export const deleteImages = async ({
  publicIds,
}: DeleteImagesParams): Promise<DeleteImagesResponse> => {
  if (!publicIds || publicIds.length === 0 || !Array.isArray(publicIds)) {
    return { success: false, message: "Lista de ids invalida." };
  }
  try {
    const deleteResults = await cloudinary.api.delete_resources(publicIds);
    console.log(deleteResults, "Resultados de eliminacion de imagenes")
    return {success:true, message:"Imagenes eliminadas correctamente"}
    
  } catch (error) {
    console.log("No se pudieron eliminar las imagenes de cd", error);
    return { success: false, message: "Error al eliminar una o mas imágenes" };
  }
};
