import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import cn from "../../utils/cn";
import { Button } from "../../components/common/forms";
import getBase64 from "../../utils/getBase64";
import { AiOutlineClose } from "react-icons/ai";
import {
  useSubmit,
  useLoaderData,
  useActionData,
  Await,
  useNavigation,
} from "react-router-dom";
import { organisationSchema } from "../../utils/validators";
import { toast } from "react-toastify";

const BusinessSettings = () => {
  const submit = useSubmit();
  const loaderData = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();

  const [initialValues, setInitialValues] = useState({
    $id: null,
    logo: "",
    logo_url: "",
    name: "",
    email: null,
    phone: null,
    logo_ref: null,
    address: "",
  });

  const handleSubmit = (values) => {
    const formData = new FormData();

    formData.append("$id", values.$id ?? "");
    formData.append("logo", values.logo ?? "");
    formData.append("name", values.name);
    formData.append("email", values.email ?? "");
    formData.append("phone", values.phone ?? "");
    formData.append("logo_ref", values.logo_ref ?? "");
    formData.append("logo_url", values.logo_url ?? "");
    formData.append("address", values.address);

    submit(formData, {
      method: "POST",
      encType: "multipart/form-data",
      action: "/settings/business",
    });
  };

  useEffect(() => {
    if (actionData?.success === false) {
      toast.error(actionData.error);
    }
    if (actionData?.success === true) {
      toast.success("Business details updated successfully");
    }
  }, [actionData]);

  const getChanges = useCallback((formValues, initialValues) => {
    const changes = {};

    for (const key in formValues) {
      if (key === "$permissions") {
        continue;
      } else if (formValues[key] !== initialValues[key]) {
        changes[key] = formValues[key];
      }
    }

    return Object.keys(changes).length > 0 ? changes : null;
  }, []);

  return (
    <div className="pt-4 flex gap-y-2 flex-col">
      <h2 className="col-span-2 font-archivo font-normal text-lg lg:text-xl leading-110 tracking-normal pt-4 pb-2">
        Business Details
      </h2>

      <Suspense fallback={<BusinessSkeleton />}>
        <Await resolve={loaderData?.organisation}>
          {(organisation) => {
            useEffect(
              () =>
                setInitialValues((initialValues) => ({
                  ...initialValues,
                  ...organisation,
                })),
              [organisation]
            );

            return (
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={organisationSchema}
                enableReinitialize
              >
                {({ touched, errors, values, setFieldValue }) => {
                  return (
                    <Form className="flex flex-col gap-y-4 p-4 bg-grey rounded">
                      <section className="flex flex-col gap-2 ">
                        <div className="flex gap-4">
                          {values?.logo_url ? (
                            <div className="relative w-24 group">
                              <button
                                className={`cursor-pointer p-1 absolute -top-3  -right-3 bg-grey w-fit h-fit rounded-full justify-center items-center z-10 border border-greyborder ${
                                  values?.logo_url
                                    ? "lg:hidden lg:group-hover:flex"
                                    : "hidden"
                                }`}
                                onClick={() => {
                                  setFieldValue("logo_url", null);
                                  setFieldValue("logo", null);
                                }}
                                disabled={navigation.state === "submitting"}
                              >
                                <AiOutlineClose
                                  size={15}
                                  className="text-greyborder group"
                                />
                              </button>
                              <img
                                src={values.logo_url}
                                alt="logo_url"
                                className="static bg-white w-24 h-24 object-cover border border-greyborder"
                              />
                            </div>
                          ) : (
                            <label
                              htmlFor="logo_url"
                              className={`${cn(
                                "bg-white border border-greyborder w-24 h-24 flex justify-center items-center cursor-pointer p-2",
                                {
                                  "border-error":
                                    touched?.logo_url && errors?.logo_url,
                                }
                              )}`}
                            >
                              <input
                                type="file"
                                id="logo_url"
                                name="logo_url"
                                className="hidden group"
                                accept="image/*"
                                onChange={(event) => {
                                  if (event.currentTarget.files?.length > 0) {
                                    getBase64(
                                      event.currentTarget.files[0]
                                    ).then((base64) =>
                                      setFieldValue("logo_url", base64)
                                    );
                                    setFieldValue(
                                      "logo",
                                      event.currentTarget.files[0]
                                    );
                                    return;
                                  }

                                  setFieldValue("logo_url", null);
                                  setFieldValue("logo", null);
                                }}
                                disabled={navigation.state === "submitting"}
                              />
                              <span className="text-center font-satoshi text-tiny leading-100 tracking-normal max-w-[3.75rem]">
                                Add Logo
                              </span>
                            </label>
                          )}
                        </div>
                        <div className="flex flex-col gap-4 pt-4 ">
                          <div className="flex flex-col lg:flex-row flex-wrap gap-4">
                            <div className="md:w-[17.375rem] flex flex-col gap-y-2">
                              <label
                                htmlFor="name"
                                className="font-satoshi font-medium text-small leading-100 tracking-normal"
                              >
                                Name
                              </label>
                              <Field
                                id="name"
                                name="name"
                                type="text"
                                className={cn(
                                  "border border-greyborder focus:border-accent outline-none p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black",
                                  {
                                    "border-error focus:border-error":
                                      touched?.name && errors?.name,
                                  }
                                )}
                                placeholder="Name"
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
                            <div className="md:w-[17.375rem] flex flex-col gap-y-2">
                              <label
                                htmlFor="email"
                                className="font-satoshi font-medium text-small leading-100 tracking-normal"
                              >
                                Email
                              </label>
                              <Field
                                id="email"
                                name="email"
                                type="text"
                                className={cn(
                                  "border border-greyborder focus:border-accent outline-none p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black",
                                  {
                                    "border-error focus:border-error":
                                      touched?.email && errors?.email,
                                  }
                                )}
                                placeholder="Email"
                                onChange={(e) => {
                                  setFieldValue(
                                    "email",
                                    e.target?.value || null
                                  );
                                }}
                                disabled={navigation.state === "submitting"}
                                value={values.email || ""}
                              />
                              <ErrorMessage name="email">
                                {(msg) => (
                                  <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                                    {msg}
                                  </div>
                                )}
                              </ErrorMessage>
                            </div>
                            <div className="md:w-[17.375rem] flex flex-col gap-y-2">
                              <label
                                htmlFor="email"
                                className="font-satoshi font-medium text-small leading-100 tracking-normal"
                              >
                                Phone
                              </label>
                              <Field
                                id="phone"
                                name="phone"
                                type="text"
                                className={cn(
                                  "border border-greyborder focus:border-accent outline-none p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black",
                                  {
                                    "border-error focus:border-error":
                                      touched?.phone && errors?.phone,
                                  }
                                )}
                                onChange={(e) => {
                                  setFieldValue(
                                    "phone",
                                    e.target?.value || null
                                  );
                                }}
                                placeholder="Phone"
                                value={values.phone || ""}
                                disabled={navigation.state === "submitting"}
                              />
                              <ErrorMessage name="Phone">
                                {(msg) => (
                                  <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                                    {msg}
                                  </div>
                                )}
                              </ErrorMessage>
                            </div>
                          </div>
                          <div className="w-full flex flex-col gap-y-2">
                            <label
                              htmlFor="address"
                              className="font-satoshi font-medium text-small leading-100 tracking-normal"
                            >
                              Address
                            </label>
                            <Field
                              id="address"
                              name="address"
                              type="text"
                              as="textarea"
                              rows={3}
                              className={cn(
                                "border border-greyborder focus:border-accent outline-none p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black resize-none",
                                {
                                  "border-error focus:border-error":
                                    touched?.address && errors?.address,
                                }
                              )}
                              placeholder="Address"
                              disabled={navigation.state === "submitting"}
                            />
                            <ErrorMessage name="address">
                              {(msg) => (
                                <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                                  {msg}
                                </div>
                              )}
                            </ErrorMessage>
                          </div>

                          <div className="flex justify-end">
                            <Button
                              type="submit"
                              className=" w-fit h-fit px-6 py-4 font-bold text-small"
                              disabled={
                                navigation.state === "submitting" ||
                                !getChanges(values, initialValues)
                              }
                            >
                              {navigation.state === "submitting"
                                ? "Updating ..."
                                : "Update"}
                            </Button>
                          </div>
                        </div>
                      </section>
                    </Form>
                  );
                }}
              </Formik>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};

function BusinessSkeleton() {
  return (
    <form className="flex flex-col gap-y-4 p-4 bg-grey rounded">
      <section className="flex flex-col gap-2 ">
        <label
          htmlFor="logo_url"
          className="bg-white border border-greyborder w-24 h-24 flex justify-center items-center cursor-pointer p-2"
        >
          <input
            type="file"
            id="logo_url"
            name="logo_url"
            className="hidden group"
            accept="image/*"
            disabled
          />
          <span className="text-center font-satoshi text-tiny leading-100 tracking-normal max-w-[3.75rem] text-greyborder">
            Loading ...
          </span>
        </label>

        <div className="flex flex-col gap-4 pt-4 ">
          <div className="flex flex-col lg:flex-row flex-wrap gap-4">
            <div className="md:w-[17.375rem] flex flex-col gap-y-2">
              <label
                htmlFor="name"
                className="font-satoshi font-medium text-small leading-100 tracking-normal"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="border border-greyborder focus:border-accent outline-none p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black placeholder:disabled:text-greyborder"
                placeholder="Name"
                disabled
              />
            </div>
            <div className="md:w-[17.375rem] flex flex-col gap-y-2">
              <label
                htmlFor="email"
                className="font-satoshi font-medium text-small leading-100 tracking-normal"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                className="border border-greyborder focus:border-accent outline-none p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black placeholder:disabled:text-greyborder"
                placeholder="Email"
                disabled
              />
            </div>
            <div className="md:w-[17.375rem] flex flex-col gap-y-2">
              <label
                htmlFor="email"
                className="font-satoshi font-medium text-small leading-100 tracking-normal"
              >
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                className="border border-greyborder focus:border-accent outline-none p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black placeholder:disabled:text-greyborder"
                disabled
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-y-2">
            <label
              htmlFor="address"
              className="font-satoshi font-medium text-small leading-100 tracking-normal"
            >
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              as="textarea"
              rows={3}
              className="border border-greyborder focus:border-accent outline-none p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black placeholder:disabled:text-greyborder"
              placeholder="Address"
              disabled
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              className=" w-fit h-fit px-6 py-4 font-bold text-small"
              disabled
            >
              Update
            </Button>
          </div>
        </div>
      </section>
    </form>
  );
}

export default BusinessSettings;
