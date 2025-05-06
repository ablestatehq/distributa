import React from "react";
import { useFormikContext } from "formik";
import {
  FormikCalculatedField,
  FormikCalculatedInputField,
} from "../../../../components/common/forms/FormikFields";
import { useInvoiceCalculations } from "../../hooks";

const InvoiceSummary = () => {
  const { values } = useFormikContext();
  const { formatAmount, handleSummaryFieldChange, handleAmountPaidChange } =
    useInvoiceCalculations();

  // Handlers for specific fields
  const handleDiscountChange = (name, value, values, setFieldValue) => {
    handleSummaryFieldChange(name, value);
  };

  const handleTaxChange = (name, value, values, setFieldValue) => {
    handleSummaryFieldChange(name, value);
  };

  const handleShippingChange = (name, value, values, setFieldValue) => {
    handleSummaryFieldChange(name, value);
  };

  const handleAmountPaidFieldChange = (name, value, values, setFieldValue) => {
    handleAmountPaidChange(value);
  };

  return (
    <section className="lg:col-span-1 bg-grey rounded p-4 flex flex-col gap-y-4 w-full">
      {/* Large Devices: Title, SubTotal, Discount, Tax, Shipping, Amount Paid, Amount Due */}

      <FormikCalculatedField
        label="Subtotal"
        value={formatAmount(values.sub_total)}
      />

      <hr className="border-b border-t-0 border-greyborder" />

      <FormikCalculatedInputField
        id="discount"
        name="discount"
        label="Discount"
        placeholder="Discount"
        type="text"
        onValueChange={handleDiscountChange}
      />

      <FormikCalculatedInputField
        id="tax"
        name="tax"
        label="Tax"
        placeholder="Tax"
        type="text"
        onValueChange={handleTaxChange}
      />

      <FormikCalculatedInputField
        id="shipping"
        name="shipping"
        label="Shipping"
        placeholder="Shipping"
        type="text"
        onValueChange={handleShippingChange}
      />

      <hr className="border-b border-t-0 border-greyborder" />

      <FormikCalculatedField
        label="Amount Due"
        value={formatAmount(values.amount_due)}
      />

      <hr className="border-b border-t-0 border-greyborder" />

      <FormikCalculatedInputField
        id="amount_paid"
        name="amount_paid"
        label="Amount Paid"
        placeholder="Amount Paid"
        type="text"
        onValueChange={handleAmountPaidFieldChange}
      />

      <hr className="border-b border-t-0 border-greyborder" />

      <FormikCalculatedField
        label="Balance Due"
        value={formatAmount(values.balance_due)}
      />
    </section>
  );
};

export default InvoiceSummary;
