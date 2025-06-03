"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { petPostSchema, PetPostValues } from '@/interface';
import { Button, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea } from '@/components';

interface PetPostFormProps {
  initialValues?: PetPostValues;
  onSubmit: (values: PetPostValues) => Promise<void>;
  isEditing?:boolean;
}

export const PetPostForm = ({initialValues, onSubmit, isEditing = false}:PetPostFormProps) => {

    const form = useForm<PetPostValues>({
    resolver: zodResolver(petPostSchema),
    defaultValues: initialValues || {
      age: "",
      breed: "",
      description: "",
      image: [""],
      location: "",
      species: "PERRO",
      status: "ACTIVE",
      title: "",
      type: "LOST"
    }
  })

  React.useEffect(() => {
    if(initialValues){
      form.reset(initialValues);
    }
  },[initialValues,form])

  return (
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 grid px-2 grid-cols-2 w-full max-w-[450px]">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className='col-span-full'>
              <FormLabel>Titulo de la publicacíon</FormLabel>
              <FormControl>
                <Input maxLength={150} placeholder="Busco un compañerito de cuatro patitas..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className='col-span-full'>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea maxLength={450} placeholder="Sea michi o firu que le guste la compañia..." className="resize-none" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='col-span-full flex items-center gap-x-4 md:gap-x-6'>
          <FormField
          control={form.control}
          name="species"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Estoy buscando</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} >
                <FormControl>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder="Elegi uno por favor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PERRO">Perro</SelectItem>
                  <SelectItem value="GATO">Gato</SelectItem>
                  <SelectItem value="OTRO">Otro</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Elegi un estado</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder="Elegi uno por favor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="LOST">Perdido</SelectItem>
                  <SelectItem value="FOUND">Encontrado</SelectItem>
                  <SelectItem value="ADOPTION">Adopción</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
         <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem className='col-span-full'>
              <FormLabel>Edad aproximada</FormLabel>
              <FormControl>
                <Input maxLength={150} placeholder="6 meses..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className='col-span-full'>
              <FormLabel>Ubicación</FormLabel>
              <FormControl>
                <Input maxLength={250} placeholder="Entre calles o zona..." {...field} />
              </FormControl>
              <FormDescription className='text-xs'>Te puede ayudar en casos de perdida o encuentro de mascotas.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="breed"
          render={({ field }) => (
            <FormItem className='col-span-full'>
              <FormLabel>Raza</FormLabel>
              <FormControl>
                <Input maxLength={250} placeholder="Mestizo..." {...field} />
              </FormControl>
              <FormDescription className='text-xs'>Te puede ayudar en casos de perdida o encuentro de mascotas.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className='col-span-full'>
              <FormLabel>Imágenes (URLs)</FormLabel>
              {field.value.map((url, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <Input
                    value={url}
                    onChange={(e) => {
                      const newUrls = [...field.value];
                      newUrls[idx] = e.target.value;
                      field.onChange(newUrls);
                    }}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => {
                      const newUrls = field.value.filter((_, i) => i !== idx);
                      field.onChange(newUrls);
                    }}
                  >
                    Quitar
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => field.onChange([...field.value, ''])}
              >
                Agregar imagen
              </Button>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
        disabled={form.formState.isSubmitting}
        type="submit">{isEditing ? "Editar" : "Publicar"}</Button>
      </form>
    </Form>
  )
}