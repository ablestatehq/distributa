const getDatabaseConfig = () => ({
  endpoint: process.env.VITE_APPWRITE_TEST_ENDPOINT,
  projectId: process.env.VITE_APPWRITE_TEST_PROJECT_ID,
  apiKey: process.env.VITE_APPWRITE_TEST_API_KEY,
  databaseId: process.VITE_APPWRITE_TEST_DATABASE_ID,

  invoicesCollectionId: process.env.VITE_APPWRITE_TEST_INVOICES_COLLECTION_ID,
  distributionsCollectionId:
    process.env.VITE_APPWRITE_TEST_DISTRIBUTIONS_COLLECTION_ID,
  billingAddressesCollectionId:
    process.env.VITE_APPWRITE_TEST_BILLING_ADDRESS_COLLECTION_ID,
  itemsCollectionId: process.env.VITE_APPRWITE_TEST_ITEMS_COLLECTION_ID,
  transactionsCollectionId:
    process.env.VITE_APPRWITE_TEST_TRANSACTIONS_COLLECTION_ID,
  monthlyStatementsCollectionId:
    process.env.VITE_APPWRITE_TEST_MONTHLY_STATEMENTS_COLLECTION_ID,
  accountSummariesCollectionId:
    process.env.VITE_APPWRITE_TEST_ACCOUNT_SUMMARIES_COLLECTION_ID,
  categoriesCollectionId:
    process.env.VITE_APPWRITE_TEST_CATEGORIES_COLLECTION_ID,
  monthlyCategoryTotalsCollectionId:
    process.env.VITE_APPWRITE_TEST_MONTHLY_CATEGORY_TOTALS_COLLECTION_ID,
  sharedInvoicesCollectionId:
    process.env.VITE_APPWRITE_TEST_SHARED_INVOICES_COLLECTION_ID,
  organisationsCollectionId:
    process.env.VITE_APPWRITE_TEST_ORGANISATIONS_COLLECTION_ID,
  profilesCollectionId: process.env.VITE_APPWRITE_TEST_PROFILES_COLLECTION_ID,
  partiesCollectionId: process.env.VITE_APPWRITE_TEST_PARTIES_COLLECTION_ID,
  currencyPreferencesCollectionId:
    process.env.VITE_APPWRITE_TEST_CURRENCY_PREFERENCES_COLLECTION_ID,

  systemTeamId: process.env.VITE_APPWRITE_TEST_SYSTEM_TEAM_ID,

  logosBucketId: process.env.VITE_APPWRITE_TEST_LOGOS_BUCKET_ID,
  avatarsBucketId: process.env.VITE_APPWRITE_TEST_AVATARS_BUCKET_ID,

  sendEmailFunctionId: process.env.VITE_APPWRITE_TEST_SEND_EMAIL_FUNCTION_ID,

  frontendUrl: process.env.VITE_TEST_FRONTEND_URL,
});

export default getDatabaseConfig;
