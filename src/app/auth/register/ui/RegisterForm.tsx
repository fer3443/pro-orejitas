"use client";

import React from 'react';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation';

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components'
import { registerSchema, RegisterValues } from '@/interface';
import { toast } from 'sonner';
import { registerUser } from '@/actions';

export const RegisterForm = () => {
  const router = useRouter()
  const form = useForm<RegisterValues>({
      resolver: zodResolver(registerSchema),
      defaultValues: {
        name:"",
        email: "",
        password: "",
      }
    })

  async function onSubmit(values: RegisterValues){
    try {
      const resp = await registerUser(values);
      if(resp.success){
        toast.success(resp.message)
        router.push("/auth/login")
      }else{
        toast("No se pudo crear cuenta", {description: <span className='text-gray-500'>{resp.message}</span>})
      }
    } catch (error) {
      console.log(error)
      toast.warning("Error al crear cuenta", {description: <span className='text-gray-500'>Por favor intenta más tarde</span>})
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-[300px]">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre completo</FormLabel>
              <FormControl>
                <Input placeholder="José Perez" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        type="submit">{form.formState.isSubmitting ? "Cargando..." : "Crear cuenta"}</Button>
      </form>
    </Form>
  )
}