import { CircleX } from "../common/icons";
import { Button } from "../common/forms";
import cn from "../../utils/cn";
import { createPortal } from "react-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { TransactionService, BalancesService } from "../../services";
import { useNavigate, useFetcher } from "react-router-dom";
import { createTransactionSchema } from "../../utils/validators";
import { useEffect, useState, useCallback } from "react";
import { CategorySelect, PartySelect, CommonSelect } from "../common/forms";

const initialValues = {
  $id: null,
  flow_type: "expense",
  date: "",
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

const paymentOptions = [
  { value: "", label: "Select One" },
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
  { value: "", label: "Select one" },
  { value: "immediate", label: "Immediate" },
  { value: "deferred", label: "Deferred" },
];

const CreateTransaction = ({ handleClose }) => {
  const categoriesFetcher = useFetcher();
  const partiesFetcher = useFetcher();

  const [categories, setCategories] = useState(null);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [groupedCategories, setGroupedCategories] = useState({});

  const [parties, setParties] = useState(null);
  const [loadingParties, setLoadingParties] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoadingCategories(true);
      setLoadingParties(true);

      categoriesFetcher.load("/settings/categories");
      partiesFetcher.load("/settings/parties");
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, []);

  useEffect(() => {
    if (
      categoriesFetcher.state === "idle" &&
      categoriesFetcher.data?.categoryList
    ) {
      setCategories(() => categoriesFetcher.data.categoryList);
      setGroupedCategories(() =>
        groupCategoryByType(categoriesFetcher.data.categoryList.documents)
      );
      setLoadingCategories(false);
    }
  }, [categoriesFetcher.state, categoriesFetcher.data?.categoryList]);

  useEffect(() => {
    if (partiesFetcher.state === "idle" && partiesFetcher.data?.parties) {
      setParties(() => partiesFetcher.data.parties);
      setLoadingParties(false);
    }
  }, [partiesFetcher.state, partiesFetcher.data?.parties]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const groupCategoryByType = (categories) => {
    const groupedCategories = categories.reduce((acc, category) => {
      const type = category.type || "other";
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(category);
      return acc;
    }, {});

    return groupedCategories;
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    values.amount = parseFloat(values.amount);

    try {
      await TransactionService.createTransaction(values);
      await BalancesService.updateBalances(
        parseFloat(values.amount),
        values.flow_type,
        values.date,
        values.category
      );
      navigate(`/transactions`);
    } catch (error) {
      console.log("Error: ", error);
      throw error;
    } finally {
      setSubmitting(false);
      handleClose();
    }
  };

  return createPortal(
    <main className="fixed top-0 bg-black bg-opacity-45 h-screen w-screen flex justify-center items-end lg:items-center">
      <section className="w-96 lg:w-[36rem] h-fit max-h-full overflow-y-auto flex flex-col bg-white">
        <header className="flex justify-between w-full bg-grey p-4">
          <h5 className="font-archivo font-normal text-small leading-150 tracking-normal">
            Add New Transaction
          </h5>
          <button type="button" onClick={handleClose}>
            <CircleX variation="black" className="w-4 h-4" />
          </button>
        </header>
        <Formik
          initialValues={initialValues}
          validationSchema={createTransactionSchema}
          onSubmit={handleSubmit}
        >
          {({ values, touched, errors, isSubmitting, setFieldValue }) => (
            <Form>
              <div className="w-full flex p-4 lg:px-16 gap-x-4">
                <button
                  type="button"
                  kind="secondary"
                  className={`font-satoshi tracking-normal leading-100 bg-grey border disabled:border-greyborder text-black disabled:bg-grey disabled:text-greyborder  hover:bg-grey px-6 py-3 text-small font-bold w-1/2 transition-all duration-75 ${cn(
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
                  className={`font-satoshi tracking-normal leading-100 bg-grey border disabled:border-greyborder text-black disabled:bg-grey disabled:text-greyborder  hover:bg-grey px-6 py-3 text-small font-bold w-1/2 transition-all duration-75 ${cn(
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
                <div className="w-full flex flex-col gap-y-2">
                  <label
                    htmlFor="date"
                    className="font-satoshi font-normal text-small leading-100 tracking-normal"
                  >
                    Date
                  </label>
                  <Field
                    id="date"
                    name="date"
                    type="date"
                    className={cn(
                      "w-full border border-greyborder focus:border-accent p-3 bg-white font-satoshi font-normal text-tiny outline-none placeholder-black leading-100 tracking-0 appearance-none",
                      {
                        "border-error focus:border-error":
                          touched?.date && errors?.date,
                      }
                    )}
                    disabled={isSubmitting}
                  />
                  <ErrorMessage name="date">
                    {(msg) => (
                      <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <div className="w-full flex flex-col gap-y-2">
                  <label
                    htmlFor="item"
                    className="font-satoshi font-normal text-small leading-100 tracking-normal"
                  >
                    Item
                  </label>
                  <Field
                    id="item"
                    name="item"
                    type="text"
                    placeholder="Item"
                    className={cn(
                      "w-full border border-greyborder focus:border-accent p-3 bg-white font-satoshi font-normal text-tiny outline-none placeholder-black leading-100 tracking-0 appearance-none",
                      {
                        "border-error focus:border-error":
                          touched?.item && errors?.item,
                      }
                    )}
                    disabled={isSubmitting}
                  />
                  <ErrorMessage name="item">
                    {(msg) => (
                      <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <CommonSelect
                  label="Payment Terms"
                  id="payment_terms"
                  name="payment_terms"
                  placeholder="Select One"
                  loading={false}
                  optionData={paymentTermOptions}
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
                />
                <div className="col-span-2 flex flex-col gap-y-2">
                  <label
                    htmlFor="amount"
                    className="font-satoshi font-normal text-small leading-100 tracking-normal"
                  >
                    Amount
                  </label>
                  <Field
                    id="amount"
                    name="amount"
                    type="text"
                    placeholder="Amount"
                    className={cn(
                      "w-full border border-greyborder focus:border-accent p-3 bg-white font-satoshi font-normal text-tiny outline-none placeholder-black leading-100 tracking-0 appearance-none",
                      {
                        "border-error focus:border-error":
                          touched?.amount && errors?.amount,
                      }
                    )}
                    disabled={isSubmitting}
                  />
                  <ErrorMessage name="amount">
                    {(msg) => (
                      <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <div className="col-span-2 w-full flex flex-col gap-y-2">
                  <label
                    htmlFor="description"
                    className="font-satoshi font-normal text-small leading-100 tracking-normal"
                  >
                    Description
                  </label>
                  <Field
                    id="description"
                    name="description"
                    type="text"
                    placeholder="Description"
                    as="textarea"
                    rows="4"
                    className={cn(
                      "w-full border border-greyborder focus:border-accent p-3 bg-white font-satoshi font-normal text-tiny outline-none placeholder-black leading-100 tracking-0 appearance-none resize-none rounded-sm",
                      {
                        "border-error focus:border-error":
                          touched?.description && errors?.description,
                      }
                    )}
                    disabled={isSubmitting}
                  />
                  <ErrorMessage name="description">
                    {(msg) => (
                      <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>

                <PartySelect
                  label="Payer/Payee"
                  name="payer_payee"
                  id="payer_payee"
                  loading={loadingParties}
                  optionData={parties}
                />

                <div className="flex flex-col gap-y-2">
                  <label
                    htmlFor="invoice_receipt_no"
                    className="font-satoshi font-normal text-small leading-100 tracking-normal"
                  >
                    Receipt/Voucher #
                  </label>
                  <Field
                    id="invoice_receipt_no"
                    name="invoice_receipt_no"
                    type="text"
                    placeholder="00007"
                    className={cn(
                      "w-full border border-greyborder focus:border-accent p-3 bg-white font-satoshi font-normal text-tiny outline-none placeholder-black leading-100 tracking-0 appearance-none",
                      {
                        "border-error focus:border-error":
                          touched?.invoice_receipt_no &&
                          errors?.invoice_receipt_no,
                      }
                    )}
                    disabled={isSubmitting}
                  />
                  <ErrorMessage name="invoice_receipt_no">
                    {(msg) => (
                      <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>

                <CommonSelect
                  label="Payment Method"
                  id="payment_method"
                  name="payment_method"
                  placeholder="Select Method"
                  loading={false}
                  optionData={paymentOptions}
                />

                <CategorySelect
                  label="Category"
                  name="category"
                  id="category"
                  placeholder="Select Category"
                  loading={loadingCategories}
                  optionData={groupedCategories}
                />

                <Button
                  type="submit"
                  className="font-bold text-small col-span-2"
                  disabled={
                    isSubmitting ||
                    loadingCategories ||
                    loadingParties ||
                    (!loadingCategories &&
                      categories &&
                      categories?.total === 0) ||
                    (!loadingParties && parties && parties?.total === 0)
                  }
                >
                  {isSubmitting ? "Adding Transaction ..." : "Add"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </main>,
    document.getElementById("portal")
  );
};

export default CreateTransaction;
