import React, { useMemo, useEffect } from "react";
import { Formik, Form } from "formik";
import { newInvoiceSchema } from "../../../../utils/validators";
import { Button } from "../../../../components/common/forms";

import InvoiceHeader from "./InvoiceHeader";
import BillingInfo from "./BillingInfo";
import InvoiceDetails from "./InvoiceDetails";
import InvoiceItems from "./InvoiceItems";
import InvoiceSummary from "./InvoiceSummary";
import NotesAndTerms from "./NotesAndTerms";

import useMediaQuery from "../../../../hooks/useMediaQuery";

// Use React.memo for components that don't need frequent re-renders
const MemoizedBillingInfo = React.memo(BillingInfo);
const MemoizedInvoiceDetails = React.memo(InvoiceDetails);
const MemoizedNotesAndTerms = React.memo(NotesAndTerms);

/**
 * Reusable Invoice Form component
 * @param {Object} props - Component props
 * @param {Object} props.initialData - Initial data for the form
 * @param {Function} props.onSubmit - Function to call on form submission
 * @param {boolean} props.isLoading - Loading state for the submit button
 * @param {string} props.submitButtonText - Text for the submit button
 * @param {Array} props.availableCurrencies - Available currencies for selection
 * @param {Object} props.validationSchema - Validation schema (defaults to newInvoiceSchema)
 * @param {string} props.mode - Form mode: 'create', 'edit', or 'external'
 * @returns {JSX.Element} Invoice form component
 */
const InvoiceForm = ({
  initialData,
  onSubmit,
  isLoading = false,
  submitButtonText = "Create Invoice",
  availableCurrencies = [],
  validationSchema = newInvoiceSchema,
  mode = "create",
}) => {
  // check if the screen is Desktop
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Memoize options that don't change
  const paperSizeOptions = useMemo(
    () => [
      { value: "", label: "Select One" },
      { value: "a6", label: "A6" },
      { value: "a5", label: "A5" },
      { value: "a4", label: "A4" },
      { value: "letter", label: "Letter" },
    ],
    []
  );

  const orientationOptions = useMemo(
    () => [
      { value: "", label: "Select One" },
      { value: "portrait", label: "Portrait" },
      { value: "landscape", label: "Landscape" },
    ],
    []
  );

  // Default initial values
  const defaultInitialValues = {
    logo: null,
    paper_size: "a4",
    orientation: "portrait",
    currency: "UGX",
    billed_from: {
      name: "",
      email: "",
      address: "",
    },
    billed_to: {
      name: "",
      email: "",
      address: "",
    },
    title: "Invoice",
    invoice_no: "",
    issue_date: new Date().toISOString().split("T")[0],
    due_date: "",
    items: [
      {
        title: "",
        quantity: "",
        units: "",
        price: "",
      },
    ],
    sub_total: 0,
    discount: "",
    tax: "",
    shipping: "",
    amount_due: 0,
    amount_paid: "",
    balance_due: 0,
    notes: "",
    terms: "",
  };

  // Merge default values with provided initial data
  const formInitialValues = useMemo(
    () => ({
      ...defaultInitialValues,
      ...initialData,
    }),
    [initialData]
  );

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {() => (
        <Form className="flex flex-col gap-y-4 w-full">
          <InvoiceHeader
            paperSizeOptions={paperSizeOptions}
            orientationOptions={orientationOptions}
            currencies={availableCurrencies}
            submitButtonText={submitButtonText}
            isLoading={isLoading}
          />

          <section className="grid grid-cols-1 lg:grid-cols-5 gap-x-2">
            <section className="lg:col-span-4 flex flex-col gap-y-4">
              <MemoizedBillingInfo mode={mode} />
              {!isDesktop && <MemoizedInvoiceDetails mode={mode} />}
              <InvoiceItems mode={mode} />
              {!isDesktop && <InvoiceSummary mode={mode} />}
              <MemoizedNotesAndTerms mode={mode} />
            </section>

            {isDesktop && (
              <section className="col-span-1 flex flex-col gap-y-4">
                <MemoizedInvoiceDetails mode={mode} />
                <InvoiceSummary mode={mode} />
              </section>
            )}
          </section>

          <Button
            type="submit"
            className="lg:hidden py-3 font-satoshi font-bold text-small leading-100 "
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : submitButtonText}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default InvoiceForm;
