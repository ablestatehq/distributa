import { useState } from "react";
import { ContentViewAreaWrapper } from "../../Layouts/components";
import { Button } from "../../components/common/forms";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import { AiOutlineClose } from "react-icons/ai";
import getBase64 from "../../utils/getBase64";
import getValidNumber from "../../utils/getValidNumber";
import { newInvoiceSchema } from "../../utils/validators";
import cn from "../../utils/cn";
import { useSubmit } from "react-router-dom";

const calculateSubTotal = (items) =>
  items.reduce((acc, { quantity, price }) => {
    const total = quantity * price;
    return acc + total;
  }, 0);

const calculateAmountDue = ({ tax, shipping, discount, sub_total }) =>
  getValidNumber(sub_total) +
  getValidNumber(tax) +
  getValidNumber(shipping) -
  getValidNumber(discount);

const calculateBalanceDue = ({
  sub_total,
  discount,
  tax,
  shipping,
  amount_paid,
}) =>
  getValidNumber(sub_total) -
  getValidNumber(discount) +
  getValidNumber(tax) +
  getValidNumber(shipping) -
  getValidNumber(amount_paid);

const NewInvoice = () => {
  const submit = useSubmit();
  const [editIndex, setEditIndex] = useState(null);
  const [addItem, setAddItem] = useState(null);

  const initialValues = {
    logo: null,
    paper_size: "",
    orientation: "",
    currency: "",
    billed_from: {
      name: "",
      email: "",
      address: "",
    },
    billed_to: {
      name: "",
      email: "",
      address: "",
    },
    title: "",
    invoice_no: "",
    issue_date: "",
    due_date: "",
    items: [
      {
        title: "Mackooks",
        quantity: 1,
        units: "Piece",
        price: 0,
      },
    ],
    sub_total: 0,
    discount: "",
    tax: "",
    shipping: "",
    amount_due: 0,
    amount_paid: "",
    balance_due: "",
    notes: "",
    terms: "",
  };

  const handleSubmit = (values) => {
    // Type cast.
    values.invoice_no = parseInt(values.invoice_no);
    values.discount = parseFloat(values.discount)
      ? parseFloat(values.discount)
      : null;
    values.tax = parseFloat(values.tax) ? parseFloat(values.tax) : null;
    values.shipping = parseFloat(values.shipping)
      ? parseFloat(values.shipping)
      : null;
    values.amount_paid = parseFloat(values.amount_paid ?? 0);
    values.items = values.items.map((item) => ({
      ...item,
      price: parseFloat(item.price),
      quantity: parseInt(item.quantity),
    }));

    // Submit
    submit(JSON.stringify(values), {
      method: "post",
      encType: "application/json",
    });
  };

  return (
    <ContentViewAreaWrapper>
      <section className="flex h-fit flex-shrink-0 flex-col gap-y-2">
        <header className="flex flex-col gap-y-2">
          <h1 className="font-archivo font-normal text-xl lg:text-4xl leading-110 tracking-normal">
            New Invoice
          </h1>
        </header>
        <hr className="invisible h-8" />
      </section>
      <main className="flex w-full flex-col h-fit gap-y-4 lg:pt-6">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={newInvoiceSchema}
        >
          {({ values, setFieldValue, touched, errors }) => {
            return (
              <Form className="flex flex-col gap-y-4">
                {/* Header */}
                <div className="flex justify-between items-start h-fit lg:items-end w-full p-4 bg-grey rounded lg:h-24 lg:min-h-fit flex-wrap gap-y-2">
                  <section className="flex flex-1 lg:flex-none w-fit gap-x-4 items-start">
                    {values?.logo ? (
                      <div className="relative w-24 group">
                        <button
                          className="cursor-pointer p-1 absolute -top-3 -right-3 lg:-top-10 bg-grey w-fit h-fit rounded-full hidden lg:hidden lg:group-hover:flex justify-center items-center z-10 border border-greyborder"
                          onClick={() => {
                            setFieldValue("logo", null);
                          }}
                        >
                          <AiOutlineClose
                            size={15}
                            className="text-greyborder group"
                          />
                        </button>
                        <img
                          src={values.logo}
                          alt="Logo"
                          className="static bg-white lg:absolute -top-7 w-24 h-24 object-cover border border-greyborder"
                        />
                      </div>
                    ) : (
                      <label
                        htmlFor="logo"
                        className={`${cn(
                          "bg-white border border-greyborder w-24 h-24 flex justify-center items-center cursor-pointer p-2 lg:-mt-7",
                          {
                            "border-error": touched?.logo && errors?.logo,
                          }
                        )}`}
                      >
                        <input
                          type="file"
                          id="logo"
                          name="logo"
                          className="hidden group"
                          accept="image/*"
                          onChange={(event) => {
                            getBase64(event.currentTarget.files[0]).then(
                              (base64) => setFieldValue("logo", base64)
                            );
                          }}
                        />
                        <span className="text-center font-satoshi text-tiny leading-100 tracking-normal w-[3.75rem]">
                          Add your logo
                        </span>
                      </label>
                    )}

                    <div className="flex-1 flex flex-col md:flex-row md:gap-x-4 md:items-start bg-grey gap-y-4">
                      <div className="w-full md:w-32 flex flex-col gap-y-2">
                        <label
                          htmlFor="paper_size"
                          className="font-satoshi font-medium text-small leading-100 tracking-normal"
                        >
                          Paper size
                        </label>
                        <Field
                          id="paper_size"
                          name="paper_size"
                          className={cn(
                            "w-full border border-greyborder focus:border-accent outline-none p-3 bg-white font-satoshi font-regular text-tiny cursor-pointer",
                            {
                              "border-error focus:border-error":
                                touched?.paper_size && errors?.paper_size,
                            }
                          )}
                          as="select"
                        >
                          <option value="">Select one</option>
                          <option value="a6">A6</option>
                          <option value="a5">A5</option>
                          <option value="a4">A4</option>
                          <option value="letter">Letter</option>
                        </Field>
                        <ErrorMessage name="paper_size">
                          {(msg) => (
                            <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className="w-full md:w-32 flex flex-col gap-y-2">
                        <label
                          htmlFor="orientation"
                          className="font-satoshi font-medium text-small leading-100 tracking-normal"
                        >
                          Orientation
                        </label>
                        <Field
                          id="orientation"
                          name="orientation"
                          className={cn(
                            "w-full border outline-none border-greyborder focus:border-accent p-3 bg-white font-satoshi font-regular text-tiny cursor-pointer",
                            {
                              "border-error focus:border-error":
                                touched?.orientation && errors?.orientation,
                            }
                          )}
                          as="select"
                        >
                          <option value="">Select one</option>
                          <option value="portrait">Portrait</option>
                          <option value="landscape">Landscape</option>
                        </Field>
                        <ErrorMessage name="orientation">
                          {(msg) => (
                            <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className="w-full md:w-32 flex flex-col gap-y-2">
                        <label
                          htmlFor="currency"
                          className="font-satoshi font-medium text-small leading-100 tracking-normal"
                        >
                          Currency
                        </label>
                        <Field
                          id="currency"
                          name="currency"
                          className={cn(
                            "w-full border outline-none border-greyborder focus:border-accent p-3 bg-white font-satoshi font-regular text-tiny cursor-pointer",
                            {
                              "border-error focus:border-error":
                                touched?.currency && errors?.currency,
                            }
                          )}
                          as="select"
                        >
                          <option value="">Select one</option>
                          <option value="UGX">Uganda Shillings</option>
                          <option value="KSH">Kenyan Shillings</option>
                          <option value="USD">United States Dollar</option>
                          <option value="GBP">Great Britain Pound</option>
                        </Field>
                        <ErrorMessage name="currency">
                          {(msg) => (
                            <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>
                    </div>
                  </section>
                  <div className="pt-4 h-full">
                    <Button
                      type="submit"
                      className="hidden lg:block w-fit h-fit px-6 py-4 font-bold text-small"
                    >
                      Create Invoice
                    </Button>
                  </div>
                </div>

                <section className="grid grid-cols-1 lg:grid-cols-5 gap-x-2">
                  <section className="lg:col-span-4 flex flex-col gap-y-4">
                    {/* Billing */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-grey rounded p-4">
                      <section className="grid grid-cols-2 gap-2">
                        <h4 className="col-span-2 font-satoshi font-medium text-small leading-100 tracking-normal">
                          Billed From
                        </h4>
                        <div className="col-span-1 flex flex-col gap-y-2">
                          <Field
                            id="billed_from.name"
                            name="billed_from.name"
                            type="text"
                            className={cn(
                              "border border-greyborder focus:border-accent outline-none p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black",
                              {
                                "border-error focus:border-error":
                                  touched?.billed_from?.name &&
                                  errors?.billed_from?.name,
                              }
                            )}
                            placeholder="Name"
                          />
                          <ErrorMessage name="billed_from.name">
                            {(msg) => (
                              <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                                {msg}
                              </div>
                            )}
                          </ErrorMessage>
                        </div>
                        <div className="col-span-1 flex flex-col gap-y-2">
                          <Field
                            id="billed_from.email"
                            name="billed_from.email"
                            type="text"
                            className={cn(
                              "border border-greyborder focus:border-accent outline-none p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black",
                              {
                                "border-error focus:border-error":
                                  touched?.billed_from?.email &&
                                  errors?.billed_from?.email,
                              }
                            )}
                            placeholder="Email"
                          />
                          <ErrorMessage name="billed_from.email">
                            {(msg) => (
                              <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                                {msg}
                              </div>
                            )}
                          </ErrorMessage>
                        </div>
                        <div className="col-span-2 flex flex-col gap-y-2">
                          <Field
                            name="billed_from.address"
                            id="billed_from.address"
                            className={cn(
                              "resize-none border outline-none border-greyborder focus:border-accent p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black",
                              {
                                "border-error focus:border-error":
                                  touched?.billed_from?.address &&
                                  errors?.billed_from?.address,
                              }
                            )}
                            rows={3}
                            placeholder="Address"
                            as="textarea"
                          />
                          <ErrorMessage name="billed_from.address">
                            {(msg) => (
                              <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                                {msg}
                              </div>
                            )}
                          </ErrorMessage>
                        </div>
                      </section>
                      <section className="grid grid-cols-2 gap-2">
                        <h4 className="col-span-2 font-satoshi font-medium text-small leading-100 tracking-normal">
                          Billed To
                        </h4>
                        <div className="col-span-1 flex flex-col gap-y-2">
                          <Field
                            name="billed_to.name"
                            id="billed_to.name"
                            type="text"
                            className={cn(
                              "border border-greyborder focus:border-accent outline-none p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black",
                              {
                                "border-error focus:border-error":
                                  touched?.billed_to?.name &&
                                  errors?.billed_to?.name,
                              }
                            )}
                            placeholder="Name"
                          />
                          <ErrorMessage name="billed_to.name">
                            {(msg) => (
                              <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                                {msg}
                              </div>
                            )}
                          </ErrorMessage>
                        </div>
                        <div className="col-span-1 flex flex-col gap-y-2">
                          <Field
                            name="billed_to.email"
                            id="billed_to.email"
                            type="text"
                            className={cn(
                              "border border-greyborder focus:border-accent outline-none p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black",
                              {
                                "border-error focus:border-error":
                                  touched?.billed_to?.email &&
                                  errors?.billed_to?.email,
                              }
                            )}
                            placeholder="Email"
                          />
                          <ErrorMessage name="billed_to.email">
                            {(msg) => (
                              <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                                {msg}
                              </div>
                            )}
                          </ErrorMessage>
                        </div>
                        <div className="col-span-2 flex flex-col gap-y-2">
                          <Field
                            name="billed_to.address"
                            id="billed_to.address"
                            as="textarea"
                            className={cn(
                              "resize-none border outline-none border-greyborder focus:border-accent p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black",
                              {
                                "border-error focus:border-error":
                                  touched?.billed_to?.address &&
                                  errors?.billed_to?.address,
                              }
                            )}
                            rows={3}
                            placeholder="Address"
                          />
                          <ErrorMessage name="billed_to.address">
                            {(msg) => (
                              <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                                {msg}
                              </div>
                            )}
                          </ErrorMessage>
                        </div>
                      </section>
                    </div>
                    <div className="bg-grey rounded p-4 flex flex-col gap-y-4 w-full lg:hidden">
                      <div className="w-full flex flex-col gap-y-2">
                        <label
                          htmlFor="title"
                          className="font-satoshi font-medium text-tiny leading-100 tracking-normal"
                        >
                          Title
                        </label>
                        <Field
                          id="title"
                          name="title"
                          type="text"
                          placeholder="Title"
                          className={cn(
                            "w-full border border-greyborder focus:border-accent p-3 bg-white font-satoshi font-regular text-tiny outline-none placeholder-black",
                            {
                              "border-error focus:border-error":
                                touched?.title && errors?.title,
                            }
                          )}
                        />
                        <ErrorMessage name="title">
                          {(msg) => (
                            <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className="w-full flex flex-col gap-y-2">
                        <label
                          htmlFor="title"
                          className="font-satoshi font-medium text-tiny leading-100 tracking-normal"
                        >
                          # Invoice
                        </label>
                        <Field
                          id="invoice_no"
                          name="invoice_no"
                          type="text"
                          placeholder="00001"
                          className={cn(
                            "w-full border border-greyborder focus:border-accent p-3 bg-white font-satoshi font-regular text-tiny outline-none placeholder-black",
                            {
                              "border-error focus:border-error":
                                touched?.invoice_no && errors?.invoice_no,
                            }
                          )}
                        />
                        <ErrorMessage name="invoice_no">
                          {(msg) => (
                            <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className="w-full flex flex-col gap-y-2">
                        <label
                          htmlFor="issue_date"
                          className="font-satoshi font-medium text-tiny leading-100 tracking-normal"
                        >
                          Issue Date
                        </label>
                        <Field
                          id="issue_date"
                          name="issue_date"
                          type="date"
                          className={cn(
                            "w-full border border-greyborder focus:border-accent p-3 bg-white font-satoshi font-regular text-tiny outline-none placeholder-black",
                            {
                              "border-error focus:border-error":
                                touched?.issue_date && errors?.issue_date,
                            }
                          )}
                        />
                        <ErrorMessage name="issue_date">
                          {(msg) => (
                            <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className="w-full flex flex-col gap-y-2">
                        <label
                          htmlFor="due_date"
                          className="font-satoshi font-medium text-tiny leading-100 tracking-normal"
                        >
                          Due Date
                        </label>
                        <Field
                          id="due_date"
                          name="due_date"
                          type="date"
                          className={cn(
                            "w-full border border-greyborder focus:border-accent p-3 bg-white font-satoshi font-regular text-tiny outline-none placeholder-black",
                            {
                              "border-error focus:border-error":
                                touched?.due_date && errors?.due_date,
                            }
                          )}
                        />
                        <ErrorMessage name="due_date">
                          {(msg) => (
                            <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>
                    </div>

                    <FieldArray
                      name="items"
                      render={(arrayHelpers) => {
                        return (
                          <div className="bg-grey rounded p-4 w-full">
                            <div className="overflow-x-auto max-h-fit">
                              <table className="min-w-full table-auto max-w-full overflow-x-scroll">
                                <thead>
                                  <tr className="border-b border-b-greyborder">
                                    <th className="text-start font-satoshi font-normal text-tiny md:text-small leading-100 tracking-normal pb-2">
                                      Title
                                    </th>
                                    <th className="text-start font-satoshi font-normal text-tiny md:text-small leading-100 tracking-normal pb-2">
                                      Quantity
                                    </th>
                                    <th className="text-start font-satoshi font-normal text-tiny md:text-small leading-100 tracking-normal pb-2">
                                      Units
                                    </th>
                                    <th className="text-start font-satoshi font-normal text-tiny md:text-small leading-100 tracking-normal pb-2">
                                      Price/Unit
                                    </th>
                                    <th
                                      className="text-start font-satoshi font-normal text-tiny md:text-small leading-100 tracking-normal pb-2"
                                      colSpan="2"
                                    ></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {values.items.map((_, index) => {
                                    return editIndex === index ? (
                                      <tr key={index}>
                                        <td className="pr-4 py-2 align-text-top">
                                          <div className="w-[4.5rem] md:min-w-[4.5rem] md:w-full flex flex-col gap-y-2">
                                            <Field
                                              name={`items.${index}.title`}
                                              type="text"
                                              className={cn(
                                                "border border-greyborder focus:border-accent font-satoshi font-regular outline-none text-tiny leading-120 tracking-normal h-[2.5rem] p-3 placeholder-black",
                                                {
                                                  "border-error focus:border-error":
                                                    touched?.items?.[index]
                                                      ?.title &&
                                                    errors?.items?.[index]
                                                      ?.title,
                                                }
                                              )}
                                              placeholder="Title"
                                            />
                                            <ErrorMessage
                                              name={`items.${index}.title`}
                                            >
                                              {(msg) => (
                                                <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                                                  {msg}
                                                </div>
                                              )}
                                            </ErrorMessage>
                                          </div>
                                        </td>
                                        <td className="pr-4 py-2 align-text-top">
                                          <div className="w-[4.5rem] md:min-w-[4.5rem] md:w-full flex flex-col gap-y-2">
                                            <Field
                                              name={`items.${index}.quantity`}
                                              type="text"
                                              className={cn(
                                                "w-full h-[2.5rem] border border-greyborder focus:border-accent font-satoshi font-regular outline-none text-tiny leading-120 tracking-normal p-3 placeholder-black",
                                                {
                                                  "border-error focus:border-error":
                                                    touched?.items?.[index]
                                                      ?.quantity &&
                                                    errors?.items?.[index]
                                                      ?.quantity,
                                                }
                                              )}
                                              placeholder="Quantity"
                                            />
                                            <ErrorMessage
                                              name={`items.${index}.quantity`}
                                            >
                                              {(msg) => (
                                                <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                                                  {msg}
                                                </div>
                                              )}
                                            </ErrorMessage>
                                          </div>
                                        </td>
                                        <td className="pr-4 py-2 align-text-top">
                                          <div className="w-[4.5rem] md:min-w-[4.5rem] md:w-full flex flex-col gap-y-2">
                                            <Field
                                              name={`items.${index}.units`}
                                              type="text"
                                              className={cn(
                                                "border border-greyborder focus:border-accent font-satoshi font-regular outline-none text-tiny leading-120 tracking-normal h-[2.5rem] p-3 placeholder-black",
                                                {
                                                  "border-error focus:border-error":
                                                    touched?.items?.[index]
                                                      ?.units &&
                                                    errors?.items?.[index]
                                                      ?.units,
                                                }
                                              )}
                                              placeholder="Units"
                                            />
                                            <ErrorMessage
                                              name={`items.${index}.units`}
                                            >
                                              {(msg) => (
                                                <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                                                  {msg}
                                                </div>
                                              )}
                                            </ErrorMessage>
                                          </div>
                                        </td>
                                        <td className="pr-4 py-2 align-text-top">
                                          <div className="w-[4.5rem] md:min-w-[4.5rem] h-full md:w-full flex flex-col gap-y-2">
                                            <Field
                                              name={`items.${index}.price`}
                                              type="text"
                                              className={cn(
                                                "border border-greyborder focus:border-accent font-satoshi font-regular outline-none text-tiny leading-120 tracking-normal h-[2.5rem] p-3 placeholder-black",
                                                {
                                                  "border-error focus:border-error":
                                                    touched?.items?.[index]
                                                      ?.price &&
                                                    errors?.items?.[index]
                                                      ?.price,
                                                }
                                              )}
                                              placeholder="Price"
                                            />
                                            <ErrorMessage
                                              name={`items.${index}.price`}
                                            >
                                              {(msg) => (
                                                <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                                                  {msg}
                                                </div>
                                              )}
                                            </ErrorMessage>
                                          </div>
                                        </td>
                                        <td
                                          className="text-start font-satoshi font-medium text-tiny leading-120 tracking-normal pr-4 py-2 align-text-top"
                                          colSpan={2}
                                        >
                                          <Button
                                            type="button"
                                            className="w-fit px-6 py-3 font-medium text-[0.5rem] lg:text-tiny outline-none underline"
                                            kind="plain"
                                            onClick={() => {
                                              const sub_total =
                                                calculateSubTotal(values.items);
                                              const amount_due =
                                                calculateAmountDue({
                                                  ...values,
                                                  sub_total,
                                                });
                                              const balance_due =
                                                calculateBalanceDue({
                                                  ...values,
                                                  sub_total,
                                                  amount_due,
                                                });

                                              setFieldValue(
                                                "sub_total",
                                                sub_total
                                              );
                                              setFieldValue(
                                                "amount_due",
                                                amount_due
                                              );
                                              setFieldValue(
                                                "balance_due",
                                                balance_due
                                              );
                                              setEditIndex(() => null);
                                            }}
                                            disabled={
                                              !touched.items?.[index] ||
                                              (errors.items?.[index] &&
                                                touched.items?.[index])
                                            }
                                          >
                                            Save
                                          </Button>
                                        </td>
                                      </tr>
                                    ) : addItem === index ? (
                                      <tr key={index}>
                                        <td className="pr-4 py-2 align-text-top">
                                          <div className="w-[4.5rem] md:min-w-[4.5rem] md:w-full flex flex-col gap-y-2">
                                            <Field
                                              name={`items.${index}.title`}
                                              type="text"
                                              className={cn(
                                                "border border-greyborder focus:border-accent font-satoshi font-regular outline-none text-tiny leading-120 tracking-normal h-[2.5rem] p-3 placeholder-black",
                                                {
                                                  "border-error focus:border-error":
                                                    touched?.items?.[index]
                                                      ?.title &&
                                                    errors?.items?.[index]
                                                      ?.title,
                                                }
                                              )}
                                              placeholder="Title"
                                            />
                                            <ErrorMessage
                                              name={`items.${index}.title`}
                                            >
                                              {(msg) => (
                                                <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                                                  {msg}
                                                </div>
                                              )}
                                            </ErrorMessage>
                                          </div>
                                        </td>
                                        <td className="pr-4 py-2 align-text-top">
                                          <div className="w-[4.5rem] md:min-w-[4.5rem] md:w-full flex flex-col gap-y-2">
                                            <Field
                                              name={`items.${index}.quantity`}
                                              type="text"
                                              className={cn(
                                                "border border-greyborder focus:border-accent font-satoshi font-regular outline-none text-tiny leading-120 tracking-normal h-[2.5rem] p-3 placeholder-black",
                                                {
                                                  "border-error focus:border-error":
                                                    touched?.items?.[index]
                                                      ?.quantity &&
                                                    errors?.items?.[index]
                                                      ?.quantity,
                                                }
                                              )}
                                              placeholder="Quantity"
                                            />
                                            <ErrorMessage
                                              name={`items.${index}.quantity`}
                                            >
                                              {(msg) => (
                                                <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                                                  {msg}
                                                </div>
                                              )}
                                            </ErrorMessage>
                                          </div>
                                        </td>
                                        <td className="pr-4 py-2 align-text-top">
                                          <div className="w-[4.5rem] md:min-w-[4.5rem] md:w-full flex flex-col gap-y-2">
                                            <Field
                                              name={`items.${index}.units`}
                                              type="text"
                                              className={cn(
                                                "border border-greyborder focus:border-accent font-satoshi font-regular outline-none text-tiny leading-120 tracking-normal h-[2.5rem] p-3 placeholder-black",
                                                {
                                                  "border-error focus:border-error":
                                                    touched?.items?.[index]
                                                      ?.units &&
                                                    errors?.items?.[index]
                                                      ?.units,
                                                }
                                              )}
                                              placeholder="Units"
                                            />
                                            <ErrorMessage
                                              name={`items.${index}.units`}
                                            >
                                              {(msg) => (
                                                <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                                                  {msg}
                                                </div>
                                              )}
                                            </ErrorMessage>
                                          </div>
                                        </td>
                                        <td className="pr-4 py-2 align-text-top">
                                          <div className="w-[4.5rem] md:min-w-[4.5rem] md:w-full flex flex-col gap-y-2">
                                            <Field
                                              name={`items.${index}.price`}
                                              className={cn(
                                                "border border-greyborder focus:border-accent font-satoshi font-regular outline-none text-tiny leading-120 tracking-normal h-[2.5rem] p-3 placeholder-black",
                                                {
                                                  "border-error focus:border-error":
                                                    touched?.items?.[index]
                                                      ?.price &&
                                                    errors?.items?.[index]
                                                      ?.price,
                                                }
                                              )}
                                              placeholder="Price"
                                            />
                                            <ErrorMessage
                                              name={`items.${index}.price`}
                                            >
                                              {(msg) => (
                                                <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                                                  {msg}
                                                </div>
                                              )}
                                            </ErrorMessage>
                                          </div>
                                        </td>
                                        <td
                                          className="align-text-top font-satoshi font-medium text-tiny leading-120 tracking-normal pr-4 py-2"
                                          colSpan={2}
                                        >
                                          <Button
                                            type="button"
                                            className="w-fit px-6 py-3 font-medium text-[0.5rem] lg:text-tiny outline-none underline"
                                            kind="plain"
                                            onClick={() => {
                                              const sub_total =
                                                calculateSubTotal(values.items);
                                              const amount_due =
                                                calculateAmountDue({
                                                  ...values,
                                                  sub_total,
                                                });
                                              const balance_due =
                                                calculateBalanceDue({
                                                  ...values,
                                                  sub_total,
                                                  amount_due,
                                                });

                                              setFieldValue(
                                                "sub_total",
                                                sub_total
                                              );
                                              setFieldValue(
                                                "amount_due",
                                                amount_due
                                              );
                                              setFieldValue(
                                                "balance_due",
                                                balance_due
                                              );
                                              setAddItem(() => null);
                                            }}
                                            disabled={
                                              !touched.items?.[index] ||
                                              (errors.items?.[index] &&
                                                touched.items?.[index])
                                            }
                                          >
                                            Save
                                          </Button>
                                        </td>
                                      </tr>
                                    ) : (
                                      <tr key={index}>
                                        <td className="text-start font-satoshi font-medium text-tiny leading-120 tracking-normal pr-4 py-2">
                                          {values.items[index]["title"]}
                                        </td>
                                        <td className="text-start font-satoshi font-medium text-tiny leading-120 tracking-normal pr-4 py-2">
                                          {values.items[index]["quantity"]}
                                        </td>
                                        <td className="text-start font-satoshi font-medium text-tiny leading-120 tracking-normal pr-4 py-2">
                                          {values.items[index]["units"]}
                                        </td>
                                        <td className="text-start font-satoshi font-medium text-tiny leading-120 tracking-normal pr-4 py-2">
                                          {values.items[index]["price"]}
                                        </td>
                                        <td className="text-start font-satoshi font-medium text-tiny leading-120 tracking-normal pr-4 py-2">
                                          <button
                                            type="button"
                                            className="font-satoshi font-normal underline text-error leading-100 tracking-normal capitalize text-tiny outline-none"
                                            onClick={async () => {
                                              const items = JSON.parse(
                                                JSON.stringify(values.items)
                                              );
                                              const sub_total =
                                                await items.reduce(
                                                  (
                                                    acc,
                                                    { quantity, price },
                                                    currentIndex
                                                  ) =>
                                                    currentIndex === index
                                                      ? acc
                                                      : quantity * price + acc,
                                                  0
                                                );
                                              if (sub_total >= 0) {
                                                arrayHelpers.remove(index);
                                                setFieldValue(
                                                  "sub_total",
                                                  sub_total
                                                );
                                              }
                                            }}
                                            disabled={values.items?.length <= 1}
                                          >
                                            Delete
                                          </button>
                                        </td>
                                        <td className="text-start font-satoshi font-medium text-tiny leading-120 tracking-normal pr-4 py-2">
                                          <button
                                            type="button"
                                            className="font-satoshi font-normal underline text-black leading-100 tracking-normal capitalize text-tiny"
                                            onClick={() =>
                                              setEditIndex(() => index)
                                            }
                                          >
                                            Edit
                                          </button>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                            {!addItem && (
                              <Button
                                type="button"
                                className="my-2 px-3 py-1.5 font-satoshi font-medium text-tiny leading-100 tracking-normal outline-none"
                                onClick={() => {
                                  const totalItems = values.items.length;
                                  arrayHelpers.push({
                                    title: "",
                                    quantity: "",
                                    units: "",
                                    price: "",
                                  });
                                  setAddItem(() => totalItems);
                                }}
                              >
                                Add Item
                              </Button>
                            )}
                          </div>
                        );
                      }}
                    />

                    <div className="bg-grey rounded p-4 flex flex-col gap-y-4 w-full lg:hidden">
                      <div className="flex justify-between py-2">
                        <span className="font-satoshi font-normal text-tiny leading-100 tracking-normal">
                          Sub Total
                        </span>
                        <span className="font-satoshi font-medium text-tiny leading-120 tracking-normal">
                          ${values.sub_total}
                        </span>
                      </div>
                      <hr className="border-b border-t-0 border-greyborder" />
                      <div className="w-full flex flex-col gap-y-2">
                        <label
                          htmlFor="discount"
                          className="font-satoshi font-normal text-tiny leading-100 tracking-normal"
                        >
                          Discount
                        </label>
                        <Field
                          id="discount"
                          name="discount"
                          type="text"
                          placeholder="Discount"
                          className="w-full border border-greyborder focus:border-accent p-3 bg-white font-satoshi font-regular text-tiny outline-none placeholder-black"
                          onChange={({ target: { name, value } }) => {
                            setFieldValue(name, value);
                            const amount_due = calculateAmountDue({
                              ...values,
                              discount: value,
                            });
                            const balance_due = calculateBalanceDue({
                              ...values,
                              discount: value,
                              amount_due,
                            });

                            setFieldValue("amount_due", amount_due);
                            setFieldValue("balance_due", balance_due);
                          }}
                        />
                      </div>
                      <div className="w-full flex flex-col gap-y-2">
                        <label
                          htmlFor="tax"
                          className="font-satoshi font-normal text-tiny leading-100 tracking-normal"
                        >
                          Tax
                        </label>
                        <Field
                          id="tax"
                          name="tax"
                          type="text"
                          placeholder="Tax"
                          className="w-full border border-greyborder focus:border-accent p-3 bg-white font-satoshi font-regular text-tiny outline-none placeholder-black"
                          onChange={({ target: { name, value } }) => {
                            setFieldValue(name, value);
                            const amount_due = calculateAmountDue({
                              ...values,
                              tax: value,
                            });
                            const balance_due = calculateBalanceDue({
                              ...values,
                              tax: value,
                              amount_due,
                            });

                            setFieldValue("amount_due", amount_due);
                            setFieldValue("balance_due", balance_due);
                          }}
                        />
                      </div>
                      <div className="w-full flex flex-col gap-y-2">
                        <label
                          htmlFor="shipping"
                          className="font-satoshi font-normal text-tiny leading-100 tracking-normal"
                        >
                          Shipping
                        </label>
                        <Field
                          id="shipping"
                          name="shipping"
                          type="text"
                          placeholder="Shipping"
                          className="w-full border border-greyborder focus:border-accent p-3 bg-white font-satoshi font-regular text-tiny outline-none placeholder-black"
                          onChange={({ target: { name, value } }) => {
                            setFieldValue(name, value);
                            const amount_due = calculateAmountDue({
                              ...values,
                              shipping: value,
                            });
                            const balance_due = calculateBalanceDue({
                              ...values,
                              shipping: value,
                              amount_due,
                            });

                            setFieldValue("amount_due", amount_due);
                            setFieldValue("balance_due", balance_due);
                          }}
                        />
                      </div>

                      <hr className="border-b border-t-0 border-greyborder" />
                      <div className="flex justify-between py-2">
                        <span className="font-satoshi font-normal text-tiny leading-100 tracking-normal">
                          Amount Due
                        </span>
                        <span className="font-satoshi font-medium text-tiny leading-120 tracking-normal">
                          ${values.amount_due ?? 0}
                        </span>
                      </div>
                      <hr className="border-b border-t-0 border-greyborder" />

                      <div className="w-full flex flex-col gap-y-2">
                        <label
                          htmlFor="amount_paid"
                          className="font-satoshi font-normal text-tiny leading-100 tracking-normal"
                        >
                          Amount Paid
                        </label>
                        <Field
                          id="amount_paid"
                          name="amount_paid"
                          type="text"
                          placeholder="Amount Paid"
                          className="w-full border border-greyborder focus:border-accent p-3 bg-white font-satoshi font-regular text-tiny outline-none placeholder-black"
                          onChange={({ target: { name, value } }) => {
                            const balance_due = calculateBalanceDue({
                              ...values,
                              amount_paid: value,
                            });
                            setFieldValue("balance_due", balance_due);
                            setFieldValue(name, value);
                          }}
                        />
                      </div>

                      <hr className="border-b border-t-0 border-greyborder" />
                      <div className="flex justify-between py-2">
                        <span className="font-satoshi font-normal text-tiny leading-100 tracking-normal">
                          Balance Due
                        </span>
                        <span className="font-satoshi font-medium text-tiny leading-120 tracking-normal">
                          ${values.balance_due ?? 0}
                        </span>
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="lg:col-span-4 grid grid-cols-1 lg:grid-cols-2 gap-4 bg-grey rounded p-4">
                      <section className="flex flex-col gap-2">
                        <label
                          htmlFor="notes"
                          className="font-satoshi font-regular text-tiny leading-100 tracking-normal"
                        >
                          Notes
                        </label>
                        <Field
                          as="textarea"
                          name="notes"
                          id="notes"
                          className="col-span-2 resize-none border outline-none border-greyborder focus:border-accent p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black"
                          rows={3}
                          placeholder="Notes"
                        />
                      </section>
                      <section className="flex flex-col gap-2">
                        <label
                          htmlFor="terms"
                          className="font-satoshi font-regular text-tiny leading-100 tracking-normal"
                        >
                          Terms & conditions
                        </label>
                        <Field
                          as="textarea"
                          name="terms"
                          id="terms"
                          className="col-span-2 resize-none border outline-none border-greyborder focus:border-accent p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black"
                          rows={3}
                          placeholder="Terms & Conditions"
                        />
                      </section>
                    </div>
                  </section>
                  <section className="hidden lg:col-span-1 lg:flex lg:flex-col lg:gap-y-4">
                    <div className="bg-grey rounded p-4 flex flex-col gap-y-4 w-full">
                      <div className="w-full flex flex-col gap-y-2">
                        <label
                          htmlFor="title"
                          className="font-satoshi font-medium text-tiny leading-100 tracking-normal"
                        >
                          Title
                        </label>
                        <Field
                          id="title"
                          name="title"
                          type="text"
                          placeholder="Title"
                          className={cn(
                            "w-full border border-greyborder focus:border-accent p-3 bg-white font-satoshi font-regular text-tiny outline-none placeholder-black",
                            {
                              "border-error focus:border-error":
                                touched?.title && errors?.title,
                            }
                          )}
                        />
                        <ErrorMessage name="title">
                          {(msg) => (
                            <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className="w-full flex flex-col gap-y-2">
                        <label
                          htmlFor="title"
                          className="font-satoshi font-medium text-tiny leading-100 tracking-normal"
                        >
                          # Invoice
                        </label>
                        <Field
                          id="invoice_no"
                          name="invoice_no"
                          type="text"
                          placeholder="00001"
                          className={cn(
                            "w-full border border-greyborder focus:border-accent p-3 bg-white font-satoshi font-regular text-tiny outline-none placeholder-black",
                            {
                              "border-error focus:border-error":
                                touched?.invoice_no && errors?.invoice_no,
                            }
                          )}
                        />
                        <ErrorMessage name="invoice_no">
                          {(msg) => (
                            <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className="w-full flex flex-col gap-y-2">
                        <label
                          htmlFor="issue_date"
                          className="font-satoshi font-medium text-tiny leading-100 tracking-normal"
                        >
                          Issue Date
                        </label>
                        <Field
                          id="issue_date"
                          name="issue_date"
                          type="date"
                          className={cn(
                            "w-full border border-greyborder focus:border-accent p-3 bg-white font-satoshi font-regular text-tiny outline-none placeholder-black",
                            {
                              "border-error focus:border-error":
                                touched?.issue_date && errors?.issue_date,
                            }
                          )}
                        />
                        <ErrorMessage name="issue_date">
                          {(msg) => (
                            <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className="w-full flex flex-col gap-y-2">
                        <label
                          htmlFor="due_date"
                          className="font-satoshi font-medium text-tiny leading-100 tracking-normal"
                        >
                          Due Date
                        </label>
                        <Field
                          id="due_date"
                          name="due_date"
                          type="date"
                          className={cn(
                            "w-full border border-greyborder focus:border-accent p-3 bg-white font-satoshi font-regular text-tiny outline-none placeholder-black",
                            {
                              "border-error focus:border-error":
                                touched?.due_date && errors?.due_date,
                            }
                          )}
                        />
                        <ErrorMessage name="due_date">
                          {(msg) => (
                            <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>
                    </div>
                    <div className="bg-grey rounded p-4 flex flex-col gap-y-4 w-full">
                      <div className="flex justify-between py-2">
                        <span className="font-satoshi font-normal text-tiny leading-100 tracking-normal">
                          Sub Total
                        </span>
                        <span className="font-satoshi font-medium text-tiny leading-120 tracking-normal">
                          ${values.sub_total}
                        </span>
                      </div>

                      <hr className="border-b border-t-0 border-greyborder" />
                      <div className="w-full flex flex-col gap-y-2">
                        <label
                          htmlFor="discount"
                          className="font-satoshi font-normal text-tiny leading-100 tracking-normal"
                        >
                          Discount
                        </label>
                        <Field
                          id="discount"
                          name="discount"
                          type="text"
                          placeholder="Discount"
                          className={cn(
                            "w-full border border-greyborder focus:border-accent p-3 bg-white font-satoshi font-regular text-tiny outline-none placeholder-black",
                            {
                              "border-error focus:border-error":
                                touched?.discount && errors?.discount,
                            }
                          )}
                          onChange={({ target: { name, value } }) => {
                            setFieldValue(name, value);
                            const amount_due = calculateAmountDue({
                              ...values,
                              discount: value,
                            });
                            const balance_due = calculateBalanceDue({
                              ...values,
                              discount: value,
                              amount_due,
                            });

                            setFieldValue("amount_due", amount_due);
                            setFieldValue("balance_due", balance_due);
                          }}
                        />
                        <ErrorMessage name="discount">
                          {(msg) => (
                            <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className="w-full flex flex-col gap-y-2">
                        <label
                          htmlFor="tax"
                          className="font-satoshi font-normal text-tiny leading-100 tracking-normal"
                        >
                          Tax
                        </label>
                        <Field
                          id="tax"
                          name="tax"
                          type="text"
                          placeholder="Tax"
                          className={cn(
                            "w-full border border-greyborder focus:border-accent p-3 bg-white font-satoshi font-regular text-tiny outline-none placeholder-black",
                            {
                              "border-error focus:border-error":
                                touched?.tax && errors?.tax,
                            }
                          )}
                          onChange={({ target: { name, value } }) => {
                            setFieldValue(name, value);
                            const amount_due = calculateAmountDue({
                              ...values,
                              tax: value,
                            });
                            const balance_due = calculateBalanceDue({
                              ...values,
                              tax: value,
                              amount_due,
                            });

                            setFieldValue("amount_due", amount_due);
                            setFieldValue("balance_due", balance_due);
                          }}
                        />
                        <ErrorMessage name="tax">
                          {(msg) => (
                            <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className="w-full flex flex-col gap-y-2">
                        <label
                          htmlFor="shipping"
                          className="font-satoshi font-normal text-tiny leading-100 tracking-normal"
                        >
                          Shipping
                        </label>
                        <Field
                          id="shipping"
                          name="shipping"
                          type="text"
                          placeholder="Shipping"
                          className={cn(
                            "w-full border border-greyborder focus:border-accent p-3 bg-white font-satoshi font-regular text-tiny outline-none placeholder-black",
                            {
                              "border-error focus:border-error":
                                touched?.shipping && errors?.shipping,
                            }
                          )}
                          onChange={({ target: { name, value } }) => {
                            setFieldValue(name, value);
                            const amount_due = calculateAmountDue({
                              ...values,
                              shipping: value,
                            });
                            const balance_due = calculateBalanceDue({
                              ...values,
                              shipping: value,
                              amount_due,
                            });

                            setFieldValue("amount_due", amount_due);
                            setFieldValue("balance_due", balance_due);
                          }}
                        />
                        <ErrorMessage name="shipping">
                          {(msg) => (
                            <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>

                      <hr className="border-b border-t-0 border-greyborder" />
                      <div className="flex justify-between py-2">
                        <span className="font-satoshi font-normal text-tiny leading-100 tracking-normal">
                          Amount Due
                        </span>
                        <span className="font-satoshi font-medium text-tiny leading-120 tracking-normal">
                          ${values.amount_due ?? 0}
                        </span>
                      </div>
                      <hr className="border-b border-t-0 border-greyborder" />

                      <div className="w-full flex flex-col gap-y-2">
                        <label
                          htmlFor="amount_paid"
                          className="font-satoshi font-normal text-tiny leading-100 tracking-normal"
                        >
                          Amount Paid
                        </label>
                        <Field
                          id="amount_paid"
                          name="amount_paid"
                          type="text"
                          placeholder="Amount Paid"
                          className={cn(
                            "w-full border border-greyborder focus:border-accent p-3 bg-white font-satoshi font-regular text-tiny outline-none placeholder-black",
                            {
                              "border-error focus:border-error":
                                touched?.amount_paid && errors?.amount_paid,
                            }
                          )}
                          onChange={({ target: { name, value } }) => {
                            const balance_due = calculateBalanceDue({
                              ...values,
                              amount_paid: value,
                            });
                            setFieldValue("balance_due", balance_due);
                            setFieldValue(name, value);
                          }}
                        />
                        <ErrorMessage name="amount_paid">
                          {(msg) => (
                            <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>

                      <hr className="border-b border-t-0 border-greyborder" />
                      <div className="flex justify-between py-2">
                        <span className="font-satoshi font-normal text-tiny leading-100 tracking-normal">
                          Balance Due
                        </span>
                        <span className="font-satoshi font-medium text-tiny leading-120 tracking-normal">
                          ${values.balance_due ?? 0}
                        </span>
                      </div>
                    </div>
                  </section>
                </section>
                <Button
                  type="submit"
                  // disabled={!(isValid && dirty) || isSubmitting}
                  className="font-satoshi font-bold text-small leading-100 tracking-normal py-3 lg:hidden"
                >
                  Create Invoice
                </Button>
                {/* {preview && path && (
                  <InvoicePreview
                    preview={preview}
                    togglePreview={togglePreview}
                    data={values}
                    path={path}
                  />
                )} */}
              </Form>
            );
          }}
        </Formik>
      </main>
    </ContentViewAreaWrapper>
  );
};

export default NewInvoice;
