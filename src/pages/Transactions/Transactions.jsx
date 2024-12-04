import { ContentViewAreaWrapper } from "../../Layouts/components";
import { Button } from "../../components/common/forms";
import { Book } from "../../components/common/icons";
import { useLoaderData, Await } from "react-router-dom";
import { CreateTransaction, TransactionDetails } from "../../components/Modals";
import { useState, useCallback, useEffect, Suspense, useMemo } from "react";
import { groupBy, map, sumBy } from "lodash";
import { format, parse } from "date-fns";
import TransactionRow from "../../features/transactions/components/table/TransactionRow";
import { appwrite } from "../../lib/appwrite";
import { DATABASE_ID, TRANSACTIONS_COLLECTION_ID } from "../../data/constants";
import formatCurrency from "../../utils/format.currency";

const Transactions = () => {
  const loaderData = useLoaderData();

  const [createTransaction, setCreateTransaction] = useState(false);
  const [showTransactionDetails, setShowTransactionDetails] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);

  const toggleCreateTransactionModal = () =>
    setCreateTransaction((createTransaction) => !createTransaction);

  const toggleTransactionDetailsModal = () =>
    setShowTransactionDetails(
      (showTransactionDetails) => !showTransactionDetails
    );

  return (
    <ContentViewAreaWrapper>
      <section className="flex-1 flex flex-col gap-y-2">
        <header className="flex flex-col gap-y-2">
          <h1 className="font-archivo font-normal text-xl lg:text-4xl leading-110 tracking-normal">
            My Transactions
          </h1>
          <hr className="invisible h-8" />
        </header>
        <div className="flex-1 flex flex-col lg:flex-row-reverse md:gap-x-4">
          <Suspense
            fallback={
              <div className="flex flex-col gap-y-2 lg:w-1/3">
                <section className="flex flex-col gap-y-2">
                  <div className="flex gap-x-2">
                    <article className="flex flex-col gap-y-2 w-1/2 px-4 py-8 rounded-lg bg-grey/20 animate-pulse">
                      <div className="h-7 w-16 bg-grey/40 rounded"></div>
                      <div className="h-4 w-24 bg-grey/40 rounded"></div>
                    </article>
                    <article className="flex flex-col gap-y-2 w-1/2 px-4 py-8 rounded-lg bg-grey/20 animate-pulse">
                      <div className="h-7 w-16 bg-grey/40 rounded"></div>
                      <div className="h-4 w-24 bg-grey/40 rounded"></div>
                    </article>
                  </div>
                  <div className="w-full h-12 bg-grey rounded-lg animate-pulse"></div>
                  <div className="w-full h-12 bg-grey rounded-lg animate-pulse"></div>
                </section>
              </div>
            }
          >
            <Await resolve={loaderData?.currentMonthSummary}>
              {(data) => {
                const income =
                  data?.total > 0 ? data.documents?.[0]?.income : "N/A";
                const expense =
                  data?.total > 0 ? data.documents?.[0]?.expense : "N/A";

                return (
                  <div className="flex flex-col gap-y-2 lg:w-1/3">
                    <section className="flex flex-col gap-y-2">
                      <div className="flex gap-x-2">
                        <article className="flex flex-col gap-y-2 w-1/2 px-4 py-8 rounded-lg bg-grey">
                          <Suspense
                            fallback={
                              <h3 className="font-archivo font-normal text-xl leading-120 tracking-0 w-10 h-4 bg-gray-100 animate-pulse"></h3>
                            }
                          >
                            <Await resolve={loaderData?.currencyPreferences}>
                              {(currencyPreferences) => {
                                return (
                                  <h3 className="font-archivo font-normal text-xl leading-120 tracking-0">
                                    {currencyPreferences?.preferredCurrency &&
                                    income !== "N/A"
                                      ? formatCurrency(
                                          income,
                                          currencyPreferences.preferredCurrency
                                        )
                                      : income}
                                  </h3>
                                );
                              }}
                            </Await>
                          </Suspense>
                          <p className="font-satoshi font-regular text-tiny leading-100 tracking-normal">
                            Income this month
                          </p>
                        </article>
                        <article className="flex flex-col gap-y-2 w-1/2 px-4 py-8 rounded-lg bg-grey">
                          <Suspense
                            fallback={
                              <h3 className="font-archivo font-normal text-xl leading-120 tracking-0 w-10 h-4 bg-gray-100 animate-pulse"></h3>
                            }
                          >
                            <Await resolve={loaderData?.currencyPreferences}>
                              {(currencyPreferences) => {
                                return (
                                  <h3 className="font-archivo font-normal text-xl leading-120 tracking-0">
                                    {currencyPreferences?.preferredCurrency &&
                                    expense !== "N/A"
                                      ? formatCurrency(
                                          expense,
                                          currencyPreferences.preferredCurrency
                                        )
                                      : expense}
                                  </h3>
                                );
                              }}
                            </Await>
                          </Suspense>
                          <p className="font-satoshi font-regular text-tiny leading-100 tracking-normal">
                            Expenses this month
                          </p>
                        </article>
                      </div>
                      <Button
                        type="button"
                        className="w-full px-6 py-3 font-bold text-small"
                        kind="plain"
                        disabled={!(income || expense)}
                        // Todo Implement the code that exports this into an income report for this month.
                      >
                        Export PDF Report
                      </Button>
                      <Button
                        type="button"
                        className="w-full px-6 py-3 font-bold text-small"
                        onClick={toggleCreateTransactionModal}
                      >
                        Add New
                      </Button>
                    </section>
                  </div>
                );
              }}
            </Await>
          </Suspense>

          <hr className="invisible h-8 lg:hidden" />
          <main className="flex-1 flex justify-center items-center lg:w-2/3 lg:bg-grey rounded-lg">
            <Suspense
              fallback={
                <ul className="h-full w-full animate-pulse flex flex-col bg-white gap-y-4 justify-center items-center">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <li
                      key={index}
                      className="w-full h-36 bg-grey animate-pulse rounded-lg"
                    ></li>
                  ))}
                </ul>
              }
            >
              <Await resolve={loaderData?.transactions}>
                {(data) => {
                  if (data?.total > 0)
                    return <TransactionList data={data.documents} />;

                  return (
                    <article className="flex flex-col items-center gap-y-4">
                      <div className="flex justify-center items-center rounded-full bg-grey w-24 h-24">
                        <Book variation="black" />
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <h3 className="font-archivo font-normal text-xl leading-120 tracking-normal text-center">
                          No Transactions
                        </h3>
                        <p className="font-satoshi font-normal text-medium leading-150 tracking-normal text-center">
                          You haven't created any transaction yet.
                        </p>
                      </div>
                      <Button
                        className="w-fit px-12 py-3 font-bold text-medium"
                        onClick={toggleCreateTransactionModal}
                      >
                        Create Transaction
                      </Button>
                    </article>
                  );
                }}
              </Await>
            </Suspense>
          </main>
        </div>
      </section>
      {createTransaction && (
        <CreateTransaction handleClose={toggleCreateTransactionModal} />
      )}
      {showTransactionDetails && transactionDetails && (
        <TransactionDetails
          handleClose={() => {
            setTransactionDetails(null);
            toggleTransactionDetailsModal();
          }}
          transaction={transactionDetails}
        />
      )}
    </ContentViewAreaWrapper>
  );
};

