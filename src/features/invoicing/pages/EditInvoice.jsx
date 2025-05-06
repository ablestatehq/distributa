import React from "react";
import { useInvoiceView } from "../hooks";
import InvoiceForm from "../components/InvoiceForm";
import { ContentViewAreaWrapper } from "../../../Layouts/components";
import { format, parseISO } from "date-fns";
import { useCurrencies } from "../../currencies/hooks/useCurrencies";

import { newInvoiceSchema } from "../../../utils/validators";
import { normalizeInvoiceData } from "../utils/normalizeInvoiceData";
import { formatInvoiceData } from "../utils/formatInvoiceData";

export const EditInvoicePage = () => {
  const { invoice, isLoading, isSubmitting, actions } = useInvoiceView();
  const { currencies: availableCurrencies } = useCurrencies();

  let initialData = normalizeInvoiceData(invoice);
  initialData.issue_date = format(
    parseISO(initialData.issue_date),
    "yyyy-MM-dd"
  );
  initialData.due_date = format(parseISO(initialData.due_date), "yyyy-MM-dd");

  const handleSubmit = (values) => {
    const formattedValues = formatInvoiceData(values);
    actions.updateDetails(formattedValues);
  };

  return (
    <ContentViewAreaWrapper>
      <section className="flex h-fit flex-shrink-0 flex-col gap-y-2">
        <header className="flex flex-col gap-y-2">
          <h1 className="font-archivo font-normal text-xl lg:text-4xl leading-110 tracking-normal">
            Edit Invoice
          </h1>
        </header>
        <hr className="invisible h-8" />
      </section>
      <main className="flex w-full flex-col h-fit gap-y-4 lg:pt-6">
        <InvoiceForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isLoading={isLoading || isSubmitting}
          submitButtonText="Save Invoice"
          availableCurrencies={availableCurrencies}
          validationSchema={newInvoiceSchema}
          mode="update"
        />
      </main>
    </ContentViewAreaWrapper>
  );
};
