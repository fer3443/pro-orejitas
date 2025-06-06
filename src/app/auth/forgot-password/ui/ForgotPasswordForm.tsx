"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { requestPasswordReset } from "@/actions";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components";
import { sendPassResetEmail } from "@/actions/send-email-reset";

export const ForgotPasswordForm = () => {
  const [sended, setSended] = React.useState<boolean>(false);
  const formSchema = z.object({
    email: z.string().email({ message: "Debe completar el campo" }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(value: z.infer<typeof formSchema>) {
    try {
      const resp = await requestPasswordReset(value);
      if (resp.success) {
        const res = await sendPassResetEmail(resp.respEmail!);
        if (res.success) {
          toast.success(res.message, { className: "text-green-500" });
          setSended(true);
        }else{
          toast.error(res.message)
        }
      } else {
        toast.error(resp.message, { className: "text-red-500" });
      }
    } catch (error) {
      console.error(error);
      toast.error("No se pudo enviar el email");
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo Electronico</FormLabel>
              <FormControl>
                <Input placeholder="jose@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={sended} type="submit">
          {form.formState.isSubmitting ? "Enviando..." : "Confirmar"}
        </Button>
      </form>
    </Form>
  );
};
