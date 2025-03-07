const getDatabaseConfig = () => ({
  endpoint: process.env.VITE_APPWRITE_PROD_ENDPOINT,
  projectId: process.env.VITE_APPWRITE_PROD_PROJECT_ID,
  apiKey: process.env.VITE_APPWRITE_PROD_API_KEY,
  databaseId: process.VITE_APPWRITE_PROD_DATABASE_ID,

  invoicesCollectionId: process.env.VITE_APPWRITE_PROD_INVOICES_COLLECTION_ID,
  distributionsCollectionId:
    process.env.VITE_APPWRITE_PROD_DISTRIBUTIONS_COLLECTION_ID,
  billingAddressesCollectionId:
    process.env.VITE_APPWRITE_PROD_BILLING_ADDRESS_COLLECTION_ID,
  itemsCollectionId: process.env.VITE_APPRWITE_PROD_ITEMS_COLLECTION_ID,
  transactionsCollectionId:
    process.env.VITE_APPRWITE_PROD_TRANSACTIONS_COLLECTION_ID,
  monthlyStatementsCollectionId:
    process.env.VITE_APPWRITE_PROD_MONTHLY_STATEMENTS_COLLECTION_ID,
  accountSummariesCollectionId:
    process.env.VITE_APPWRITE_PROD_ACCOUNT_SUMMARIES_COLLECTION_ID,
  categoriesCollectionId:
    process.env.VITE_APPWRITE_PROD_CATEGORIES_COLLECTION_ID,
  monthlyCategoriesCollectionId:
    process.env.VITE_APPWRITE_PROD_MONTHLY_CATEGORY_TOTALS_COLLECTION_ID,
  sharedInvoicesCollectionId:
    process.env.VITE_APPWRITE_PROD_SHARED_INVOICES_COLLECTION_ID,
  organisationsCollectionId:
    process.env.VITE_APPWRITE_PROD_ORGANISATIONS_COLLECTION_ID,
  profilesCollectionId: process.env.VITE_APPWRITE_PROD_PROFILES_COLLECTION_ID,
  partiesCollectionId: process.env.VITE_APPWRITE_PROD_PARTIES_COLLECTION_ID,
  currencyPreferencesCollectionId:
    process.env.VITE_APPWRITE_PROD_CURRENCY_PREFERENCES_COLLECTION_ID,

  systemTeamId: process.env.VITE_APPWRITE_PROD_SYSTEM_TEAM_ID,

  logosBucketId: process.env.VITE_APPWRITE_PROD_LOGOS_BUCKET_ID,
  avatarsBucketId: process.env.VITE_APPWRITE_PROD_AVATARS_BUCKET_ID,

  sendEmailFunctionId: process.env.VITE_APPWRITE_PROD_SEND_EMAIL_FUNCTION_ID,

  frontendUrl: process.env.VITE_PROD_FRONTEND_URL,
});

export default getDatabaseConfig;
