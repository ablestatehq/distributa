import { Login, SignUp, ForgotPassword, ResetPassword } from "../components";
import { AppwriteService as Appwrite } from "../../../services";
import { redirect } from "react-router-dom";
import { Permission, Role } from "appwrite";
import { SEND_EMAIL_FUNCTION_ID } from "../../../data/constants";
import { welcomeEmailTemplate } from "../../../lib/templates/email";
import { FRONTEND_URL } from "../../../data/constants";
import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE,
} from "../../../data/constants/pagination";

const appwrite = new Appwrite();

export const authRoutes = [
  {
    path: "/login",
    element: <Login />,
    loader: async ({ request }) => {
      try {
        const url = new URL(request.url);
        const from =
          url.searchParams.get("from") ??
          `/sales-invoices?page=${DEFAULT_PAGE}&pageSize=${DEFAULT_PAGE_SIZE}`;
        const user = await appwrite.getAccount();
        if (user) return redirect(from, { replace: true });
      } catch (error) {
        return { error };
      }
    },
    action: async ({ request }) => {
      try {
        const formData = await request.formData();
        const email = formData.get("email");
        const password = formData.get("password");

        const url = new URL(request.url);
        const from =
          url.searchParams.get("from") ??
          `/sales-invoices?page=${DEFAULT_PAGE}&pageSize=${DEFAULT_PAGE_SIZE}`;

        const session = await appwrite.createSession(email, password);
        if (session) return redirect(from, { replace: true });
      } catch (error) {
        return { error: error.message };
      }
    },
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    loader: async ({ request }) => {
      try {
        const url = new URL(request.url);
        const from =
          url.searchParams.get("from") ??
          `/sales-invoices?page=${DEFAULT_PAGE}&pageSize=${DEFAULT_PAGE_SIZE}`;
        const user = await appwrite.getAccount();
        if (user) return redirect(from, { replace: true });
      } catch (error) {
        return { error };
      }
    },
    action: async ({ request }) => {
      try {
        const formData = await request.formData();
        const email = formData.get("email");

        const result = await appwrite.account.createRecovery(
          email,
          `${FRONTEND_URL}/set-password`
        );

        if (result)
          return json({
            success: true,
            message: "Password reset link sent to your email",
          });
      } catch (error) {
        return { error: error.message };
      }
    },
  },
  {
    path: "/set-password",
    element: <ResetPassword />,
    loader: async ({ request }) => {
      try {
        const url = new URL(request.url);
        const from =
          url.searchParams.get("from") ??
          `/sales-invoices?page=${DEFAULT_PAGE}&pageSize=${DEFAULT_PAGE_SIZE}`;
        const user = await appwrite.getAccount();
        if (user) return redirect(from, { replace: true });
      } catch (error) {
        return { error };
      }
    },
    action: async ({ request }) => {
      try {
        const url = new URL(request.url);
        const userId = url.searchParams.get("userId");
        const secret = url.searchParams.get("secret");

        const formData = await request.formData();
        const password = formData.get("password");

        if (!userId || !secret)
          return { success: false, error: "Invalid request" };

        const result = await appwrite.account.updateRecovery(
          userId,
          secret,
          password
        );

        if (result) return redirect("/login");
      } catch (error) {
        console.log("Error: ", JSON.stringify(error, null, 2));
        return { error: error.message };
      }
    },
  },
  {
    path: "/signup",
    element: <SignUp />,
    loader: async ({ request }) => {
      try {
        const url = new URL(request.url);
        const from =
          url.searchParams.get("from") ??
          `/sales-invoices?page=${DEFAULT_PAGE}&pageSize=${DEFAULT_PAGE_SIZE}`;
        const user = await appwrite.getAccount();
        if (user) return redirect(from, { replace: true });
      } catch (error) {
        return { error };
      }
    },
    action: async ({ request }) => {
      try {
        const formData = await request.formData();

        const email = formData.get("email");
        const password = formData.get("password");

        await appwrite.createAccount(email, password);
        const session = await appwrite.createSession(email, password);

        await appwrite.database.createDocument(
          appwrite.getVariables().DATABASE_ID,
          appwrite.getVariables().PROFILES_COLLECTION_ID,
          session.userId,
          {
            email: email,
            name: "",
            owner: session.userId,
          },
          [
            Permission.update(Role.user(session.userId)),
            Permission.delete(Role.user(session.userId)),
          ]
        );

        if (session) {
          const emailResponse = await appwrite.functions.createExecution(
            SEND_EMAIL_FUNCTION_ID,
            JSON.stringify({
              users: [session.userId],
              subject: welcomeEmailTemplate.subject,
              content: welcomeEmailTemplate.getContent(),
              html: true,
            })
          );

          console.log("Email response: ", emailResponse);
          return redirect(
            `/sales-invoices?page=${DEFAULT_PAGE}&pageSize=${DEFAULT_PAGE_SIZE}`,
            { replace: true }
          );
        }
      } catch (error) {
        return { error: error.response };
      }
    },
  },
];
