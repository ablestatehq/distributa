import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import { InvoiceFilters } from "./InvoiceFilters";
import { useInvoices } from "../hooks";
import MockDate from "mockdate";

// Mock the useInvoices hook
vi.mock("../hooks", () => ({
  useInvoices: vi.fn(),
}));

describe("InvoiceFilters", () => {
  let mockApplyFilters;
  let mockHandleSearchChange;

  beforeEach(() => {
    MockDate.set(new Date("2025-04-22T00:00:00Z"));
    mockApplyFilters = vi.fn();
    mockHandleSearchChange = vi.fn();
    useInvoices.mockReturnValue({
      applyFilters: mockApplyFilters,
      handleSearchChange: mockHandleSearchChange,
    });
  });

  afterEach(() => {
    MockDate.reset();
    vi.clearAllMocks();
  });

  it("renders filter inputs and buttons correctly", () => {
    render(<InvoiceFilters />);

    expect(
      screen.getByPlaceholderText("Search invoices...")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Clear search")).toBeInTheDocument();
    expect(screen.getByTestId("open-extended-filters")).toBeInTheDocument();
  });

  it("opens and closes extended filter panel", async () => {
    render(<InvoiceFilters />);

    fireEvent.click(screen.getByTestId("open-extended-filters"));
    expect(screen.getByText("Filter Invoices")).toBeInTheDocument();
    expect(screen.getByTestId("close-filter-panel")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("close-filter-panel"));
    await waitFor(() => {
      expect(screen.queryByText("Filter Invoices")).not.toBeInTheDocument();
    });
  });

  it("applies issue date preset without affecting due dates", async () => {
    render(<InvoiceFilters />);

    fireEvent.click(screen.getByTestId("open-extended-filters"));
    fireEvent.click(screen.getByTestId("issue-preset-this-month"));

    const issueFrom = screen.getByLabelText("From", {
      selector: "#issue-from",
    });
    const issueTo = screen.getByLabelText("To", { selector: "#issue-to" });
    expect(issueFrom).toHaveValue("2025-03-23");
    expect(issueTo).toHaveValue("2025-04-22");

    const dueFrom = screen.getByLabelText("From", { selector: "#due-from" });
    const dueTo = screen.getByLabelText("To", { selector: "#due-to" });
    expect(dueFrom).toHaveValue("");
    expect(dueTo).toHaveValue("");
  });

  it("applies due date preset without affecting issue dates", async () => {
    render(<InvoiceFilters />);

    fireEvent.click(screen.getByTestId("open-extended-filters"));
    fireEvent.click(screen.getByTestId("due-preset-this-month"));

    const dueFrom = screen.getByLabelText("From", { selector: "#due-from" });
    const dueTo = screen.getByLabelText("To", { selector: "#due-to" });
    expect(dueFrom).toHaveValue("2025-03-23");
    expect(dueTo).toHaveValue("2025-04-22");

    const issueFrom = screen.getByLabelText("From", {
      selector: "#issue-from",
    });
    const issueTo = screen.getByLabelText("To", { selector: "#issue-to" });
    expect(issueFrom).toHaveValue("");
    expect(issueTo).toHaveValue("");
  });

  it("updates search input and triggers handleSearchChange", async () => {
    render(<InvoiceFilters />);

    const searchInput = screen.getByPlaceholderText("Search invoices...");
    await userEvent.type(searchInput, "INV-123");

    expect(searchInput).toHaveValue("INV-123");
    expect(mockHandleSearchChange).toHaveBeenCalledWith("");
  });

  it("applies filters on Enter key in search", async () => {
    render(<InvoiceFilters />);

    const searchInput = screen.getByPlaceholderText("Search invoices...");
    await userEvent.type(searchInput, "INV-123");
    fireEvent.submit(screen.getByRole("form", { name: "Search invoices" }));

    expect(mockApplyFilters).toHaveBeenCalledWith({
      search: "INV-123",
      dates: { issueFrom: "", issueTo: "", dueFrom: "", dueTo: "" },
      status: "",
    });
  });

  it("selects and deselects status filter", async () => {
    render(<InvoiceFilters />);

    fireEvent.click(screen.getByTestId("open-extended-filters"));
    const paidButton = screen.getByTestId("status-paid");
    fireEvent.click(paidButton);

    expect(paidButton).toHaveClass("bg-accent-50");
    expect(paidButton).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(paidButton);
    expect(paidButton).not.toHaveClass("bg-accent-50");
    expect(paidButton).toHaveAttribute("aria-pressed", "false");
  });

  it("applies extended filters and closes panel", async () => {
    render(<InvoiceFilters />);

    fireEvent.click(screen.getByTestId("open-extended-filters"));
    const issueFrom = screen.getByLabelText("From", {
      selector: "#issue-from",
    });
    fireEvent.change(issueFrom, { target: { value: "2025-04-01" } });
    const paidButton = screen.getByTestId("status-paid");
    fireEvent.click(paidButton);

    fireEvent.click(screen.getByTestId("apply-filters"));

    expect(mockApplyFilters).toHaveBeenCalledWith({
      search: "",
      dates: { issueFrom: "2025-04-01", issueTo: "", dueFrom: "", dueTo: "" },
      status: "paid",
    });
    expect(screen.queryByText("Filter Invoices")).not.toBeInTheDocument();
  });

  it("resets filters and closes panel", async () => {
    render(<InvoiceFilters />);

    fireEvent.click(screen.getByTestId("open-extended-filters"));
    const issueFrom = screen.getByLabelText("From", {
      selector: "#issue-from",
    });
    fireEvent.change(issueFrom, { target: { value: "2025-04-01" } });
    const searchInput = screen.getByPlaceholderText("Client or Invoice ID...");
    await userEvent.type(searchInput, "INV-123");

    await act(async () => {
      fireEvent.click(screen.getByTestId("reset-filters"));
    });

    await waitFor(() => {
      expect(mockApplyFilters).toHaveBeenCalledWith({
        search: "",
        dates: { issueFrom: "", issueTo: "", dueFrom: "", dueTo: "" },
        status: "",
      });
      expect(screen.queryByText("Filter Invoices")).not.toBeInTheDocument();
      // expect(issueFrom).toHaveValue("");
      // expect(searchInput).toHaveValue("");
    });
  });
});
