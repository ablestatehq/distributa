import {
  useFetcher,
  useNavigate,
  useLoaderData,
  useLocation,
} from "react-router-dom";
import { use, useMemo, useCallback } from "react";
import usePagination from "../../../hooks/usePagination";
import { appwriteConfig } from "../../../lib/appwrite/config";
import { useRealtime } from "../../../hooks";
import { useInvoiceFilters } from "./useInvoiceFilters";
import { createSearchParams } from "../utils/url-params";

export function useInvoices() {
  const { filters, applyFilters } = useInvoiceFilters();
  const location = useLocation();

  const fetcher = useFetcher();
  const navigate = useNavigate();

  let { invoices } = useLoaderData();
  const { documents, total } = use(invoices);

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

  const handleDateRangeChange = useCallback(
    ({ issueFrom, issueTo, dueFrom, dueTo }) =>
      applyFilters({ dates: { issueFrom, issueTo, dueFrom, dueTo }, page: 0 }),
    [applyFilters]
  );

  const handleStartFromChange = useCallback(
    (startFrom) => applyFilters({ startFrom, page: 0 }),
    [applyFilters]
  );

  const navigateToEdit = (invoiceId) => {
    if (!invoiceId) return;
    navigate(`${currentPath}/edit`);
  };

  const navigateToPreview = (invoiceId) => {
    if (!invoiceId) return;
    navigate(`${currentPath}/${invoiceId}/preview`);
  };

  const navigateToCreate = () => {
    navigate(`${currentPath}/new`);
  };

  const getSearchParams = useCallback(() => {
    return createSearchParams(filters);
  }, [filters]);

  useRealtime(appwriteConfig.collections.invoices, {
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
    invoices: documents,
    isLoading: fetcher.state !== "idle",
    pagination: paginationControls,
    navigateToEdit,
    navigateToPreview,
    navigateToCreate,
    total,
    filters,
    applyFilters,
    handleSearchChange,
    handleDateRangeChange,
    handleStartFromChange,
  };
}
