import AppwriteService from "./appwrite.service.js";
import { Query, ID, Permission, Role } from "appwrite";

class Transaction extends AppwriteService {
  #databaseId;
  #transactionsCollectionId;

  constructor() {
    super();
    this.#databaseId = this.getVariables().DATABASE_ID;
    this.#transactionsCollectionId =
      this.getVariables().TRANSACTIONS_COLLECTION_ID;
  }

  /**
   * @function createTransaction
   * @description Creates a new transaction document
   * @param {Object} transactionData The data for the new transaction
   * @returns {Promise} A promise that resolves to the created transaction document
   */
  async createTransaction(transactionData) {
    const currentUser = await this.account.get();

    const permissions = [
      Permission.read(Role.user(currentUser?.$id)),
      Permission.update(Role.user(currentUser?.$id)),
      Permission.delete(Role.user(currentUser?.$id)),
    ];

    try {
      return this.database.createDocument(
        this.#databaseId,
        this.#transactionsCollectionId,
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
    return this.database.getDocument(
      this.#databaseId,
      this.#transactionsCollectionId,
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
    const { limit = 50, offset = 0 } = options;

    return this.database.listDocuments(
      this.#databaseId,
      this.#transactionsCollectionId,
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
    return this.database.updateDocument(
      this.#databaseId,
      this.#transactionsCollectionId,
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
    // get the current transaction
    const transaction = await this.getTransaction(transactionId);

    if (newStatus === transaction.status) {
      return transaction;
    }

    if (permissions.length > 0) {
      return this.database.updateDocument(
        this.#databaseId,
        this.#transactionsCollectionId,
        transactionId,
        { status: newStatus },
        permissions
      );
    }

    return this.database.updateDocument(
      this.#databaseId,
      this.#transactionsCollectionId,
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
    return this.database.deleteDocument(
      this.#databaseId,
      this.#transactionsCollectionId,
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
    const queries = Object.entries(searchCriteria).map(([key, value]) =>
      Query.equal(key, value)
    );

    return this.database.listDocuments(
      this.#databaseId,
      this.#transactionsCollectionId,
      queries
    );
  }

  /**
   * @function getTransactionsByType
   * @description Gets transactions filtered by flow_type (income/expense)
   * @param {String} flow_type The type of transactions to retrieve
   * @param {Object} options Optional parameters for querying
   * @returns {Promise} A promise that resolves to the filtered list of transactions
   */
  async getTransactionsByType(flow_type, options = {}) {
    const { limit = 50, offset = 0 } = options;

    return this.database.listDocuments(
      this.#databaseId,
      this.#transactionsCollectionId,
      [
        Query.equal("flow_type", flow_type),
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
    const { limit = 50, offset = 0 } = options;

    return this.database.listDocuments(
      this.#databaseId,
      this.#transactionsCollectionId,
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
    const { limit = 50, offset = 0 } = options;

    return this.database.listDocuments(
      this.#databaseId,
      this.#transactionsCollectionId,
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
