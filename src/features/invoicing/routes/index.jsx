import { Invoice } from "../components";
import { InvoicePreview } from "../../../components/Modals";
import { defer } from "react-router-dom";
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
      return defer({ invoice: invoicePromise });
    },
    element: <InvoicePreview />,
  },
];
