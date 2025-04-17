import { useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from "../../../data/constants/pagination";

export function useCurrencyFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => {
    const page = parseInt(searchParams.get("page") ?? String(DEFAULT_PAGE));
    const pageSize = parseInt(
      searchParams.get("pageSize") ?? String(DEFAULT_PAGE_SIZE)
    );

    return {
      search: searchParams.get("search") || "",
      page: isNaN(page) ? DEFAULT_PAGE : page,
      pageSize: isNaN(pageSize) ? DEFAULT_PAGE_SIZE : pageSize,
    };
  }, [searchParams]);

  const cleanObject = useCallback((obj) => {
    return Object.fromEntries(
      Object.entries(obj).filter(
        ([_, value]) => value !== null && value !== undefined && value !== ""
      )
    );
  }, []);

  const applyFilters = useCallback(
    (updates) => {
      const newFilters = {
        ...filters,
        ...updates,
      };

      const cleanedFilters = cleanObject(newFilters);

      const newSearchParams = new URLSearchParams();

      Object.entries(cleanedFilters).forEach(([key, value]) => {
        newSearchParams.set(key, String(value));
      });

      setSearchParams(newSearchParams, { replace: true });
    },
    [filters, setSearchParams, cleanObject]
  );

  const resetFilters = useCallback(() => {
    applyFilters({
      page: DEFAULT_PAGE,
      pageSize: DEFAULT_PAGE_SIZE,
      search: "",
    });
  }, [applyFilters]);

  const hasActiveFilters = useMemo(() => {
    return Boolean(filters.search || filters.status);
  }, [filters]);

  return {
    filters,
    applyFilters,
    resetFilters,
    hasActiveFilters,
  };
}
