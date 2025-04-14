import { useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from "../../../data/constants/pagination";

export function useInvoiceFilters() {
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
      dates: {
        issueFrom: searchParams.get("issueFrom") || null,
        issueTo: searchParams.get("issueTo") || null,
        dueFrom: searchParams.get("dueFrom") || null,
        dueTo: searchParams.get("dueTo") || null,
      },
      startFrom: searchParams.get("startFrom") || null,
      status: searchParams.get("status") || null,
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
        dates: updates.dates
          ? { ...filters.dates, ...updates.dates }
          : filters.dates,
      };

      const cleanedFilters = cleanObject(newFilters);
      const cleanedDates = newFilters.dates
        ? cleanObject(newFilters.dates)
        : {};

      const newSearchParams = new URLSearchParams();

      Object.entries(cleanedFilters).forEach(([key, value]) => {
        if (key !== "dates" && value != null) {
          newSearchParams.set(key, String(value));
        }
      });

      Object.entries(cleanedDates).forEach(([key, value]) => {
        if (value) {
          newSearchParams.set(key, value);
        }
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
      dates: {
        issueFrom: null,
        issueTo: null,
        dueFrom: null,
        dueTo: null,
      },
      startFrom: null,
      status: null,
    });
  }, [applyFilters]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return Boolean(
      filters.search ||
        filters.status ||
        filters.startFrom ||
        Object.values(filters.dates).some(Boolean)
    );
  }, [filters]);

  return {
    filters,
    applyFilters,
    resetFilters,
    hasActiveFilters,
  };
}
