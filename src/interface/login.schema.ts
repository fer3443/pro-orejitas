import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("EL mail no es válido").trim(),
  password: z
    .string()
    .trim()
    .min(8, {
      message:
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número",
    })
    .refine(
      (val) => /[A-Z]/.test(val),
      "La contraseña debe tener al menos una letra mayúscula"
    )
    .refine(
      (val) => /[a-z]/.test(val),
      "La contraseña debe tener al menos una letra minúscula"
    )
    .refine(
      (val) => /[0-9]/.test(val),
      "La contraseña debe tener al menos un número"
    )
})

export type LoginValues = z.infer<typeof loginSchema>;