import { ContentViewAreaWrapper } from "../../Layouts/components";
import { Button } from "../../components/common/forms";
import { Book, Edit, Delete } from "../../components/common/icons";
import { useLoaderData, Await } from "react-router-dom";
import { CreateTransaction, TransactionDetails } from "../../components/Modals";
import { useState, Suspense } from "react";
import { groupBy, map, sumBy } from "lodash";
import { format, parse } from "date-fns";

const Transactions = () => {
  const data = useLoaderData();

  const [createTransaction, setCreateTransaction] = useState(false);
  const [showTransactionDetails, setShowTransactionDetails] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);

  const toggleCreateTransactionModal = () =>
    setCreateTransaction((createTransaction) => !createTransaction);

  const toggleTransactionDetailsModal = () =>
    setShowTransactionDetails(
      (showTransactionDetails) => !showTransactionDetails
    );

  const groupTransactionsByCreatedDate = (transactions) => {
    const grouped = groupBy(transactions, (transaction) =>
      format(transaction.date, "yyyy-MM-dd")
    );

    return map(grouped, (groupedTransactions, date) => ({
      date,
      transactions: groupedTransactions,
    }));
  };

  /**
   * @function formatDateString
   * @description converts a date string from the format yyyy-MM-dd to the format of month year for example, January 1
   * @param {string} dateString takes in a date string in the format yyyy-MM-dd
   * @returns {string} in the format of month year for example, January 1
   */

  const formatDateString = (dateString) => {
    const date = parse(dateString, "yyyy-MM-dd", new Date());
    return format(date, "MMMM d");
  };

  /**
   * @function getNetBalance
   * @description returns the difference between the total income and expenditure of a days transactions
   * @param { Array } transactions An array of transactions
   * @returns { number } The difference between the income and expenditure
   */
  const getNetBalance = (transactions) => {
    const groupedByType = groupBy(transactions, "flow_type");
    const totalIncome = sumBy(groupedByType["income"] || [], "amount") || 0;
    const totalExpenditure =
      sumBy(groupedByType["expense"] || [], "amount") || 0;
    return totalIncome - totalExpenditure;
  };

  const getPrefix = (amount) => (amount < 0 ? null : "+");

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
            <Await resolve={data?.currentMonthSummary}>
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
                          <h3 className="font-archivo font-normal text-xl leading-120 tracking-0">
                            {income}
                          </h3>
                          <p className="font-satoshi font-regular text-tiny leading-100 tracking-normal">
                            Income this month
                          </p>
                        </article>
                        <article className="flex flex-col gap-y-2 w-1/2 px-4 py-8 rounded-lg bg-grey">
                          <h3 className="font-archivo font-normal text-xl leading-120 tracking-0">
                            {expense}
                          </h3>
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
              <Await resolve={data?.transactions}>
                {(data) => {
                  if (data?.total > 0) {
                    const processedTransactions =
                      groupTransactionsByCreatedDate(data?.documents);

                    return (
                      <ul className="flex flex-col h-full w-full  gap-y-4 bg-white">
                        {processedTransactions.map(({ date, transactions }) => {
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
                                <h6 className="font-archivo font-normal text-tiny leading-150 tracking-normal">
                                  {prefix}
                                  {netBalance}
                                </h6>
                              </header>
                              <table className="w-full">
                                <tbody>
                                  {transactions.map((transaction) => {
                                    const prefix =
                                      transaction?.type === "income"
                                        ? "+"
                                        : "-";

                                    return (
                                      <tr
                                        key={transaction.$id}
                                        className="border-b border-b-greyborder"
                                      >
                                        <td className="w-full pr-6 pt-4 pb-2 font-satoshi font-normal text-tiny leading-120 tracking-normal align-bottom">
                                          {transaction.item}
                                        </td>
                                        <td className="pr-6 pt-4 pb-2 font-satoshi font-normal text-tiny leading-120 tracking-normal align-bottom">
                                          {prefix}
                                          {transaction.amount}
                                        </td>
                                        <td className="pt-4 pb-2 font-satoshi font-normal text-tiny leading-100 tracking-normal">
                                          <div className="flex gap-2">
                                            <button
                                              className="underline outline-none"
                                              onClick={() => {
                                                setTransactionDetails(
                                                  transaction
                                                );
                                                toggleTransactionDetailsModal();
                                              }}
                                              disabled
                                            >
                                              <Edit />
                                            </button>
                                            <button
                                              className="outline-none group"
                                              onClick={() => {
                                                setTransactionDetails(
                                                  transaction
                                                );
                                                toggleTransactionDetailsModal();
                                              }}
                                              disabled
                                            >
                                              <Delete />
                                            </button>

                                            <button
                                              className="underline min-w-[58px] outline-none"
                                              onClick={() => {
                                                setTransactionDetails(
                                                  transaction
                                                );
                                                toggleTransactionDetailsModal();
                                              }}
                                            >
                                              See Details
                                            </button>
                                          </div>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </li>
                          );
                        })}
                      </ul>
                    );
                  }

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

export default Transactions;
