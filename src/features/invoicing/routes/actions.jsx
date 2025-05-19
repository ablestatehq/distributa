import { invoiceService } from "../services/invoice.service";
import { parseInvoiceParams } from "../utils/url-params";

export const createInvoiceAction = async ({ request }) => {
  try {
    const payload = await request.json();
    const invoice = await invoiceService.createInvoice(payload);

    return {
      success: true,
      invoice: invoice,
      message: "Invoice created successfully",
    };
  } catch (error) {
    return {
      error: true,
      message: error.message || "Failed to create invoice",
    };
  }
};

export const updateInvoiceAction = async ({ request, params }) => {
  try {
    const payload = await request.json();
    const invoice = await invoiceService.updateInvoice(params.id, payload);

    return {
      success: true,
      invoice: invoice,
      message: "Invoice updated successfully",
    };
  } catch (error) {
    console.log("Error: ", error);
    return {
      error: true,
      message: error.message || "Failed to update invoice",
    };
  }
};

export const updateInvoiceStatus = async ({ request, params }) => {
  try {
    const payload = await request.json();
    const invoice = await invoiceService.updateInvoiceStatus(
      params.id,
      payload.status,
      payload.payment_date
    );

    return {
      success: true,
      invoice: invoice,
      message: "Invoice status updated successfully",
    };
  } catch (error) {
    return {
      error: true,
      message: error.message || "Failed to update invoice status",
    };
  }
};

export const deleteInvoiceAction = async ({ request, params }) => {
  try {
    const url = new URL(request.url);
    const invoiceParams = parseInvoiceParams(url.searchParams);

    console.log("Invoice params: ", invoiceParams);

    const { total } = await invoiceService.listInvoices(invoiceParams);

    await invoiceService.deleteInvoice(params.id);

    const newTotal = total - 1;

    return {
      success: true,
      message: "Invoice deleted successfully",
      newTotal,
    };
  } catch (error) {
    return {
      error: true,
      message: error.message || "Failed to delete invoice",
    };
  }
};
