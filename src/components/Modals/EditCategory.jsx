import { toast } from "react-toastify";
import { createPortal } from "react-dom";
import { CircleX } from "../common/icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import cn from "../../utils/cn";
import { Button } from "../common/forms";

const EditCategory = ({
  category: { $id, name },
  handleClose,
  updateCategory,
  fetcher,
}) => {
  console.log("Category: ", name, $id);
  const handleSubmit = async (values) => {
    console.log($id);
    try {
      fetcher.submit(JSON.stringify(values), {
        method: "post",
        encType: "application/json",
        action: `/settings/categories/${$id}/edit`,
      });
      updateCategory(values);
      if (fetcher.state === "idle") handleClose();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const initialValues = {
    name,
  };

  return createPortal(
    <main className="fixed top-0 bg-black bg-opacity-45 h-screen w-screen flex justify-center items-end lg:items-center">
      <section className="w-96 h-fit flex flex-col bg-white">
        <header className="flex justify-between w-full bg-grey p-4">
          <h5 className="font-archivo font-normal text-small leading-150 tracking-normal">
            Edit Category
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
                  htmlFor="Name"
                  className="font-satoshi font-normal text-small leading-100 tracking-normal"
                >
                  Name
                </label>
                <div className="w-full">
                  <Field
                    id="name"
                    name="name"
                    className={cn(
                      "w-full border border-greyborder focus:border-accent p-3 bg-white font-satoshi font-normal text-tiny outline-none placeholder-black leading-100 tracking-0 appearance-none",
                      {
                        "border-error focus:border-error":
                          touched?.name && errors?.name,
                      }
                    )}
                  />
                </div>
                <ErrorMessage name="name">
                  {(msg) => (
                    <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                      {msg}
                    </div>
                  )}
                </ErrorMessage>
              </div>

              <Button
                type="submit"
                className="font-bold text-small"
                disabled={
                  fetcher.state === "submitting" || values.name === name
                }
              >
                {fetcher.state === "submitting" ? "Updating ..." : "Update"}
              </Button>
            </Form>
          )}
        </Formik>
      </section>
    </main>,
    document.getElementById("portal")
  );
};

export default EditCategory;
