/**
 * @typedef {Object} Collections
 * @property {string} invoices - Invoices collection ID
 * @property {string} distributions - Distributions collection ID
 * @property {string} billingAddresses - Billing addresses collection ID
 * @property {string} items - Items collection ID
 * @property {string} transactions - Transactions collection ID
 * @property {string} monthlyStatements - Monthly statements collection ID
 * @property {string} accountSummaries - Account summaries collection ID
 * @property {string} categories - Categories collection ID
 * @property {string} monthlyCategoryTotals - Monthly category totals collection ID
 * @property {string} sharedInvoices - Shared invoices collection ID
 * @property {string} organisations - Organizations collection ID
 * @property {string} profiles - Profiles collection ID
 * @property {string} parties - Parties collection ID
 * @property {string} currencyPreferences - Currency preferences collection ID
 */

/**
 * @typedef {Object} Buckets
 * @property {string} logos - Logos bucket ID
 * @property {string} avatars - Avatars bucket ID
 */

/**
 * @typedef {Object} Functions
 * @property {string} sendEmail - Send email function ID
 */

/**
 * @typedef {Object} Teams
 * @property {string} systemTeamId - System team ID
 */

/**
 * @typedef {Object} AppwriteConfig
 * @property {string} endpoint - Appwrite API endpoint
 * @property {string} projectId - Appwrite project ID
 * @property {string} databaseId - Appwrite database ID
 * @property {Collections} collections - Collection IDs
 * @property {Buckets} buckets - Storage bucket IDs
 * @property {Functions} functions - Function IDs
 * @property {Teams} teams - Team IDs
 * @property {string} baseUrl - Frontend base URL
 */



export {};
