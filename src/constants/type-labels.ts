import { PostStatus, PostType, Species } from "@/interface";

export const typeLabel: Record<PostType, string> = {
  ADOPTION: "en adopcion",
  FOUND: "encontrado",
  LOST: "perdido",
};

export const labelStatus: Record<PostStatus, string> = {
  ACTIVE: "Activo",
  RESOLVED: "Resuelto",
  CLOSED: "Cerrado",
};

export const speciesLabel: Record<Species, string> = {
  PERRO: "Perro",
  GATO: "Gato",
  OTRO: "Otro",
};