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
    if (e.key === "Enter") {
      applyFilters({
        search: filters.search,
        dates: { issueFrom: "", issueTo: "", dueFrom: "", dueTo: "" },
        status: "",
      });
    }
  };

  const handleApplyExtendedFilters = () => {
    applyFilters({
      search: filters.search,
      dates: filters.dates,
      status: filters.status,
    });
    setIsExtendedOpen(false);
  };

  const handleResetFilters = () => {
    setFilters({
      search: "",
      dates: { issueFrom: "", issueTo: "", dueFrom: "", dueTo: "" },
      status: "",
    });
    applyFilters({
      search: "",
      dates: { issueFrom: "", issueTo: "", dueFrom: "", dueTo: "" },
      status: "",
    });
    setIsExtendedOpen(false);
  };

  const handleDatePreset = (days) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    setFilters((prev) => ({
      ...prev,
      dates: {
        issueFrom: start.toISOString().split("T")[0],
        issueTo: end.toISOString().split("T")[0],
        dueFrom: start.toISOString().split("T")[0],
        dueTo: end.toISOString().split("T")[0],
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
      <label
        htmlFor="input-search-bar"
        className="flex rounded-full items-center  bg-white  transition-colors border border-greyborder focus:outline-none focus:border-accent px-2 py-0.5"
      >
        <button
          type="button"
          className="p-2 hover:bg-grey bg-white transition-colors rounded-full group"
          onClick={() => {
            handleSearchChange(filters.search);
            return;
          }}
          onKeyDown={handleSearchSubmit}
          disabled={!filters.search}
        >
          <FiSearch className="w-5 h-5 group-disabled:text-greyborder" />
        </button>
        <input
          type="text"
          id="input-search-bar"
          value={filters.search}
          onChange={(e) => {
            setFilters((prev) => ({ ...prev, search: e.target.value }));
            handleSearchChange("");
          }}
          onKeyDown={handleSearchSubmit}
          placeholder="Search invoices..."
          className="font-normal font-satoshi text-tiny tracking-normal outline-none ring-0 leading-100 px-1 py-3 w-[14rem] md:w-[17.375rem]"
        />

        <button
          onClick={() => {
            setFilters((prev) => ({ ...prev, search: "" }));
            handleSearchChange("");
          }}
          className={`p-2 hover:bg-grey group rounded-full ${
            filters.search ? "" : "invisible"
          }`}
          aria-label="Close filter panel"
          disabled={!filters.search}
        >
          <FiX className="w-4 h-4 group-disabled:text-greyborder" />
        </button>

        <button
          type="button"
          className="w-fit h-fit p-2 font-bold text-small flex items-center gap-2 hover:bg-grey rounded-full"
          onClick={toggleExtended}
        >
          <MdTune className="h-5 w-5 rounded-full" />
        </button>
      </label>

      {isExtendedOpen && (
        <>
          <div
            className="fixed inset-0 bg-greyborder bg-opacity-50 z-40"
            onClick={toggleExtended}
          />

          <div
            ref={extendedRef}
            className="fixed inset-y-0 right-0 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 translate-x-0"
          >
            <div className="h-full overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-archivo font-normal text-medium leading-140 tracking-normal">
                    Filter Invoices
                  </h2>
                  <button
                    onClick={toggleExtended}
                    className="p-2 hover:bg-grey rounded-full"
                    aria-label="Close filter panel"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Search */}
                  <div className="flex flex-col gap-y-2">
                    <label className="flex text-start items-center gap-x-2 font-satoshi text-sm font-normal leading-100 tracking-normal">
                      <FiSearch className="w-5 h-5 stroke-1" />
                      Search
                    </label>
                    <input
                      type="text"
                      value={filters.search}
                      id="input-filters"
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          search: e.target.value,
                        }))
                      }
                      onKeyDown={handleSearchSubmit}
                      className="font-normal font-satoshi rounded-full text-tiny tracking-normal border border-greyborder leading-100 py-3 px-4 w-[17.375rem] focus:outline-none focus:border-accent"
                      placeholder="Client or Invoice ID..."
                    />
                  </div>

                  {/* Date Range */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 font-satoshi text-sm font-normal leading-100 tracking-normal">
                      <FiCalendar className="w-5 h-5 stroke-black stroke-1" />
                      Issue Dates
                    </label>

                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-col gap-y-2">
                        <label className="flex text-start gap-x-2 font-normal font-satoshi text-tiny tracking-normal">
                          From
                        </label>
                        <input
                          type="date"
                          value={filters.dates.issueFrom}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              dates: {
                                ...prev.dates,
                                issueFrom: e.target.value,
                              },
                            }))
                          }
                          className="font-normal font-satoshi text-tiny tracking-normal border border-greyborder leading-100 p-3 w-[17.375rem] focus:outline-none focus:border-accent"
                        />
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <label className="flex text-start gap-x-2 font-normal font-satoshi text-tiny tracking-normal">
                          To
                        </label>
                        <input
                          type="date"
                          value={filters.dates.issueTo}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              dates: { ...prev.dates, issueTo: e.target.value },
                            }))
                          }
                          className="font-normal font-satoshi text-tiny tracking-normal border border-greyborder leading-100 p-3 w-[17.375rem] focus:outline-none focus:border-accent"
                        />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {presetDates.map((preset) => (
                          <Button
                            key={preset.label}
                            onClick={() => handleDatePreset(preset.days)}
                            kind="secondary"
                            className="px-3 py-1 text-tiny rounded-full transition-colors"
                          >
                            {preset.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 font-satoshi text-sm font-normal leading-100 tracking-normal">
                      <FiCalendar className="w-5 h-5 stroke-black stroke-1" />
                      Due Dates
                    </label>

                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-col gap-y-2">
                        <label className="flex text-start gap-x-2 font-normal font-satoshi text-tiny tracking-normal">
                          From
                        </label>
                        <input
                          type="date"
                          value={filters.dates.issueFrom}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              dates: {
                                ...prev.dates,
                                dueFrom: e.target.value,
                              },
                            }))
                          }
                          className="font-normal font-satoshi text-tiny tracking-normal border border-greyborder leading-100 p-3 w-[17.375rem] focus:outline-none focus:border-accent"
                        />
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <label className="flex text-start gap-x-2 font-normal font-satoshi text-tiny tracking-normal">
                          To
                        </label>
                        <input
                          type="date"
                          value={filters.dates.issueTo}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              dates: { ...prev.dates, dueTo: e.target.value },
                            }))
                          }
                          className="font-normal font-satoshi text-tiny tracking-normal border border-greyborder leading-100 p-3 w-[17.375rem] focus:outline-none focus:border-accent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 font-satoshi text-sm font-normal leading-100 tracking-normal">
                      Status
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {statuses.slice(1).map((status) => (
                        <button
                          key={status.id}
                          onClick={() => handleStatusChange(status.id)}
                          className={`flex items-center gap-2 w-fit p-2 rounded-lg transition-colors text-tiny font-satoshi ${
                            filters.status === status.id
                              ? "bg-accent-50 text-accent"
                              : "bg-gray-50 hover:bg-gray-100"
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${status.color}`}
                          ></span>
                          {status.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <Button
                    onClick={handleApplyExtendedFilters}
                    className="w-[17.375rem] h-fit px-6 py-3 font-bold text-center gap-2"
                  >
                    Apply Filters
                  </Button>
                  <Button
                    onClick={handleResetFilters}
                    className="w-[17.375rem] h-fit px-6 py-3 font-bold text-center gap-2"
                    kind="secondary"
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
