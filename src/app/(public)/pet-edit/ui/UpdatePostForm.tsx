"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PetImages, UpdatePostSchema, UpdatePostValues } from "@/interface";
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SlideShowMobile,
  Textarea,
} from "@/components";

interface UpdatePostFormProps {
  initialValues: UpdatePostValues;
  images: PetImages[];
  onSubmit: (values: UpdatePostValues) => Promise<void>;
}

export const UpdatePostForm = ({
  initialValues,
  images,
  onSubmit,
}: UpdatePostFormProps) => {
  const form = useForm<UpdatePostValues>({
    resolver: zodResolver(UpdatePostSchema),
    defaultValues: initialValues,
  });

  return (
    <div className="w-full max-w-[450px] mx-auto">
      <div className="w-full mb-6">
       <SlideShowMobile image={images} title={initialValues.title} className="w-full max-w-[450px]"/>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 grid px-2 grid-cols-2 w-full max-w-[450px]"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Titulo de la publicacíon</FormLabel>
                <FormControl>
                  <Input
                    maxLength={150}
                    placeholder="Busco un compañerito de cuatro patitas..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea
                    maxLength={450}
                    placeholder="Sea michi o firu que le guste la compañia..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-full flex items-center gap-x-4 md:gap-x-6">
            <FormField
              control={form.control}
              name="species"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Estoy buscando</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
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
                <FormItem className="w-full">
                  <FormLabel>Elegi un estado</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
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
              <FormItem className="col-span-full">
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
              <FormItem className="col-span-full">
                <FormLabel>Ubicación</FormLabel>
                <FormControl>
                  <Input
                    maxLength={250}
                    placeholder="Entre calles o zona..."
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Te puede ayudar en casos de perdida o encuentro de mascotas.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="breed"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Raza</FormLabel>
                <FormControl>
                  <Input maxLength={250} placeholder="Mestizo..." {...field} />
                </FormControl>
                <FormDescription className="text-xs">
                  Te puede ayudar en casos de perdida o encuentro de mascotas.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="md:col-span-full"
          >
            {form.formState.isSubmitting ? "Editando" : "Editar"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
