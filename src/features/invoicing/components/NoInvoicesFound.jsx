import EmptyState from "../../../components/common/EmptyState";
import { useInvoiceFilters } from "../hooks";
import { MdSearchOff } from "react-icons/md";

export function NoInvoicesFound() {
  const { resetFilters } = useInvoiceFilters();

  return (
    <EmptyState
      icon={(props) => <MdSearchOff {...props} className="h-14 w-14"/>}
      title="No invoices found"
      description="We couldn't find any invoices matching your search criteria. Try adjusting your filters or search terms."
      actionLabel="Reset filters"
      onAction={resetFilters}
    />
  );
}