function TransactionList({ data }) {
  const [transactions, setTransactions] = useState(data);
  const loaderData = useLoaderData();

  const transactionList = useMemo(() => {
    const grouped = groupBy(transactions, (transaction) =>
      format(transaction.date, "yyyy-MM-dd")
    );

    return map(grouped, (groupedTransactions, date) => ({
      date,
      transactions: groupedTransactions || [],
    }));
  }, [transactions]);

  const formatDateString = useCallback((dateString) => {
    const date = parse(dateString, "yyyy-MM-dd", new Date());
    return format(date, "MMMM d");
  }, []);

  /**
   * @function getNetBalance
   * @description returns the difference between the total income and expenditure of a days transactions
   * @param { Array } transactions An array of transactions
   * @returns { number } The difference between the income and expenditure
   */
  const getNetBalance = useCallback((transactions) => {
    const groupedByType = groupBy(transactions, "flow_type");
    const totalIncome = sumBy(groupedByType["income"] || [], "amount") || 0;
    const totalExpenditure =
      sumBy(groupedByType["expense"] || [], "amount") || 0;
    return totalIncome - totalExpenditure;
  }, []);

  const getPrefix = useCallback((amount) => (amount < 0 ? "-" : "+"), []);

  const handleCreate = useCallback((transaction) => {
    setTransactions((transactions) => [transaction, ...transactions]);
  }, []);

  const handleUpdate = useCallback((updatedTransaction) => {
    setTransactions((transactions) =>
      transactions.map((transaction) => {
        if (transaction.$id === updatedTransaction.$id) {
          return updatedTransaction;
        }
        return transaction;
      })
    );
  }, []);

  const handleDelete = useCallback((transactionId) => {
    setTransactions((transactions) =>
      transactions.filter((transaction) => transaction.$id !== transactionId)
    );
  }, []);

  useEffect(() => {
    const unsubscribe = appwrite.client.subscribe(
      `databases.${DATABASE_ID}.collections.${TRANSACTIONS_COLLECTION_ID}.documents`,
      (response) => {
        console.log(response.events);
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          handleCreate(response.payload);
        } else if (
          response.events.includes(
            "databases.*.collections.*.documents.*.update"
          )
        ) {
          handleUpdate(response.payload);
        } else if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          handleDelete(response.payload.$id);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <ul className="flex flex-col h-full w-full  gap-y-4 bg-white">
      {transactionList.map(({ date, transactions }) => {
        const netBalance = getNetBalance(transactions);
        const prefix = getPrefix(netBalance);

        return (
          <li
            key={date}
            className="flex flex-col gap-y-2 p-4 rounded-lg bg-grey overflow-x-auto"
          >
            <header className="flex justify-between">
              <h6 className="font-archivo font-normal text-tiny leading-150 tracking-normal">
                {formatDateString(date)}
              </h6>
              <Suspense
                fallback={
                  <h6 className="font-archivo font-normal text-tiny leading-150 tracking-normal w-20 h-3 bg-gray-100 animate-pulse"></h6>
                }
              >
                <Await resolve={loaderData?.currencyPreferences}>
                  {(currencyPreferences) => {
                    return (
                      <h6 className="font-archivo font-normal text-tiny leading-150 tracking-normal">
                        {currencyPreferences?.preferredCurrency
                          ? formatCurrency(
                              netBalance,
                              currencyPreferences?.preferredCurrency,
                              prefix
                            )
                          : `${prefix}${netBalance}`}
                      </h6>
                    );
                  }}
                </Await>
              </Suspense>
            </header>
            <table className="w-full">
              <tbody>
                {transactions.map((transaction) => (
                  <TransactionRow
                    transaction={transaction}
                    key={transaction.$id}
                  />
                ))}
              </tbody>
            </table>
          </li>
        );
      })}
    </ul>
  );
}

export default Transactions;
