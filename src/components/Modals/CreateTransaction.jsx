import { CircleX } from "../common/icons";
import { Button } from "../common/forms";
import cn from "../../utils/cn";
import { createPortal } from "react-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  TransactionService,
  BalancesService,
  CategoryService,
} from "../../services";
import { useNavigate } from "react-router-dom";
import { createTransactionSchema } from "../../utils/validators";
import { useEffect, useState } from "react";
import { groupBy, map } from "lodash";

const CreateTransaction = ({ handleClose }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState({ income: [], expense: [] });

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

  const groupCategoryByType = (categories) => {
    const groupedCategories = groupBy(
      categories,
      (category) => category.type === "income"
    );
    const income = groupedCategories["true"] || [];
    const expense = groupedCategories["false"] || [];
    return {
      income,
      expense,
    };
  };

  // const initialValues = {
  //   type: "expense",
  //   date: "2024-11-06",
  //   item: "Office Supplies",
  //   amount: "125.5",
  //   description:
  //     "Monthly office supplies including paper, pens, and printer ink.",
  //   payer_payee: "Office Depot",
  //   invoice_receipt_no: "INV-2024-0315",
  //   payment_method: "credit_card",
  //   category: "672238bc0024bf1cc549",
  // };

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

  const fetchCategories = async () => {
    const categories = await CategoryService.getCategoryTree();
    const groupCategories = groupCategoryByType(categories);
    setCategories(() => groupCategories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
                <div className="w-full flex flex-col gap-y-2">
                  <label
                    htmlFor="payment_timing"
                    className="font-satoshi font-normal text-small leading-100 tracking-normal"
                  >
                    Payment Terms
                  </label>
                  <div className="relative w-full">
                    <Field
                      id="payment_terms"
                      name="payment_terms"
                      className={cn(
                        "w-full border border-greyborder focus:border-accent px-3 py-3.5 pr-10 bg-white font-satoshi font-normal text-tiny outline-none placeholder-black leading-100 tracking-0 appearance-none",
                        {
                          "border-error focus:border-error":
                            touched?.payment_terms && errors?.payment_terms,
                        }
                      )}
                      as="select"
                      disabled={isSubmitting}
                    >
                      <option value="">Select one</option>
                      <option value="immediate">Immediate</option>
                      <option value="deferred">Deferred</option>
                    </Field>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-greyborder h-4 w-4 "
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                  <ErrorMessage name="payment_terms">
                    {(msg) => (
                      <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <div className="w-full flex flex-col gap-y-2">
                  <label
                    htmlFor="transaction_status"
                    className="font-satoshi font-normal text-small leading-100 tracking-normal"
                  >
                    Transaction Status
                  </label>
                  <div className="relative w-full">
                    <Field
                      id="transaction_status"
                      name="transaction_status"
                      className={cn(
                        "w-full border border-greyborder focus:border-accent px-3 py-3.5 pr-10 bg-white font-satoshi font-normal text-tiny outline-none placeholder-black leading-100 tracking-0 appearance-none",
                        {
                          "border-error focus:border-error":
                            touched?.transaction_status &&
                            errors?.transaction_status,
                        }
                      )}
                      as="select"
                      disabled={isSubmitting}
                    >
                      <option value="">Select one</option>
                      {values.payment_terms === "immediate" ? (
                        <>
                          <option value="pending">Pending</option>
                          <option value="cleared">Cleared</option>
                          <option value="bounced">Bounced</option>
                          <option value="failed">Failed</option>
                          <option value="void">Void</option>
                        </>
                      ) : (
                        <>
                          <option value="scheduled">Scheduled</option>
                          <option value="pending">Pending</option>
                          <option value="cleared">Cleared</option>
                          <option value="bounced">Bounced</option>
                          <option value="failed">Failed</option>
                          <option value="void">Void</option>
                        </>
                      )}
                    </Field>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-greyborder h-4 w-4 "
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                  <ErrorMessage name="transaction_status">
                    {(msg) => (
                      <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
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
                <div className="flex flex-col gap-y-2">
                  <label
                    htmlFor="payer_payee"
                    className="font-satoshi font-normal text-small leading-100 tracking-normal"
                  >
                    Payer/Payee
                  </label>
                  <Field
                    id="payer_payee"
                    name="payer_payee"
                    type="text"
                    placeholder="Payee/Payee"
                    className={cn(
                      "w-full border border-greyborder focus:border-accent p-3 bg-white font-satoshi font-normal text-tiny outline-none placeholder-black leading-100 tracking-0 appearance-none",
                      {
                        "border-error focus:border-error":
                          touched?.payer_payee && errors?.payer_payee,
                      }
                    )}
                    disabled={isSubmitting}
                  />
                  <ErrorMessage name="payer_payee">
                    {(msg) => (
                      <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
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
                <div className="w-full flex flex-col gap-y-2">
                  <label
                    htmlFor="payment_method"
                    className="font-satoshi font-normal text-small leading-100 tracking-normal"
                  >
                    Payment Method
                  </label>
                  <div className="relative w-full">
                    <Field
                      id="payment_method"
                      name="payment_method"
                      className={cn(
                        "w-full border border-greyborder focus:border-accent px-3 py-3.5 pr-10 bg-white font-satoshi font-normal text-tiny outline-none placeholder-black leading-100 tracking-0 appearance-none",
                        {
                          "border-error focus:border-error":
                            touched?.payment_method && errors?.payment_method,
                        }
                      )}
                      as="select"
                      disabled={isSubmitting}
                    >
                      <option value="">Select one</option>
                      <option value="cash">Cash</option>
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="credit_card">Credit Card</option>
                      <option value="debit_card">Debit Card</option>
                      <option value="cheque">Check</option>
                      <option value="momo">Momo</option>
                      <option value="airtel_money">Airtel Money</option>
                      <option value="visa">Visa</option>
                      <option value="paypal">Paypal</option>
                      <option value="pesapal">Pesapal</option>
                      <option value="other">Other</option>
                    </Field>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-greyborder h-4 w-4 "
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                  <ErrorMessage name="payment_method">
                    {(msg) => (
                      <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <div className="w-full flex flex-col gap-y-2">
                  <label
                    htmlFor="category"
                    className="font-satoshi font-normal text-small leading-100 tracking-normal"
                  >
                    Category
                  </label>
                  <div className="relative w-full">
                    <Field
                      id="category"
                      name="category"
                      className={cn(
                        "w-full border border-greyborder focus:border-accent px-3 py-3.5 pr-10 bg-white font-satoshi font-normal text-tiny outline-none placeholder-black leading-100 tracking-0 appearance-none",
                        {
                          "border-error focus:border-error":
                            touched?.category && errors?.category,
                        }
                      )}
                      as="select"
                      disabled={isSubmitting}
                    >
                      <option value="">Select one</option>
                      {values.flow_type === "income"
                        ? categories.income.map((category) => (
                            <option key={category.$id} value={category.$id}>
                              {category.name}
                            </option>
                          ))
                        : values.flow_type === "expense"
                        ? categories.expense.map((category) => (
                            <option key={category.$id} value={category.$id}>
                              {category.name}
                            </option>
                          ))
                        : null}
                    </Field>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-greyborder h-4 w-4 "
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                  <ErrorMessage name="category">
                    {(msg) => (
                      <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>

                <Button
                  type="submit"
                  className="font-bold text-small col-span-2"
                  disabled={isSubmitting}
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
