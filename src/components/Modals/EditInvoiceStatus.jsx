import { createPortal } from "react-dom";
import { CircleX } from "../common/icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import cn from "../../utils/cn";
import { Button } from "../common/forms";
import { format } from "date-fns";

const EditInvoiceStatus = ({
  invoice: { invoice_no, $id, status },
  handleClose,
  fetcher,
  setInvoice,
}) => {
  const handleSubmit = (values, { setSubmitting }) => {
    try {
      fetcher.submit(JSON.stringify(values), {
        method: "post",
        encType: "application/json",
        action: `/invoices/${$id}/edit-status`,
      });
      setInvoice((prev) => ({
        ...prev,
        status: values.status,
      }));
      if (fetcher.state === "idle") handleClose();
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues = {
    status,
    payment_date: format(new Date(), "yyyy-MM-dd"),
  };

  return createPortal(
    <main className="fixed top-0 bg-black bg-opacity-45 h-screen w-screen flex justify-center items-end lg:items-center">
      <section className="w-96 h-fit flex flex-col bg-white">
        <header className="flex justify-between w-full bg-grey p-4">
          <h5 className="font-archivo font-normal text-small leading-150 tracking-normal">
            Edit status for Invoice #{invoice_no}
          </h5>
          <button type="button" onClick={handleClose}>
            <CircleX variation="black" className="w-4 h-4" />
          </button>
        </header>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, touched, errors, isSubmitting }) => (
            <Form className="flex flex-col gap-4 py-8 px-16">
              <div className="w-full flex flex-col gap-y-2">
                <label
                  htmlFor="status"
                  className="font-satoshi font-normal text-small leading-100 tracking-normal"
                >
                  Status
                </label>
                <div className="relative w-full">
                  <Field
                    id="status"
                    name="status"
                    className={cn(
                      "w-full border border-greyborder focus:border-accent p-3 pr-10 bg-white font-satoshi font-normal text-tiny outline-none placeholder-black leading-100 tracking-0 appearance-none",
                      {
                        "border-error focus:border-error":
                          touched?.status && errors?.status,
                      }
                    )}
                    as="select"
                  >
                    <option value="">Select one</option>
                    <option value="unpaid">Unpaid</option>
                    <option value="paid">Paid</option>
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
                <ErrorMessage name="status">
                  {(msg) => (
                    <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                      {msg}
                    </div>
                  )}
                </ErrorMessage>
              </div>
              {values.status === "paid" && (
                <div className="w-full flex flex-col gap-y-2">
                  <label
                    htmlFor="Payment Date"
                    className="font-satoshi font-normal text-small leading-100 tracking-normal"
                  >
                    Payment Date
                  </label>
                  <div className="w-full">
                    <Field
                      id="payment_date"
                      name="payment_date"
                      type="date"
                      className={cn(
                        "w-full border border-greyborder focus:border-accent p-3 bg-white font-satoshi font-normal text-tiny outline-none placeholder-black leading-100 tracking-0 appearance-none",
                        {
                          "border-error focus:border-error":
                            touched?.payment_date && errors?.payment_date,
                        }
                      )}
                    />
                  </div>
                  <ErrorMessage name="payment_date">
                    {(msg) => (
                      <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
              )}
              <Button
                type="submit"
                className="font-bold text-small"
                disabled={isSubmitting || values.status === status}
              >
                Update
              </Button>
            </Form>
          )}
        </Formik>
      </section>
    </main>,
    document.getElementById("portal")
  );
};

export default EditInvoiceStatus;
