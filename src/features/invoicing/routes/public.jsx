import { Invoice } from "../components";
import { invoiceLoader } from "./loaders";

export default [
  {
    path: "invoice",
    element: <Invoice />,
  },
  {
    path: "invoice/shared/:id",
    loader: invoiceLoader,
  },
];
