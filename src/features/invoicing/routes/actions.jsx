import { InvoiceService } from "../../../services";

export const deleteInvoiceAction = async ({ request, params }) => {
  try {
    const url = new URL(request.url);
    const currentPage = parseInt(url.searchParams.get("page") || "0");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10");

    const { total } = await InvoiceService.getInvoices(currentPage, pageSize);

    await InvoiceService.deleteInvoice(params.id);

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

export const updateInvoiceAction = async ({ request, params }) => {
  try {
    const payload = await request.json();
    const invoice = await InvoiceService.updateInvoice(params.id, payload);

    return {
      success: true,
      invoice: invoice,
      message: "Invoice updated successfully",
    };
  } catch (error) {
    return {
      error: true,
      message: error.message || "Failed to update invoice",
    };
  }
};

export const createInvoiceAction = async ({ request }) => {
  try {
    const payload = await request.json();
    const invoice = await InvoiceService.createInvoice(payload);

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

export const updateInvoiceStatus = async ({ request, params }) => {
  try {
    const payload = await request.json();
    const invoice = await InvoiceService.updateInvoiceStatus(
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


