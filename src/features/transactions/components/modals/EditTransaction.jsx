import { CircleX } from "../../../../components/common/icons";
import { Button } from "../../../../components/common/forms";
import cn from "../../../../utils/cn";
import { createPortal } from "react-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { CategoryService, AppwriteService } from "../../../../services";

import { useNavigate, useFetcher } from "react-router-dom";
import { createTransactionSchema } from "../../../../utils/validators";
import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { Query, ID } from "appwrite";
import {
  CategorySelect,
  PartySelect,
  CommonSelect,
} from "../../../../components/common/forms";
import { toast } from "react-toastify";

const appwrite = new AppwriteService();

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

const EditTransaction = ({ transaction, handleClose }) => {
  const navigate = useNavigate();

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
    const calculateStatementChanges = (
      statement,
      transaction,
      isRemoving = false,
      changes = null
    ) => {
      const {
        income,
        expense,
        number_of_transactions,
        average_transaction_amount,
        budget_utilised,
      } = statement;

      let newIncome = income;
      let newExpense = expense;
      let newBugetUtilised =
        changes?.flow_type === "expense"
          ? budget_utilised - transaction.amount
          : budget_utilised ?? 0;

      if (isRemoving) {
        if (transaction.flow_type === "income") {
          newIncome -= transaction.amount;
        } else if (transaction.flow_type === "expense") {
          newExpense -= transaction.amount;
        }

        const newAverage =
          number_of_transactions > 1
            ? (average_transaction_amount * number_of_transactions -
                transaction.amount) /
              (number_of_transactions - 1)
            : 0;

        return {
          income: newIncome,
          expense: newExpense,
          number_of_transactions: number_of_transactions - 1,
          average_transaction_amount: newAverage,
          budget_utilised: newBugetUtilised,
        };
      }

      if (changes?.flow_type) {
        if (changes.flow_type === "income") {
          newIncome += changes?.amount ?? transaction.amount;
          newExpense -= changes?.amount ?? transaction.amount;
        } else if (changes.flow_type === "expense") {
          newExpense += changes?.amount ?? transaction.amount;
          newIncome -= changes?.amount ?? transaction.amount;
        }
      }

      return {
        income: newIncome,
        expense: newExpense,
        average_transaction_amount:
          (average_transaction_amount * number_of_transactions +
            (changes?.amount
              ? changes.amount - transaction.amount
              : transaction.amount)) /
          number_of_transactions,
        number_of_transactions: number_of_transactions,
        budget_utilised: newBugetUtilised,
      };
    };

    try {
      values.amount = parseFloat(values.amount);
      const changes = getChanges(values, transaction);
      const { $id: userId } = await appwrite.account.get();

      if (changes?.date) {
        const prevMonth = format(new Date(transaction.date), "MM");
        const currentMonth = format(new Date(changes.date), "MM");
        const prevTransYrMonth = format(new Date(transaction.date), "yyyy-MM");

        if (prevMonth !== currentMonth) {
          const {
            documents: [prevStatement],
          } = await appwrite.database.listDocuments(
            appwrite.getVariables().DATABASE_ID,
            appwrite.getVariables().MONTHLY_STATEMENTS_COLLECTION_ID,
            [
              Query.equal("user_id", userId),
              Query.equal("year_month", prevTransYrMonth),
            ]
          );

          if (prevStatement) {
            const prevMonthChanges = calculateStatementChanges(
              prevStatement,
              transaction,
              true,
              changes
            );

            const {
              documents: [largerTransaction],
            } = await appwrite.database.listDocuments(
              appwrite.getVariables().DATABASE_ID,
              appwrite.getVariables().TRANSACTIONS_COLLECTION_ID,
              [Query.orderDesc("amount"), Query.limit(1)]
            );

            await appwrite.database.updateDocument(
              appwrite.getVariables().DATABASE_ID,
              appwrite.getVariables().MONTHLY_STATEMENTS_COLLECTION_ID,
              prevStatement.$id,
              {
                ...prevMonthChanges,
                largest_transaction_amount: largerTransaction?.amount || 0,
              }
            );
          }

          const newYrMonth = format(new Date(changes.date), "yyyy-MM");
          const {
            documents: [newStatement],
          } = await appwrite.database.listDocuments(
            appwrite.getVariables().DATABASE_ID,
            appwrite.getVariables().MONTHLY_STATEMENTS_COLLECTION_ID,
            [
              Query.equal("user_id", userId),
              Query.equal("year_month", newYrMonth),
            ]
          );

          if (newStatement) {
            const newMonthChanges = calculateStatementChanges(
              newStatement,
              transaction,
              false,
              changes
            );

            await appwrite.database.updateDocument(
              appwrite.getVariables().DATABASE_ID,
              appwrite.getVariables().MONTHLY_STATEMENTS_COLLECTION_ID,
              newStatement.$id,
              newMonthChanges
            );
          } else {
            await appwrite.database.createDocument(
              appwrite.getVariables().DATABASE_ID,
              appwrite.getVariables().MONTHLY_STATEMENTS_COLLECTION_ID,
              ID.unique(),
              {
                user_id: userId,
                year_month: newYrMonth,
                income: values.flow_type === "income" ? values.amount : 0,
                expense: values.flow_type === "expense" ? values.amount : 0,
                budget_utilised: 0,
                recurring_expenses: 0,
                savings_amount: 0,
                number_of_transactions: 1,
                average_transaction_amount: values.amount,
                largest_transaction_amount: values.amount,
              }
            );
          }
        }
      } else if (changes?.flow_type) {
        const yearMonth = format(new Date(values.date), "yyyy-MM");

        const {
          documents: [currentMonthStatement],
        } = await appwrite.database.listDocuments(
          appwrite.getVariables().DATABASE_ID,
          appwrite.getVariables().MONTHLY_STATEMENTS_COLLECTION_ID,
          [Query.equal("user_id", userId), Query.equal("year_month", yearMonth)]
        );

        if (currentMonthStatement) {
          const statementChanges = calculateStatementChanges(
            currentMonthStatement,
            transaction,
            false,
            changes
          );

          await appwrite.database.updateDocument(
            appwrite.getVariables().DATABASE_ID,
            appwrite.getVariables().MONTHLY_STATEMENTS_COLLECTION_ID,
            currentMonthStatement.$id,
            statementChanges
          );
        }
      }

      const updatedTransaction = await appwrite.database.updateDocument(
        appwrite.getVariables().DATABASE_ID,
        appwrite.getVariables().TRANSACTIONS_COLLECTION_ID,
        transaction.$id,
        changes
      );

      if (updatedTransaction) {
        toast.success("Transaction successfully updated");
        setSubmitting(false);
        navigate("/transactions");
      }
    } catch (error) {
      console.error("Error updating transaction:", error);
      throw error;
    } finally {
      setSubmitting(false);
      handleClose();
    }
  };

  const loadingCategoriesParties = loadingCategories || loadingParties;

  const fetchCategories = async () => {
    const categories = await CategoryService.getCategoryTree();
    const groupCategories = groupCategoryByType(categories);
    setCategories(() => groupCategories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const getChanges = (formValues, transaction) => {
    const changes = {};
    for (const key in formValues) {
      if (key === "category") {
        if (
          transaction?.category &&
          formValues[key] !== transaction[key]?.$id
        ) {
          changes[key] = formValues[key];
        } else if (transaction[key] === null && formValues[key]) {
          changes[key] = formValues[key];
        }

        continue;
      } else if (key === "payer_payee") {
        if (
          transaction?.payer_payee &&
          formValues[key] !== transaction[key]?.$id
        ) {
          changes[key] = formValues[key];
        } else if (transaction[key] === null && formValues[key]) {
          changes[key] = formValues[key];
        }

        continue;
      } else if (key === "date") {
        if (
          formValues[key] !== format(new Date(transaction[key]), "yyyy-MM-dd")
        ) {
          changes[key] = formValues[key];
        } else if (transaction[key] === null && formValues[key]) {
          changes[key] = formValues[key];
        }

        continue;
      } else if (key === "$permissions" || key === "invoice_ref") {
        continue;
      } else if (formValues[key] !== transaction[key]) {
        changes[key] = formValues[key];
      }
    }

    return Object.keys(changes).length > 0 ? changes : null;
  };

  return createPortal(
    <main className="fixed top-0 bg-black bg-opacity-45 h-screen w-screen flex justify-center items-end lg:items-center">
      <section className="w-96 lg:w-[36rem] h-fit max-h-full overflow-y-auto flex flex-col bg-white">
        <header className="flex justify-between w-full bg-grey p-4">
          <h5 className="font-archivo font-normal text-small leading-150 tracking-normal">
            Edit Current Transaction
          </h5>
          <button type="button" onClick={handleClose}>
            <CircleX variation="black" className="w-4 h-4" />
          </button>
        </header>
        <Formik
          initialValues={{
            ...transaction,
            payer_payee: transaction?.payer_payee?.$id ?? null,
            category: transaction?.category?.$id ?? null,
            date: format(new Date(transaction.date), "yyyy-MM-dd"),
          }}
          validationSchema={createTransactionSchema}
          onSubmit={handleSubmit}
        >
          {({ values, touched, errors, isSubmitting, setFieldValue }) => {
            return (
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
                    disabled={isSubmitting || loadingCategoriesParties}
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
                    disabled={isSubmitting || loadingCategoriesParties}
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
                      disabled={isSubmitting || loadingCategoriesParties}
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
                      disabled={isSubmitting || loadingCategoriesParties}
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
                    disabled={isSubmitting || loadingCategoriesParties}
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
                    disabled={isSubmitting || loadingCategoriesParties}
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
                      disabled={isSubmitting || loadingCategoriesParties}
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
                      disabled={isSubmitting || loadingCategoriesParties}
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
                    disabled={isSubmitting || loadingCategoriesParties}
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
                      disabled={isSubmitting || loadingCategoriesParties}
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
                    disabled={isSubmitting || loadingCategoriesParties}
                  />

                  <CategorySelect
                    label="Category"
                    name="category"
                    id="category"
                    placeholder="Select Category"
                    loading={loadingCategories}
                    optionData={groupedCategories}
                    disabled={isSubmitting || loadingCategoriesParties}
                  />

                  <Button
                    type="submit"
                    className="font-bold text-small col-span-2"
                    disabled={
                      !getChanges(values, transaction) ||
                      isSubmitting ||
                      loadingCategories ||
                      loadingParties ||
                      (!loadingCategories &&
                        categories &&
                        categories?.total === 0) ||
                      (!loadingParties && parties && parties?.total === 0)
                    }
                  >
                    {isSubmitting ? "Updating Transaction ..." : "Update"}
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </section>
    </main>,
    document.getElementById("portal")
  );
};

export default EditTransaction;
