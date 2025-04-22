import { useState, useRef, useEffect } from "react";
import { FiX, FiSearch, FiCalendar } from "react-icons/fi";
import { MdTune } from "react-icons/md";
import { Button } from "../../../components/common/forms";
import { useInvoices } from "../hooks";

export const InvoiceFilters = () => {
  const { applyFilters, handleSearchChange } = useInvoices();
  const [isExtendedOpen, setIsExtendedOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    dates: { issueFrom: "", issueTo: "", dueFrom: "", dueTo: "" },
    status: "",
  });
  const extendedRef = useRef(null);
  const searchFormRef = useRef(null);

  const statuses = [
    { id: "", name: "All Statuses" },
    { id: "draft", name: "Draft", color: "bg-greyborder" },
    { id: "sent", name: "Sent", color: "bg-accent" },
    { id: "viewed", name: "Viewed", color: "bg-orange-400" },
    { id: "partial", name: "Partial", color: "bg-yellow-400" },
    { id: "paid", name: "Paid", color: "bg-success" },
    { id: "overdue", name: "Overdue", color: "bg-error" },
    { id: "void", name: "Void", color: "bg-indigo-500" },
    { id: "disputed", name: "Disputed", color: "bg-indigo-500" },
    { id: "refunded", name: "Refunded", color: "bg-violet-500" },
    { id: "unpaid", name: "Unpaid", color: "bg-slate-300" },
  ];

  const presetDates = [
    { label: "Today", days: 0 },
    { label: "Last 7 Days", days: 7 },
    { label: "This Month", days: 30 },
    { label: "Last 3 Months", days: 90 },
  ];

  const toggleExtended = () => setIsExtendedOpen(!isExtendedOpen);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    applyFilters({
      search: filters.search,
      dates: { issueFrom: "", issueTo: "", dueFrom: "", dueTo: "" },
      status: "",
    });
  };

  const handleApplyExtendedFilters = (e) => {
    e.preventDefault();
    applyFilters({
      search: filters.search,
      dates: filters.dates,
      status: filters.status,
    });
    setIsExtendedOpen(false);
  };

  const handleResetFilters = (e) => {
    e.preventDefault();
    const resetFilters = {
      search: "",
      dates: { issueFrom: "", issueTo: "", dueFrom: "", dueTo: "" },
      status: "",
    };
    applyFilters(resetFilters);
    setFilters((prev) => ({ ...prev, ...resetFilters }));
    setIsExtendedOpen(false);
    return;
  };

  const handleDatePreset = (days, dateType = "issue") => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);

    const startDate = start.toISOString().split("T")[0];
    const endDate = end.toISOString().split("T")[0];

    setFilters((prev) => ({
      ...prev,
      dates: {
        ...prev.dates,
        [`${dateType}From`]: startDate,
        [`${dateType}To`]: endDate,
      },
    }));
  };

  const handleDateChange = (dateValue, field) => {
    setFilters((prev) => ({
      ...prev,
      dates: {
        ...prev.dates,
        [field]: dateValue,
      },
    }));
  };

  const handleStatusChange = (statusId) => {
    setFilters((prev) => ({
      ...prev,
      status: prev.status === statusId ? "" : statusId,
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (extendedRef.current && !extendedRef.current.contains(event.target)) {
        setIsExtendedOpen(false);
      }
    };
    if (isExtendedOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isExtendedOpen]);

  return (
    <div className="relative">
      {/* Main Search Bar */}
      <form
        ref={searchFormRef}
        onSubmit={handleSearchSubmit}
        aria-label="Search invoices"
        className="flex rounded-full items-center bg-white transition-colors border border-greyborder focus-within:border-accent px-2 py-0.5"
      >
        <button
          type="submit"
          className="p-2 hover:bg-grey bg-white transition-colors rounded-full group"
          aria-label="Search invoices"
          disabled={!filters.search}
        >
          <FiSearch className="w-5 h-5 group-disabled:text-greyborder" />
        </button>
        <label htmlFor="input-search-bar" className="sr-only">
          Search invoices
        </label>
        <input
          type="text"
          id="input-search-bar"
          value={filters.search}
          onChange={(e) => {
            setFilters((prev) => ({ ...prev, search: e.target.value }));
            handleSearchChange("");
          }}
          placeholder="Search invoices..."
          className="font-normal font-satoshi text-tiny tracking-normal outline-none ring-0 leading-100 px-1 py-3 w-[14rem] md:w-[17.375rem]"
        />
        <button
          type="button"
          onClick={() => {
            setFilters((prev) => ({ ...prev, search: "" }));
            handleSearchChange("");
          }}
          className={`p-2 hover:bg-grey group rounded-full ${
            filters.search ? "" : "invisible"
          }`}
          aria-label="Clear search"
          disabled={!filters.search}
        >
          <FiX className="w-4 h-4 group-disabled:text-greyborder" />
        </button>
        <button
          type="button"
          className="w-fit h-fit p-2 font-bold text-small flex items-center gap-2 hover:bg-grey rounded-full"
          onClick={toggleExtended}
          aria-label="Toggle filter panel"
          data-testid="open-extended-filters"
          disabled={isExtendedOpen}
        >
          <MdTune className="h-5 w-5 rounded-full" />
        </button>
      </form>

      {/* Extended Filter Panel */}
      {isExtendedOpen && (
        <>
          <div
            className="fixed inset-0 bg-greyborder bg-opacity-50 z-40"
            aria-hidden="true"
            onClick={toggleExtended}
          />
          <div
            ref={extendedRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="filter-panel-title"
            className={`fixed inset-y-0 right-0 w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
              isExtendedOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <form
              onSubmit={handleApplyExtendedFilters}
              className="h-full overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2
                    id="filter-panel-title"
                    className="font-archivo font-normal text-medium leading-140 tracking-normal"
                  >
                    Filter Invoices
                  </h2>
                  <button
                    type="button"
                    onClick={toggleExtended}
                    className="p-2 hover:bg-grey rounded-full"
                    aria-label="Close filter panel"
                    data-testid="close-filter-panel"
                  >
                    <FiX className="w-4 h-4 text-black" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Search */}
                  <div className="flex flex-col gap-y-2">
                    <label
                      htmlFor="input-filters"
                      className="flex text-start items-center gap-x-2 font-satoshi text-sm font-normal leading-100 tracking-normal"
                    >
                      <FiSearch className="w-5 h-5 stroke-1" />
                      Search
                    </label>
                    <input
                      type="text"
                      id="input-filters"
                      value={filters.search}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          search: e.target.value,
                        }))
                      }
                      className="font-normal font-satoshi rounded-full text-tiny tracking-normal border border-greyborder leading-100 py-3 px-4 w-[17.375rem] focus:outline-none focus:border-accent"
                      placeholder="Client or Invoice ID..."
                    />
                  </div>

                  {/* Issue Dates */}
                  <fieldset className="space-y-2">
                    <legend className="flex items-center gap-2 font-satoshi text-sm font-normal leading-100 tracking-normal">
                      <FiCalendar className="w-5 h-5 stroke-black stroke-1" />
                      Issue Dates
                    </legend>
                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-col gap-y-2">
                        <label
                          htmlFor="issue-from"
                          className="flex text-start gap-x-2 font-normal font-satoshi text-tiny tracking-normal"
                        >
                          From
                        </label>
                        <input
                          type="date"
                          id="issue-from"
                          value={filters.dates.issueFrom}
                          onChange={(e) =>
                            handleDateChange(e.target.value, "issueFrom")
                          }
                          className="font-normal font-satoshi text-tiny tracking-normal border border-greyborder leading-100 p-3 w-[17.375rem] focus:outline-none focus:border-accent"
                          data-testid="issue-from-date"
                          aria-label="Issue date from"
                        />
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <label
                          htmlFor="issue-to"
                          className="flex text-start gap-x-2 font-normal font-satoshi text-tiny tracking-normal"
                        >
                          To
                        </label>
                        <input
                          type="date"
                          id="issue-to"
                          value={filters.dates.issueTo}
                          onChange={(e) =>
                            handleDateChange(e.target.value, "issueTo")
                          }
                          className="font-normal font-satoshi text-tiny tracking-normal border border-greyborder leading-100 p-3 w-[17.375rem] focus:outline-none focus:border-accent"
                          data-testid="issue-to-date"
                          aria-label="Issue date to"
                        />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {presetDates.map((preset) => (
                          <Button
                            key={preset.label}
                            type="button"
                            onClick={() =>
                              handleDatePreset(preset.days, "issue")
                            }
                            kind="secondary"
                            className="px-3 py-1 text-tiny rounded-full transition-colors"
                            data-testid={`issue-preset-${preset.label
                              .toLowerCase()
                              .replace(/\s/g, "-")}`}
                          >
                            {preset.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </fieldset>

                  {/* Due Dates */}
                  <fieldset className="space-y-2">
                    <legend className="flex items-center gap-2 font-satoshi text-sm font-normal leading-100 tracking-normal">
                      <FiCalendar className="w-5 h-5 stroke-black stroke-1" />
                      Due Dates
                    </legend>
                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-col gap-y-2">
                        <label
                          htmlFor="due-from"
                          className="flex text-start gap-x-2 font-normal font-satoshi text-tiny tracking-normal"
                        >
                          From
                        </label>
                        <input
                          type="date"
                          id="due-from"
                          value={filters.dates.dueFrom}
                          onChange={(e) =>
                            handleDateChange(e.target.value, "dueFrom")
                          }
                          className="font-normal font-satoshi text-tiny tracking-normal border border-greyborder leading-100 p-3 w-[17.375rem] focus:outline-none focus:border-accent"
                          data-testid="due-from-date"
                          aria-label="Due date from"
                        />
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <label
                          htmlFor="due-to"
                          className="flex text-start gap-x-2 font-normal font-satoshi text-tiny tracking-normal"
                        >
                          To
                        </label>
                        <input
                          type="date"
                          id="due-to"
                          value={filters.dates.dueTo}
                          onChange={(e) =>
                            handleDateChange(e.target.value, "dueTo")
                          }
                          className="font-normal font-satoshi text-tiny tracking-normal border border-greyborder leading-100 p-3 w-[17.375rem] focus:outline-none focus:border-accent"
                          data-testid="due-to-date"
                          aria-label="Due date to"
                        />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {presetDates.map((preset) => (
                          <Button
                            key={preset.label}
                            type="button"
                            onClick={() => handleDatePreset(preset.days, "due")}
                            kind="secondary"
                            className="px-3 py-1 text-tiny rounded-full transition-colors"
                            data-testid={`due-preset-${preset.label
                              .toLowerCase()
                              .replace(/\s/g, "-")}`}
                          >
                            {preset.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </fieldset>

                  {/* Status */}
                  <fieldset className="space-y-2">
                    <legend className="flex items-center gap-2 font-satoshi text-sm font-normal leading-100 tracking-normal">
                      Status
                    </legend>
                    <div className="flex flex-wrap gap-2">
                      {statuses.slice(1).map((status) => (
                        <button
                          key={status.id}
                          type="button"
                          onClick={() => handleStatusChange(status.id)}
                          className={`flex items-center gap-2 w-fit p-2 rounded-lg transition-colors text-tiny font-satoshi ${
                            filters.status === status.id
                              ? "bg-accent-50 text-accent"
                              : "bg-gray-50 hover:bg-gray-100"
                          }`}
                          data-testid={`status-${status.id}`}
                          aria-pressed={filters.status === status.id}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${status.color}`}
                            aria-hidden="true"
                          ></span>
                          {status.name}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <div className="mt-8 space-y-3">
                  <Button
                    type="submit"
                    className="w-[17.375rem] h-fit px-6 py-3 font-bold text-center gap-2"
                    data-testid="apply-filters"
                  >
                    Apply Filters
                  </Button>
                  <Button
                    type="button"
                    onClick={handleResetFilters}
                    className="w-[17.375rem] h-fit px-6 py-3 font-bold text-center gap-2"
                    kind="secondary"
                    data-testid="reset-filters"
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
