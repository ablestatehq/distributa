import AppwriteService from "./appwrite.service.js";
import BalancesService from "./balances.service.js";
import { Query, ID, Permission, Role } from "appwrite";

class Invoice extends AppwriteService {
  #databaseId;
  #invoicesCollectionId;
  #itemsCollectionId;
  #transactionsCollectionId;
  #accountSummariesCollectionId;
  #monthlyStatementsCollectionId;

  constructor() {
    super();
    this.balance = BalancesService;
    this.#databaseId = this.getVariables().DATABASE_ID;
    this.#invoicesCollectionId = this.getVariables().INVOICES_COLLECTION_ID;
    this.#itemsCollectionId = this.getVariables().ITEMS_COLLECTION_ID;
    this.#transactionsCollectionId =
      this.getVariables().TRANSACTIONS_COLLECTION_ID;
    this.#accountSummariesCollectionId =
      this.getVariables().ACCOUNT_SUMMARIES_COLLECTION_ID;
    this.#monthlyStatementsCollectionId =
      this.getVariables().MONTHLY_STATEMENTS_COLLECTION_ID;
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
    const billed_from = {
      address: updateData.billed_from.address,
      email: updateData.billed_from.email,
      name: updateData.billed_from.name,
    };

    const billed_to = {
      address: updateData.billed_to.address,
      email: updateData.billed_to.email,
      name: updateData.billed_to.name,
    };

    const invoiceData = {
      amount_due: updateData.amount_due,
      amount_paid: updateData.amount_paid,
      balance_due: updateData.balance_due,
      created_by: updateData.created_by,
      currency: updateData.currency,
      discount: updateData.discount,
      due_date: updateData.due_date,
      invoice_no: updateData.invoice_no,
      issue_date: updateData.issue_date,
      logo: updateData.logo,
      notes: updateData.notes,
      orientation: updateData.orientation,
      paper_size: updateData.paper_size,
      remote_id: updateData.remote_id ?? null,
      status: updateData.status,
      sub_total: updateData.sub_total,
      tax: updateData.tax,
      terms: updateData.terms,
      title: updateData.title,
    };

    const invoice = await this.getInvoice(invoiceId);

    const itemsToDelete = invoice.items.filter(
      (item) => !updateData.items.find((i) => i.$id === item.$id)
    );

    const itemsToAdd = updateData.items.filter((item) => !item.$id);

    const itemsToUpdate = updateData.items
      .filter(
        (item) => item.$id && !itemsToDelete.find((i) => i.$id === item.$id)
      )
      .map(({ price, quantity, title, units }) => ({
        price,
        quantity,
        title,
        units,
      }));

    const newItems = (
      await Promise.all(
        itemsToAdd.map((item) =>
          this.database.createDocument(
            this.#databaseId,
            this.#itemsCollectionId,
            ID.unique(),
            item
          )
        )
      )
    ).map((item) => item.$id);

    await Promise.all(
      itemsToDelete.map(
        async (item) =>
          await this.database.deleteDocument(
            this.#databaseId,
            item.$collectionId,
            item.$id
          )
      )
    );

    return this.database.updateDocument(
      this.#databaseId,
      this.#invoicesCollectionId,
      invoiceId,
      {
        ...invoiceData,
        billed_from,
        billed_to,
        items: [...itemsToUpdate, ...newItems],
      }
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

  async updateInvoiceStatus(invoiceId, newStatus, payment_date = null) {
    // first get the invoice
    const invoice = await this.getInvoice(invoiceId);

    if (invoice.status === newStatus) return invoice;

    if (newStatus === "paid" && payment_date) {
      // create a transaction
      const transaction = await this.database.createDocument(
        this.#databaseId,
        this.#transactionsCollectionId,
        ID.unique(),
        {
          flow_type: "income",
          date: payment_date,
          item: invoice.title,
          amount: invoice.balance_due,
          payer_payee: invoice.billed_to.name,
          invoice_receipt_no: invoice.invoice_no,
          source_ref: invoice.$id,
        }
      );

      await this.balance.updateBalances(
        transaction.amount,
        transaction.flow_type,
        transaction.date
      );

      return this.database.updateDocument(
        this.#databaseId,
        this.#invoicesCollectionId,
        invoiceId,
        {
          payment_date,
          balance_due: invoice.balance_due - transaction.amount,
          amount_paid: invoice.amount_paid + transaction.amount,
          status: newStatus,
        }
      );
    }

    if (newStatus === "unpaid") {
      // create the transaction
      const { documents: transactions } = await this.database.listDocuments(
        this.#databaseId,
        this.#transactionsCollectionId,
        [Query.equal("source_ref", invoice.$id)]
      );

      const [userBalance, monthlyBalance] = await Promise.all([
        this.balance.initializeUserBalance(),
        this.balance.getOrCreateMonthlyBalance(payment_date),
      ]);

      const transaction_amount = transactions.reduce(
        (acc, transaction) => acc + transaction.amount,
        0
      );

      await Promise.all(
        transactions.map((transaction) =>
          Promise.all([
            this.database.deleteDocument(
              this.#databaseId,
              this.#transactionsCollectionId,
              transaction.$id
            ),
            this.database.updateDocument(
              this.#databaseId,
              this.#accountSummariesCollectionId,
              userBalance.$id,
              {
                total_income:
                  transaction.flow_type === "income"
                    ? userBalance.total_income - transaction.amount
                    : userBalance.total_income,
                total_expenses:
                  transaction.flow_type === "expense"
                    ? userBalance.total_expenses + transaction.amount
                    : userBalance.total_expenses,
                current_balance:
                  transaction.flow_type === "income"
                    ? userBalance.current_balance - transaction.amount
                    : userBalance.current_balance + transaction.amount,
              }
            ),
            this.database.updateDocument(
              this.#databaseId,
              this.#monthlyStatementsCollectionId,
              monthlyBalance.$id,
              {
                income:
                  transaction.flow_type === "income"
                    ? monthlyBalance.income - transaction.amount
                    : monthlyBalance.income,
                expense:
                  transaction.flow_type === "expense"
                    ? monthlyBalance.expense + transaction.amount
                    : monthlyBalance.expense,
                number_of_transactions:
                  monthlyBalance.number_of_transactions - 1,
                average_transaction_amount:
                  (monthlyBalance.average_transaction_amount *
                    monthlyBalance.number_of_transactions -
                    transaction.amount) /
                  (monthlyBalance.number_of_transactions - 1),
                largest_transaction_amount: Math.max(
                  monthlyBalance.largest_transaction_amount -
                    transaction.amount,
                  0
                ),
                budget_utilised:
                  transaction.flow_type === "expense"
                    ? monthlyBalance.budget_utilised - transaction.amount
                    : monthlyBalance.budget_utilised,
              }
            ),
          ])
        )
      );

      return this.database.updateDocument(
        this.#databaseId,
        this.#invoicesCollectionId,
        invoiceId,
        {
          payment_date: null,
          balance_due: invoice.balance_due + transaction_amount,
          amount_paid: invoice.amount_paid - transaction_amount,
          status: newStatus,
        }
      );
    }
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
