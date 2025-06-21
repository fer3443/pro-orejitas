"use client";

import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoTrash } from "react-icons/io5";

import { CreatePostValues, petPostSchema, PetPostValues } from "@/interface";
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
  Textarea,
} from "@/components";
import { uploadImagesToCloudinary } from "@/lib/uploadImagesToCloudinary";
import { toast } from "sonner";

interface PetPostFormProps {
  initialValues?: PetPostValues;
  onSubmit: (values: CreatePostValues) => Promise<void>;
  isEditing?: boolean;
}

export const PetPostForm = ({
  initialValues,
  onSubmit,
  isEditing = false,
}: PetPostFormProps) => {
  const [preview, setPreview] = React.useState<string[]>([]);
  // const [uploadedImages, setUploadedImages] = React.useState<{url:string; publicId:string}[]>([])
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const form = useForm<PetPostValues>({
    resolver: zodResolver(petPostSchema),
    defaultValues: initialValues || {
      age: "",
      breed: "",
      description: "",
      image: [],
      location: "",
      species: "PERRO",
      status: "ACTIVE",
      title: "",
      type: "LOST",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const fileArray = Array.from(files).slice(0, 2);
      form.setValue("image", fileArray, { shouldValidate: true });
      form.clearErrors("image");

      //previews
      const previewUrls = fileArray.map((file) => URL.createObjectURL(file));
      setPreview(previewUrls);
      console.log(previewUrls);
    } else {
      form.resetField("image");
      setPreview([]);
    }
  };

  const removeImage = (index: number) => {
    const newPreviews = preview.filter((_, i) => i !== index);
    setPreview(newPreviews);

    const currentFiles = form.getValues("image");
    const newFiles = currentFiles.filter((_, i) => i !== index);
    form.setValue("image", newFiles, { shouldValidate: true });

    if (newFiles.length === 0 && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  React.useEffect(() => {
    return () => {
      preview.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [preview]);

  const handleSubmit = async (data: PetPostValues) => {
    try {
      if (form.getValues("image").length === 0) {
        form.setError("image", {
          type: "manual",
          message: "Debes subir al menos una imágen",
        });
        return;
      }

      const uploaded = await uploadImagesToCloudinary(form.getValues("image"));
      const finalPayload = {
        ...data,
        image: uploaded,
      };

      await onSubmit(finalPayload);
    } catch (error) {
      console.log(error, "error en el onsubmit");
      toast.error("Ocurrio un error al crear la publicación. Intentalo de nuevo más tarde.")
    }
  };

  return (
    <div className="">
      {preview.length > 0 && (
        <div className="w-full flex flex-wrap gap-4 mb-6">
          {preview.map((src, idx) => (
            <div
              key={idx}
              className="relative w-24 h-24 rounded overflow-hidden border group"
            >
              <Image
                src={src}
                alt={`Preview ${idx + 1}`}
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
              <button
                type="button"
                className="absolute z-10 top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs cursor-pointer md:opacity-0 md:group-hover:opacity-100 transition"
                onClick={() => removeImage(idx)}
              >
                <IoTrash />
              </button>
            </div>
          ))}
        </div>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-8 grid px-2 grid-cols-2 w-full max-w-[450px]"
        >
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem className="col-span-full">
                <FormLabel>Subí imágenes</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    multiple
                    accept="image/png, image/jpeg, image/avif, image/webp"
                    onChange={handleImageChange}
                    aria-label="Subí una o más imágenes"
                    className="bg-green-100"
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Selecciona hasta <span className="font-bold">2 imágenes</span>
                  .
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <Button disabled={form.formState.isSubmitting} type="submit">
            {isEditing ? "Editar" : "Publicar"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
