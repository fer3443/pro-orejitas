"use client";

import React from "react";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { generatePagination } from "@/utils";

interface Props {
  totalPages: number;
}

export const PaginationComponent = ({ totalPages }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageString = searchParams.get("page") ?? 1; //si searchPagams es nulo mando 1
  const isNumber = isNaN(+pageString);
  const currentPage = isNumber ? 1 : +pageString; //si pageString no es numero mando 1 sino la pagestring hecha num

  if (currentPage < 1 || isNumber) {
    redirect("/feed");
  }
  const allPages = generatePagination(currentPage, totalPages);

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams); //messirve para construir la ruta de nav

    if (pageNumber === "...") {
      return `${pathname}?${params.toString()}`; //quedo en la ruta en la que estoy
    }

    if (+pageNumber <= 0) {
      return `${pathname}`;
    }

    if (+pageNumber > totalPages) {
      return `${pathname}?${params.toString()}`; //si presionan sgte y no hay mas ruta, queda en donde está
    }

    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination className="my-5">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={createPageUrl(currentPage - 1)} />
        </PaginationItem>
        {allPages.map((page, index) => (
          <PaginationItem key={page + "-" + index}>
            <PaginationLink
              href={createPageUrl(page)}
              isActive={currentPage === page}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext href={createPageUrl(currentPage + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};