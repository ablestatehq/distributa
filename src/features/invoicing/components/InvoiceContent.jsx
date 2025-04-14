import { useInvoices, useInvoiceFilters } from "../hooks";
import {
  Pagination,
  PageSizeSelector,
} from "../../../components/common/pagination";
import { DEFAULT_PAGE_SIZE } from "../../../data/constants/pagination";
import InvoiceEmptyState from "./InvoiceEmptyState";
import { NoInvoicesFound } from "./NoInvoicesFound";
import InvoiceTable from "./InvoiceTable/InvoiceTable";

function InvoiceContent() {
  const { total, pagination } = useInvoices();
  const { hasActiveFilters } = useInvoiceFilters();

  if (total === 0) {
    if (hasActiveFilters) {
      return <NoInvoicesFound />;
    }

    return <InvoiceEmptyState />;
  }

  return (
    <div className="flex flex-col w-full h-full">
      <InvoiceTable />
      <div className="w-full flex flex-wrap items-center justify-between mt-4 gap-4">
        <PageSizeSelector
          pageSize={pagination.pageSize}
          onPageSizeChange={pagination.onPageSizeChange}
          pageSizeOptions={[DEFAULT_PAGE_SIZE, 25, 50, 100]}
          currentPage={pagination.currentPage}
          totalItems={total}
        />
        <Pagination {...pagination} />
      </div>
    </div>
  );
}

export default InvoiceContent;
