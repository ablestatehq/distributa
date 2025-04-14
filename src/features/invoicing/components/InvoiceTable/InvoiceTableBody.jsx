import { useInvoices } from "../../hooks/useInvoices";
import InvoiceListItem from "./InvoiceListItem";

export default function InvoiceTableBody() {
  const { invoices } = useInvoices();

  return (
    <tbody>
      {invoices?.map((invoice, index) => (
        <InvoiceListItem invoice={invoice} index={index} key={invoice.$id} />
      ))}
    </tbody>
  );
}
