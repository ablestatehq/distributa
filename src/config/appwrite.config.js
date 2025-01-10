const appwriteConfig = {
  endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
  projectId: import.meta.env.VITE_APPWRITE_ENDPOINT,
  databaseId: import.meta.env.VITE_APPWRITE_ENDPOINT,
  collections: {
    invoices: import.meta.env.VITE_APPWRITE_INVOICES_COLLECTION_ID,
    distributions: import.meta.env.VITE_APPWRITE_DISTRIBUTIONS_COLLECTION_ID,
    billingAddresses: import.meta.env
      .VITE_APPWRITE_BILLING_ADDRESS_COLLECTION_ID,
    items: import.meta.env.VITE_APPWRITE_ITEMS_COLLECTION_ID,
    transactions: import.meta.env.VITE_APPWRITE_TRANSACTIONS_COLLECTION_ID,
    monthlyStatements: import.meta.env
      .VITE_APPWRITE_MONTHLY_STATEMENTS_COLLECTION_ID,
    accountSummaries: import.meta.env
      .VITE_APPWRITE_ACCOUNT_SUMMARIES_COLLECTION_ID,
    categories: import.meta.env.VITE_APPWRITE_CATEGORIES_COLLECTION_ID,
    monthlyCategoryTotals: import.meta.env
      .VITE_APPWRITE_MONTHLY_CATEGORY_TOTALS_COLLECTION_ID,
    sharedInvoices: import.meta.env.VITE_APPWRITE_SHARED_INVOICES_COLLECTION_ID,
    organisations: import.meta.env.VITE_APPWRITE_ORGANISATIONS_COLLECTION_ID,
    profiles: import.meta.env.VITE_APPWRITE_PROFILES_COLLECTION_ID,
    parties: import.meta.env.VITE_APPWRITE_PARTIES_COLLECTION_ID,
    currencyPreferences: import.meta.env
      .VITE_APPWRITE_CURRENCY_PREFERENCES_COLLECTION_ID,
  },
  buckets: {
    logos: import.meta.env.VITE_APPWRITE_LOGOS_BUCKET_ID,
    avatars: import.meta.env.VITE_APPWRITE_AVATARS_BUCKET_ID,
  },
  functions: {
    sendEmail: import.meta.env.VITE_APPWRITE_SEND_EMAIL_FUNCTION_ID,
  },
  teams: {
    systemTeamId: import.meta.env.VITE_APPWRITE_SYSTEM_TEAM_ID,
  },
  baseUrl: import.meta.env.VITE_FRONTEND_URL,
};

export default appwriteConfig;
