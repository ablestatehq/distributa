import { useFetcher, useLoaderData, useLocation } from "react-router-dom";
import { use, useMemo, useCallback, useState } from "react";
import usePagination from "../../../hooks/usePagination";
import { appwriteConfig } from "../../../lib/appwrite/config";
import { useRealtime } from "../../../hooks";
import { useTransactionFilters } from "./useTransactionFilters";
import { createSearchParams } from "../utils/url-params";

export function useTransactions() {
  const [isCreating, setCreate] = useState(false);
  const { filters, applyFilters } = useTransactionFilters();
  const location = useLocation();

  const fetcher = useFetcher();

  let { transactions } = useLoaderData();
  const { documents, total } = use(transactions);

  const currentPath = location.pathname;

  const pagination = useMemo(
    () => ({
      currentPage: filters.page,
      pageSize: filters.pageSize,
    }),
    [filters.page, filters.pageSize]
  );

  const handlePageChange = useCallback(
    (newPage) => applyFilters({ page: newPage }),
    [applyFilters]
  );

  const handlePageSizeChange = useCallback(
    (newPageSize) => applyFilters({ pageSize: newPageSize, page: 0 }),
    [applyFilters]
  );

  const handleSearchChange = useCallback(
    (searchTerm) => applyFilters({ search: searchTerm, page: 0 }),
    [applyFilters]
  );

  const handleStartFromChange = useCallback(
    (startFrom) => applyFilters({ startFrom, page: 0 }),
    [applyFilters]
  );

  const getSearchParams = useCallback(() => {
    return createSearchParams(filters);
  }, [filters]);

  const toggleCreate = useCallback(() => {
    setCreate((prev) => !prev);
  }, []);

  useRealtime(appwriteConfig.collections.transactions, {
    onCreated: () => {
      fetcher.load(`${currentPath}?${getSearchParams()}`);
    },
    onUpdated: () => {
      fetcher.load(`${currentPath}?${getSearchParams()}`);
    },
    onDeleted: () => {
      const newTotal = total - 1;
      const newPages = Math.ceil(newTotal / pagination.pageSize);

      if (pagination.currentPage >= newPages && newPages > 0) {
        handlePageChange(newPages - 1);
      } else {
        fetcher.load(`${currentPath}?${getSearchParams()}`);
      }
    },
  });

  const paginationControls = usePagination({
    total,
    pageSize: pagination.pageSize,
    currentPage: pagination.currentPage,
    onPageChange: handlePageChange,
    onPageSizeChange: handlePageSizeChange,
  });

  return {
    transactions: documents,
    isLoading: fetcher.state !== "idle",
    pagination: paginationControls,
    total,
    filters,
    applyFilters,
    handleSearchChange,
    handleStartFromChange,
    isCreating,
    toggleCreate,
  };
}
