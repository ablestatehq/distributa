import { Suspense } from "react";
import { format } from "date-fns";
import formatCurrency from "../../utils/format.currency";
import { useLoaderData, Await } from "react-router-dom";
import ContentViewArea from "../../Layouts/components/wrappers/ContentViewArea";
import { Button } from "../../components/common/forms";

const Transaction = ({ transaction }) => {
  const getPrefix = (transaction) =>
    transaction?.flow_type === "income" ? "+" : "-";

  const prefix = getPrefix(transaction);

  const loaderData = useLoaderData();

  return (
    <ContentViewArea>
      <section className="flex h-fit flex-shrink-0 flex-col gap-y-2">
        <header className="flex flex-col gap-y-2">
          <h1 className="font-archivo font-normal text-xl lg:text-4xl leading-110 tracking-normal">
            Transaction Details
          </h1>
        </header>
        <hr className="invisible h-8" />
      </section>
      <main className="flex flex-1 flex-col gap-y-4  max-w-4xl">
        <Suspense fallback={<div>loading ...</div>}>
          <Await resolve={loaderData?.data}>
            {({ transaction, currencyPreference }) => {
              const showReceiptCTA =
                transaction?.transaction_status === "cleared" ||
                transaction?.payment_terms === "immediate";

              return (
                <div className="py-4 flex flex-col gap-y-4">
                  {showReceiptCTA && (
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        className="font-satoshi font-bold text-small leading-100 tracking-normal py-3 px-6"
                        onClick={() => {
                          // TODO: Generate the functionality to generate the receipt
                          console.log("Generate Receipt");
                        }}
                      >
                        Generate Receipt
                      </Button>
                    </div>
                  )}
                  <h6 className="font-archivo font-normal text-tiny leading-150 tracking-normal">
                    {format(transaction.date, "MMMM d")}
                  </h6>
                  <div className="grid grid-cols-2 items-start">
                    <h4 className="font-archivo font-normal text-medium leading-140 tracking-normal text-start">
                      {transaction.item}
                    </h4>

                    {
                      <Suspense
                        fallback={
                          <span className="w-10 h-2 bg-gray-100 animiate-pulse"></span>
                        }
                      >
                        <Await resolve={currencyPreference}>
                          {(preference) => {
                            return (
                              <span className="font-satoshi font-medium leading-120 tracking-normal text-end">
                                {preference
                                  ? formatCurrency(
                                      transaction.amount,
                                      preference,
                                      prefix
                                    )
                                  : `${prefix}${transaction.amount}`}
                              </span>
                            );
                          }}
                        </Await>
                      </Suspense>
                    }
                  </div>
                  <p className="font-satoshi font-normal text-small leading-150 tracking-normal">
                    {transaction.description}
                  </p>
                  <div className="flex justify-between pb-2 pt-4 border-b border-b-greyborder">
                    <span className="font-satoshi font-normal text-small leading-100 tracking-0">
                      Income/Expense
                    </span>
                    <span className="font-satoshi font-medium text-tiny leading-120 tracking-0 capitalize">
                      {transaction.flow_type}
                    </span>
                  </div>
                  <div className="flex justify-between pb-2 pt-4 border-b border-b-greyborder">
                    <span className="font-satoshi font-normal text-small leading-100 tracking-0">
                      Payment Terms
                    </span>
                    <span className="font-satoshi font-medium text-tiny leading-120 tracking-0 capitalize">
                      {transaction?.payment_terms || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between pb-2 pt-4 border-b border-b-greyborder">
                    <span className="font-satoshi font-normal text-small leading-100 tracking-0">
                      Status
                    </span>
                    <span className="font-satoshi font-medium text-tiny leading-120 tracking-0 capitalize">
                      {transaction?.transaction_status || "N/A"}
                    </span>
                  </div>
                  {transaction?.category?.name && (
                    <div className="flex justify-between pb-2 pt-4 border-b border-b-greyborder">
                      <span className="font-satoshi font-normal text-small leading-100 tracking-0">
                        Category
                      </span>
                      <span className="font-satoshi font-medium text-tiny leading-120 tracking-0 capitalize">
                        {transaction.category?.name}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between pb-2 pt-4 border-b border-b-greyborder">
                    <span className="font-satoshi font-normal text-small leading-100 tracking-0">
                      Receipt/Invoice #
                    </span>
                    <span className="font-satoshi font-medium text-tiny leading-120 tracking-0 capitalize">
                      {transaction?.invoice_receipt_no || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between pb-2 pt-4 border-b border-b-greyborder">
                    <span className="font-satoshi font-normal text-small leading-100 tracking-0">
                      Method
                    </span>
                    <span className="font-satoshi font-medium text-tiny leading-120 tracking-0 capitalize">
                      {transaction?.payment_method || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between pb-2 pt-4 border-b border-b-greyborder">
                    <span className="font-satoshi font-normal text-small leading-100 tracking-0">
                      {transaction.type === "income" ? "Payer" : "Payee"}
                    </span>
                    <span className="font-satoshi font-medium text-tiny leading-120 tracking-0 capitalize">
                      {transaction?.payer_payee
                        ? transaction?.payer_payee?.name
                        : "N/A"}
                    </span>
                  </div>
                </div>
              );
            }}
          </Await>
        </Suspense>
      </main>
    </ContentViewArea>
  );
};

export default Transaction;
