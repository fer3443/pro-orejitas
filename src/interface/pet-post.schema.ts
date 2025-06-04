import { z } from "zod";

export const petPostSchema = z.object({
  id:z.string().uuid().optional(),
  title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres").max(450,"Mximo de 450 caracteres"),
  species: z.enum(["PERRO", "GATO", "OTRO"], {
    required_error: "Debes seleccionar una especie",
  }),
  age:z.string().optional(),
  breed: z.string().optional(),
  location: z.string().min(3, "Debes indicar una ubicación válida"),
  type: z.enum(["LOST", "FOUND", "ADOPTION"], {
    required_error: "Debes seleccionar un tipo de publicación",
  }),
  image: z.array(z.string().url()).min(1, "Debe haber al menos 1 imagen"),
  status: z.enum(["ACTIVE", "RESOLVED", "CLOSED"])
});

export type PetPostValues = z.infer<typeof petPostSchema>;