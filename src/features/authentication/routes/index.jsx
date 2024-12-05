import { Login, SignUp } from "../components";
import { AppwriteService as Appwrite } from "../../../services";
import { json, redirect } from "react-router-dom";
import { Permission, Role } from "appwrite";
import { SEND_EMAIL_FUNCTION_ID } from "../../../data/constants";

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
        const emailResponse = await appwrite.functions.createExecution();
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

        // await appwrite.createAccount(email, password);
        // const session = await appwrite.createSession(email, password);

        // await appwrite.database.createDocument(
        //   appwrite.getVariables().DATABASE_ID,
        //   appwrite.getVariables().PROFILES_COLLECTION_ID,
        //   session.userId,
        //   {
        //     email: email,
        //     name: "",
        //     owner: session.userId,
        //   },
        //   [
        //     Permission.update(Role.user(session.userId)),
        //     Permission.delete(Role.user(session.userId)),
        //   ]
        // );

        const emailResponse = await appwrite.functions.createExecution(
          SEND_EMAIL_FUNCTION_ID,
          JSON.stringify({
            targets: [email],
            subject: "Welcome to Distributa",
            content: "Welcome to Distributa, we're glad to have you here!",
          })
        );

        console.log("Email response: ", emailResponse);

        return null;

        // if (session) return redirect("/invoices", { replace: true });
      } catch (error) {
        return json({ error: error.response });
      }
    },
  },
];
