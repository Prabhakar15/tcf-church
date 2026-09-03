import { useState, useMemo } from 'react';

interface PaginationResult<T> {
  currentPage: number;
  pageCount: number;
  paginatedItems: T[];
  showPagination: boolean;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  resetPage: () => void;
}

export function usePagination<T>(
  items: T[],
  itemsPerPage: number = 5
): PaginationResult<T> {
  const [currentPage, setCurrentPage] = useState(0);

  const { paginatedItems, pageCount } = useMemo(() => {
    const startIdx = currentPage * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const paginated = items.slice(startIdx, endIdx);
    const pages = Math.ceil(items.length / itemsPerPage);
    return { paginatedItems: paginated, pageCount: pages };
  }, [items, currentPage, itemsPerPage]);

  return {
    currentPage,
    pageCount,
    paginatedItems,
    showPagination: pageCount > 1,
    goToPage: (page: number) => setCurrentPage(Math.max(0, Math.min(page, pageCount - 1))),
    nextPage: () => setCurrentPage((p) => Math.min(p + 1, pageCount - 1)),
    prevPage: () => setCurrentPage((p) => Math.max(p - 1, 0)),
    resetPage: () => setCurrentPage(0),
  };
}
