"use client";

import React from "react";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { softDeletePetPost } from "@/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface Props {
  id: string;
}
//!Falta cambiar el action de getPetPost para que no traiga los post cerrados
export const PostGridItemOptions = ({ id }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();
  const [open, setOpen] = React.useState(false);

  const handleConfirmDelete = () => {
    startTransition(async () => {
      const result = await softDeletePetPost(id);
      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error("Error al cerrar la publicación");
      }
      setOpen(false);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IoEllipsisHorizontalSharp />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/pet-edit/${id}`}>Editar</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
        onSelect={(e) => e.preventDefault()}
        >  
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
           <Button className="w-full text-left text-red-500 hover:bg-red-100 bg-gray-100">Cerrar publicación</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción cerrará la publicación de forma permanente. No se
                mostrará más públicamente pero puede acceder a la info en el apartado Mi historial.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmDelete}
                disabled={isPending}
              >
                {isPending ? "Cerrando..." : "Sí, cerrar"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
