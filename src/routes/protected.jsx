import { PrivateRoute } from "./components";
import { AppwriteService as Appwrite } from "../services";
import { redirect, defer } from "react-router-dom";
import { Invoices, NewInvoice, Transactions, Settings } from "../pages";

const appwrite = new Appwrite();

export const protectedRoutes = [
  {
    element: <PrivateRoute />,
    loader: async () => {
      let user = null;
      try {
        user = await appwrite.getAccount();
      } catch (error) {
        user = null;
      }
      if (!user) {
        return redirect("/login");
      }

      return defer({ user });
    },
    children: [
      {
        path: "/invoices",
        element: <Invoices />,
        // TODO: create the ivoices loader to create the invoice
      },
      {
        path: "/invoices/new",
        element: <NewInvoice />,
      },
      {
        path: "/transactions",
        element: <Transactions />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
];
