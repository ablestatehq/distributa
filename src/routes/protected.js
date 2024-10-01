import { Dashboard } from "../pages";
import { PrivateRoute } from "./components";
import { AppwriteService as Appwrite } from "../services";
import { redirect, defer } from "react-router-dom";

const appwrite = new Appwrite();

export const protectedRoutes = [
  {
    element: <PrivateRoute className="border border-red-500 h-20 w-20" />,
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
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/invoices",
        element: <div>My Invoices</div>,
      },
      {
        path: "/invoices/new",
        element: <div>New Invoice</div>,
      },
      {
        path: "/transactions",
        element: <div>My Transactions</div>,
      },
      {
        path: "/settings",
        element: <div>Settings</div>,
      },
    ],
  },
];
