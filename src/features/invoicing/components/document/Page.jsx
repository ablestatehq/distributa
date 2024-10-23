import { Tailwind, CSS } from "@fileforge/react-print";
import React from "react";

const Page = ({ data }) => {
  return (
    <Tailwind>
      <CSS>{`@page { size: a4 portrait; }`}</CSS>
      <div className="w-[342px] h-[483px] border border-black lg:w-[595px] lg:h-[842px] m-7 lg:p-12 flex flex-col gap-y-7 lg:gap-y-12">
        {/* Invoice Header */}
        <div className="flex justify-between">
          <img
            src={data?.logo}
            alt="Biller Logo"
            className="w-14 h-14 lg:w-24 lg:h-24 object-cover"
          />
          <div className="flex flex-col gap-y-0.5 lg:gap-y-1 items-end">
            <h1 className="font-satoshi font-bold text-[13.79px] leading-[13.8px] lg:text-large lg:leading-100 tracking-normal">
              {data.title}
            </h1>
            <div className="flex flex-col gap-y-0.5 lg:gap-y-1 w-fit">
              <div className="flex gap-x-0.5 font-satoshi text-[0.288rem] lg:text-[0.5rem] leading-100 tracking-normal">
                <strong className="font-bold">Invoice #:</strong>
                <span className="font-normal">{data.invoice_no}</span>
              </div>
              <div className="flex gap-x-0.5 font-satoshi text-[0.288rem] lg:text-[0.5rem] leading-100 tracking-normal">
                <strong className="font-bold">Date Issued:</strong>
                <span className="font-normal">{data.issue_date}</span>
              </div>
              <div className="flex gap-x-0.5 font-satoshi text-[0.288rem] lg:text-[0.5rem] leading-100 tracking-normal">
                <strong className="font-bold">Due Date:</strong>
                <span className="font-normal">{data.due_date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Billing */}
        <div className="flex gap-x-6">
          <div className="flex flex-col gap-y-0.5 lg:gap-y-1">
            <h2 className="font-satoshi font-bold text-[6.9px] lg:text-tiny leading-100 tracking-normal">
              Billed From
            </h2>
            <p className="font-satoshi text-[0.288rem] lg:text-[0.5rem] leading-100 tracking-normal">
              {data?.billed_from?.name}
            </p>
            <p className="font-satoshi text-[0.288rem] lg:text-[0.5rem] leading-100 tracking-normal">
              {data?.billed_from?.address}
            </p>
            <p className="font-satoshi text-[0.288rem] lg:text-[0.5rem] leading-100 tracking-normal">
              {data?.billed_from?.email}
            </p>
          </div>
          <div className="flex flex-col gap-y-0.5 lg:gap-y-1">
            <h2 className="font-satoshi font-bold text-[6.9px] lg:text-tiny leading-100 tracking-normal">
              Billed To
            </h2>
            <p className="font-satoshi text-[0.288rem] lg:text-[0.5rem] leading-100 tracking-normal">
              {data?.billed_to?.name}
            </p>
            <p className="font-satoshi text-[0.288rem] lg:text-[0.5rem] leading-100 tracking-normal">
              {data?.billed_to?.address}
            </p>
            <p className="font-satoshi text-[0.288rem] lg:text-[0.5rem] leading-100 tracking-normal">
              {data?.billed_to?.email}
            </p>
          </div>
        </div>
        <div className="flex flex-1">
          <div className="w-full h-fit">
            <table className="min-w-full table-full max-w-full overflow-x-scroll">
              <thead>
                <tr className="border-y-[0.56px] lg:border-y border-black">
                  <th className="text-start font-satoshi font-bold text-[0.362rem] lg:text-[0.625rem] w-28 leading-100 tracking-normal lg:py-2 py-1">
                    Title
                  </th>
                  <th className="text-start font-satoshi font-bold text-[0.362rem] lg:text-[0.625rem] w-[2.75rem] leading-100 tracking-normal lg:py-2 py-1">
                    Quantity
                  </th>
                  <th className="text-start font-satoshi font-bold text-[0.362rem] lg:text-[0.625rem] w-[2.75rem] leading-100 tracking-normal lg:py-2 py-1">
                    Units
                  </th>
                  <th className="text-start font-satoshi font-bold text-[0.362rem] lg:text-[0.625rem] w-[2.75rem] leading-100 tracking-normal lg:py-2 py-1">
                    Price/Unit
                  </th>
                  <th className="text-start font-satoshi font-bold text-[0.362rem] lg:text-[0.625rem] w-[2.75rem] leading-100 tracking-normal lg:py-2 py-1">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ...data.items,
                  ...data.items,
                  ...data.items,
                  ...data.items,
                ].map((item, index) => (
                  <tr
                    key={index}
                    className="border-b-[0.56px] lg:border-b border-b-greyborder"
                  >
                    <td className="text-start font-satoshi font-normal text-[0.362rem] lg:text-[0.5rem] w-28 leading-100 tracking-normal pb-1 pt-2 lg:pt-[0.69rem]">
                      {item?.title}
                    </td>
                    <td className="text-start font-satoshi font-normal text-[0.362rem] lg:text-[0.5rem] w-[2.75rem] leading-100 tracking-normal pb-1 pt-2 lg:pb-1.5 lg:pt-[0.69rem]">
                      {item?.quantity}
                    </td>
                    <td className="text-start font-satoshi font-normal text-[0.362rem] lg:text-[0.5rem] w-[2.75rem] leading-100 tracking-normal pb-1 pt-2 lg:pb-1.5 lg:pt-[0.69rem]">
                      {item?.units}
                    </td>
                    <td className="text-start font-satoshi font-normal text-[0.362rem] lg:text-[0.5rem] w-[2.75rem] leading-100 tracking-normal pb-1 pt-2 lg:pb-1.5 lg:pt-[0.69rem]">
                      {item?.price}
                    </td>
                    <td className="text-start font-satoshi font-normal text-[0.362rem] lg:text-[0.5rem] w-[2.75rem] leading-100 tracking-normal pb-1 pt-2 lg:pb-1.5 lg:pt-[0.69rem]">
                      {item?.price ?? 0 * item?.quantity ?? 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-2 flex-shrink-0">
          <section className="flex flex-col gap-y-[0.88rem] lg:gap-y-6">
            <article className="flex flex-col gap-y-0.5 lg:gap-y-1">
              <h2 className="font-satoshi font-bold text-[6.9px] lg:text-tiny leading-100 tracking-normal">
                Notes
              </h2>
              <p className="font-satoshi font-normal text-[0.216rem] lg:text-[0.375rem] leading-140 tracking-normal">
                {data.notes}
              </p>
            </article>
            <article className="flex flex-col gap-y-0.5">
              <h2 className="font-satoshi font-bold text-[6.9px] lg:text-tiny leading-100 tracking-normal">
                Terms & conditions
              </h2>
              <p className="font-satoshi font-normal text-[0.216rem] lg:text-[0.375rem] leading-140 tracking-normal">
                {data.notes}
              </p>
            </article>
          </section>
          <section className="flex justify-end">
            <div className="w-fit">
              <div className="flex justify-between min-w-24 lg:min-w-40 font-satoshi text-[0.288rem] lg:text-[0.5rem] leading-100 tracking-normal py-[0.288rem] lg:py-2 w-full border-b border-b-greyborder">
                <strong className="font-bold">Sub Total</strong>
                <span className="font-normal">{data.sub_total}</span>
              </div>
              <div className="flex justify-between min-w-24 lg:min-w-40 font-satoshi text-[0.288rem] lg:text-[0.5rem] leading-100 tracking-normal py-[0.288rem] w-full">
                <strong className="font-bold">Discount</strong>
                <span className="font-normal">{data.discount ?? 0}</span>
              </div>
              <div className="flex justify-between min-w-24 lg:min-w-40 font-satoshi text-[0.288rem] lg:text-[0.5rem] leading-100 tracking-normal py-[0.288rem] w-full">
                <strong className="font-bold">Tax</strong>
                <span className="font-normal">{data.tax ?? 0}</span>
              </div>
              <div className="flex justify-between min-w-24 lg:min-w-40 font-satoshi text-[0.288rem] lg:text-[0.5rem] leading-100 tracking-normal py-[0.288rem] w-full border-b border-b-greyborder">
                <strong className="font-bold">Shipping</strong>
                <span className="font-normal">{data.shipping ?? 0}</span>
              </div>
              <div className="flex justify-between min-w-24 lg:min-w-40 font-satoshi text-[0.288rem] lg:text-[0.5rem] leading-100 tracking-normal py-[0.288rem] w-full border-b border-b-greyborder">
                <strong className="font-bold">Amount Due</strong>
                <span className="font-normal">{data.amount_due ?? 0}</span>
              </div>
              <div className="flex justify-between min-w-24 lg:min-w-40 font-satoshi text-[0.288rem] lg:text-[0.5rem] leading-100 tracking-normal py-[0.288rem] w-full border-b border-b-greyborder">
                <strong className="font-bold">Amount Paid</strong>
                <span className="font-normal">{data.amount_paid ?? 0}</span>
              </div>
              <div className="flex justify-between min-w-24 lg:min-w-40 font-satoshi text-[0.288rem] lg:text-[0.5rem] leading-100 tracking-normal py-[0.288rem] w-full">
                <strong className="font-bold">Balance Due</strong>
                <span className="font-bold text-[0.4313rem] lg:text-tiny">
                  {data.balance_due ?? 0}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Tailwind>
  );
};

export default Page;
