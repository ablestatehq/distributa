import InvoiceTableHeader from "./InvoiceTableHeader";
import InvoiceTableBody from "./InvoiceTableBody";

export default function InvoiceTable() {

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full table-fixed">
        <InvoiceTableHeader />
        <InvoiceTableBody />
      </table>
    </div>
  );
}
