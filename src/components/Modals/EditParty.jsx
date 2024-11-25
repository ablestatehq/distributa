import { CircleX } from "../common/icons";
import { Button } from "../common/forms";
import cn from "../../utils/cn";
import { createPortal } from "react-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useFetcher } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { createPartySchema } from "../../utils/validators";

const EditParty = ({ handleClose, party }) => {
  const fetcher = useFetcher();

  const getChanges = useCallback((formValues, party) => {
    if (!formValues || !party) return null;

    const changes = Object.entries(formValues).reduce((acc, [key, value]) => {
      if (key !== "$permissions" && value !== party[key]) {
        acc[key] = value;
      }
      return acc;
    }, {});

    return Object.keys(changes).length > 0 ? changes : null;
  }, []);

  const handleSubmit = useCallback(
    async (values) => {
      try {
        const changes = getChanges(values, party);

        if (changes) {
          fetcher.submit(JSON.stringify(changes), {
            method: "post",
            action: `/settings/parties/${party.$id}/edit`,
            encType: "application/json",
          });
        }
      } catch (error) {
        throw error;
      }
    },
    [fetcher, party, getChanges]
  );

  useEffect(() => {
    if (fetcher?.state === "idle" && fetcher?.data) {
      if (fetcher.data?.success) {
        toast.success("Party updated successfully"); 
        handleClose();
      } else if (fetcher.data?.success === false) {
        toast.error(fetcher.data.message || "An error occurred");
      }
    }
  }, [fetcher.state, fetcher.data, handleClose]);

  return createPortal(
    <main className="fixed top-0 bg-black bg-opacity-45 h-screen w-screen flex justify-center items-end lg:items-center">
      <section className="w-96 lg:w-[36rem] h-fit max-h-full overflow-y-auto flex flex-col bg-white">
        <header className="flex justify-between w-full bg-grey p-4">
          <h5 className="font-archivo font-normal text-small leading-150 tracking-normal">
            Add New Party
          </h5>
          <button type="button" onClick={handleClose}>
            <CircleX variation="black" className="w-4 h-4" />
          </button>
        </header>
        <Formik
          initialValues={party}
          onSubmit={handleSubmit}
          validationSchema={createPartySchema}
        >
          {({ values, touched, errors, dirty, setFieldValue, isValid }) => (
            <Form>
              <div className="w-full grid grid-cols-3 p-4 lg:px-16 gap-x-4">
                <button
                  type="button"
                  kind="secondary"
                  className={`font-satoshi tracking-normal leading-100 bg-grey border disabled:border-greyborder text-black disabled:bg-grey disabled:text-greyborder  hover:bg-grey py-3 text-small font-bold transition-all duration-75 ${cn(
                    {
                      "border-transparent": values.type !== "individual",
                      "border-black": values.type === "individual",
                    }
                  )}`}
                  onClick={() => setFieldValue("type", "individual")}
                  disabled={fetcher.state === "submitting"}
                >
                  Individual
                </button>
                <button
                  type="button"
                  kind="secondary"
                  className={`font-satoshi tracking-normal leading-100 bg-grey border disabled:border-greyborder text-black disabled:bg-grey disabled:text-greyborder  hover:bg-grey py-3 text-small font-bold transition-all duration-75 ${cn(
                    {
                      "border-transparent": values.type !== "company",
                      "border-black": values.type === "company",
                    }
                  )}`}
                  onClick={() => setFieldValue("type", "company")}
                  disabled={fetcher.state === "submitting"}
                >
                  Company
                </button>
                <button
                  type="button"
                  kind="secondary"
                  className={`font-satoshi tracking-normal leading-100 bg-grey border disabled:border-greyborder text-black disabled:bg-grey disabled:text-greyborder  hover:bg-grey py-3 text-small font-bold transition-all duration-75 ${cn(
                    {
                      "border-transparent": values.type !== "organisation",
                      "border-black": values.type === "organisation",
                    }
                  )}`}
                  onClick={() => setFieldValue("type", "organisation")}
                  disabled={fetcher.state === "submitting"}
                >
                  Organisation
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 py-8 px-4 lg:px-16">
                <div className="w-full flex flex-col gap-y-2">
                  <label
                    htmlFor="name"
                    className="font-satoshi font-normal text-small leading-100 tracking-normal"
                  >
                    Name
                  </label>
                  <Field
                    id="name"
                    name="name"
                    placeholder="Name"
                    className={cn(
                      "w-full border border-greyborder focus:border-accent p-3 bg-white font-satoshi font-normal text-tiny outline-none placeholder-black leading-100 tracking-0 appearance-none",
                      {
                        "border-error focus:border-error":
                          touched?.name && errors?.name,
                      }
                    )}
                    disabled={fetcher.state === "submitting"}
                  />
                  <ErrorMessage name="name">
                    {(msg) => (
                      <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <div className="w-full flex flex-col gap-y-2">
                  <label
                    htmlFor="email"
                    className="font-satoshi font-normal text-small leading-100 tracking-normal"
                  >
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    placeholder="Email"
                    className={cn(
                      "w-full border border-greyborder focus:border-accent p-3 bg-white font-satoshi font-normal text-tiny outline-none placeholder-black leading-100 tracking-0 appearance-none",
                      {
                        "border-error focus:border-error":
                          touched?.email && errors?.email,
                      }
                    )}
                    disabled={fetcher.state === "submitting"}
                  />
                  <ErrorMessage name="email">
                    {(msg) => (
                      <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <div className="w-full flex flex-col gap-y-2">
                  <label
                    htmlFor="Phone"
                    className="font-satoshi font-normal text-small leading-100 tracking-normal"
                  >
                    Phone
                  </label>
                  <Field
                    id="phone"
                    name="phone"
                    type="phone"
                    placeholder="Phone"
                    className={cn(
                      "w-full border border-greyborder focus:border-accent p-3 bg-white font-satoshi font-normal text-tiny outline-none placeholder-black leading-100 tracking-0 appearance-none",
                      {
                        "border-error focus:border-error":
                          touched?.phone && errors?.phone,
                      }
                    )}
                    disabled={fetcher.state === "submitting"}
                  />
                  <ErrorMessage name="phone">
                    {(msg) => (
                      <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>

                <div className="w-full flex flex-col gap-y-2">
                  <label
                    htmlFor="payment_timing"
                    className="font-satoshi font-normal text-small leading-100 tracking-normal"
                  >
                    Preferred Currency
                  </label>
                  <div className="relative w-full">
                    <Field
                      id="preferred_currency"
                      name="preferred_currency"
                      className={cn(
                        "w-full border border-greyborder focus:border-accent px-3 py-3.5 pr-10 bg-white font-satoshi font-normal text-tiny outline-none placeholder-black leading-100 tracking-0 appearance-none",
                        {
                          "border-error focus:border-error":
                            touched?.preferred_currency &&
                            errors?.preferred_currency,
                        }
                      )}
                      as="select"
                      disabled={fetcher.state === "submitting"}
                    >
                      <option value="">Select one</option>
                      <option value="UGX">Uganda Shillings</option>
                      <option value="KSH">Kenyan Shillings</option>
                      <option value="USD">United States Dollar</option>
                      <option value="GBP">Great Britain Pound</option>
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
                  <ErrorMessage name="preferred_currency">
                    {(msg) => (
                      <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>

                <div className="col-span-2 w-full flex flex-col gap-y-2">
                  <label
                    htmlFor="address"
                    className="font-satoshi font-normal text-small leading-100 tracking-normal"
                  >
                    Address
                  </label>
                  <Field
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Address"
                    as="textarea"
                    rows="4"
                    className={cn(
                      "w-full border border-greyborder focus:border-accent p-3 bg-white font-satoshi font-normal text-tiny outline-none placeholder-black leading-100 tracking-0 appearance-none resize-none rounded-sm",
                      {
                        "border-error focus:border-error":
                          touched?.address && errors?.address,
                      }
                    )}
                    disabled={fetcher.state === "submitting"}
                  />
                  <ErrorMessage name="address">
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
                  disabled={
                    fetcher.state === "submitting" ||
                    !(dirty && isValid) ||
                    !getChanges(values, party)
                  }
                >
                  {fetcher.state === "submitting"
                    ? "Updating Party ..."
                    : "Update"}
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

export default EditParty;
