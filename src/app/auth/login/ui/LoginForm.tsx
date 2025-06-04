"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from 'next/navigation';

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components';
import { loginUser } from '@/actions';
import { toast } from "sonner";
import Link from 'next/link';
import { loginSchema, LoginValues } from '@/interface';


export const LoginForm = () => {
  const router = useRouter();
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  async function onSubmit(values: LoginValues){
    try {
      const resp = await loginUser(values);
      if(resp.success){
        toast.success(resp.message)
        router.push("/feed")
      }else{
        toast("No se pudo iniciar sesión", {description: <span className='text-gray-500'>{resp.message}</span>})
      }
    } catch (error) {
      console.log(error)
      toast.warning("Error al iniciar sesión", {description: <span className='text-gray-500'>Por favor intenta más tarde</span>})
    }
  }
  return (
   <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-[350px]">
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type='password' placeholder="Password123" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
        disabled={form.formState.isSubmitting}
        type="submit">{form.formState.isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}</Button>
      </form>
    </Form>
    <div className='mt-4'>
      <p className='text-sm'>No tenes cuenta todavia?<Link href={"/auth/register"} className='hover:text-blue-500 font-semibold'> Registrate aquí</Link></p>
    </div>
   </>
  )
}