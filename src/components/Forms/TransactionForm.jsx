import { Formik, Form } from "formik";
import { createTransactionSchema } from "../../utils/validators";
import { useMemo } from "react";
import cn from "../../utils/cn";

import {
  TextField,
  TextAreaField,
} from "../../features/transactions/components/forms/formik";

import {
  CategorySelect,
  PartySelect,
  CommonSelect,
  Button,
} from "../common/forms";

const paymentOptions = [
  { value: "cash", label: "Cash" },
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "credit_card", label: "Credit Card" },
  { value: "debit_card", label: "Debit Card" },
  { value: "cheque", label: "Check" },
  { value: "momo", label: "Momo" },
  { value: "airtel_money", label: "Airtel Money" },
  { value: "visa", label: "Visa" },
  { value: "paypal", label: "Paypal" },
  { value: "pesapal", label: "Pesapal" },
  { value: "other", label: "Other" },
];

const transactionStatusOptions = [
  { value: "scheduled", label: "Scheduled", options: ["deferred"] },
  { value: "pending", label: "Pending", options: ["immediate", "deferred"] },
  { value: "cleared", label: "Cleared", options: ["immediate", "deferred"] },
  { value: "bounced", label: "Bounced", options: ["immediate", "deferred"] },
  { value: "failed", label: "Failed", options: ["immediate", "deferred"] },
  { value: "void", label: "Void", options: ["immediate", "deferred"] },
];

const paymentTermOptions = [
  { value: "immediate", label: "Immediate" },
  { value: "deferred", label: "Deferred" },
];

const TransactionForm = ({
  initialData = {},
  onSubmit,
  isSubmitting,
  submitButtonText = "Submit",
  categoryInfo = null,
  partyInfo = null,
}) => {
  const defaultInitialValues = {
    $id: null,
    flow_type: "expense",
    date: new Date().toISOString().split("T")[0],
    item: "",
    amount: "",
    description: "",
    payer_payee: "",
    invoice_receipt_no: "",
    payment_method: "",
    category: "",
    payment_terms: "immediate",
    transaction_status: "",
  };

  const initialValues = useMemo(() => {
    return {
      ...defaultInitialValues,
      ...initialData,
      category: categoryInfo ? categoryInfo.id : defaultInitialValues.category,
      flow_type: categoryInfo
        ? categoryInfo.type
        : defaultInitialValues.flow_type,
      payer_payee: partyInfo ? partyInfo.id : defaultInitialValues.payer_payee,
    };
  }, [initialData, categoryInfo, partyInfo]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createTransactionSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue, dirty }) => (
        <Form>
          <div className="w-full flex p-4 lg:px-16 gap-x-4">
            <button
              type="button"
              kind="secondary"
              className={`font-satoshi tracking-normal leading-100 bg-grey border disabled:border-greyborder text-black disabled:bg-grey disabled:text-greyborder hover:bg-grey px-6 py-3 text-small font-bold w-1/2 transition-all duration-75 ${cn(
                {
                  "border-transparent": values.flow_type === "income",
                  "border-black": values.flow_type === "expense",
                }
              )}`}
              onClick={() => setFieldValue("flow_type", "expense")}
              disabled={isSubmitting}
            >
              Expense
            </button>
            <button
              type="button"
              kind="secondary"
              className={`font-satoshi tracking-normal leading-100 bg-grey border disabled:border-greyborder text-black disabled:bg-grey disabled:text-greyborder hover:bg-grey px-6 py-3 text-small font-bold w-1/2 transition-all duration-75 ${cn(
                {
                  "border-transparent": values.flow_type === "expense",
                  "border-black": values.flow_type === "income",
                }
              )}`}
              onClick={() => setFieldValue("flow_type", "income")}
              disabled={isSubmitting}
            >
              Income
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 py-8 px-4 lg:px-16">
            <TextField
              label="Date"
              id="date"
              name="date"
              type="date"
              disabled={isSubmitting}
            />

            <TextField
              label="Item"
              id="item"
              name="item"
              type="text"
              placeholder="Item"
              disabled={isSubmitting}
            />

            <CommonSelect
              label="Payment Terms"
              id="payment_terms"
              name="payment_terms"
              placeholder="Select One"
              loading={false}
              optionData={paymentTermOptions}
              disabled={isSubmitting}
            />

            <CommonSelect
              label="Transaction Status"
              id="transaction_status"
              name="transaction_status"
              placeholder="Select One"
              loading={false}
              optionData={transactionStatusOptions.filter((status) =>
                status.options.includes(values.payment_terms)
              )}
              disabled={isSubmitting}
            />

            <div className="col-span-2">
              <TextField
                label="Amount"
                id="amount"
                name="amount"
                type="text"
                placeholder="Amount"
                disabled={isSubmitting}
              />
            </div>

            <div className="col-span-2">
              <TextAreaField
                label="Description"
                id="description"
                name="description"
                placeholder="Description"
                rows={4}
                disabled={isSubmitting}
              />
            </div>

            <PartySelect
              label="Payer/Payee"
              name="payer_payee"
              id="payer_payee"
              placeholder="Select Party"
              disabled={isSubmitting}
            />

            <TextField
              label="Receipt/Voucher #"
              id="invoice_receipt_no"
              name="invoice_receipt_no"
              type="text"
              placeholder="00007"
              disabled={isSubmitting}
            />

            <CommonSelect
              label="Payment Method"
              id="payment_method"
              name="payment_method"
              placeholder="Select Method"
              loading={false}
              optionData={paymentOptions}
              disabled={isSubmitting}
            />

            <CategorySelect
              label="Category"
              name="category"
              id="category"
              placeholder="Select Category"
              disabled={isSubmitting}
            />

            <Button
              type="submit"
              className="font-bold text-small col-span-2"
              disabled={isSubmitting || !dirty}
            >
              {isSubmitting ? "Processing..." : submitButtonText}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TransactionForm;
