import { CircleX } from "../common/icons";
import { Button } from "../common/forms";
import cn from "../../utils/cn";
import { createPortal } from "react-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useFetcher } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { createPartySchema } from "../../utils/validators";

const CreateParty = ({ handleClose }) => {
  const fetcher = useFetcher();

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    type: "individual",
    address: "",
  };

  const handleSubmit = async (values) => {
    try {
      fetcher.submit(JSON.stringify(values), {
        method: "post",
        action: "/settings/parties/new",
        encType: "application/json",
      });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (fetcher?.state === "idle" && fetcher?.data) {
      if (fetcher.data?.success) {
        toast.success("Party created successfully");
        handleClose();
      } else if (fetcher.data.success === false) {
        toast.error(fetcher.data.message || "An error occurred");
      }
    }
  }, [fetcher.state, fetcher.data, fetcher.formAction, fetcher.formData]);

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
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={createPartySchema}
        >
          {({ values, touched, errors, dirty, setFieldValue, isValid }) => (
            <Form>
              <div className="w-full grid grid-cols-2 p-4 lg:px-16 gap-x-4">
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
                      "border-transparent": values.type !== "group",
                      "border-black": values.type === "group",
                    }
                  )}`}
                  onClick={() => setFieldValue("type", "group")}
                  disabled={fetcher.state === "submitting"}
                >
                  Group
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 py-8 px-4 lg:px-16">
                <div className="w-full col-span-2 flex flex-col gap-y-2">
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
                    fetcher.state === "submitting" || !(dirty && isValid)
                  }
                >
                  {fetcher.state === "submitting"
                    ? "Creating Party ..."
                    : "Create"}
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

export default CreateParty;
