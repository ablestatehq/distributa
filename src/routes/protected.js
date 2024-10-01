import { PrivateRoute } from "./components";
import { AppwriteService as Appwrite } from "../services";
import { redirect, defer } from "react-router-dom";
import { Invoices, Transactions } from "../pages";

const appwrite = new Appwrite();

function ContentViewArea({ children }) {
  return <section className="p-6 flex flex-col h-full">{children}</section>;
}

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
        element: (
          <ContentViewArea>
            <div>New nvoice</div>
          </ContentViewArea>
        ),
      },
      {
        path: "/transactions",
        element: <Transactions />,
      },
      {
        path: "/settings",
        element: (
          <ContentViewArea>
            <div>Settings</div>
          </ContentViewArea>
        ),
      },
    ],
  },
];
