import { PrivateRoute } from "./components";
import { AppwriteService as Appwrite, InvoiceService } from "../services";
import { redirect, defer } from "react-router-dom";
import { Invoices, NewInvoice, Transactions, Settings } from "../pages";
import InvoicePreview from "../components/Modals/InvoicePreview";

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
        // TODO: Add a loader to fetch the invoices
        loader: async () => {
          const invoicesPromise = InvoiceService.listInvoices();
          return defer({ invoices: invoicesPromise });
        },
        element: <Invoices />,
      },
      {
        path: "/invoices/:id",
        // TODO: Add a loader to fetch the invoice whose value is specified by the param "id" in the route path.
        // TODO: Handle the state and load it.
        // TODO: Create a component for viewing the information of a specific invoice.
        element: <div>Invoice Id</div>,
      },
      {
        path: "/invoices/:id/edit",
        // TODO: Add a loader to fetch the invoice whose value is specified by the param "id" in the route path.
        // TODO: Handle the state and load it.
        // TODO: Create a component for editing the information of a specific invoice. Setting the initial state of the form to the values of the invoice
        // TODO: Create an action to save the information to the database.
        element: <div>Edit invoice</div>,
      },
      {
        path: "/invoices/:id/preview",
        loader: async ({ params }) => {
          const invoicePromise = InvoiceService.getInvoice(params.id);
          return defer({ invoice: invoicePromise });
        },
        // TODO: Add a loader to fetch the invoice whose value is specified by the param "id" in the route path.
        // TODO: Handle the state and load it.
        // TODO: Create a component for editing the information of a specific invoice. Setting the initial state of the form to the values of the invoice
        element: <InvoicePreview />,
      },
      {
        path: "/invoices/new",
        element: <NewInvoice />,
        action: async ({ request }) => {
          try {
            const currentUrl = new URL(request.url);
            const data = await request.json();
            const invoice = await InvoiceService.createInvoice(data);

            return redirect(
              `/invoices/${invoice.$id}/preview?from=${encodeURIComponent(
                currentUrl.pathname
              )}`
            );
          } catch (error) {
            throw error;
          }
        },
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
