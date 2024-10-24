import AppwriteService from "./appwrite";
import { Query, ID, Permission, Role } from "appwrite";

class Invoice extends AppwriteService {
  constructor() {
    super();
  }

  /**
   * @function createInvoice
   * @description Creates a new invoice document
   * @param {Object} invoiceData The data for the new invoice
   * @returns {Promise} A promise that resolves to the created invoice document
   */
  async createInvoice(invoiceData) {
    const { INVOICES_COLLECTION_ID, DATABASE_ID } = this.getVariables();

    const currentUser = await this.account.get();

    const permissions = [
      Permission.read(Role.user(currentUser?.$id)),
      Permission.update(Role.user(currentUser?.$id)),
      Permission.delete(Role.user(currentUser?.$id)),
    ];

    try {
      return this.database.createDocument(
        DATABASE_ID,
        INVOICES_COLLECTION_ID,
        ID.unique(),
        invoiceData,
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
    const { INVOICES_COLLECTION_ID, DATABASE_ID } = this.getVariables();
    return this.database.getDocument(
      DATABASE_ID,
      INVOICES_COLLECTION_ID,
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
    const { INVOICES_COLLECTION_ID } = this.getVariables();
    const { limit = 50, offset = 0 } = options;

    return this.database.listDocuments(INVOICES_COLLECTION_ID, [
      Query.limit(limit),
      Query.offset(offset),
    ]);
  }

  /**
   * @function updateInvoice
   * @description Updates an existing invoice
   * @param {String} invoiceId The ID of the invoice to update
   * @param {Object} updateData The data to update in the invoice
   * @returns {Promise} A promise that resolves to the updated invoice document
   */
  async updateInvoice(invoiceId, updateData) {
    const { INVOICES_COLLECTION_ID } = this.getVariables();
    return this.database.updateDocument(
      INVOICES_COLLECTION_ID,
      invoiceId,
      updateData
    );
  }

  /**
   * @function deleteInvoice
   * @description Deletes an invoice
   * @param {String} invoiceId The ID of the invoice to delete
   * @returns {Promise} A promise that resolves when the invoice is deleted
   */
  async deleteInvoice(invoiceId) {
    const { INVOICES_COLLECTION_ID } = this.getVariables();
    return this.database.deleteDocument(INVOICES_COLLECTION_ID, invoiceId);
  }

  /**
   * @function searchInvoices
   * @description Searches for invoices based on given criteria
   * @param {Object} searchCriteria The search criteria
   * @returns {Promise} A promise that resolves to the list of matching invoice documents
   */
  async searchInvoices(searchCriteria) {
    const { INVOICES_COLLECTION_ID } = this.getVariables();
    const queries = Object.entries(searchCriteria).map(([key, value]) =>
      Query.equal(key, value)
    );

    return this.database.listDocuments(INVOICES_COLLECTION_ID, queries);
  }
}

const InvoiceService = new Invoice();
export default InvoiceService;
