import { renderHook } from "@testing-library/react";
import { act } from "react";
import { useInvoiceFilters } from "./useInvoiceFilters";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from "../../../data/constants/pagination";
import { MemoryRouter } from "react-router-dom";

describe("useInvoiceFilters", () => {
  const wrapper = ({ children }) => <MemoryRouter>{children}</MemoryRouter>;

  it("should initialize with default filter values", () => {
    const { result } = renderHook(() => useInvoiceFilters(), { wrapper });

    expect(result.current.filters).toEqual({
      search: "",
      page: DEFAULT_PAGE,
      pageSize: DEFAULT_PAGE_SIZE,
      dates: {
        issueFrom: null,
        issueTo: null,
        dueFrom: null,
        dueTo: null,
      },
      startFrom: null,
      status: null,
    });
  });

  it("should parse search parameters from the URL", () => {
    const { result } = renderHook(() => useInvoiceFilters(), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={["/?page=2&pageSize=10&search=test"]}>
          {children}
        </MemoryRouter>
      ),
    });

    expect(result.current.filters).toEqual({
      search: "test",
      page: 2,
      pageSize: 10,
      dates: {
        issueFrom: null,
        issueTo: null,
        dueFrom: null,
        dueTo: null,
      },
      startFrom: null,
      status: null,
    });
  });

  it("should apply filters and update search parameters", () => {
    const { result } = renderHook(() => useInvoiceFilters(), { wrapper });

    act(() => {
      result.current.applyFilters({ search: "invoice", page: 3 });
    });

    expect(result.current.filters.search).toBe("invoice");
    expect(result.current.filters.page).toBe(3);
  });

  it("should reset filters to default values", () => {
    const { result } = renderHook(() => useInvoiceFilters(), { wrapper });

    act(() => {
      result.current.applyFilters({ search: "invoice", page: 3 });
      result.current.resetFilters();
    });

    expect(result.current.filters).toEqual({
      search: "",
      page: DEFAULT_PAGE,
      pageSize: DEFAULT_PAGE_SIZE,
      dates: {
        issueFrom: null,
        issueTo: null,
        dueFrom: null,
        dueTo: null,
      },
      startFrom: null,
      status: null,
    });
  });

  it("should detect active filters", () => {
    const { result } = renderHook(() => useInvoiceFilters(), { wrapper });

    expect(result.current.hasActiveFilters).toBe(false);

    act(() => {
      result.current.applyFilters({ search: "active" });
    });

    expect(result.current.hasActiveFilters).toBe(true);
  });
});
