import { Invoice } from "../components";

export const invoicingRoutes = [
  {
    path: "invoice",
    element: <Invoice />,
  },
  {
    path: "invoice/shared/:id",
    element: <div>Show the Invoice</div>,
    //TODO: implement the loader to execute
  },
];
