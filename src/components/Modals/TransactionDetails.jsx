import React from "react";
import { CircleX } from "../common/icons";
import { createPortal } from "react-dom";
import { format } from "date-fns";

const TransactionDetails = ({ handleClose, transaction }) => {
  const getPrefix = (transaction) =>
    transaction?.type === "income" < 0 ? "+" : "-";

  const prefix = getPrefix(transaction);

  return createPortal(
    <main className="fixed top-0 bg-black bg-opacity-45 h-screen w-screen flex justify-center items-end lg:items-center">
      <section className="w-full lg:w-96 h-fit flex flex-col bg-white">
        <header className="flex justify-between w-full bg-grey p-4">
          <h5 className="font-archivo font-normal text-small leading-150 tracking-normal">
            Transaction Details
          </h5>
          <button type="button" onClick={handleClose}>
            <CircleX variation="black" className="w-4 h-4" />
          </button>
        </header>
        <div className="p-4 flex flex-col gap-y-4">
          <h6 className="font-archivo font-normal text-tiny leading-150 tracking-normal">
            {format(transaction.date, "MMMM d")}
          </h6>
          <div className="grid grid-cols-2 items-start">
            <h4 className="font-archivo font-normal text-medium leading-140 tracking-normal text-start">
              {transaction.item}
            </h4>
            <span className="font-satoshi font-medium leading-120 tracking-normal text-end">
              {prefix}
              {transaction.amount}
            </span>
          </div>
          <p className="font-satoshi font-normal text-small leading-150 tracking-normal">
            {transaction.description}
          </p>
          <div className="flex justify-between pb-2 pt-4 border-b border-b-greyborder">
            <span className="font-satoshi font-normal text-small leading-100 tracking-0">
              Income/Expense
            </span>
            <span className="font-satoshi font-medium text-tiny leading-120 tracking-0 capitalize">
              {transaction.type}
            </span>
          </div>
          <div className="flex justify-between pb-2 pt-4 border-b border-b-greyborder">
            <span className="font-satoshi font-normal text-small leading-100 tracking-0">
              Category
            </span>
            <span className="font-satoshi font-medium text-tiny leading-120 tracking-0 capitalize">
              {transaction.category?.name}
            </span>
          </div>
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
              {transaction?.payer_payee || "N/A"}
            </span>
          </div>
        </div>
      </section>
    </main>,
    document.getElementById("portal")
  );
};

export default TransactionDetails;
