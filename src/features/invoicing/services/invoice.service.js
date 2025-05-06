import { BaseService } from "../../../lib/appwrite/base-service";
import { appwriteConfig } from "../../../lib/appwrite/config";
import { account } from "../../../lib/appwrite/client";
import { Permission, Role, Query } from "appwrite";
import ItemService from "../../items/services/item.service";

class InvoiceService extends BaseService {
  constructor() {
    super(appwriteConfig.collections.invoices, ["title", "invoice_no"]);
    this.itemService = new ItemService();
  }

  async createInvoice(payload) {
    const { $id: userId } = await account.get();

    const permissions = [
      Permission.read(Role.user(userId)),
      Permission.update(Role.user(userId)),
      Permission.delete(Role.user(userId)),
    ];

    return this.createDocument({ ...payload, created_by: userId }, permissions);
  }

  async getInvoice(invoiceId) {
    return this.getDocument(invoiceId);
  }

  async listInvoices(filters = {}) {
    const queries = [
      ...(filters?.status ? [Query.equal("status", filters.status)] : []),
      ...(filters?.dates?.issueFrom
        ? [
            Query.greaterThanEqual(
              "issue_date",
              this.formatDate(filters.dates.issueFrom)
            ),
          ]
        : []),

      ...(filters?.dates?.issueTo
        ? [
            Query.lessThanEqual(
              "issue_date",
              this.formatDate(filters.dates.issueTo)
            ),
          ]
        : []),
      ...(filters.dates?.dueFrom
        ? [
            Query.greaterThanEqual(
              "due_date",
              this.formatDate(filters.dates.dueFrom)
            ),
          ]
        : []),
      ...(filters.dates?.dueTo
        ? [
            Query.lessThanEqual(
              "due_date",
              this.formatDate(filters.dates.dueTo)
            ),
          ]
        : []),
      Query.orderDesc("$createdAt"),
    ];

    return this.listDocuments(filters, queries);
  }

  async updateInvoice(invoiceId, payload) {
    try {
      const existingInvoice = await this.getInvoice(invoiceId);
      if (!existingInvoice) {
        throw new Error(`Invoice not found`);
      }

      const updatedItems = payload.items
        ? await this.handleInvoiceItems(
            existingInvoice.items,
            payload.items || []
          )
        : existingInvoice.items;

      const billingInfo = this.createBillingInfo(existingInvoice, payload);

      const updatePayload = {
        ...this.createInvoiceUpdatePayload(payload),
        ...billingInfo,
        items: updatedItems,
      };

      return await this.updateDocument(invoiceId, updatePayload);
    } catch (error) {
      throw error;
    }
  }

  async deleteInvoice(invoiceId) {
    const invoice = await this.getInvoice(invoiceId);

    const deleteResults = await Promise.allSettled(
      invoice.items.map(async ({ $id }) => {
        await this.itemService.deleteItem($id);
      })
    );

    const failedDeletes = deleteResults
      .map((result, index) =>
        result.status === "rejected" ? invoice.items[index] : null
      )
      .filter((id) => id !== null);

    if (failedDeletes.length > 0) {
      await this.updateDocument(invoiceId, {
        items: [],
      });
    }

    return this.deleteDocument(invoiceId);
  }

  createBillingInfo(existingInvoice, payload) {
    const billingInfo = {};

    if (payload.billed_from) {
      billingInfo.billed_from = {
        address:
          payload.billed_from.address ?? existingInvoice.billed_from.address,
        email: payload.billed_from.email ?? existingInvoice.billed_from.email,
        name: payload.billed_from.name ?? existingInvoice.billed_from.name,
      };
    }

    if (payload.billed_to) {
      billingInfo.billed_to = {
        address: payload.billed_to.address ?? existingInvoice.billed_to.address,
        email: payload.billed_to.email ?? existingInvoice.billed_to.email,
        name: payload.billed_to.name ?? existingInvoice.billed_to.name,
      };
    }

    return billingInfo;
  }

  createInvoiceUpdatePayload(payload) {
    const updatedPayload = {};

    const fields = [
      "amount_due",
      "amount_paid",
      "balance_due",
      "created_by",
      "currency",
      "discount",
      "due_date",
      "invoice_no",
      "issue_date",
      "logo",
      "notes",
      "orientation",
      "paper_size",
      "remote_id",
      "status",
      "sub_total",
      "tax",
      "terms",
      "title",
    ];

    fields.forEach((field) => {
      if (field in payload) {
        updatedPayload[field] = payload[field];
      }
    });

    if ("remote_id" in payload) {
      updatedPayload.remote_id = payload.remote_id ?? null;
    }

    return updatedPayload;
  }

  async handleInvoiceItems(existingItems, newItems) {
    if (!newItems || !Array.isArray(newItems)) {
      return existingItems;
    }

    const itemsToDelete = existingItems.filter(
      (item) => !newItems.find((i) => i.$id === item.$id)
    );

    const itemsToAdd = newItems.filter((item) => !item.$id);
    const itemsToUpdate = newItems.filter(
      (item) => item.$id && !itemsToDelete.find((i) => i.$id === item.$id)
    );

    try {
      await Promise.allSettled(
        itemsToDelete.map(async ({ $id: itemId }) =>
          this.itemService.deleteItem(itemId)
        )
      );

      const addedItems = await Promise.all(
        itemsToAdd.map((item) => this.itemService.createItem(item))
      );

      return [
        ...itemsToUpdate.map((item) => this.itemService.sanitizeItem(item)),
        ...addedItems.map((item) => item.$id),
      ];
    } catch (error) {
      throw error;
    }
  }
}

export const invoiceService = new InvoiceService();
export default InvoiceService;
