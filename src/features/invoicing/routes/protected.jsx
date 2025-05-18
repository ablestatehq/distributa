import { EditInvoice } from "../../../pages";
import {
  invoicesLoader,
  invoiceLoader,
  newInvoiceLoader,
  editInvoiceLoader,
} from "./loaders";
import { createInvoiceAction, updateInvoiceAction } from "./actions";
import {
  InvoicesPage,
  InvoicePage,
  NewInvoicePage,
  EditInvoicePage,
} from "../pages";
import ContentViewArea from "../../../Layouts/components/wrappers/ContentViewArea";

export default [
  {
    path: "/external-invoices",
    element: (
      <ContentViewArea>
        <div className="flex h-full w-full items-center justify-center">
          Coming soon
        </div>
      </ContentViewArea>
    ),
  },
  {
    path: "/sales-invoices",
    element: <InvoicesPage />,
    loader: invoicesLoader,
  },
  {
    path: "/sales-invoices/:id",
    element: <InvoicePage />,
    loader: invoiceLoader,
  },
  {
    path: "/sales-invoices/:id/edit",
    element: <EditInvoicePage />,
    loader: editInvoiceLoader,
    action: updateInvoiceAction,
  },
  {
    path: "/sales-invoices/:id/preview",
    element: <InvoicePage />,
    loader: invoiceLoader,
  },
  {
    path: "/sales-invoices/new",
    element: <NewInvoicePage />,
    loader: newInvoiceLoader,
    action: createInvoiceAction,
  },
];
