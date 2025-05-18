import { InvoicePage } from "../pages";
import { invoiceLoader } from "./loaders";

export default [
  {
    path: "invoice",
    element: <InvoicePage />,
  },
  {
    path: "invoice/shared/:id",
    loader: invoiceLoader,
  },
];
