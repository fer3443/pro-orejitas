"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { resetPassword } from "@/actions";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  InputTogglePassword,
} from "@/components";
import { useRouter } from "next/navigation";

interface Props {
  token: string;
}

export const ResetPasswordForm = ({ token }: Props) => {
  const router = useRouter();
  // console.log(path)
  const formSchema = z
    .object({
      newPassword: z
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
        ),
      confirmPass: z.string().trim(),
    })
    .refine((data) => data.newPassword === data.confirmPass, {
      message: "Las contraseñas no coinciden",
      path: ["confirmPass"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPass: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const newPass = values.newPassword;
    try {
      const resp = await resetPassword({ token, newPassword: newPass });
      if (resp.success) {
        toast.success(resp.message, {
          description: "Redirigiendo al login...",
          classNames: { description: "text-gray-800" },
        });
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      } else {
        toast.error(resp.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("No se pudo actualizar la contraseña, error inesperado");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full sm:max-w-lg"
      >
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nueva contraseña</FormLabel>
              <FormControl>
                <InputTogglePassword field={field} placeholder="Michi123" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar contraseña</FormLabel>
              <FormControl>
                <InputTogglePassword field={field} placeholder="Michi123" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={form.formState.isSubmitting} type="submit">
          {form.formState.isSubmitting ? "Enviando..." : "Confirmar"}
        </Button>
      </form>
    </Form>
  );
};
