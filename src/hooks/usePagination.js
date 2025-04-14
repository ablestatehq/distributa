import { useCallback } from "react";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../data/constants/pagination";

export function usePagination({
  total,
  pageSize = DEFAULT_PAGE_SIZE,
  currentPage = DEFAULT_PAGE,
  onPageChange,
  onPageSizeChange,
}) {
  const totalPages = Math.ceil(total / pageSize);

  const handlePageChange = useCallback(
    (newPage) => {
      if (newPage < 0 || newPage >= totalPages) return;
      onPageChange(newPage);
    },
    [totalPages, onPageChange]
  );

  return {
    currentPage,
    pageSize,
    totalPages,
    hasNextPage: currentPage < totalPages - 1,
    hasPreviousPage: currentPage > 0,
    onNextPage: () => handlePageChange(currentPage + 1),
    onPreviousPage: () => handlePageChange(currentPage - 1),
    onPageSelect: handlePageChange,
    onPageSizeChange,
  };
}

export default usePagination;
