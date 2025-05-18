import { parseInvoiceParams } from "../utils/url-params";
import { invoiceService } from "../services/invoice.service";
import { organisationService } from "../../organisations/services/organisation.service";
import { currencyService } from "../../currencies/services/currency.service";

import { account } from "../../../lib/appwrite/client";

export async function invoicesLoader({ request }) {
  const url = new URL(request.url);
  const invoiceParams = parseInvoiceParams(url.searchParams);

  const invoicePromise = invoiceService.listInvoices(invoiceParams);
  return { invoices: invoicePromise };
}

export async function invoiceLoader({ params }) {
  const invoicePromise = invoiceService.getInvoice(params.id);
  return { invoice: invoicePromise };
}

export async function editInvoiceLoader({ params }) {
  const { $id: userId } = await account.get();

  const invoice = invoiceService.getInvoice(params.id);
  const currencies = currencyService.listAvailableCurrenciesByUserId(userId);

  return { invoice, currencies };
}

export async function newInvoiceLoader() {
  const { $id: userId } = await account.get();

  const organisation = organisationService.getOrganisationByUserId(userId);
  const currencies = currencyService.listAvailableCurrenciesByUserId(userId);
  const invoices = invoiceService.listInvoices();

  return { organisation, currencies, invoices };
}
