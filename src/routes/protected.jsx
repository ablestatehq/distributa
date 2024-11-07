import { PrivateRoute } from "./components";
import {
  AppwriteService as Appwrite,
  InvoiceService,
  TransactionService,
  BalancesService,
} from "../services";
import { redirect, defer } from "react-router-dom";
import {
  Invoices,
  NewInvoice,
  EditInvoice,
  Transactions,
  Settings,
} from "../pages";
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
        loader: async () => {
          const invoicesPromise = InvoiceService.listInvoices();
          return defer({ invoices: invoicesPromise });
        },
        element: <Invoices />,
      },
      {
        path: "/invoices/:id",
        loader: async ({ params }) => {
          const invoicePromise = InvoiceService.getInvoice(params.id);
          return defer({ invoice: invoicePromise });
        },
        element: <InvoicePreview />,
      },
      {
        path: "/invoices/:id/edit",
        loader: async ({ params }) => {
          const invoicePromise = InvoiceService.getInvoice(params.id);
          return defer({ invoice: invoicePromise });
        },
        action: async ({ request, params }) => {
          try {
            const data = await request.json();
            const invoice = await InvoiceService.updateInvoice(params.id, data);
            return { success: true, data: invoice };
          } catch (error) {
            throw error;
          }
        },
        element: <EditInvoice />,
      },
      {
        path: "/invoices/:id/edit-status",
        action: async ({ request, params }) => {
          try {
            const { status: newStatus, payment_date } = await request.json();
            const updatedInvoice = await InvoiceService.updateInvoiceStatus(
              params.id,
              newStatus,
              payment_date ?? null
            );
            return { success: true, data: updatedInvoice };
          } catch (error) {
            throw error;
          }
        },
      },
      {
        path: "/invoices/:id/preview",
        loader: async ({ params }) => {
          const invoicePromise = InvoiceService.getInvoice(params.id);
          return defer({ invoice: invoicePromise });
        },
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
        loader: async () => {
          const transactionsPromise = TransactionService.listTransactions();
          const currentMonthSummaryPromise =
            BalancesService.getCurrentMonthSummary();

          return defer({
            transactions: transactionsPromise,
            currentMonthSummary: currentMonthSummaryPromise,
          });
        },
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
