export const generatePagination = (currentPage: number, totalPages: number) => {
  //Si el numero total de paginas es 5 o menos muestro todas las paginas sin ptos suspensivos
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1); //creo un array de num
  }

  //Si la page está entre las 3 paginas y muestro ... y las ultimas 3
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};