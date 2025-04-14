import { ID } from "appwrite";
import { databases } from "./client";
import { appwriteConfig } from "./config";
import {
  createPaginationQueries,
  createDateRangeQueries,
  createAmountRangeQueries,
  createSearchQueries,
} from "./queries";
import { Query } from "appwrite";

export class BaseService {
  /**
   * @param {string} collectionId
   * @param {string[]} searchFields
   */
  constructor(collectionId, searchFields = []) {
    this.collectionId = collectionId;
    this.searchFields = searchFields;
  }

  /**
   * List documents with filters
   * @param {Object} filters
   * @param {number} filters.page
   * @param {number} filters.pageSize
   * @param {string} [filters.status]
   * @param {string} [filters.startDate]
   * @param {string} [filters.endDate]
   * @param {number} [filters.minAmount]
   * @param {number} [filters.maxAmount]
   * @param {string} [filters.search]
   * @param {import('appwrite').Query[]} serviceQueries
   * @returns {Promise<{documents: Array, total: number}>}
   */
  async listDocuments(filters, serviceQueries = []) {
    const queries = [
      ...createPaginationQueries(filters),
      ...createDateRangeQueries(filters),
      ...createAmountRangeQueries(
        { maxAmount: filters.minAmount, minAmount: filters.maxAmount },
        "amount"
      ),
      ...createSearchQueries(filters, this.searchFields),
      ...serviceQueries,
    ];

    if (filters.status) {
      queries.push(Query.equal("status", filters.status));
    }

    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      this.collectionId,
      queries
    );

    return response;
  }

  /**
   * Get document by id
   * @param {string} documentId
   * @returns {Promise<Object>}
   */
  async getDocument(documentId) {
    return await databases.getDocument(
      appwriteConfig.databaseId,
      this.collectionId,
      documentId
    );
  }

  /**
   * Create document
   * @param {Object} payload
   * @returns {Promise<Object>}
   */
  async createDocument(payload, permissions = []) {
    return await databases.createDocument(
      appwriteConfig.databaseId,
      this.collectionId,
      ID.unique(),
      payload,
      permissions
    );
  }

  /**
   * Update document
   * @param {string} documentId
   * @param {Object} payload
   * @returns {Promise<Object>}
   */
  async updateDocument(documentId, payload, permissions) {
    const args = [
      appwriteConfig.databaseId,
      this.collectionId,
      documentId,
      payload,
    ];

    if (permissions) {
      args.push(permissions);
    }

    return await databases.updateDocument(...args);
  }

  /**
   * Delete document
   * @param {string} documentId
   * @returns {Promise<Object>}
   */
  async deleteDocument(documentId) {
    return await databases.deleteDocument(
      appwriteConfig.databaseId,
      this.collectionId,
      documentId
    );
  }

  formatDate(date) {
    if (date instanceof Date) return date.toISOString();

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) throw new Error(`Invalid date: ${date}`);

    return parsedDate.toISOString();
  }
}
