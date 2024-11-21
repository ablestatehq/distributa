import { createPortal } from "react-dom";
import { CircleX } from "../common/icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import cn from "../../utils/cn";
import { Button } from "../common/forms";
import { createCategorySchema } from "../../utils/validators";

const EditCategory = ({
  category: { $id, name, type, description },
  handleClose,
  updateCategory,
  fetcher,
}) => {
  const handleSubmit = async (values) => {
    try {
      fetcher.submit(JSON.stringify(values), {
        method: "post",
        encType: "application/json",
        action: `/settings/categories/${$id}/edit`,
      });
      updateCategory(values);
      if (fetcher.state === "idle") handleClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const initialValues = {
    name,
    type,
    description: description || "",
  };

  return createPortal(
    <main className="fixed top-0 bg-black bg-opacity-45 h-screen w-screen flex justify-center items-end lg:items-center">
      <section className="w-96 lg:w-[36rem] h-fit flex flex-col bg-white">
        <header className="flex justify-between w-full bg-grey p-4">
          <h5 className="font-archivo font-normal text-small leading-150 tracking-normal">
            Edit Category
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
          {({ values, touched, errors, isSubmitting, setFieldValue }) => (
            <Form>
              <div className="grid grid-cols-3 p-4 lg:px-16 gap-x-4">
                <button
                  type="button"
                  kind="secondary"
                  className={`font-satoshi tracking-normal leading-100 bg-grey border disabled:border-greyborder text-black disabled:bg-grey disabled:text-greyborder  hover:bg-grey px-6 py-3 text-small font-bold transition-all duration-75 ${cn(
                    {
                      "border-transparent": values.type !== "expense",
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
                  className={`font-satoshi tracking-normal leading-100 bg-grey border disabled:border-greyborder text-black disabled:bg-grey disabled:text-greyborder  hover:bg-grey px-6 py-3 text-small font-bold transition-all duration-75 ${cn(
                    {
                      "border-transparent": values.type !== "income",
                      "border-black": values.type === "income",
                    }
                  )}`}
                  onClick={() => setFieldValue("type", "income")}
                  disabled={navigation.state === "submitting"}
                >
                  Income
                </button>
                <button
                  type="button"
                  kind="secondary"
                  className={`font-satoshi tracking-normal leading-100 bg-grey border disabled:border-greyborder text-black disabled:bg-grey disabled:text-greyborder  hover:bg-grey px-6 py-3 text-small font-bold transition-all duration-75 ${cn(
                    {
                      "border-transparent": values.type !== "both",
                      "border-black": values.type === "both",
                    }
                  )}`}
                  onClick={() => setFieldValue("type", "both")}
                  disabled={navigation.state === "submitting"}
                >
                  Both
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating Category ..." : "Update"}
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

export default EditCategory;
