import axios from "axios";

export const uploadImagesToCloudinary = async (files: File[]) => {
  const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string;
  const api_key = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string;

  try {
    const { data } = await axios.get("/api/sign-cloudinary-params");
    const { timestamp, signature, folder, transformation } = data;
    const uploads = files.map(async (file) => {
     const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder); // 👈 Tiene que estar en el mismo orden
      formData.append("timestamp", String(timestamp));
      formData.append("signature", signature);
      formData.append("api_key", api_key);
      formData.append("transformation", transformation);

      const uploadRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData,
        {
        headers: { "Content-Type": "multipart/form-data" },
      }
      );
      return {
        url: uploadRes.data.secure_url as string,
        publicId: uploadRes.data.public_id as string,
      };
    });
    return await Promise.all(uploads);
  } catch (error) {
    console.log(error, "Error al subir imagen");
    throw new Error ('No se pudieron subir las imágenes')
  }
};