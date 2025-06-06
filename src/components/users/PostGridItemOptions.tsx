"use client";

import React from "react";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Link from "next/link";

interface Props {
  id: string;
}

export const PostGridItemOptions = ({ id }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger><IoEllipsisHorizontalSharp/></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem><Link href={`/pet-edit/${id}`}>Editar</Link></DropdownMenuItem>
        <DropdownMenuItem>Ocultar post</DropdownMenuItem>
        <DropdownMenuItem>Eliminar</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
