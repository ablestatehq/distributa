import { EditInvoice, NewInvoice } from "../../../pages";
import { invoicesLoader, invoiceLoader, newInvoiceLoader } from "./loaders";
import { createInvoiceAction, updateInvoiceAction } from "./actions";
import { InvoicePreview } from "../../../components/Modals";
import { InvoicesPage } from "../pages";

export default [
  {
    path: "/sales-invoices",
    element: <InvoicesPage />,
    loader: invoicesLoader,
  },
  {
    path: "/invoices/:id",
    element: <InvoicePreview />,
    loader: invoiceLoader,
  },
  {
    path: "/invoices/:id/edit",
    element: <EditInvoice />,
    loader: invoiceLoader,
    action: updateInvoiceAction,
  },
  {
    path: "/invoices/:id/preview",
    element: <InvoicePreview />,
    loader: invoiceLoader,
  },
  {
    path: "/sales-invoices/new",
    element: <NewInvoice />,
    loader: newInvoiceLoader,
    action: createInvoiceAction,
  },
];
