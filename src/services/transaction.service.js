import AppwriteService from "./appwrite.service.js";
import { Query, ID, Permission, Role } from "appwrite";

class Transaction extends AppwriteService {
  constructor() {
    super();
  }

  /**
   * @function createTransaction
   * @description Creates a new transaction document
   * @param {Object} transactionData The data for the new transaction
   * @returns {Promise} A promise that resolves to the created transaction document
   */
  async createTransaction(transactionData) {
    const { TRANSACTIONS_COLLECTION_ID, DATABASE_ID } = this.getVariables();

    const currentUser = await this.account.get();

    const permissions = [
      Permission.read(Role.user(currentUser?.$id)),
      Permission.update(Role.user(currentUser?.$id)),
      Permission.delete(Role.user(currentUser?.$id)),
    ];

    try {
      return this.database.createDocument(
        DATABASE_ID,
        TRANSACTIONS_COLLECTION_ID,
        ID.unique(),
        transactionData,
        permissions
      );
    } catch (error) {
      console.error("Error: ", JSON.stringify(error, null, 2));
      throw error;
    }
  }

  /**
   * @function getTransaction
   * @description Retrieves a specific transaction
   * @param {String} transactionId The ID of the transaction to retrieve
   * @returns {Promise} A promise that resolves to the transaction document
   */
  async getTransaction(transactionId) {
    const { TRANSACTIONS_COLLECTION_ID, DATABASE_ID } = this.getVariables();
    return this.database.getDocument(
      DATABASE_ID,
      TRANSACTIONS_COLLECTION_ID,
      transactionId
    );
  }

  /**
   * @function listTransactions
   * @description Lists all transactions
   * @param {Object} options Optional parameters for querying (e.g., limit, offset)
   * @returns {Promise} A promise that resolves to the list of transaction documents
   */
  async listTransactions(options = {}) {
    const { DATABASE_ID, TRANSACTIONS_COLLECTION_ID } = this.getVariables();
    const { limit = 50, offset = 0 } = options;

    return this.database.listDocuments(
      DATABASE_ID,
      TRANSACTIONS_COLLECTION_ID,
      [Query.limit(limit), Query.offset(offset), Query.orderDesc("date")]
    );
  }

  /**
   * @function updateTransaction
   * @description Updates an existing transaction
   * @param {String} transactionId The ID of the transaction to update
   * @param {Object} updateData The data to update in the transaction
   * @returns {Promise} A promise that resolves to the updated transaction document
   */
  async updateTransaction(transactionId, updateData) {
    const { DATABASE_ID, TRANSACTIONS_COLLECTION_ID } = this.getVariables();
    return this.database.updateDocument(
      DATABASE_ID,
      TRANSACTIONS_COLLECTION_ID,
      transactionId,
      updateData
    );
  }

  /**
   * @function updateTransactionStatus
   * @description Updates the status of a transaction
   * @param {String} transactionId The ID of the transaction to update
   * @param {TransactionStatus} newStatus The new status of the transaction
   * @param {string[]} permissions The permissions for the transaction
   * @returns {Promise} A promise that resolves to the updated transaction document
   */
  async updateTransactionStatus(transactionId, newStatus, permissions = []) {
    const { DATABASE_ID, TRANSACTIONS_COLLECTION_ID } = this.getVariables();

    if (permissions.length > 0) {
      return this.database.updateDocument(
        DATABASE_ID,
        TRANSACTIONS_COLLECTION_ID,
        transactionId,
        { status: newStatus },
        permissions
      );
    }

    return this.database.updateDocument(
      DATABASE_ID,
      TRANSACTIONS_COLLECTION_ID,
      transactionId,
      { status: newStatus }
    );
  }

  /**
   * @function deleteTransaction
   * @description Deletes a transaction
   * @param {String} transactionId The ID of the transaction to delete
   * @returns {Promise} A promise that resolves when the transaction is deleted
   */
  async deleteTransaction(transactionId) {
    const { DATABASE_ID, TRANSACTIONS_COLLECTION_ID } = this.getVariables();
    return this.database.deleteDocument(
      DATABASE_ID,
      TRANSACTIONS_COLLECTION_ID,
      transactionId
    );
  }

  /**
   * @function searchTransactions
   * @description Searches for transactions based on given criteria
   * @param {Object} searchCriteria The search criteria
   * @returns {Promise} A promise that resolves to the list of matching transaction documents
   */
  async searchTransactions(searchCriteria) {
    const { DATABASE_ID, TRANSACTIONS_COLLECTION_ID } = this.getVariables();
    const queries = Object.entries(searchCriteria).map(([key, value]) =>
      Query.equal(key, value)
    );

    return this.database.listDocuments(
      DATABASE_ID,
      TRANSACTIONS_COLLECTION_ID,
      queries
    );
  }

  /**
   * @function getTransactionsByType
   * @description Gets transactions filtered by type (income/expense)
   * @param {String} type The type of transactions to retrieve
   * @param {Object} options Optional parameters for querying
   * @returns {Promise} A promise that resolves to the filtered list of transactions
   */
  async getTransactionsByType(type, options = {}) {
    const { DATABASE_ID, TRANSACTIONS_COLLECTION_ID } = this.getVariables();
    const { limit = 50, offset = 0 } = options;

    return this.database.listDocuments(
      DATABASE_ID,
      TRANSACTIONS_COLLECTION_ID,
      [
        Query.equal("type", type),
        Query.limit(limit),
        Query.offset(offset),
        Query.orderDesc("$createdAt"),
      ]
    );
  }

  /**
   * @function getTransactionsByDateRange
   * @description Gets transactions within a specified date range
   * @param {String} startDate Start date of the range
   * @param {String} endDate End date of the range
   * @param {Object} options Optional parameters for querying
   * @returns {Promise} A promise that resolves to the filtered list of transactions
   */
  async getTransactionsByDateRange(startDate, endDate, options = {}) {
    const { DATABASE_ID, TRANSACTIONS_COLLECTION_ID } = this.getVariables();
    const { limit = 50, offset = 0 } = options;

    return this.database.listDocuments(
      DATABASE_ID,
      TRANSACTIONS_COLLECTION_ID,
      [
        Query.greaterThanEqual("date", startDate),
        Query.lessThanEqual("date", endDate),
        Query.limit(limit),
        Query.offset(offset),
        Query.orderDesc("date"),
      ]
    );
  }

  /**
   * @function getTransactionsByCategory
   * @description Gets transactions filtered by category
   * @param {String} category The category to filter by
   * @param {Object} options Optional parameters for querying
   * @returns {Promise} A promise that resolves to the filtered list of transactions
   */
  async getTransactionsByCategory(category, options = {}) {
    const { DATABASE_ID, TRANSACTIONS_COLLECTION_ID } = this.getVariables();
    const { limit = 50, offset = 0 } = options;

    return this.database.listDocuments(
      DATABASE_ID,
      TRANSACTIONS_COLLECTION_ID,
      [
        Query.equal("category", category),
        Query.limit(limit),
        Query.offset(offset),
        Query.orderDesc("$createdAt"),
      ]
    );
  }
}

const TransactionService = new Transaction();
export default TransactionService;
