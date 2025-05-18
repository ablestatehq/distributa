import React from "react";
import { useCreateExternalInvoice } from "./hooks/useCreateExternalInvoice";
import InvoiceForm from "../../features/invoicing/components/InvoiceForm";
import { externalInvoiceSchema } from "../../utils/validators";

const ExternalInvoice = () => {
  const {
    invoiceNumber,
    organisation,
    availableCurrencies,
    isLoading,
    actions,
  } = useCreateExternalInvoice();

  // For external invoices, we might want to swap the billed_from and billed_to
  // since the organization is being billed rather than doing the billing
  const initialData = {
    invoice_no: invoiceNumber,
    billed_to: {
      name: organisation?.name || "",
      email: organisation?.email || "",
      address: organisation?.address || "",
    },
    billed_from: {
      name: "",
      email: "",
      address: "",
    },
    title: "External Invoice",
  };

  const handleSubmit = (values) => {
    actions.createExternalInvoice(values);
  };

  return (
    <div className="w-full h-full flex flex-col gap-y-4 pb-4">
      <section className="flex h-fit flex-shrink-0 flex-col gap-y-2">
        <header className="flex flex-col gap-y-2">
          <h1 className="font-archivo font-normal text-xl lg:text-4xl leading-110 tracking-normal">
            External Invoice
          </h1>
        </header>
        <hr className="invisible h-8" />
      </section>

      <main className="flex w-full flex-col h-fit gap-y-4 lg:pt-6">
        <InvoiceForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          submitButtonText="Record Invoice"
          availableCurrencies={availableCurrencies}
          validationSchema={externalInvoiceSchema}
          mode="external"
        />
      </main>
    </div>
  );
};

export default ExternalInvoice;
