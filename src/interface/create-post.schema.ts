import { z } from 'zod';

export const CreatePostSchema = z.object({
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
  image: z.array(z.object({
    url:z.string().url({message:"La URL de la imagen no es válida"}),
    publicId:z.string().min(1, "Falta el publicId de la imagen")
  })).min(1, "Debes subir al menos una imagen").max(2, "Solo puedes subir hasta 2 imagenes"),
  status: z.enum(["ACTIVE", "RESOLVED", "CLOSED"]),
})

export type CreatePostValues = z.infer<typeof CreatePostSchema>;