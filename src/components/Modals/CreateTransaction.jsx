import { CircleX } from "../common/icons";
import { Button } from "../common/forms";
import cn from "../../utils/cn";
import { createPortal } from "react-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { TransactionService } from "../../services";
import { useNavigate } from "react-router-dom";
const CreateTransaction = ({ handleClose }) => {
  const navigate = useNavigate();

  const initialValues = {
    type: "income",
    date: "",
    item: "",
    amount: "",
    description: "",
    payer_payee: "",
    invoice_receipt_no: "",
    payment_method: "",
    category: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    values.amount = parseFloat(values.amount);
    values.invoice_receipt_no = parseInt(values.invoice_receipt_no);

    try {
      await TransactionService.createTransaction(values);
      navigate(`/transactions/`);
    } catch (error) {
      throw error;
    } finally {
      setSubmitting(false);
      handleClose();
    }
  };

  return createPortal(
    <main className="fixed top-0 bg-black bg-opacity-45 h-screen w-screen flex justify-center items-end lg:items-center">
      <section className="w-96 lg:w-[36rem] h-fit flex flex-col bg-white">
        <header className="flex justify-between w-full bg-grey p-4">
          <h5 className="font-archivo font-normal text-small leading-150 tracking-normal">
            Add New Transaction
          </h5>
          <button type="button" onClick={handleClose}>
            <CircleX variation="black" className="w-4 h-4" />
          </button>
        </header>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, touched, errors, isSubmitting, setFieldValue }) => (
            <Form>
              <div className="w-full flex p-4 lg:px-16 gap-x-4">
                <button
                  type="button"
                  kind="secondary"
                  className={`font-satoshi tracking-normal leading-100 bg-grey border disabled:border-greyborder text-black disabled:bg-grey disabled:text-greyborder  hover:bg-grey px-6 py-3 text-small font-bold w-1/2 transition-all duration-75 ${cn(
                    {
                      "border-transparent": values.type === "income",
                      "border-black": values.type === "expense",
                    }
                  )}`}
                  onClick={() => setFieldValue("type", "expense")}
                >
                  Expense
                </button>
                <button
                  type="button"
                  kind="secondary"
                  className={`font-satoshi tracking-normal leading-100 bg-grey border disabled:border-greyborder text-black disabled:bg-grey disabled:text-greyborder  hover:bg-grey px-6 py-3 text-small font-bold w-1/2 transition-all duration-75 ${cn(
                    {
                      "border-transparent": values.type === "expense",
                      "border-black": values.type === "income",
                    }
                  )}`}
                  onClick={() => setFieldValue("type", "income")}
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
                  />
                  <ErrorMessage name="item">
                    {(msg) => (
                      <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <div className="col-span-2 flex flex-col gap-y-2">
                  <label
                    htmlFor="status"
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
                  />
                  <ErrorMessage name="description">
                    {(msg) => (
                      <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <div className="flex flex-col gap-y-2">
                  <label
                    htmlFor="payer_payee"
                    className="font-satoshi font-normal text-small leading-100 tracking-normal"
                  >
                    Payer/Payee
                  </label>
                  <Field
                    id="payer_payee"
                    name="payer_payee"
                    type="text"
                    placeholder="Payee/Payee"
                    className={cn(
                      "w-full border border-greyborder focus:border-accent p-3 bg-white font-satoshi font-normal text-tiny outline-none placeholder-black leading-100 tracking-0 appearance-none",
                      {
                        "border-error focus:border-error":
                          touched?.payee && errors?.payee,
                      }
                    )}
                  />
                  <ErrorMessage name="payer_payee">
                    {(msg) => (
                      <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
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
                  />
                  <ErrorMessage name="invoice_receipt_no">
                    {(msg) => (
                      <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <div className="w-full flex flex-col gap-y-2">
                  <label
                    htmlFor="payment_method"
                    className="font-satoshi font-normal text-small leading-100 tracking-normal"
                  >
                    Payment Method
                  </label>
                  <div className="relative w-full">
                    <Field
                      id="payment_method"
                      name="payment_method"
                      className={cn(
                        "w-full border border-greyborder focus:border-accent px-3 py-3.5 pr-10 bg-white font-satoshi font-normal text-tiny outline-none placeholder-black leading-100 tracking-0 appearance-none",
                        {
                          "border-error focus:border-error":
                            touched?.payment_method && errors?.payment_method,
                        }
                      )}
                      as="select"
                    >
                      <option value="">Select one</option>
                      <option value="cash">Cash</option>
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="credit_card">Credit Card</option>
                      <option value="debit_card">Debit Card</option>
                      <option value="check">Check</option>
                      <option value="mobile_money">Mobile Money</option>
                      <option value="other">Other</option>
                    </Field>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-greyborder h-4 w-4 "
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                  <ErrorMessage name="payment_method">
                    {(msg) => (
                      <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <div className="w-full flex flex-col gap-y-2">
                  <label
                    htmlFor="category"
                    className="font-satoshi font-normal text-small leading-100 tracking-normal"
                  >
                    Category
                  </label>
                  <div className="relative w-full">
                    <Field
                      id="category"
                      name="category"
                      className={cn(
                        "w-full border border-greyborder focus:border-accent px-3 py-3.5 pr-10 bg-white font-satoshi font-normal text-tiny outline-none placeholder-black leading-100 tracking-0 appearance-none",
                        {
                          "border-error focus:border-error":
                            touched?.category && errors?.category,
                        }
                      )}
                      as="select"
                    >
                      <option value="">Select one</option>
                      <option value="sales">Sales</option>
                      <option value="salary">Salary</option>
                      <option value="consulting">Consulting</option>
                      <option value="category">Development</option>
                      <option value="rent">Rent</option>
                      <option value="utilities">Utilities</option>
                      <option value="supplies">Supplies</option>
                      <option value="travel">Travel</option>
                      <option value="marketing">Marketing</option>
                      <option value="insurance">Insurance</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="professional_services">
                        Professional Services
                      </option>
                      <option value="development">development</option>
                      <option value="taxes">Taxes</option>
                      <option value="other">Other</option>
                    </Field>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-greyborder h-4 w-4 "
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                  <ErrorMessage name="payment_method">
                    {(msg) => (
                      <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>

                <Button
                  type="submit"
                  className="font-bold text-small col-span-2"
                  // disabled={isSubmitting}
                >
                  Add
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </main>,
    document.getElementById("portal")
  );
};

export default CreateTransaction;
