import { useState } from "react";
import { ContentViewAreaWrapper } from "../../Layouts/components";
import { Button } from "../../components/common/forms";
import { Formik, Field, Form, FieldArray } from "formik";
import { AiOutlineClose } from "react-icons/ai";
import getBase64 from "../../utils/getBase64";
import { newInvoiceSchema } from "../../utils/validators";
import cn from "../../utils/cn";

const calculateSubTotal = (items) =>
  items.reduce((acc, { quantity, price }) => {
    const total = quantity * price;
    return acc + total;
  }, 0);

const calculateAmountDue = ({ tax, shipping, discount, sub_total }) =>
  sub_total + tax + shipping - discount;

const calculateBalance = ({ amount_due, amount_paid }) =>
  amount_paid - amount_due;

const NewInvoice = () => {
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
    subtotal: 0,
    discount: null,
    tax: null,
    shipping: null,
    amount_due: 0,
    amount_paid: null,
    balance_due: null,
    notes: null,
    terms: null,
  };
  const handleSubmit = () => {};

  return (
    <ContentViewAreaWrapper>
      <section className="flex h-fit flex-shrink-0 flex-col gap-y-2">
        <header className="flex flex-col gap-y-2">
          <h1 className="font-archivo font-normal text-xl md:text-4xl leading-110 tracking-normal">
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
                <div className="flex justify-between items-start h-fit md:items-end w-full p-4 bg-grey rounded md:h-24 flex-wrap gap-y-2">
                  <section className="flex flex-1 md:flex-none w-fit gap-x-4 items-start">
                    {values?.logo ? (
                      <div className="relative w-24 group">
                        <button
                          className="cursor-pointer p-1 absolute -top-3 -right-3 lg:-top-10 bg-grey w-fit h-fit rounded-full flex lg:hidden lg:group-hover:flex justify-center items-center z-10 border border-greyborder"
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
                          "bg-white border border-greyborder w-24 h-24 flex justify-center items-center cursor-pointer p-2 md:-mt-7",
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

                    <div className="flex-1 flex flex-col md:flex-row md:gap-x-4 md:items-end bg-grey gap-y-4">
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
                      </div>
                    </div>
                  </section>
                  <Button
                    type="button"
                    className="hidden md:block w-fit h-fit px-6 py-4 font-bold text-small"
                    disabled={true}
                  >
                    Download Now
                  </Button>
                </div>
                <section className="grid grid-cols-1 lg:grid-cols-5 gap-x-2">
                  <section className="lg:col-span-4 flex flex-col gap-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-grey rounded p-4">
                      <section className="grid grid-cols-2 gap-2">
                        <h4 className="col-span-2 font-satoshi font-medium text-small leading-100 tracking-normal">
                          Billed From
                        </h4>
                        <Field
                          id="billed_from.name"
                          name="billed_from.name"
                          type="text"
                          className={cn(
                            "col-span-1 border border-greyborder focus:border-accent outline-none p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black",
                            {
                              "border-error focus:border-error":
                                touched?.billed_from?.name &&
                                errors?.billed_from?.name,
                            }
                          )}
                          placeholder="Name"
                        />
                        <Field
                          id="billed_from.email"
                          name="billed_from.email"
                          type="text"
                          className={cn(
                            "col-span-1 border border-greyborder focus:border-accent outline-none p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black",
                            {
                              "border-error focus:border-error":
                                touched?.billed_from?.email &&
                                errors?.billed_from?.email,
                            }
                          )}
                          placeholder="Email"
                        />
                        <Field
                          name="billed_from.address"
                          id="billed_from.address"
                          className={cn(
                            "col-span-2 resize-none border outline-none border-greyborder focus:border-accent p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black",
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
                      </section>
                      <section className="grid grid-cols-2 gap-2">
                        <h4 className="col-span-2 font-satoshi font-medium text-small leading-100 tracking-normal">
                          Billed To
                        </h4>
                        <Field
                          name="billed_to.name"
                          id="billed_to.name"
                          type="text"
                          className={cn(
                            "col-span-1 border border-greyborder focus:border-accent outline-none p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black",
                            {
                              "border-error focus:border-error":
                                touched?.billed_to?.name &&
                                errors?.billed_to?.name,
                            }
                          )}
                          placeholder="Name"
                        />
                        <Field
                          name="billed_to.email"
                          id="billed_to.email"
                          type="text"
                          className={cn(
                            "col-span-1 border border-greyborder focus:border-accent outline-none p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black",
                            {
                              "border-error focus:border-error":
                                touched?.billed_to?.email &&
                                errors?.billed_to?.email,
                            }
                          )}
                          placeholder="Email"
                        />
                        <Field
                          name="billed_to.address"
                          id="billed_to.address"
                          as="textarea"
                          className={cn(
                            "col-span-2 resize-none border outline-none border-greyborder focus:border-accent p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black",
                            {
                              "border-error focus:border-error":
                                touched?.billed_to?.address &&
                                errors?.billed_to?.address,
                            }
                          )}
                          rows={3}
                          placeholder="Address"
                        />
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
                                        <td className="text-start pr-4 py-2">
                                          <Field
                                            name={`items.${index}.title`}
                                            type="text"
                                            className={cn(
                                              "border border-greyborder focus:border-accent font-satoshi font-regular outline-none text-tiny leading-120 tracking-normal w-[4.5rem] md:min-w-[4.5rem] md:w-full h-[2.5rem] p-3 placeholder-black",
                                              {
                                                "border-error focus:border-error":
                                                  touched?.items?.[index]
                                                    ?.title &&
                                                  errors?.items?.[index]?.title,
                                              }
                                            )}
                                            placeholder="Title"
                                          />
                                        </td>
                                        <td className="text-start pr-4 py-2">
                                          <Field
                                            name={`items.${index}.quantity`}
                                            type="text"
                                            className={cn(
                                              "border border-greyborder focus:border-accent font-satoshi font-regular outline-none text-tiny leading-120 tracking-normal w-[4.5rem] md:min-w-[4.5rem] md:w-full h-[2.5rem] p-3 placeholder-black",
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
                                        </td>
                                        <td className="text-start pr-4 py-2">
                                          <Field
                                            name={`items.${index}.units`}
                                            type="text"
                                            className={cn(
                                              "border border-greyborder focus:border-accent font-satoshi font-regular outline-none text-tiny leading-120 tracking-normal w-[4.5rem] md:min-w-[4.5rem] md:w-full h-[2.5rem] p-3 placeholder-black",
                                              {
                                                "border-error focus:border-error":
                                                  touched?.items?.[index]
                                                    ?.units &&
                                                  errors?.items?.[index]?.units,
                                              }
                                            )}
                                            placeholder="Units"
                                          />
                                        </td>
                                        <td className="text-start pr-4 py-2">
                                          <Field
                                            name={`items.${index}.price`}
                                            type="text"
                                            className={cn(
                                              "border border-greyborder focus:border-accent font-satoshi font-regular outline-none text-tiny leading-120 tracking-normal w-[4.5rem] md:min-w-[4.5rem] md:w-full h-[2.5rem] p-3 placeholder-black",
                                              {
                                                "border-error focus:border-error":
                                                  touched?.items?.[index]
                                                    ?.price &&
                                                  errors?.items?.[index]?.price,
                                              }
                                            )}
                                            placeholder="Price"
                                          />
                                        </td>
                                        <td
                                          className="text-start font-satoshi font-medium text-tiny leading-120 tracking-normal pr-4 py-2"
                                          colSpan={2}
                                        >
                                          <Button
                                            type="button"
                                            className="w-fit px-6 py-3 font-medium text-[0.5rem] lg:text-tiny outline-none"
                                            kind="plain"
                                            onClick={() => {
                                              const subtotal =
                                                calculateSubTotal(values.items);
                                              setFieldValue(
                                                "subtotal",
                                                subtotal
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
                                      <tr>
                                        <td className="text-start pr-4 py-2">
                                          <Field
                                            name={`items.${index}.title`}
                                            type="text"
                                            className={cn(
                                              "border border-greyborder focus:border-accent font-satoshi font-regular outline-none text-tiny leading-120 tracking-normal w-[4.5rem] md:min-w-[4.5rem] md:w-full h-[2.5rem] p-3 placeholder-black",
                                              {
                                                "border-error focus:border-error":
                                                  touched?.items?.[index]
                                                    ?.title &&
                                                  errors?.items?.[index]?.title,
                                              }
                                            )}
                                            placeholder="Title"
                                          />
                                        </td>
                                        <td className="text-start pr-4 py-2">
                                          <Field
                                            name={`items.${index}.quantity`}
                                            type="text"
                                            className={cn(
                                              "border border-greyborder focus:border-accent font-satoshi font-regular outline-none text-tiny leading-120 tracking-normal w-[4.5rem] md:min-w-[4.5rem] md:w-full h-[2.5rem] p-3 placeholder-black",
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
                                        </td>
                                        <td className="text-start pr-4 py-2">
                                          <Field
                                            name={`items.${index}.units`}
                                            type="text"
                                            className={cn(
                                              "border border-greyborder focus:border-accent font-satoshi font-regular outline-none text-tiny leading-120 tracking-normal w-[4.5rem] md:min-w-[4.5rem] md:w-full h-[2.5rem] p-3 placeholder-black",
                                              {
                                                "border-error focus:border-error":
                                                  touched?.items?.[index]
                                                    ?.units &&
                                                  errors?.items?.[index]?.units,
                                              }
                                            )}
                                            placeholder="Units"
                                          />
                                        </td>
                                        <td className="text-start pr-4 py-2">
                                          <Field
                                            name={`items.${index}.price`}
                                            className={cn(
                                              "border border-greyborder focus:border-accent font-satoshi font-regular outline-none text-tiny leading-120 tracking-normal w-[4.5rem] md:min-w-[4.5rem] md:w-full h-[2.5rem] p-3 placeholder-black",
                                              {
                                                "border-error focus:border-error":
                                                  touched?.items?.[index]
                                                    ?.price &&
                                                  errors?.items?.[index]?.price,
                                              }
                                            )}
                                            placeholder="Price"
                                          />
                                        </td>
                                        <td
                                          className="text-start font-satoshi font-medium text-tiny leading-120 tracking-normal pr-4 py-2"
                                          colSpan={2}
                                        >
                                          <Button
                                            type="button"
                                            className="w-fit px-6 py-3 font-medium text-[0.5rem] lg:text-tiny outline-none"
                                            kind="plain"
                                            onClick={() => {
                                              const subtotal =
                                                calculateSubTotal(values.items);
                                              setFieldValue(
                                                "subtotal",
                                                subtotal
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
                                              const subtotal =
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
                                              if (subtotal >= 0) {
                                                arrayHelpers.remove(index);
                                                setFieldValue(
                                                  "subtotal",
                                                  subtotal
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
                          ${values.subtotal}
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
                        />
                      </div>

                      <hr className="border-b border-t-0 border-greyborder" />
                      <div className="flex justify-between py-2">
                        <span className="font-satoshi font-normal text-tiny leading-100 tracking-normal">
                          Amount Due
                        </span>
                        <span className="font-satoshi font-medium text-tiny leading-120 tracking-normal">
                          $2500
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
                        />
                      </div>

                      <hr className="border-b border-t-0 border-greyborder" />
                      <div className="flex justify-between py-2">
                        <span className="font-satoshi font-normal text-tiny leading-100 tracking-normal">
                          Balance Due
                        </span>
                        <span className="font-satoshi font-medium text-tiny leading-120 tracking-normal">
                          $2500
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
                        <textarea
                          name="notes"
                          id="notes"
                          className="col-span-2 resize-none border outline-none border-greyborder focus:border-accent p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black"
                          rows={3}
                          placeholder="Notes"
                        ></textarea>
                      </section>
                      <section className="flex flex-col gap-2">
                        <label
                          htmlFor="terms"
                          className="font-satoshi font-regular text-tiny leading-100 tracking-normal"
                        >
                          Terms & conditions
                        </label>
                        <textarea
                          name="terms"
                          id="terms"
                          className="col-span-2 resize-none border outline-none border-greyborder focus:border-accent p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black"
                          rows={3}
                          placeholder="Terms & Conditions"
                        ></textarea>
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
                      </div>
                    </div>
                    <div className="bg-grey rounded p-4 flex flex-col gap-y-4 w-full">
                      <div className="flex justify-between py-2">
                        <span className="font-satoshi font-normal text-tiny leading-100 tracking-normal">
                          Sub Total
                        </span>
                        <span className="font-satoshi font-medium text-tiny leading-120 tracking-normal">
                          ${values.subtotal}
                        </span>
                      </div>

                      {/* Separator */}
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
                          className={cn(
                            "w-full border border-greyborder focus:border-accent p-3 bg-white font-satoshi font-regular text-tiny outline-none placeholder-black",
                            {
                              "border-error focus:border-error":
                                touched?.tax && errors?.tax,
                            }
                          )}
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
                          className={cn(
                            "w-full border border-greyborder focus:border-accent p-3 bg-white font-satoshi font-regular text-tiny outline-none placeholder-black",
                            {
                              "border-error focus:border-error":
                                touched?.shipping && errors?.shipping,
                            }
                          )}
                        />
                      </div>

                      <hr className="border-b border-t-0 border-greyborder" />
                      <div className="flex justify-between py-2">
                        <span className="font-satoshi font-normal text-tiny leading-100 tracking-normal">
                          Amount Due
                        </span>
                        <span className="font-satoshi font-medium text-tiny leading-120 tracking-normal">
                          $2500
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
                        />
                      </div>

                      <hr className="border-b border-t-0 border-greyborder" />
                      <div className="flex justify-between py-2">
                        <span className="font-satoshi font-normal text-tiny leading-100 tracking-normal">
                          Balance Due
                        </span>
                        <span className="font-satoshi font-medium text-tiny leading-120 tracking-normal">
                          $2500
                        </span>
                      </div>
                    </div>
                  </section>
                </section>
                <Button
                  type="button"
                  disabled={true}
                  className="font-satoshi font-bold text-small leading-100 tracking-normal py-3 lg:hidden"
                >
                  Download PDF
                </Button>
              </Form>
            );
          }}
        </Formik>
      </main>
    </ContentViewAreaWrapper>
  );
};

export default NewInvoice;
