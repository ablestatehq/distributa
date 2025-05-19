import { PrivateRoute } from "./components";
import {
  AppwriteService as Appwrite,
  TransactionService,
  BalancesService,
  CategoryService,
} from "../services";
import { redirect } from "react-router-dom";
import {
  Transactions,
  Transaction,
  CategorySettings,
  BillingSettings,
  ProfileSettings,
  PartiesSettings,
  BusinessSettings,
  CurrencySettings,
} from "../pages";
import { SettingsLayout } from "../Layouts/components";
import { Permission, Role, ID, Query } from "appwrite";
import CurrencyPreferenceService from "../services/currency.prefs.service";
import { data } from "react-router-dom";

import { default as protectedInvoiceRoutes } from "../features/invoicing/routes/protected";

const appwrite = new Appwrite();

export const protectedRoutes = [
  {
    element: <PrivateRoute />,
    hydrateFallbackElement: <div>loading</div>,
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

      return { user };
    },
    children: [
      // {
      //   path: "/invoices",
      //   loader: async () => {
      //     const invoicesPromise = InvoiceService.listInvoices();
      //     return { invoices: invoicesPromise };
      //   },
      //   element: <Invoices />,
      // },
      // {
      //   path: "/invoices/:id",
      //   loader: async ({ params }) => {
      //     const invoicePromise = InvoiceService.getInvoice(params.id);
      //     return { invoice: invoicePromise };
      //   },
      //   element: <InvoicePreview />,
      // },
      // {
      //   path: "/invoices/:id/edit",
      //   loader: async ({ params }) => {
      //     const invoicePromise = InvoiceService.getInvoice(params.id);
      //     return { invoice: invoicePromise };
      //   },
      //   action: async ({ request, params }) => {
      //     try {
      //       const data = await request.json();
      //       const invoice = await InvoiceService.updateInvoice(params.id, data);
      //       return { success: true, data: invoice };
      //     } catch (error) {
      //       throw error;
      //     }
      //   },
      //   element: <EditInvoice />,
      // },
      // {
      //   path: "/invoices/:id/edit-status",
      //   action: async ({ request, params }) => {
      //     try {
      //       const { status: newStatus, payment_date } = await request.json();
      //       const updatedInvoice = await InvoiceService.updateInvoiceStatus(
      //         params.id,
      //         newStatus,
      //         payment_date ?? null
      //       );
      //       return { success: true, data: updatedInvoice };
      //     } catch (error) {
      //       throw error;
      //     }
      //   },
      // },
      // {
      //   path: "/invoices/:id/preview",
      //   loader: async ({ params }) => {
      //     const invoicePromise = InvoiceService.getInvoice(params.id);
      //     return { invoice: invoicePromise };
      //   },
      //   element: <InvoicePreview />,
      // },
      // {
      //   path: "/invoices/new",
      //   element: <NewInvoice />,
      //   loader: async () => {
      //     const { $id: userId } = await appwrite.account.get();

      //     const organisationPromise = appwrite.database.listDocuments(
      //       appwrite.getVariables().DATABASE_ID,
      //       appwrite.getVariables().ORGANISTIONS_COLLECTION_ID,
      //       [Query.equal("created_by", userId)]
      //     );
      //     const currenciesPromise = appwrite.database.listDocuments(
      //       appwrite.getVariables().DATABASE_ID,
      //       appwrite.getVariables().CURRENCY_PREFERENCES_COLLECTION_ID,
      //       [Query.equal("is_available", true), Query.equal("user_id", userId)]
      //     );

      //     const newInvoicePromise = Promise.all([
      //       organisationPromise,
      //       currenciesPromise,
      //     ]).then(([organisation, currencies]) => {
      //       return {
      //         organisationData: organisation,
      //         currencyOptions: currencies,
      //       };
      //     });

      //     return {
      //       newInvoiceInitialData: newInvoicePromise,
      //     };
      //   },
      //   action: async ({ request }) => {
      //     try {
      //       const currentUrl = new URL(request.url);
      //       const data = await request.json();
      //       const invoice = await InvoiceService.createInvoice(data);

      //       return redirect(
      //         `/invoices/${invoice.$id}/preview?from=${encodeURIComponent(
      //           currentUrl.pathname
      //         )}`
      //       );
      //     } catch (error) {
      //       throw error;
      //     }
      //   },
      // },

      ...protectedInvoiceRoutes,

      // Receipts

      // {
      //   index: true,
      //   path: "/receipts/incoming",
      //   loader: async () => {
      //     const invoicesPromise = InvoiceService.listInvoices();
      //     return { receipts: invoicesPromise };
      //   },
      //   element: <Receipts />,
      // },
      // {
      //   path: "/receipts/outgoing",
      //   loader: async ({ params }) => {
      //     const invoicePromise = InvoiceService.getInvoice(params.id);
      //     return { invoice: invoicePromise };
      //   },
      //   element: <Invoices />,
      // },
      // {
      //   path: "/receipts/incoming/:id/edit",
      //   loader: async ({ params }) => {
      //     const invoicePromise = InvoiceService.getInvoice(params.id);
      //     return { invoice: invoicePromise };
      //   },
      //   action: async ({ request, params }) => {
      //     try {
      //       const data = await request.json();
      //       const invoice = await InvoiceService.updateInvoice(params.id, data);
      //       return { success: true, data: invoice };
      //     } catch (error) {
      //       throw error;
      //     }
      //   },
      //   element: <EditInvoice />,
      // },
      // {
      //   path: "/receipts/outgoing/:id/edit",
      //   loader: async ({ params }) => {
      //     const invoicePromise = InvoiceService.getInvoice(params.id);
      //     return { invoice: invoicePromise };
      //   },
      //   action: async ({ request, params }) => {
      //     try {
      //       const data = await request.json();
      //       const invoice = await InvoiceService.updateInvoice(params.id, data);
      //       return { success: true, data: invoice };
      //     } catch (error) {
      //       throw error;
      //     }
      //   },
      //   element: <EditInvoice />,
      // },
      // {
      //   path: "/receipts/incoming/:id/preview",
      //   loader: async ({ params }) => {
      //     const invoicePromise = InvoiceService.getInvoice(params.id);
      //     return { invoice: invoicePromise };
      //   },
      //   element: <InvoicePreview />,
      // },
      // {
      //   path: "/receipts/outgoing/:id/preview",
      //   loader: async ({ params }) => {
      //     const invoicePromise = InvoiceService.getInvoice(params.id);
      //     return { invoice: invoicePromise };
      //   },
      //   element: <InvoicePreview />,
      // },
      // {
      //   path: "/receipts/incoming/new",
      //   element: <NewInvoice />,
      //   loader: async () => {
      //     const { $id: userId } = await appwrite.account.get();

      //     const organisationPromise = appwrite.database.listDocuments(
      //       appwrite.getVariables().DATABASE_ID,
      //       appwrite.getVariables().ORGANISTIONS_COLLECTION_ID,
      //       [Query.equal("created_by", userId)]
      //     );
      //     const currenciesPromise = appwrite.database.listDocuments(
      //       appwrite.getVariables().DATABASE_ID,
      //       appwrite.getVariables().CURRENCY_PREFERENCES_COLLECTION_ID,
      //       [Query.equal("is_available", true), Query.equal("user_id", userId)]
      //     );

      //     const newInvoicePromise = Promise.all([
      //       organisationPromise,
      //       currenciesPromise,
      //     ]).then(([organisation, currencies]) => {
      //       return {
      //         organisationData: organisation,
      //         currencyOptions: currencies,
      //       };
      //     });

      //     return {
      //       newInvoiceInitialData: newInvoicePromise,
      //     };
      //   },
      //   action: async ({ request }) => {
      //     try {
      //       const currentUrl = new URL(request.url);
      //       const data = await request.json();
      //       const invoice = await InvoiceService.createInvoice(data);

      //       return redirect(
      //         `/invoices/${invoice.$id}/preview?from=${encodeURIComponent(
      //           currentUrl.pathname
      //         )}`
      //       );
      //     } catch (error) {
      //       throw error;
      //     }
      //   },
      // },
      // {
      //   path: "/receipts/outgoing/new",
      //   element: <NewInvoice />,
      //   loader: async () => {
      //     const { $id: userId } = await appwrite.account.get();

      //     const organisationPromise = appwrite.database.listDocuments(
      //       appwrite.getVariables().DATABASE_ID,
      //       appwrite.getVariables().ORGANISTIONS_COLLECTION_ID,
      //       [Query.equal("created_by", userId)]
      //     );
      //     const currenciesPromise = appwrite.database.listDocuments(
      //       appwrite.getVariables().DATABASE_ID,
      //       appwrite.getVariables().CURRENCY_PREFERENCES_COLLECTION_ID,
      //       [Query.equal("is_available", true), Query.equal("user_id", userId)]
      //     );

      //     const newInvoicePromise = Promise.all([
      //       organisationPromise,
      //       currenciesPromise,
      //     ]).then(([organisation, currencies]) => {
      //       return {
      //         organisationData: organisation,
      //         currencyOptions: currencies,
      //       };
      //     });

      //     return {
      //       newInvoiceInitialData: newInvoicePromise,
      //     };
      //   },
      //   action: async ({ request }) => {
      //     try {
      //       const currentUrl = new URL(request.url);
      //       const data = await request.json();
      //       const invoice = await InvoiceService.createInvoice(data);

      //       return redirect(
      //         `/invoices/${invoice.$id}/preview?from=${encodeURIComponent(
      //           currentUrl.pathname
      //         )}`
      //       );
      //     } catch (error) {
      //       throw error;
      //     }
      //   },
      // },

      // end receipts
      {
        loader: async () => {
          const { $id: userId } = await appwrite.account.get();
          const transactionsPromise = TransactionService.listTransactions();
          const currentMonthSummaryPromise =
            BalancesService.getCurrentMonthSummary();
          const currencyPreferencesPromise =
            CurrencyPreferenceService.getPreferences(userId);

          return {
            transactions: transactionsPromise,
            currentMonthSummary: currentMonthSummaryPromise,
            currencyPreferences: currencyPreferencesPromise,
          };
        },
        path: "/transactions",
        element: <Transactions />,
      },
      {
        path: "/transactions/new",
        action: async ({ request }) => {
          const data = await request.json();
          try {
            await TransactionService.createTransaction(data);
            await BalancesService.updateBalances(
              parseFloat(data.amount),
              data.flow_type,
              data.date,
              data.category
            );

            return { success: true, message: "Party created successfully" };
          } catch (error) {
            return {
              error: true,
              message:
                error?.response?.message ||
                error?.message ||
                "Failed to create transaction",
            };
          }
        },
      },
      {
        path: "transactions/:id",
        loader: async ({ params }) => {
          const transactionPromise = TransactionService.getTransaction(
            params.id
          );

          const currencyPreferencePromise = appwrite.account
            .get()
            .then(({ $id: user_id }) => {
              return appwrite.database.listDocuments(
                appwrite.getVariables().DATABASE_ID,
                appwrite.getVariables().CURRENCY_PREFERENCES_COLLECTION_ID,
                [Query.equal("user_id", user_id)]
              );
            })
            .then(({ total, documents }) => {
              if (total > 0) {
                return documents[0];
              }
              return null;
            });

          const transactionPageData = Promise.all([
            transactionPromise,
            currencyPreferencePromise,
          ]).then(([transaction, currencyPreference]) => {
            return {
              transaction,
              currencyPreference,
            };
          });

          return { data: transactionPageData };
        },
        element: <Transaction />,
      },
      {
        path: "/settings",
        element: <SettingsLayout />,
        children: [
          {
            path: "account",
            element: <ProfileSettings />,
            loader: async () => {
              const currentUser = await appwrite.account.get();
              const profilePromise = appwrite.database.getDocument(
                appwrite.getVariables().DATABASE_ID,
                appwrite.getVariables().PROFILES_COLLECTION_ID,
                currentUser.$id
              );

              return {
                profile: profilePromise,
              };
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

                    return redirect("/settings/account");
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

                    return redirect("/settings/account");
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

                    return redirect("/settings/account");
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

                    return {
                      success: true,
                      message: "Password updated successfully",
                    };
                  } catch (error) {
                    return { error: error.message }, { status: 400 };
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
            path: "currency",
            action: async ({ request }) => {
              try {
                const formData = await request.json();
                console.log("Form Data: ", formData);
                const { $id: userId } = await appwrite.account.get();
                await CurrencyPreferenceService.updatePreferences(
                  userId,
                  formData
                );
                return { success: true, data: null };
              } catch (error) {
                return json(
                  { error: error.message, success: false },
                  { status: 404 }
                );
              }
            },
            loader: async () => {
              const { $id: userId } = await appwrite.account.get();
              const currencyDataPromise = Promise.all([
                appwrite.database.listDocuments(
                  appwrite.getVariables().DATABASE_ID,
                  appwrite.getVariables().CURRENCY_PREFERENCES_COLLECTION_ID,
                  [
                    Query.equal("user_id", userId),
                    Query.equal("is_preferred", true),
                  ]
                ),
                appwrite.database.listDocuments(
                  appwrite.getVariables().DATABASE_ID,
                  appwrite.getVariables().CURRENCY_PREFERENCES_COLLECTION_ID,
                  [
                    Query.equal("user_id", userId),
                    Query.equal("is_available", true),
                  ]
                ),
              ]).then(([preferred, available]) => ({
                preferredCurrency: preferred,
                availableCurrencies: available,
              }));

              return {
                currencySettings: currencyDataPromise,
              };
            },
            element: <CurrencySettings />,
          },
          {
            path: "business",
            element: <BusinessSettings />,
            loader: async () => {
              const { $id: userId } = await appwrite.account.get();
              const organisationPromise = appwrite.database
                .getDocument(
                  appwrite.getVariables().DATABASE_ID,
                  appwrite.getVariables().ORGANISTIONS_COLLECTION_ID,
                  userId
                )
                .catch(() => null);

              return { organisation: organisationPromise };
            },
            action: async ({ request }) => {
              const formData = await request.formData();
              const { $id: userId } = await appwrite.account.get();
              const logo = formData.get("logo");

              let logo_url = formData.get("logo_url");
              let file_id = formData.get("logo_ref");

              const permissions = [
                Permission.read(Role.any()),
                Permission.update(Role.user(userId)),
                Permission.delete(Role.user(userId)),
              ];

              if (logo) {
                try {
                  const file = await appwrite.storage.createFile(
                    appwrite.getVariables().LOGOS_BUCKET_ID,
                    ID.unique(),
                    logo,
                    permissions
                  );

                  const url = appwrite.storage.getFileView(
                    appwrite.getVariables().LOGOS_BUCKET_ID,
                    file.$id
                  );

                  file_id = file.$id;
                  logo_url = url;
                } catch (error) {
                  console.error("Uploading Logo: ", error.response.message);
                }
              }

              try {
                let {
                  documents: [organisation = null],
                } = await appwrite.database.listDocuments(
                  appwrite.getVariables().DATABASE_ID,
                  appwrite.getVariables().ORGANISTIONS_COLLECTION_ID,
                  [Query.equal("created_by", userId)]
                );

                const data = {
                  name: formData.get("name"),
                  email: formData.get("email"),
                  phone: formData.get("phone"),
                  address: formData.get("address"),
                  logo_url,
                  logo_ref: logo_url ? file_id : null,
                  created_by: userId,
                };

                if (!organisation) {
                  organisation = await appwrite.database.createDocument(
                    appwrite.getVariables().DATABASE_ID,
                    appwrite.getVariables().ORGANISTIONS_COLLECTION_ID,
                    userId,
                    data,
                    [
                      Permission.read(Role.any()),
                      Permission.update(Role.user(userId)),
                      Permission.delete(Role.user(userId)),
                    ]
                  );

                  return { success: true, data: organisation };
                }

                if (!logo_url) {
                  if (organisation?.logo) console.log(organisation);
                  try {
                    await appwrite.storage.deleteFile(
                      appwrite.getVariables().LOGOS_BUCKET_ID,
                      organisation.logo_ref
                    );
                  } catch (error) {
                    console.error(
                      "Error Deleting file: ",
                      error?.response?.message
                    );
                  }
                }

                organisation = await appwrite.database.updateDocument(
                  appwrite.getVariables().DATABASE_ID,
                  appwrite.getVariables().ORGANISTIONS_COLLECTION_ID,
                  organisation.$id,
                  data
                );

                return { success: true, data: organisation };
              } catch (error) {
                return data(
                  {
                    success: false,
                    error: error?.response?.message || "Unknown error ocurred.",
                  },
                  { status: 400 }
                );
              }
            },
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

              return { parties: partiesPromise };
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

                    return {
                      success: true,
                      party,
                      message: "Party created successfully",
                    };
                  } catch (error) {
                    return {
                      error: true,
                      message:
                        error?.response?.message ||
                        error?.message ||
                        "Failed to create party",
                    };
                  }
                },
              },
              {
                path: ":id/edit",
                action: async ({ request, params }) => {
                  try {
                    const data = await request.json();
                    const party = await appwrite.database.updateDocument(
                      appwrite.getVariables().DATABASE_ID,
                      appwrite.getVariables().PARTIES_COLLECTION_ID,
                      params.id,
                      data
                    );
                    return { success: true, data: party };
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
              const categoryListPromise = CategoryService.listCategories();

              return {
                categories: categoriesPromise,
                categoryList: categoryListPromise,
              };
            },
            path: "categories",
            element: <CategorySettings />,
            children: [
              {
                path: "new",
                action: async ({ request }) => {
                  try {
                    const data = await request.json();
                    const category = await CategoryService.createCategory(data);

                    return {
                      success: true,
                      category: category,
                      message: "Category created successfully",
                    };
                  } catch (error) {
                    return {
                      error: true,
                      message:
                        error?.response.message ||
                        error?.message ||
                        "Failed to create category",
                    };
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
