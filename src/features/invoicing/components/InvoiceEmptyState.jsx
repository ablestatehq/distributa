import { FileText } from "../../../components/common/icons";
import EmptyState from "../../../components/common/EmptyState";

export default function InvoiceEmptyState() {
  return (
    <EmptyState
      icon={FileText}
      title="No invoices found"
      description="Create a new invoice to get started"
      actionLabel="Create invoice"
      actionUrl="/invoices/new"
    />
  );
}
