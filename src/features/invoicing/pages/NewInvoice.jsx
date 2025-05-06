import React from "react";
import { useCreateInvoice } from "../hooks/useCreateInvoice";
import InvoiceForm from "../components/InvoiceForm";
import { newInvoiceSchema } from "../../../utils/validators";
import { ContentViewAreaWrapper } from "../../../Layouts/components";
import { formatInvoiceData } from "../utils/formatInvoiceData";

export const NewInvoicePage = () => {
  const {
    invoiceNumber,
    organisation,
    availableCurrencies,
    isLoading,
    actions,
  } = useCreateInvoice();

  const initialData = {
    invoice_no: invoiceNumber,
    billed_from: {
      name: organisation?.name || "",
      email: organisation?.email || "",
      address: organisation?.address || "",
    },
    logo: organisation?.logo_url || null,
  };

  const handleSubmit = (values) => {
    const formattedValues = formatInvoiceData(values);
    actions.createInvoice(formattedValues);
  };

  return (
    <ContentViewAreaWrapper>
      <section className="flex h-fit flex-shrink-0 flex-col gap-y-2">
        <header className="flex flex-col gap-y-2">
          <h1 className="font-archivo font-normal text-xl lg:text-4xl leading-110 tracking-normal">
            New Invoice
          </h1>
        </header>
        <hr className="invisible h-8" />
      </section>
      <main className="flex w-full flex-col h-fit gap-y-4 lg:pt-6">
        <InvoiceForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          submitButtonText="Create Invoice"
          availableCurrencies={availableCurrencies}
          validationSchema={newInvoiceSchema}
          mode="create"
        />
      </main>
    </ContentViewAreaWrapper>
  );
};
