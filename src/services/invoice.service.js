import AppwriteService from "./appwrite.service.js";
import { Query, ID, Permission, Role } from "appwrite";

class Invoice extends AppwriteService {
  #databaseId;
  #invoicesCollectionId;

  constructor() {
    super();
    this.#databaseId = this.getVariables().DATABASE_ID;
    this.#invoicesCollectionId = this.getVariables().INVOICES_COLLECTION_ID;
  }

  /**
   * @function createInvoice
   * @description Creates a new invoice document
   * @param {Object} invoiceData The data for the new invoice
   * @returns {Promise} A promise that resolves to the created invoice document
   */
  async createInvoice(invoiceData) {
    const currentUser = await this.account.get();

    const permissions = [
      Permission.read(Role.user(currentUser?.$id)),
      Permission.update(Role.user(currentUser?.$id)),
      Permission.delete(Role.user(currentUser?.$id)),
    ];

    try {
      return this.database.createDocument(
        this.#databaseId,
        this.#invoicesCollectionId,
        ID.unique(),
        { ...invoiceData, created_by: currentUser?.$id },
        permissions
      );
    } catch (error) {
      console.log("Error: ", JSON.stringify(error, null, 2));
    }
  }

  /**
   * @function getInvoice
   * @description Retrieves a specific invoice
   * @param {String} invoiceId The ID of the invoice to retrieve
   * @returns {Promise} A promise that resolves to the invoice document
   */
  async getInvoice(invoiceId) {
    return this.database.getDocument(
      this.#databaseId,
      this.#invoicesCollectionId,
      invoiceId
    );
  }

  /**
   * @function listInvoices
   * @description Lists all invoices
   * @param {Object} options Optional parameters for querying (e.g., limit, offset)
   * @returns {Promise} A promise that resolves to the list of invoice documents
   */
  async listInvoices(options = {}) {
    const { limit = 50, offset = 0 } = options;
    const currentUser = await this.account.get();

    return this.database.listDocuments(
      this.#databaseId,
      this.#invoicesCollectionId,
      [
        Query.limit(limit),
        Query.offset(offset),
        Query.equal("created_by", currentUser?.$id),
        Query.orderDesc("$createdAt"),
      ]
    );
  }

  /**
   * @function updateInvoice
   * @description Updates an existing invoice
   * @param {String} invoiceId The ID of the invoice to update
   * @param {Object} updateData The data to update in the invoice
   * @returns {Promise} A promise that resolves to the updated invoice document
   */
  async updateInvoice(invoiceId, updateData) {
    return this.database.updateDocument(
      this.#databaseId,
      this.#invoicesCollectionId,
      invoiceId,
      updateData
    );
  }

  /**
   * @function updateInvoiceStatus
   * @description Updates the status of an invoice
   * @param {String} invoiceId The ID of the invoice to update
   * @param {InvoiceStatus} newStatus The new status of the invoice
   * @param {string[]} permissions The permissions for the invoice
   * @returns
   */

  async updateInvoiceStatus(invoiceId, newStatus, permissions = []) {
    if (permissions.length > 0) {
      return this.database.updateDocument(
        this.#databaseId,
        this.#invoicesCollectionId,
        invoiceId,
        { status: newStatus },
        permissions
      );
    }

    return this.database.updateDocument(
      this.#databaseId,
      this.#invoicesCollectionId,
      invoiceId,
      { status: newStatus }
    );
  }

  /**
   * @function deleteInvoice
   * @description Deletes an invoice
   * @param {String} invoiceId The ID of the invoice to delete
   * @returns {Promise} A promise that resolves when the invoice is deleted
   */
  async deleteInvoice(invoiceId) {
    return this.database.deleteDocument(
      this.#databaseId,
      this.#invoicesCollectionId,
      invoiceId
    );
  }

  /**
   * @function searchInvoices
   * @description Searches for invoices based on given criteria
   * @param {Object} searchCriteria The search criteria
   * @returns {Promise} A promise that resolves to the list of matching invoice documents
   */
  async searchInvoices(searchCriteria) {
    const currentUser = await this.account.get();

    const queries = Object.entries(searchCriteria).map(([key, value]) =>
      Query.equal(key, value)
    );

    return this.database.listDocuments(
      this.#databaseId,
      this.#invoicesCollectionId,
      [Query.equal("created_by", currentUser?.$id), ...queries]
    );
  }
}

const InvoiceService = new Invoice();
export default InvoiceService;
