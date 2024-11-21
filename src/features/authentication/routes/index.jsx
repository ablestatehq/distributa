import { Login, SignUp } from "../components";
import { AppwriteService as Appwrite } from "../../../services";
import { json, redirect } from "react-router-dom";

const appwrite = new Appwrite();

export const authRoutes = [
  {
    path: "/login",
    element: <Login />,
    loader: async ({ request }) => {
      try {
        const url = new URL(request.url);
        const from = url.searchParams.get("from") ?? "/invoices";
        const user = await appwrite.getAccount();
        if (user) return redirect(from, { replace: true });
      } catch (error) {
        return json({ error });
      }
    },
    action: async ({ request }) => {
      try {
        const formData = await request.formData();
        const email = formData.get("email");
        const password = formData.get("password");

        const url = new URL(request.url);
        const from = url.searchParams.get("from") ?? "/invoices";

        const session = await appwrite.createSession(email, password);
        if (session) return redirect(from, { replace: true });
      } catch (error) {
        return json({ error: error.message });
      }
    },
  },
  {
    path: "/signup",
    element: <SignUp />,
    loader: async ({ request }) => {
      try {
        const url = new URL(request.url);
        const from = url.searchParams.get("from") ?? "/invoices";
        const user = await appwrite.getAccount();
        if (user) return redirect(from, { replace: true });
      } catch (error) {
        return json({ error });
      }
    },
    action: async ({ request }) => {
      try {
        const formData = await request.formData();

        const email = formData.get("email");
        const password = formData.get("password");

        await appwrite.createAccount(email, password);
        const session = await appwrite.createSession(email, password);
        if (session) return redirect("/invoices", { replace: true });
      } catch (error) {
        return json({ error: error.response });
      }
    },
  },
];
