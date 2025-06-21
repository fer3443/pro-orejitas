import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPE = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
];

export const petPostSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(450, "Máximo de 450 caracteres"),
  species: z.enum(["PERRO", "GATO", "OTRO"], {
    required_error: "Debes seleccionar una especie",
  }),
  age: z.string().optional(),
  breed: z.string().optional(),
  location: z.string().min(3, "Debes indicar una ubicación válida"),
  type: z.enum(["LOST", "FOUND", "ADOPTION"], {
    required_error: "Debes seleccionar un tipo de publicación",
  }),
  image: z.array(z.instanceof(File)).min(1, { message: "Debes subir al menos una imagen" })
    .max(2, { message: "Solo puedes subir hasta 2 imágenes" })
    .refine(
      (files) => files.every((file) => file.size <= MAX_FILE_SIZE),
      { message: "Cada imagen debe pesar menos de 2MB" }
    )
    .refine(
      (files) => files.every((file) => ACCEPTED_IMAGE_TYPE.includes(file.type)),
      { message: "Solo se permiten imágenes jpg, jpeg, webp, avif o png" }
    ),    
  // image: z.array(z.string().url()).min(1, "Debe haber al menos 1 imagen").max(2,"No podes subir más de 2 imágenes."),
  status: z.enum(["ACTIVE", "RESOLVED", "CLOSED"]),
});

export type PetPostValues = z.infer<typeof petPostSchema>;
