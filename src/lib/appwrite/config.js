/**
 * @typedef {Object} AppwriteConfig
 * @property {string} endpoint - Appwrite endpoint URL
 * @property {string} projectId - Appwrite project ID
 * @property {string} databaseId - Appwrite database ID
 * @property {Object} collections - Collection IDs
 * @property {string} collections.invoices - Appwrite invoices collection ID
 * @property {string} collections.billingAddresses - Appwrite billing addresses collection ID
 * @property {string} collections.items - Appwrite items collection ID
 * @property {string} collections.transactions - Appwrite transactions collection ID
 * @property {string} collections.monthlyStatements- Appwrite monthly statements collection ID
 * @property {string} collections.accountSummaries - Appwrite account summaries collection ID
 * @property {string} collections.categories - Appwrite categories collection ID
 * @property {string} collections.monthlyCategoryTotals - Appwrite monthly category totals collection ID
 * @property {string} collections.sharedInvoices - Appwrite shared invoices collection ID
 * @property {string} collections.organisations - Appwrite organizations collection ID
 * @property {string} collections.profiles - Appwrite profiles collection ID
 * @property {string} collections.parties - Appwrite parties collection ID
 * @property {string} collections.currencyPreferences - Appwrite currency preferences collection ID
 * @property {string} collections.receipts - Appwrite receipts collection ID
 * @property {Object} buckets - Bucket IDs
 * @property {string} buckets.logos - Appwrite logos bucket ID
 * @property {string} buckets.avatars - Appwrite avatars bucket ID
 */

function validateConfig() {
  const requiredEnvironmentVariables = {
    "Appwrite Endpoint": import.meta.env.VITE_APPWRITE_API_ENDPOINT,
    "Project ID": import.meta.env.VITE_APPWRITE_API_PROJECT_ID,
    "Database ID": import.meta.env.VITE_APPWRITE_DATABASE_ID,
    "Invoices Collection ID": import.meta.env
      .VITE_APPWRITE_INVOICES_COLLECTION_ID,
    "Billing Addresses Collection ID": import.meta.env
      .VITE_APPWRITE_BILLING_ADDRESS_COLLECTION_ID,
    "Items Collection ID": import.meta.env.VITE_APPRWITE_ITEMS_COLLECTION_ID,
    "Transactions Collection ID": import.meta.env
      .VITE_APPRWITE_TRANSACTIONS_COLLECTION_ID,
    "Monthly Statements Collection ID": import.meta.env
      .VITE_APPWRITE_MONTHLY_STATEMENTS_COLLECTION_ID,
    "Account Summaries Collection ID": import.meta.env
      .VITE_APPWRITE_ACCOUNT_SUMMARIES_COLLECTION_ID,
    "Categories Collection ID": import.meta.env
      .VITE_APPWRITE_CATEGORIES_COLLECTION_ID,
    "Monthly Category Totals Collection ID": import.meta.env
      .VITE_APPWRITE_MONTHLY_CATEGORY_TOTALS_COLLECTION_ID,
    "Shared Invoices Collection ID": import.meta.env
      .VITE_APPWRITE_SHARED_INVOICES_COLLECTION_ID,
    "Organizations Collection ID": import.meta.env
      .VITE_APPWRITE_ORGANISATIONS_COLLECTION_ID,
    "Profiles Collection ID": import.meta.env
      .VITE_APPWRITE_PROFILES_COLLECTION_ID,
    "Parties Collection ID": import.meta.env
      .VITE_APPWRITE_PARTIES_COLLECTION_ID,
    "Currency Preferences Collection ID": import.meta.env
      .VITE_APPWRITE_CURRENCY_PREFERENCES_COLLECTION_ID,
    "Receipts Collection ID": import.meta.env
      .VITE_APPWRITE_RECEIPTS_COLLECTION_ID,
    "Logos Bucket ID": import.meta.env.VITE_APPWRITE_LOGOS_BUCKET_ID,
    "Avatars Bucket ID": import.meta.env.VITE_APPWRITE_AVATARS_BUCKET_ID,
  };

  const missingSecrets = Object.entries(requiredEnvironmentVariables)
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missingSecrets.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingSecrets.join(", ")}`
    );
  }
}

validateConfig();

/** @type {AppwriteConfig} */
export const appwriteConfig = {
  endpoint: import.meta.env.VITE_APPWRITE_API_ENDPOINT,
  projectId: import.meta.env.VITE_APPWRITE_API_PROJECT_ID,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  collections: {
    invoices: import.meta.env.VITE_APPWRITE_INVOICES_COLLECTION_ID,
    billingAddresses: import.meta.env
      .VITE_APPWRITE_BILLING_ADDRESS_COLLECTION_ID,
    items: import.meta.env.VITE_APPRWITE_ITEMS_COLLECTION_ID,
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
    receipts: import.meta.env.VITE_APPWRITE_RECEIPTS_COLLECTION_ID,
  },
  buckets: {
    logos: import.meta.env.VITE_APPWRITE_LOGOS_BUCKET_ID,
    avatars: import.meta.env.VITE_APPWRITE_AVATARS_BUCKET_ID,
  },
};
