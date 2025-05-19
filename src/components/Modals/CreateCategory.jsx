import { CircleX } from "../common/icons";
import { Button } from "../common/forms";
import cn from "../../utils/cn";
import { createPortal } from "react-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { createCategorySchema } from "../../utils/validators";
import { toast } from "react-toastify";
import { useFetcher } from "react-router-dom";
import { useCallback, useEffect, useRef, memo } from "react";

const CreateCategory = memo(
  ({ handleClose, onCategoryCreated = null, isFromTransaction = false }) => {
    const fetcher = useFetcher();
    const processedResponseRef = useRef(false);
    const isSubmitting = fetcher.state === "submitting";

    const initialValues = {
      type: "expense",
      name: "",
      description: "",
    };

    const handleFormResult = useCallback(() => {
      if (
        fetcher.state === "idle" &&
        fetcher.data &&
        !processedResponseRef.current
      ) {
        processedResponseRef.current = true;

        if (fetcher.data.success) {
          toast.success(fetcher.data.message);

          if (fetcher.data?.category && onCategoryCreated) {
            const { $id: categoryId, name, type } = fetcher.data.category;
            onCategoryCreated(categoryId, name, type);
          }

          handleClose();
        } else if (fetcher.data.error) {
          toast.error(fetcher.data.error);
        }
      }

      if (fetcher.state === "submitting") {
        processedResponseRef.current = false;
      }
    }, [fetcher.state, fetcher.data, handleClose, onCategoryCreated]);

    useEffect(() => {
      handleFormResult();
    }, [handleFormResult]);

    const handleSubmit = useCallback(
      (values) => {
        try {
          fetcher.submit(values, {
            action: "/settings/categories/new",
            method: "POST",
            encType: "application/json",
          });
        } catch (error) {
          toast.error("Failed creating category");
        }
      },
      [fetcher]
    );

    const handleTypeSelection = useCallback((setFieldValue, type) => {
      return () => setFieldValue("type", type);
    }, []);

    return createPortal(
      <main className="fixed top-0 bg-black bg-opacity-45 h-screen w-screen flex justify-center items-end lg:items-center z-[70]">
        <section className="w-96 lg:w-[36rem] h-fit flex flex-col bg-white">
          <header className="flex justify-between w-full bg-grey p-4">
            <h5 className="font-archivo font-normal text-small leading-150 tracking-normal">
              Add New Category
            </h5>
            <button type="button" onClick={handleClose} disabled={isSubmitting}>
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
                {isFromTransaction && (
                  <p className="mt-8 mb-3 mx-4 lg:mx-16 bg-accent-50 border border-accent-200 font-satoshi text-tiny text-accent-800 leading-150 p-4 rounded-lg">
                    Creating a new category for your transaction. After
                    creating, you'll be returned to your transaction form.
                  </p>
                )}
                <div className="grid grid-cols-3 p-4 lg:px-16 gap-x-4">
                  <TypeButton
                    type="expense"
                    currentType={values.type}
                    onClick={handleTypeSelection(setFieldValue, "expense")}
                    disabled={isSubmitting}
                  />
                  <TypeButton
                    type="income"
                    currentType={values.type}
                    onClick={handleTypeSelection(setFieldValue, "income")}
                    disabled={isSubmitting}
                  />
                  <TypeButton
                    type="both"
                    currentType={values.type}
                    onClick={handleTypeSelection(setFieldValue, "both")}
                    disabled={isSubmitting}
                  />
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
                    {isSubmitting ? "Adding Category ..." : "Add"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </section>
      </main>,
      document.getElementById("portal")
    );
  }
);

const TypeButton = memo(({ type, currentType, onClick, disabled }) => {
  const isSelected = currentType === type;

  return (
    <button
      type="button"
      kind="secondary"
      className={`font-satoshi tracking-normal leading-100 bg-grey border disabled:border-greyborder text-black disabled:bg-grey disabled:text-greyborder hover:bg-grey px-6 py-3 text-small font-bold transition-all duration-75 ${
        isSelected ? "border-black" : "border-transparent"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </button>
  );
});

export default CreateCategory;
