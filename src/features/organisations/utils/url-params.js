import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from "../../../data/constants/pagination";

export const parseSearchParams = (searchParams) => {
  return {
    page: parseInt(searchParams.get("page") || DEFAULT_PAGE),
    pageSize: parseInt(searchParams.get("pageSize") || DEFAULT_PAGE_SIZE),
    search: searchParams.get("search") || "",
  };
};

export const parseDateParams = (searchParams) => {
  const dates = {};
  const dateFields = {
    issueFrom: "issueFrom",
    issueTo: "issueTo",
    dueFrom: "dueFrom",
    dueTo: "dueTo",
  };

  Object.entries(dateFields).forEach(([key, param]) => {
    const value = searchParams.get(param);
    if (value) dates[key] = value;
  });

  return Object.keys(dates).length ? { dates } : {};
};

export const parseInvoiceParams = (searchParams) => ({
  ...parseSearchParams(searchParams),
  ...parseDateParams(searchParams),
  status: searchParams.get("status") || "",
});

export const createSearchParams = (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.search) params.set("search", filters.search);
  if (filters.page != null) params.set("page", String(filters.page));
  if (filters.pageSize != null)
    params.set("pageSize", String(filters.pageSize));

  const dates = filters.dates || {};

  if (dates?.dueFrom) params.set("dueFrom", dates.dueFrom);
  if (dates?.dueTo) params.set("dueTo", dates.dueTo);
  if (dates?.issueFrom) params.set("issueFrom", dates.issueFrom);
  if (dates?.issueTo) params.set("issueTo", dates.issueTo);

  return params;
};
