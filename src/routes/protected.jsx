import { PrivateRoute } from "./components";
import {
  AppwriteService as Appwrite,
  InvoiceService,
  TransactionService,
  BalancesService,
  CategoryService,
} from "../services";
import { redirect, defer, json } from "react-router-dom";
import {
  Invoices,
  NewInvoice,
  EditInvoice,
  Transactions,
  CategorySettings,
  BillingSettings,
  ProfileSettings,
  PartiesSettings,
} from "../pages";
import { SettingsLayout } from "../Layouts/components";
import InvoicePreview from "../components/Modals/InvoicePreview";
import { Permission, Role, ID, Query } from "appwrite";

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
        element: <SettingsLayout />,
        children: [
          {
            path: "profile",
            element: <ProfileSettings />,
            loader: async () => {
              const currentUser = await appwrite.account.get();
              const profilePromise = appwrite.database.getDocument(
                appwrite.getVariables().DATABASE_ID,
                appwrite.getVariables().PROFILES_COLLECTION_ID,
                currentUser.$id
              );

              return defer({
                profile: profilePromise,
              });
            },
            children: [
              {
                path: "profile-picture/upload",
                action: async ({ request }) => {
                  const formData = await request.formData();
                  const currentUser = await appwrite.account.get();

                  const permissions = [
                    Permission.read(Role.any()),
                    Permission.update(Role.user(currentUser?.$id)),
                    Permission.delete(Role.user(currentUser?.$id)),
                  ];

                  try {
                    const profile = await appwrite.database.getDocument(
                      appwrite.getVariables().DATABASE_ID,
                      appwrite.getVariables().PROFILES_COLLECTION_ID,
                      currentUser.$id
                    );

                    if (profile?.avatar_url) {
                      await appwrite.storage.deleteFile(
                        appwrite.getVariables().AVATARS_BUCKET_ID,
                        profile.avatar_ref
                      );

                      await appwrite.database.updateDocument(
                        appwrite.getVariables().DATABASE_ID,
                        appwrite.getVariables().PROFILES_COLLECTION_ID,
                        currentUser.$id,
                        { avatar_url: null, avatar_ref: null }
                      );
                    }

                    const file = await appwrite.storage.createFile(
                      appwrite.getVariables().AVATARS_BUCKET_ID,
                      ID.unique(),
                      formData.get("avatar"),
                      permissions
                    );

                    const url = appwrite.storage.getFileView(
                      appwrite.getVariables().AVATARS_BUCKET_ID,
                      file.$id
                    );

                    await appwrite.database.updateDocument(
                      appwrite.getVariables().DATABASE_ID,
                      appwrite.getVariables().PROFILES_COLLECTION_ID,
                      currentUser.$id,
                      { avatar_url: url, avatar_ref: file.$id }
                    );

                    return redirect("/settings/profile");
                  } catch (error) {
                    console.log("Error: ", error);
                    throw error;
                  }
                },
              },
              {
                path: "profile-picture/delete",
                action: async () => {
                  const currentUser = await appwrite.account.get();

                  try {
                    const profile = await appwrite.database.getDocument(
                      appwrite.getVariables().DATABASE_ID,
                      appwrite.getVariables().PROFILES_COLLECTION_ID,
                      currentUser.$id
                    );

                    if (profile?.avatar_ref && profile?.avatar_url) {
                      await appwrite.storage.deleteFile(
                        appwrite.getVariables().AVATARS_BUCKET_ID,
                        profile.avatar_ref
                      );

                      await appwrite.database.updateDocument(
                        appwrite.getVariables().DATABASE_ID,
                        appwrite.getVariables().PROFILES_COLLECTION_ID,
                        currentUser.$id,
                        { avatar_url: null, avatar_ref: null }
                      );
                    }

                    return redirect("/settings/profile");
                  } catch (error) {
                    throw error;
                  }
                },
              },
              {
                path: "personal-details/update",
                action: async ({ request }) => {
                  const formData = await request.formData();
                  const currentUser = await appwrite.account.get();

                  try {
                    if (currentUser.email !== formData.get("email")) {
                      await appwrite.account.updateEmail(
                        formData.get("email"),
                        formData.get("password")
                      );
                    }

                    await appwrite.account.updateName(formData.get("name"));

                    await appwrite.database.updateDocument(
                      appwrite.getVariables().DATABASE_ID,
                      appwrite.getVariables().PROFILES_COLLECTION_ID,
                      currentUser.$id,
                      {
                        name: formData.get("name"),
                        email: formData.get("email"),
                      }
                    );

                    return redirect("/settings/profile");
                  } catch (error) {
                    throw error;
                  }
                },
              },
              {
                path: "change-password",
                action: async ({ request }) => {
                  const formData = await request.formData();
                  try {
                    await appwrite.account.updatePassword(
                      formData.get("new_password"),
                      formData.get("current_password")
                    );

                    return json({
                      success: true,
                      message: "Password updated successfully",
                    });
                  } catch (error) {
                    return json({ error: error.message }, { status: 400 });
                  }
                },
              },
            ],
          },
          {
            path: "billing",
            element: <BillingSettings />,
          },
          {
            path: "parties",
            element: <PartiesSettings />,
            loader: async () => {
              const { $id: userId } = await appwrite.account.get();
              const partiesPromise = appwrite.database.listDocuments(
                appwrite.getVariables().DATABASE_ID,
                appwrite.getVariables().PARTIES_COLLECTION_ID,
                [
                  Query.orderDesc("$createdAt"),
                  Query.equal("created_by", userId),
                ]
              );

              return defer({ parties: partiesPromise });
            },
            children: [
              {
                path: "new",
                action: async ({ request }) => {
                  try {
                    const data = await request.json();
                    const { $id: userId } = await appwrite.account.get();
                    const party = await appwrite.database.createDocument(
                      appwrite.getVariables().DATABASE_ID,
                      appwrite.getVariables().PARTIES_COLLECTION_ID,
                      ID.unique(),
                      { ...data, created_by: userId },
                      [
                        Permission.read(Role.any()),
                        Permission.update(Role.user(userId)),
                        Permission.delete(Role.user(userId)),
                      ]
                    );

                    return json({ success: true, data: party });
                  } catch (error) {
                    return json(
                      { success: false, error: error.message },
                      { status: 400 }
                    );
                  }
                },
              },
              {
                path: ":id/edit",
                action: async ({ request, params }) => {
                  console.log("Reached here: ", params)
                  try {
                    const data = await request.json();
                    const party = await appwrite.database.updateDocument(
                      appwrite.getVariables().DATABASE_ID,
                      appwrite.getVariables().PARTIES_COLLECTION_ID,
                      params.id,
                      data
                    );
                    return json({ success: true, data: party });
                  } catch (error) {
                    return json(
                      { success: false, error: error.message },
                      { status: 400 }
                    );
                  }
                },
              },
              {
                path: ":id/delete",
                action: async ({ params }) => {
                  try {
                    await appwrite.database.deleteDocument(
                      appwrite.getVariables().DATABASE_ID,
                      appwrite.getVariables().PARTIES_COLLECTION_ID,
                      params.id
                    );
                    return redirect("/settings/parties");
                  } catch (error) {
                    throw error;
                  }
                },
              },
            ],
          },
          {
            loader: async () => {
              const categoriesPromise = CategoryService.getCategoryTree();
              return defer({ categories: categoriesPromise });
            },
            path: "categories",
            element: <CategorySettings />,
            children: [
              {
                path: "new",
                action: async ({ request }) => {
                  try {
                    const data = await request.json();
                    await CategoryService.createCategory(data);
                    return redirect("/settings/categories");
                  } catch (error) {
                    throw error;
                  }
                },
              },
              {
                path: ":id/edit",
                action: async ({ request, params }) => {
                  try {
                    const data = await request.json();
                    await CategoryService.updateCategory(params.id, data);
                    return redirect("/settings/categories");
                  } catch (error) {
                    throw error;
                  }
                },
              },
              {
                path: ":id/delete",
                action: async ({ params }) => {
                  try {
                    await CategoryService.deleteCategory(params.id);
                    return redirect("/settings/categories");
                  } catch (error) {
                    throw error;
                  }
                },
              },
            ],
          },
        ],
      },
    ],
  },
];
