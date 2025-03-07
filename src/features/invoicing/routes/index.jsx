import { Invoice } from "../components";
import { InvoicePreview } from "../../../components/Modals";
import { InvoiceService } from "../../../services";

export const invoicingRoutes = [
  {
    path: "invoice",
    element: <Invoice />,
  },
  {
    path: "invoice/shared/:id",
    loader: async ({ params }) => {
      const invoicePromise = InvoiceService.getInvoice(params.id);
      return { invoice: invoicePromise };
    },
    element: <InvoicePreview />,
  },
];
