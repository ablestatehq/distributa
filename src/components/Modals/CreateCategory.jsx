import { CircleX } from "../common/icons";
import { Button } from "../common/forms";
import cn from "../../utils/cn";
import { createPortal } from "react-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { createCategorySchema } from "../../utils/validators";
import { toast } from "react-toastify";
import { useSubmit } from "react-router-dom";
import { useNavigation } from "react-router-dom";
import { useEffect } from "react";
const CreateCategory = ({ handleClose }) => {
  const submit = useSubmit();
  const navigation = useNavigation();

  const initialValues = {
    type: "expense",
    name: "",
    description: "",
  };

  useEffect(() => {
    if (
      navigation.state === "loading" &&
      navigation.json != null &&
      navigation.formAction !== navigation.location.pathname
    ) {
      handleClose();
    }
  }, [navigation.state, navigation.formData, handleClose]);

  const handleSubmit = async (values) => {
    try {
      submit(values, {
        action: "/settings/categories/new",
        method: "POST",
        encType: "application/json",
      });
    } catch (error) {
      toast.error("Failed creating category");
    }
  };

  return createPortal(
    <main className="fixed top-0 bg-black bg-opacity-45 h-screen w-screen flex justify-center items-end lg:items-center">
      <section className="w-96 lg:w-[36rem] h-fit flex flex-col bg-white">
        <header className="flex justify-between w-full bg-grey p-4">
          <h5 className="font-archivo font-normal text-small leading-150 tracking-normal">
            Add New Category
          </h5>
          <button type="button" onClick={handleClose}>
            <CircleX variation="black" className="w-4 h-4" />
          </button>
        </header>
        <Formik
          initialValues={initialValues}
          validationSchema={createCategorySchema}
          onSubmit={handleSubmit}
        >
          {({ values, touched, errors, setFieldValue }) => (
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
                  disabled={navigation.state === "submitting"}
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
                  disabled={navigation.state === "submitting"}
                >
                  Income
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 py-8 px-4 lg:px-16">
                <div className="w-full flex flex-col gap-y-2 col-span-2">
                  <label
                    htmlFor="name"
                    className="font-satoshi font-normal text-small leading-100 tracking-normal"
                  >
                    Name
                  </label>
                  <Field
                    id="name"
                    name="name"
                    placeholder="Category Name"
                    className={cn(
                      "w-full border border-greyborder focus:border-accent p-3 bg-white font-satoshi font-normal text-tiny outline-none placeholder-black leading-100 tracking-0 appearance-none",
                      {
                        "border-error focus:border-error":
                          touched?.name && errors?.name,
                      }
                    )}
                    disabled={navigation.state === "submitting"}
                  />
                  <ErrorMessage name="name">
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
                    disabled={navigation.state === "submitting"}
                  />
                  <ErrorMessage name="description">
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
                  disabled={navigation.state === "submitting"}
                >
                  {navigation.state === "submitting"
                    ? "Adding Category ..."
                    : "Add"}
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

export default CreateCategory;
