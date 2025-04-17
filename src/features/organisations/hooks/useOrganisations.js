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
import { useOrganisationFilters } from "./useOrganisationFilters";
import { createSearchParams } from "../utils/url-params";

export function useOrganisations() {
  const { filters, applyFilters } = useOrganisationFilters();
  const location = useLocation();

  const fetcher = useFetcher();
  const navigate = useNavigate();

  let { organisations } = useLoaderData();
  const { documents, total } = use(organisations);

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

  const navigateToEdit = (organisationId) => {
    if (!organisationId) return;
    navigate(`/settings/organisations/${organisationId}/edit`);
  };

  const navigateToView = (organisationId) => {
    if (!organisationId) return;
    navigate(`/settings/organisations/${organisationId}`);
  };

  const navigateToCreate = () => {
    navigate("/settings/organisations/new");
  };

  const getSearchParams = useCallback(() => {
    return createSearchParams(filters);
  }, [filters]);

  useRealtime(appwriteConfig.collections.organisations, {
    onCreated: () => {
      fetcher.load(`${location.pathname}?${getSearchParams()}`);
    },
    onUpdated: () => {
      fetcher.load(`${location.pathname}?${getSearchParams()}`);
    },
    onDeleted: () => {
      const newTotal = total - 1;
      const newPages = Math.ceil(newTotal / pagination.pageSize);

      if (pagination.currentPage >= newPages && newPages > 0) {
        handlePageChange(newPages - 1);
      } else {
        fetcher.load(`${location.pathname}?${getSearchParams()}`);
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
    organisations: documents,
    isLoading: fetcher.state !== "idle",
    pagination: paginationControls,
    navigateToEdit,
    navigateToView,
    navigateToCreate,
    total,
    filters,
    applyFilters,
    handleSearchChange,
  };
}
