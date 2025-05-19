import {
  DEFAULT_PAGE,
} from "../../../data/constants/pagination";

export const parseSearchParams = (searchParams) => {
  return {
    page: parseInt(searchParams.get("page") || DEFAULT_PAGE),
    pageSize: parseInt(searchParams.get("pageSize") || 50),
    search: searchParams.get("search") || "",
  };
};

export const parseInvoiceParams = (searchParams) => ({
  ...parseSearchParams(searchParams),
});

export const createSearchParams = (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.search) params.set("search", filters.search);
  if (filters.page != null) params.set("page", String(filters.page));
  if (filters.pageSize != null)
    params.set("pageSize", String(filters.pageSize));

  return params;
};
