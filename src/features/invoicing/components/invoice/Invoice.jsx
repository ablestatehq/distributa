import React, { useState } from "react";
import { Formik, Field, Form, FieldArray } from "formik";
import { AiOutlineClose } from "react-icons/ai";
import { currencyFormatter } from "../../../../utils/currency.formatter";
import PDFDoc from "../pdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
const initialValues = {
  logo: "",
  sender: "",
  receiver: "",
  shipping_address: "",
  title: "INVOICE",
  bill_number: 3,
  issue_date: "",
  due_date: "",
  terms: "",
  notes: "",
  discount: "",
  tax: "",
  shipping: "",
  paid: "",
  balance_due: "",
  paper_size: "A4",
  orientation: "portrait",
  currency: "USD",
  items: [
    {
      title: "",
      quantity: "",
      measurement: "",
      price: "",
      amount: "",
    },
  ],
};

const subTotal = (values) => {
  return values.items.reduce((acc, curr) => {
    return acc + parseInt(curr.amount);
  }, 0);
};
const getBase64 = (file) => {
  return new Promise((resolve) => {
    let baseURL = "";
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      baseURL = reader.result;
      resolve(baseURL);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  });
};

const Invoice = () => {
  const [tax, setShowTax] = useState(false);
  const [discount, setShowDiscount] = useState(false);
  const [shipping, setShowShipping] = useState(false);

  const saveInvoice = (values) => {
    const getInvoices = localStorage.getItem("invoices");
    const oldInvoices = JSON.parse(getInvoices);
    const newInvoices =
      oldInvoices?.length > 0 ? [...oldInvoices, values] : [values];
    localStorage.setItem("invoices", JSON.stringify(newInvoices));
    console.log(newInvoices);
  };

  return (
    <div className="h-fit w-full px-5 sm:px-10 md:px-20">
      <h2 className="font-light text-md my-2">Generate Bill</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="">
            <div className="flex gap-x-5 flex-wrap items-end mb-2 sm:gap-y-2 xs:gap-y-2">
              <div className="flex flex-col gap-y-1 w-32">
                <label
                  htmlFor="paper_size"
                  className=" text-xs uppercase font-semibold text-gray-700"
                >
                  Paper size
                </label>
                <Field
                  as="select"
                  name="paper_size"
                  id="paper_size"
                  className="border border-gray-400 py-1.5 px-1 outline-none rounded text-xs font-light text-gray-700 focus:border-gray-700"
                >
                  <option value="A6">A6</option>
                  <option value="A5">A5</option>
                  <option value="A4">A4</option>
                  <option value="Letter">Letter</option>
                </Field>
              </div>
              <div className="flex flex-col gap-y-1 w-32">
                <label
                  htmlFor="orientation"
                  className=" text-xs uppercase font-semibold text-gray-700"
                >
                  Orientation
                </label>
                <Field
                  as="select"
                  name="orientation"
                  id="orientation"
                  className="border border-gray-400 py-1.5 px-1 outline-none rounded text-xs font-light text-gray-700 focus:border-gray-700"
                >
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </Field>
              </div>
              <div className="flex flex-col gap-y-1">
                <label
                  htmlFor="currency"
                  className=" text-xs uppercase font-semibold text-gray-700"
                >
                  Currency
                </label>
                <Field
                  as="select"
                  name="currency"
                  className="border border-gray-400 py-1.5 px-1 outline-none rounded text-xs font-light text-gray-700 focus:border:gray-700"
                >
                  <option value="UGX">Uganda Shillings</option>
                  <option value="KES">Kenya Shillings</option>
                  <option value="USD">United States Dollar</option>
                  <option value="GBP">Great Britain Pound</option>
                </Field>
              </div>
              {subTotal(values) > 0 && (
                <PDFDownloadLink
                  className="btn btn-primary"
                  document={<PDFDoc data={values} />}
                  fileName={`#${values?.bill_number}.pdf` || "#invoice.pdf"}
                >
                  {({ loading }) =>
                    loading ? "Loading document" : "↓ Download PDF"
                  }
                </PDFDownloadLink>
              )}
              <button
                className="text-white bg-[#007BFF] hover:bg-[#0B5ED7] text-sm py-1 px-3 rounded-sm cursor-pointer duration-200 ease-in-out"
                type="button"
                onClick={() => saveInvoice(values)}
              >
                Save
              </button>
            </div>
            <div className="border bg-white p-5 pb-10">
              <div className="flex justify-between sm:flex-col-reverse xs:flex-col-reverse md:flex-row sm:gap-y-2 xs:gap-y-2">
                <div className="flex flex-col justify-end">
                  {values?.logo ? (
                    <div className="relative">
                      <div
                        className="cursor-pointer p-0.5 absolute top-0 left-0 bg-transparent rounded flex justify-center items-center bg-gray-700"
                        onClick={() => {
                          setFieldValue("logo", null);
                        }}
                      >
                        <AiOutlineClose size={18} color="white" />
                      </div>
                      <img
                        src={values.logo}
                        width="100"
                        height="100"
                        alt="Logo"
                        className=""
                      />
                    </div>
                  ) : (
                    <label
                      htmlFor="logo"
                      className="md:w-44 md:h-32 sm:w-60 sm:h-24 xs:w-60 xs:h-24 bg-slate-50 border rounded cursor-pointer flex justify-center items-center hover:bg-slate-100"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        id="logo"
                        name="logo"
                        className="hidden"
                        placeholder=""
                        onChange={(e) => {
                          getBase64(e.currentTarget.files[0]).then((base64) => {
                            setFieldValue("logo", base64);
                          });
                        }}
                      />
                      <span className="font-light text-sm">Add logo</span>
                    </label>
                  )}
                </div>
                <div className="flex flex-col justify-between">
                  <Field
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="text-xl outline-none px-2 py-1 text-right text-gray-900 rounded focus:border hover:border hover:border-gray-200 border border-transparent hover:cursor-pointer focus:border-gray-200 focus:cursor-text sm:text-start xs:text-start sm:mb-2 xs:mb-2"
                  />
                  <div className="flex flex-col">
                    <label
                      htmlFor="bill_number"
                      className=" text-xs uppercase font-semibold text-gray-900 mb-1 xs:mb-2 sm:mb-2"
                    >
                      Number
                    </label>
                    <div className="flex justify-between xs:w-40 md:w-full">
                      <div className="flex justify-center items-center w-fit px-2 text-lg border-l border-y rounded-l text-gray-800 text-light bg-slate-200">
                        #
                      </div>
                      <Field
                        type="text"
                        name="bill_number"
                        className="py-1.5 flex flex-grow outline-none px-2 text-right text-gray-900 border rounded-r focus:border-gray-800 font-light text-sm sm:text-start xs:text-start md:text-end"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 mt-4 sm:grid-cols-1 xs:grid-cols-1 md:grid-cols-2 gap-y-2">
                <div className="flex flex-col">
                  <Field
                    as="textarea"
                    placeholder="Who is the invoice from? (required)"
                    className="outline-none px-1 py-1 border rounded resize-none placeholder:font-light text-sm w-72 text-gray-900 font-light md:w-72 sm:w-full xs:w-full"
                    name="sender"
                  />
                  <div className="grid px-5 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 mt-2 gap-2">
                    <div>
                      <label
                        htmlFor="receiver"
                        className="capitalize text-gray-700 text-sm font-light"
                      >
                        bill to
                      </label>
                      <Field
                        as="textarea"
                        id="receiver"
                        placeholder="Who is the invoice to? (required)"
                        className="outline-none px-1 py-1 border rounded resize-none placeholder:font-light text-sm  text-gray-900 font-light sm:w-full xs:w-full"
                        name="receiver"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="shipping_address"
                        className="capitalize text-gray-700 text-sm font-light"
                      >
                        ship to
                      </label>
                      <Field
                        as="textarea"
                        id="shipping_address"
                        placeholder="What is their shipping address? (optional)"
                        className="outline-none px-1 py-1 border rounded resize-none placeholder:font-light text-sm text-gray-900 font-light sm:w-full xs:w-full"
                        name="shipping address"
                      />
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="flex gap-y-1 gap-x-2 justify-end items-center mb-2">
                    <label
                      htmlFor="issue_date"
                      className="text-sm font-light text-gray-700 w-fit flex items-center justify-end"
                    >
                      Date
                    </label>
                    <Field
                      type="text"
                      name="issue_date"
                      className="py-1.5 outline-none px-2 md:text-right text-gray-900 border rounded  font-light text-sm sm:text-start xs:text-start w-40 h-fit"
                    />
                  </div>
                  <div className="flex gap-y-1 gap-x-2 justify-end items-center mb-2">
                    <label
                      htmlFor="due_date"
                      className="text-sm font-light text-gray-700 w-fit flex items-center justify-end"
                    >
                      Due Date
                    </label>
                    <Field
                      type="text"
                      name="due_date"
                      className="py-1.5 outline-none px-2 md:text-right text-gray-900 border rounded  font-light text-sm sm:text-start xs:text-start w-40 h-fit"
                    />
                  </div>
                </div>
              </div>
              <FieldArray name="items">
                {(arrayHelpers) => (
                  <div className="w-full my-2">
                    <table className="w-full md:block sm:hidden xs:hidden">
                      <thead className="w-full">
                        <tr className="text-white w-full">
                          <th className="hover:bg-[#2D3942] bg-gray-700 py-1.5 rounded-l-md font-light text-sm text-start px-2  hover:cursor-pointer">
                            Title
                          </th>
                          <th className="hover:bg-[#2D3942] bg-gray-700 py-1.5 px-2 font-light text-sm text-start mx-0.5 hover:cursor-pointer">
                            Quantity
                          </th>
                          <th className="hover:bg-[#2D3942] bg-gray-700 py-1.5 px-2 font-light text-sm text-start mx-0.5 hover:cursor-pointer">
                            Units
                          </th>
                          <th className="hover:bg-[#2D3942] bg-gray-700 py-1.5 px-2 font-light text-sm text-start mx-0.5 hover:cursor-pointer">
                            Price
                          </th>
                          <th className="hover:bg-[#2D3942] bg-gray-700 py-1.5 px-2 font-light text-sm text-start mx-0.5 rounded-r-md hover:cursor-pointer">
                            Amount
                          </th>
                          <th className=""></th>
                        </tr>
                      </thead>
                      <tbody>
                        {values?.items &&
                          values?.items?.length > 0 &&
                          values.items.map((item, index) => (
                            <tr key={index} className="group py-2">
                              <td className="w-5/12 pr-1">
                                <Field
                                  name={`items.${index}.title`}
                                  placeholder="Shoes"
                                  type="text"
                                  className="outline-none px-1 py-1 border rounded placeholder:font-light text-sm text-gray-900 font-light mt-1 w-full"
                                />
                              </td>
                              <td className="w-1.5/12 pr-1">
                                <Field
                                  name={`items.${index}.quantity`}
                                  placeholder="ex:4"
                                  type="text"
                                  className="outline-none px-1 py-1 border rounded placeholder:font-light text-sm text-gray-900 font-light mt-1 w-full"
                                />
                              </td>
                              <td className="w-1.5/12 pr-1">
                                <Field
                                  name={`items.${index}.measurement`}
                                  placeholder="ex:Lbs"
                                  type="text"
                                  className="outline-none px-1 py-1 border rounded placeholder:font-light text-sm text-gray-900 font-light mt-1 w-full"
                                />
                              </td>
                              <td className="w-1.5/12">
                                <Field
                                  name={`items.${index}.price`}
                                  placeholder="400"
                                  type="text"
                                  className="outline-none px-1 py-1 border rounded placeholder:font-light text-sm text-gray-900 font-light mt-1 w-full"
                                />
                              </td>
                              <td className="w-2/12">
                                <span className="text-sm font-light text-gray-900 mx-2">
                                  {currencyFormatter(
                                    (values.items[index].amount =
                                      item.price * item.quantity),
                                    values.currency
                                  )}
                                </span>
                              </td>
                              <td className="w-0.5/12">
                                <button
                                  type="button"
                                  className={`${
                                    values?.items?.length === 1
                                      ? "invisible"
                                      : "invisible group-hover:visible"
                                  } text-red-500 text-xs font-light cursor-pointer}`}
                                  onClick={() => arrayHelpers.remove(index)}
                                  disabled={values.items.length === 1}
                                >
                                  <AiOutlineClose size={15} />
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    <section className="w-full rounded border md:hidden">
                      {values?.items &&
                        values?.items?.length > 0 &&
                        values.items.map((item, index) => (
                          <div
                            className={`pt-2 pb-4 px-5 relative ${
                              index < values.items.length - 1 ? "border-b" : ""
                            }`}
                            key={index}
                          >
                            <Field
                              type="text"
                              name={`items.${index}.title`}
                              placeholder="Title"
                              className="outline-none px-1 py-1 text-gray-900 rounded focus:border hover:border hover:border-gray-200 border border-transparent hover:cursor-pointer focus:border-gray-200 focus:cursor-text text-start"
                            />
                            <div className="flex gap-x-1 items-center">
                              <label
                                htmlFor="due_date"
                                className="text-sm font-light text-gray-500 w-fit flex items-center justify-end"
                              >
                                Amount:
                              </label>
                              <span className="text-sm font-light text-gray-900">
                                {currencyFormatter(
                                  (values.items[index].amount =
                                    item.price * item.quantity),
                                  values.currency
                                )}
                              </span>
                            </div>
                            <div className="flex items-center mb-2">
                              <label
                                htmlFor={`items.${index}.price`}
                                className="flex flex-col"
                              >
                                <span className="text-sm font-light capitalize text-gray-500">
                                  price
                                </span>
                                <Field
                                  id={`items.${index}.price`}
                                  name={`items.${index}.price`}
                                  placeholder="Price"
                                  type="text"
                                  className="outline-none px-1 py-1 border rounded placeholder:font-light text-sm text-gray-900 font-light mt-1 w-24"
                                />
                              </label>
                              <span className="mx-1.5 pt-5">
                                <AiOutlineClose
                                  size={15}
                                  className="font-bold"
                                />
                              </span>

                              <label
                                htmlFor={`items.${index}.quantity`}
                                className="flex flex-col"
                              >
                                <span className="text-sm font-light capitalize text-gray-500">
                                  Quantity
                                </span>
                                <Field
                                  id={`items.${index}.quantity`}
                                  name={`items.${index}.quantity`}
                                  placeholder="Qty"
                                  type="text"
                                  className="outline-none px-1 py-1 border rounded placeholder:font-light text-sm text-gray-900 font-light mt-1 w-24"
                                />
                              </label>
                            </div>
                            <Field
                              name={`items.${index}.description`}
                              placeholder="Description of the service or product..."
                              type="text"
                              className="outline-none px-1 py-1 border rounded placeholder:font-light text-sm text-gray-900 font-light mt-1 w-full"
                            />
                            <button
                              type="button"
                              className={`text-gray-400 text-xs font-light cursor-pointer absolute top-3 p-0.5 right-3  border border-gray-400 rounded-full ${
                                values.items.length === 1 ? "hidden" : ""
                              } `}
                              onClick={() => arrayHelpers.remove(index)}
                              disabled={values.items.length === 1}
                            >
                              <AiOutlineClose size={12} />
                            </button>
                          </div>
                        ))}
                    </section>
                    <div className="mt-2">
                      <button
                        className="rounded py-1 px-2 text-sm bg-green-600 text-white"
                        onClick={(event) => {
                          event.preventDefault();
                          arrayHelpers.push({
                            title: "",
                            quantity: "1",
                            measurement: "",
                            price: "",
                            amount: "",
                          });
                        }}
                      >
                        + Add item
                      </button>
                    </div>
                  </div>
                )}
              </FieldArray>
              <div className="flex gap-2 xs:flex-col sm:flex-col md:flex-row lg:flex:row">
                <div className="xs:w-full md:w-1/2 lg:w-1/2">
                  <div className="flex gap-y-1 gap-x-2 mb-2 flex-col">
                    <label
                      htmlFor="notes"
                      className="text-sm font-light text-gray-500 w-fit flex items-center justify-end pl-4"
                    >
                      Notes
                    </label>
                    <Field
                      as="textarea"
                      name="notes"
                      id="notes"
                      placeholder="Notes - any relevant information not already covered"
                      className="py-1.5 outline-none px-2 md:text-right text-gray-900 border rounded resize-none font-light text-sm sm:text-start xs:text-start h-fit"
                    />
                  </div>
                  <div className="flex gap-y-1 gap-x-2 mb-2 flex-col">
                    <label
                      htmlFor="terms"
                      className="text-sm font-light text-gray-500 w-fit flex items-center justify-end pl-4"
                    >
                      Terms
                    </label>
                    <Field
                      as="textarea"
                      name="terms"
                      id="terms"
                      placeholder="Terms and conditions - late fees, payment methods, delivery schedule"
                      className="py-1.5 outline-none px-2 md:text-right text-gray-900 border rounded resize-none font-light text-sm sm:text-start xs:text-start h-fit"
                    />
                  </div>
                </div>
                <section className="xs:w-full md:w-1/2 lg:w-1/2">
                  <div className="flex py-1 gap-x-2 items-center">
                    <span className="w-1/2 text-end text-sm font-light text-gray-900 pr-2">
                      Subtotal
                    </span>
                    <span className="text-sm font-light text-gray-900 w-48 text-end pr-2">
                      {currencyFormatter(
                        subTotal(values) || 0,
                        values.currency
                      )}
                    </span>
                  </div>
                  <div className="flex justify-end gap-x-4 pr-8">
                    {!discount && (
                      <button
                        className="text-green-600 font-semibold text-sm"
                        onClick={(event) => {
                          event.preventDefault();
                          setShowDiscount(true);
                        }}
                      >
                        + Discount
                      </button>
                    )}
                    {!tax && (
                      <button
                        className="text-green-600 font-semibold text-sm"
                        onClick={(event) => {
                          event.preventDefault();
                          setShowTax(true);
                        }}
                      >
                        + Tax
                      </button>
                    )}
                    {!shipping && (
                      <button
                        className="text-green-600 font-semibold text-sm"
                        onClick={(event) => {
                          event.preventDefault();
                          setShowShipping(true);
                        }}
                      >
                        + Shipping
                      </button>
                    )}
                  </div>
                  <div className="flex py-1 gap-x-2">
                    <span className="w-1/2 text-end text-sm font-light text-gray-900 pr-2">
                      Total
                    </span>
                    <span className="text-sm font-light text-gray-900 w-48 text-end pr-2">
                      {currencyFormatter(
                        subTotal(values) -
                          Number(values?.discount) +
                          Number(values?.tax) +
                          Number(values?.shipping) || 0,
                        values.currency
                      )}
                    </span>
                  </div>
                  {discount && (
                    <div className="flex py-1 items-center group">
                      <label
                        htmlFor="discount"
                        className="w-1/2 text-end text-sm font-light text-gray-900 mr-2 pr-2"
                      >
                        Discount
                      </label>
                      <Field
                        name="discount"
                        id="discount"
                        type="text"
                        className="py-1.5 outline-none px-2 md:text-right text-gray-900 border rounded resize-none font-light text-sm w-48 h-fit mr-2"
                      />
                      <button
                        className="invisible group-hover:visible text-red-500 text-xs font-light cursor-pointer"
                        onClick={(event) => {
                          event.preventDefault();
                          setShowDiscount(false);
                        }}
                      >
                        <AiOutlineClose size={12} />
                      </button>
                    </div>
                  )}
                  {tax && (
                    <div className="flex py-1 items-center group">
                      <label
                        htmlFor="tax"
                        className="w-1/2 text-end text-sm font-light text-gray-900 mr-2 pr-2"
                      >
                        Tax
                      </label>
                      <Field
                        name="tax"
                        id="tax"
                        type="text"
                        className="py-1.5 outline-none px-2 md:text-right text-gray-900 border rounded resize-none font-light text-sm w-48 h-fit mr-2"
                      />
                      <button
                        className="invisible group-hover:visible text-red-500 text-xs font-light cursor-pointer"
                        onClick={(event) => {
                          event.preventDefault();
                          setShowTax(false);
                        }}
                      >
                        <AiOutlineClose size={12} />
                      </button>
                    </div>
                  )}
                  {shipping && (
                    <div className="flex py-1 items-center group">
                      <label
                        htmlFor="shipping"
                        className="w-1/2 text-end text-sm font-light text-gray-900 mr-2 pr-2"
                      >
                        Shipping
                      </label>
                      <Field
                        name="shipping"
                        id="shipping"
                        type="text"
                        className="py-1.5 outline-none px-2 md:text-right text-gray-900 border rounded resize-none font-light text-sm w-48 h-fit mr-2"
                      />
                      <button
                        className="invisible group-hover:visible text-red-500 text-xs font-light cursor-pointer"
                        onClick={(event) => {
                          event.preventDefault();
                          setShowShipping(false);
                        }}
                      >
                        <AiOutlineClose size={12} />
                      </button>
                    </div>
                  )}

                  <div className="flex py-1 items-center">
                    <label
                      htmlFor="paid"
                      className="w-1/2 text-end text-sm font-light text-gray-900 mr-2 pr-2"
                    >
                      Amount Paid
                    </label>
                    <Field
                      name="paid"
                      id="paid"
                      type="text"
                      className="py-1.5 outline-none px-2 md:text-right text-gray-900 border rounded resize-none font-light text-sm w-48 h-fit mr-2"
                    />
                  </div>
                  <div className="flex py-1 gap-x-2">
                    <span className="w-1/2 text-end text-sm font-light text-gray-900 pr-2">
                      Balance Due
                    </span>
                    <span className="text-sm font-light text-gray-900 w-48 text-end pr-2">
                      {currencyFormatter(
                        subTotal(values) -
                          Number(values?.discount) +
                          Number(values?.tax) +
                          Number(values?.shipping) -
                          Number(values?.paid) || 0,
                        values.currency
                      )}
                    </span>
                  </div>
                </section>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Invoice;
