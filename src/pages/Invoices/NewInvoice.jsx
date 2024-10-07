import { useState } from "react";
import { ContentViewAreaWrapper } from "../../Layouts/components";
import { Button } from "../../components/common/forms";
import { Formik, Field, Form, FieldArray } from "formik";
import { AiOutlineClose } from "react-icons/ai";

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

const NewInvoice = () => {
  const [editIndex, setEditIndex] = useState(null);
  const [addItem, setAddItem] = useState(false);

  const initialValues = {
    logo: "",
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
    breakdown: [
      {
        title: "Mackooks",
        quantity: "",
        units: "",
        price: "",
      },
    ],
    subtotal: "",
    discount: "",
    tax: "",
    shipping: "",
    amount_due: "",
    amount_paid: "",
    balance_due: "",
    notes: "",
    terms: "",
  };
  const handleSubmit = () => {};

  return (
    <ContentViewAreaWrapper>
      <section className="flex flex-col gap-y-2">
        <header className="flex flex-col gap-y-2">
          <h1 className="font-archivo font-normal text-xl md:text-4xl leading-110 tracking-normal">
            New Invoice
          </h1>
        </header>
        <hr className="invisible h-8" />
      </section>
      <main className="flex w-full flex-col gap-y-4 lg:pt-6 border border-red-500 overflow-auto">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, setFieldValue }) => {
            return (
              <Form>
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
                          className="static lg:absolute -top-7 w-24 h-24 object-cover border border-greyborder"
                        />
                      </div>
                    ) : (
                      <label
                        htmlFor="logo"
                        className="bg-white border border-greyborder w-24 h-24 flex justify-center items-center cursor-pointer p-2 md:-mt-7"
                      >
                        <input
                          type="file"
                          id="logo"
                          name="logo"
                          className="hidden"
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
                          className="w-full border border-greyborder p-3 bg-white font-satoshi font-regular text-tiny cursor-pointer"
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
                          className="w-full border border-greyborder p-3 bg-white font-satoshi font-regular text-tiny cursor-pointer"
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
                          className="w-full border border-greyborder p-3 bg-white font-satoshi font-regular text-tiny cursor-pointer"
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
                          className="col-span-1 border outline-none border-greyborder p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black"
                          placeholder="Name"
                        />
                        <Field
                          id="billed_from.email"
                          name="billed_from.email"
                          type="text"
                          className="col-span-1 border outline-none border-greyborder p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black"
                          placeholder="Email"
                        />
                        <Field
                          name="billed_from.address"
                          id="billed_from.address"
                          className="col-span-2 resize-none border outline-none border-greyborder p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black"
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
                          className="col-span-1 border outline-none border-greyborder p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black"
                          placeholder="Name"
                        />
                        <Field
                          name="billed_to.email"
                          id="billed_to.email"
                          type="text"
                          className="col-span-1 border outline-none border-greyborder p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black"
                          placeholder="Email"
                        />
                        <Field
                          name="billed_to.address"
                          id="billed_to.address"
                          as="textarea"
                          className="col-span-2 resize-none border outline-none border-greyborder p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black"
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
                          className="w-full border border-greyborder p-3 bg-white font-satoshi font-regular text-tiny outline-none placeholder-black"
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
                          id="title"
                          name="title"
                          type="text"
                          placeholder="00001"
                          className="w-full border border-greyborder p-3 bg-white font-satoshi font-regular text-tiny outline-none placeholder-black"
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
                          className="w-full border border-greyborder p-3 bg-white font-satoshi font-regular text-tiny outline-none placeholder-black"
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
                          className="w-full border border-greyborder p-3 bg-white font-satoshi font-regular text-tiny outline-none placeholder-black"
                        />
                      </div>
                    </div>
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
                            <FieldArray
                              name="breakdown"
                              render={(arrayHelpers) => {
                                console.log("Breakdown: ", values.breakdown);
                                return (
                                  values.breakdown &&
                                  values.breakdown?.length > 0 &&
                                  values.breakdown.map((item, index) => {
                                    console.log("Item: ", item);
                                    return editIndex === index ? (
                                      <tr key={index}>
                                        <td className="text-start pr-4 py-2">
                                          <Field
                                            name={`breakdown.${index}.title`}
                                            type="text"
                                            className="border border-greyborder font-satoshi font-regular outline-none text-tiny leading-120 tracking-normal w-[4.5rem] md:min-w-[4.5rem] md:w-full h-[2.5rem] p-3 placeholder-black"
                                            placeholder="Title"
                                          />
                                        </td>
                                        <td className="text-start pr-4 py-2">
                                          <Field
                                            name={`breakdown.${index}.quantity`}
                                            type="text"
                                            className="border border-greyborder font-satoshi font-regular outline-none text-tiny leading-120 tracking-normal w-[4.5rem] md:min-w-[4.5rem] md:w-full h-[2.5rem] p-3 placeholder-black"
                                            placeholder="Quantity"
                                          />
                                        </td>
                                        <td className="text-start pr-4 py-2">
                                          <Field
                                            name={`breakdown.${index}.units`}
                                            type="text"
                                            className="border border-greyborder font-satoshi font-regular outline-none text-tiny leading-120 tracking-normal w-[4.5rem] md:min-w-[4.5rem] md:w-full h-[2.5rem] p-3 placeholder-black"
                                            placeholder="Units"
                                          />
                                        </td>
                                        <td className="text-start pr-4 py-2">
                                          <Field
                                            name={`breakdown.${index}.price`}
                                            type="text"
                                            className="border border-greyborder font-satoshi font-regular outline-none text-tiny leading-120 tracking-normal w-[4.5rem] md:min-w-[4.5rem] md:w-full h-[2.5rem] p-3 placeholder-black"
                                            placeholder="Price"
                                          />
                                        </td>
                                        <td
                                          className="text-start font-satoshi font-medium text-tiny leading-120 tracking-normal pr-4 py-2"
                                          colSpan={2}
                                        >
                                          <Button
                                            type="button"
                                            className="w-fit px-6 py-3 font-medium text-[0.5rem] lg:text-tiny"
                                            kind="plain"
                                            onClick={() =>
                                              setEditIndex(() => null)
                                            }
                                          >
                                            Save
                                          </Button>
                                        </td>
                                      </tr>
                                    ) : (
                                      <tr key={index}>
                                        <td className="text-start font-satoshi font-medium text-tiny leading-120 tracking-normal pr-4 py-2">
                                          {values.breakdown[index]["title"]}
                                        </td>
                                        <td className="text-start font-satoshi font-medium text-tiny leading-120 tracking-normal pr-4 py-2">
                                          {values.breakdown[index]["quantity"]}
                                        </td>
                                        <td className="text-start font-satoshi font-medium text-tiny leading-120 tracking-normal pr-4 py-2">
                                          LBs
                                        </td>
                                        <td className="text-start font-satoshi font-medium text-tiny leading-120 tracking-normal pr-4 py-2">
                                          $500
                                        </td>
                                        <td className="text-start font-satoshi font-medium text-tiny leading-120 tracking-normal pr-4 py-2">
                                          <button
                                            type="button"
                                            className="font-satoshi font-normal underline text-error leading-100 tracking-normal capitalize text-tiny"
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
                                  })
                                );
                              }}
                            />

                            {addItem && (
                              <tr>
                                <td className="text-start pr-4 py-2">
                                  <input
                                    type="text"
                                    className="border border-greyborder font-satoshi font-regular outline-none text-tiny leading-120 tracking-normal w-[4.5rem] md:min-w-[4.5rem] md:w-full h-[2.5rem] p-3 placeholder-black"
                                    placeholder="Title"
                                  />
                                </td>
                                <td className="text-start pr-4 py-2">
                                  <input
                                    type="text"
                                    className="border border-greyborder font-satoshi font-regular outline-none text-tiny leading-120 tracking-normal w-[4.5rem] md:min-w-[4.5rem] md:w-full h-[2.5rem] p-3 placeholder-black"
                                    placeholder="Quantity"
                                  />
                                </td>
                                <td className="text-start pr-4 py-2">
                                  <input
                                    type="text"
                                    className="border border-greyborder font-satoshi font-regular outline-none text-tiny leading-120 tracking-normal w-[4.5rem] md:min-w-[4.5rem] md:w-full h-[2.5rem] p-3 placeholder-black"
                                    placeholder="Units"
                                  />
                                </td>
                                <td className="text-start pr-4 py-2">
                                  <input
                                    type="text"
                                    className="border border-greyborder font-satoshi font-regular outline-none text-tiny leading-120 tracking-normal w-[4.5rem] md:min-w-[4.5rem] md:w-full h-[2.5rem] p-3 placeholder-black"
                                    placeholder="Price"
                                  />
                                </td>
                                <td
                                  className="text-start font-satoshi font-medium text-tiny leading-120 tracking-normal pr-4 py-2"
                                  colSpan={2}
                                >
                                  <Button
                                    type="button"
                                    className="w-fit px-6 py-3 font-medium text-[0.5rem] lg:text-tiny"
                                    kind="plain"
                                    onClick={() => {
                                      setAddItem(() => false);
                                    }}
                                  >
                                    Save
                                  </Button>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                      {!addItem && (
                        <Button
                          type="button"
                          className="my-2 px-3 py-1.5 font-satoshi font-medium text-tiny leading-100 tracking-normal"
                          onClick={() => {
                            console.log(values);
                            setAddItem(() => true);
                          }}
                        >
                          Add Item
                        </Button>
                      )}
                    </div>
                    <div className="bg-grey rounded p-4 flex flex-col gap-y-4 w-full lg:hidden">
                      <div className="flex justify-between py-2">
                        <span className="font-satoshi font-normal text-tiny leading-100 tracking-normal">
                          Sub Total
                        </span>
                        <span className="font-satoshi font-medium text-tiny leading-120 tracking-normal">
                          $2500
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
                        <input
                          id="discount"
                          name="discount"
                          type="text"
                          placeholder="Discount"
                          className="w-full border border-greyborder p-3 bg-white font-satoshi font-regular text-tiny outline-none placeholder-black"
                        />
                      </div>
                      <div className="w-full flex flex-col gap-y-2">
                        <label
                          htmlFor="tax"
                          className="font-satoshi font-normal text-tiny leading-100 tracking-normal"
                        >
                          Tax
                        </label>
                        <input
                          id="tax"
                          name="tax"
                          type="text"
                          placeholder="Tax"
                          className="w-full border border-greyborder p-3 bg-white font-satoshi font-regular text-tiny outline-none placeholder-black"
                        />
                      </div>
                      <div className="w-full flex flex-col gap-y-2">
                        <label
                          htmlFor="shipping"
                          className="font-satoshi font-normal text-tiny leading-100 tracking-normal"
                        >
                          Shipping
                        </label>
                        <input
                          id="shipping"
                          name="shipping"
                          type="text"
                          placeholder="Shipping"
                          className="w-full border border-greyborder p-3 bg-white font-satoshi font-regular text-tiny outline-none placeholder-black"
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
                        <input
                          id="amount_paid"
                          name="amount_paid"
                          type="text"
                          placeholder="Amount Paid"
                          className="w-full border border-greyborder p-3 bg-white font-satoshi font-regular text-tiny outline-none placeholder-black"
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
                          className="col-span-2 resize-none border outline-none border-greyborder p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black"
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
                          className="col-span-2 resize-none border outline-none border-greyborder p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black"
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
                        <input
                          id="title"
                          name="title"
                          type="text"
                          placeholder="Title"
                          className="w-full border border-greyborder p-3 bg-white font-satoshi font-regular text-tiny outline-none placeholder-black"
                        />
                      </div>
                      <div className="w-full flex flex-col gap-y-2">
                        <label
                          htmlFor="title"
                          className="font-satoshi font-medium text-tiny leading-100 tracking-normal"
                        >
                          # Invoice
                        </label>
                        <input
                          id="title"
                          name="title"
                          type="text"
                          placeholder="00001"
                          className="w-full border border-greyborder p-3 bg-white font-satoshi font-regular text-tiny outline-none placeholder-black"
                        />
                      </div>
                      <div className="w-full flex flex-col gap-y-2">
                        <label
                          htmlFor="issue_date"
                          className="font-satoshi font-medium text-tiny leading-100 tracking-normal"
                        >
                          Issue Date
                        </label>
                        <input
                          id="issue_date"
                          name="issue_date"
                          type="date"
                          className="w-full border border-greyborder p-3 bg-white font-satoshi font-regular text-tiny outline-none placeholder-black"
                        />
                      </div>
                      <div className="w-full flex flex-col gap-y-2">
                        <label
                          htmlFor="due_date"
                          className="font-satoshi font-medium text-tiny leading-100 tracking-normal"
                        >
                          Due Date
                        </label>
                        <input
                          id="due_date"
                          name="due_date"
                          type="date"
                          className="w-full border border-greyborder p-3 bg-white font-satoshi font-regular text-tiny outline-none placeholder-black"
                        />
                      </div>
                    </div>
                    <div className="bg-grey rounded p-4 flex flex-col gap-y-4 w-full">
                      <div className="flex justify-between py-2">
                        <span className="font-satoshi font-normal text-tiny leading-100 tracking-normal">
                          Sub Total
                        </span>
                        <span className="font-satoshi font-medium text-tiny leading-120 tracking-normal">
                          $2500
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
                        <input
                          id="discount"
                          name="discount"
                          type="text"
                          placeholder="Discount"
                          className="w-full border border-greyborder p-3 bg-white font-satoshi font-regular text-tiny outline-none placeholder-black"
                        />
                      </div>
                      <div className="w-full flex flex-col gap-y-2">
                        <label
                          htmlFor="tax"
                          className="font-satoshi font-normal text-tiny leading-100 tracking-normal"
                        >
                          Tax
                        </label>
                        <input
                          id="tax"
                          name="tax"
                          type="text"
                          placeholder="Tax"
                          className="w-full border border-greyborder p-3 bg-white font-satoshi font-regular text-tiny outline-none placeholder-black"
                        />
                      </div>
                      <div className="w-full flex flex-col gap-y-2">
                        <label
                          htmlFor="shipping"
                          className="font-satoshi font-normal text-tiny leading-100 tracking-normal"
                        >
                          Shipping
                        </label>
                        <input
                          id="shipping"
                          name="shipping"
                          type="text"
                          placeholder="Shipping"
                          className="w-full border border-greyborder p-3 bg-white font-satoshi font-regular text-tiny outline-none placeholder-black"
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
                        <input
                          id="amount_paid"
                          name="amount_paid"
                          type="text"
                          placeholder="Amount Paid"
                          className="w-full border border-greyborder p-3 bg-white font-satoshi font-regular text-tiny outline-none placeholder-black"
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
