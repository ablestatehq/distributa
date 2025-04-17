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

export async function newInvoiceLoader() {
  const { $id: userId } = await account.get();

  const organisation = organisationService.getOrganisationByUserId(userId);
  const currencies = currencyService.listAvailableCurrenciesByUserId(userId);

  // const newInvoicePromise = Promise.all([
  //   organisationPromise,
  //   availableCurrenciesPromise,
  // ]).then(([organisation, currencies]) => {
  //   return {
  //     organisationData: organisation,
  //     currencyOptions: currencies,
  //   };
  // });

  // console.log("New Invoice promise: ", newInvoicePromise);

  // return { newInvoiceInitialData: newInvoicePromise };
  return { organisation, currencies };
}
