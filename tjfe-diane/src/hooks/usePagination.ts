import { useState } from "react";

export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  return { currentPage, setCurrentPage, itemsPerPage, setItemsPerPage };
};
