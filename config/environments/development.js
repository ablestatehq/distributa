const getDatabaseConfig = () => ({
  endpoint: process.env.VITE_APPWRITE_DEV_ENDPOINT,
  projectId: process.env.VITE_APPWRITE_DEV_PROJECT_ID,
  apiKey: process.env.VITE_APPWRITE_DEV_API_KEY,
  databaseId: process.VITE_APPWRITE_DEV_DATABASE_ID,

  invoicesCollectionId: process.env.VITE_APPWRITE_DEV_INVOICES_COLLECTION_ID,
  distributionsCollectionId:
    process.env.VITE_APPWRITE_DEV_DISTRIBUTIONS_COLLECTION_ID,
  billingAddressesCollectionId:
    process.env.VITE_APPWRITE_DEV_BILLING_ADDRESS_COLLECTION_ID,
  itemsCollectionId: process.env.VITE_APPRWITE_DEV_ITEMS_COLLECTION_ID,
  transactionsCollectionId:
    process.env.VITE_APPRWITE_DEV_TRANSACTIONS_COLLECTION_ID,
  monthlyStatementsCollectionId:
    process.env.VITE_APPWRITE_DEV_MONTHLY_STATEMENTS_COLLECTION_ID,
  accountSummariesCollectionId:
    process.env.VITE_APPWRITE_DEV_ACCOUNT_SUMMARIES_COLLECTION_ID,
  categoriesCollectionId:
    process.env.VITE_APPWRITE_DEV_CATEGORIES_COLLECTION_ID,
  monthlyCategoriesCollectionId:
    process.env.VITE_APPWRITE_DEV_MONTHLY_CATEGORY_TOTALS_COLLECTION_ID,
  sharedInvoicesCollectionId:
    process.env.VITE_APPWRITE_DEV_SHARED_INVOICES_COLLECTION_ID,
  organisationsCollectionId:
    process.env.VITE_APPWRITE_DEV_ORGANISATIONS_COLLECTION_ID,
  profilesCollectionId: process.env.VITE_APPWRITE_DEV_PROFILES_COLLECTION_ID,
  partiesCollectionId: process.env.VITE_APPWRITE_DEV_PARTIES_COLLECTION_ID,
  currencyPreferencesCollectionId:
    process.env.VITE_APPWRITE_DEV_CURRENCY_PREFERENCES_COLLECTION_ID,

  systemTeamId: process.env.VITE_APPWRITE_DEV_SYSTEM_TEAM_ID,

  logosBucketId: process.env.VITE_APPWRITE_DEV_LOGOS_BUCKET_ID,
  avatarsBucketId: process.env.VITE_APPWRITE_DEV_AVATARS_BUCKET_ID,

  sendEmailFunctionId: process.env.VITE_APPWRITE_DEV_SEND_EMAIL_FUNCTION_ID,

  frontendUrl: process.env.VITE_DEV_FRONTEND_URL,
});

export default getDatabaseConfig;
