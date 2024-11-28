import { Suspense, useCallback, useEffect, useMemo, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "../../components/common/forms";
import cn from "../../utils/cn";
import getBase64 from "../../utils/getBase64";
import { AiOutlineClose } from "react-icons/ai";
import { useSubmit, useLoaderData, Await } from "react-router-dom";
import { useNavigation, useFetcher } from "react-router-dom";
import { passwordSchema, personalDetailsSchema } from "../../utils/validators";
import { toast } from "react-toastify";

const Avatar = () => {
  const submit = useSubmit();
  const data = useLoaderData();
  const navigation = useNavigation();

  const isSubmitting =
    [
      "/settings/account/profile-picture/delete",
      "/settings/account/profile-picture/upload",
    ].includes(navigation.formAction) && navigation.state === "submitting";

  const handleSubmit = (values) => {
    const formData = new FormData();

    if (!values?.avatar && !values.avatar_url) {
      submit(formData, {
        method: "post",
        encType: "multipart/form-data",
        action: "/settings/account/profile-picture/delete",
      });
      return;
    }

    formData.append("avatar", values.avatar);
    submit(formData, {
      method: "post",
      encType: "multipart/form-data",
      action: "/settings/account/profile-picture/upload",
    });
    return;
  };

  return (
    <Suspense fallback={<AvatarSkeleton />}>
      <Await resolve={data?.profile}>
        {(data) => {
          return (
            <Formik
              initialValues={{ avatar: null, ...data }}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ values, setFieldValue, touched, errors }) => {
                return (
                  <div className="pt-4 flex gap-y-2 flex-col">
                    <h4 className="col-span-2 font-satoshi font-medium text-small leading-100 tracking-normal">
                      Profile Picture
                    </h4>
                    <Form className="flex flex-col gap-y-4 lg:pt-6">
                      <div className="flex justify-between h-fit w-full p-4 bg-grey rounded lg:h-24 lg:min-h-fit flex-wrap gap-y-2 items-end lg:items-start">
                        <section className="flex flex-1 lg:flex-none w-fit gap-x-4 h-fit">
                          {values?.avatar_url ? (
                            <div className="relative w-24 group">
                              <button
                                className="cursor-pointer p-1 absolute -top-3 lg:-top-9 right-0 bg-grey w-fit h-fit rounded-full hidden lg:hidden lg:group-hover:flex justify-center items-center z-10 border border-greyborder"
                                onClick={() => {
                                  setFieldValue("avatar_url", null);
                                  setFieldValue("avatar", null);
                                }}
                              >
                                <AiOutlineClose
                                  size={15}
                                  className="text-greyborder group"
                                />
                              </button>
                              <img
                                src={values.avatar_url}
                                alt="avatar_url"
                                className="static bg-white lg:absolute -top-8 w-24 h-24 rounded-full object-cover border border-greyborder"
                              />
                            </div>
                          ) : (
                            <label
                              htmlFor="avatar_url"
                              className={`${cn(
                                "bg-white border border-greyborder w-24 h-24 rounded-full flex justify-center items-center cursor-pointer p-2 lg:-mt-7",
                                {
                                  "border-error":
                                    touched?.avatar_url && errors?.avatar_url,
                                }
                              )}`}
                            >
                              <input
                                type="file"
                                id="avatar_url"
                                name="logo"
                                className="hidden group"
                                accept="image/jpg, image/png, image/jpeg"
                                onChange={(event) => {
                                  if (event.currentTarget.files?.length > 0) {
                                    getBase64(
                                      event.currentTarget.files[0]
                                    ).then((base64) =>
                                      setFieldValue("avatar_url", base64)
                                    );
                                    setFieldValue(
                                      "avatar",
                                      event.currentTarget.files[0]
                                    );
                                    return;
                                  }

                                  setFieldValue("avatar_url", null);
                                  setFieldValue("avatar", null);
                                }}
                              />
                              <span className="text-center font-satoshi text-tiny leading-100 tracking-normal max-w-[3.75rem]">
                                Add Profile Picture
                              </span>
                            </label>
                          )}
                        </section>
                        <div className="flex lg:h-full items-end">
                          <Button
                            type="submit"
                            className=" w-fit h-fit px-6 py-4 font-bold text-small"
                            disabled={
                              values.avatar_url === data.avatar_url ||
                              isSubmitting
                            }
                          >
                            {isSubmitting ? "Updating ..." : "Update"}
                          </Button>
                        </div>
                      </div>
                    </Form>
                  </div>
                );
              }}
            </Formik>
          );
        }}
      </Await>
    </Suspense>
  );
};

function AvatarSkeleton() {
  return (
    <div className="pt-4 flex gap-y-2 flex-col">
      <h4 className="col-span-2 font-satoshi font-medium text-small leading-100 tracking-normal">
        Profile Picture
      </h4>
      <form className="flex flex-col gap-y-4 lg:pt-6">
        <div className="flex justify-between h-fit w-full p-4 bg-grey rounded lg:h-24 lg:min-h-fit flex-wrap gap-y-2 items-end lg:items-start">
          <section className="flex flex-1 lg:flex-none w-fit gap-x-4 h-fit">
            <label
              htmlFor="avatar_url"
              className="bg-white border border-greyborder w-24 h-24 rounded-full flex justify-center items-center cursor-auto p-2 lg:-mt-7"
            >
              <input
                type="file"
                id="avatar_url"
                name="logo"
                className="hidden group"
                accept="image/jpg, image/png, image/jpeg"
              />
              <span className="text-center font-satoshi text-tiny leading-100 tracking-normal max-w-[3.75rem] text-greyborder">
                loading ...
              </span>
            </label>
          </section>
          <div className="flex lg:h-full items-end">
            <Button
              type="submit"
              className=" w-fit h-fit px-6 py-4 font-bold text-small"
              disabled
            >
              Update
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

const PersonalDetails = () => {
  const submit = useSubmit();
  const data = useLoaderData();
  const navigation = useNavigation();

  const handleSubmit = (values, { resetForm }) => {
    const formData = new FormData();

    formData.append("email", values.email);
    formData.append("name", values.name);
    formData.append("password", values.password);

    submit(formData, {
      method: "post",
      encType: "multipart/form-data",
      action: "/settings/account/personal-details/update",
    });
  };

  const isSubmitting =
    navigation.formAction === "/settings/account/personal-details/update" &&
    navigation.state === "submitting";

  return (
    <Suspense fallback={<PersonalDetailsSkeleton />}>
      <Await resolve={data?.profile}>
        {(data) => {
          return (
            <Formik
              initialValues={{ password: "", ...data }}
              onSubmit={handleSubmit}
              validationSchema={personalDetailsSchema}
            >
              {({ values, touched, errors, resetForm, isValid, dirty }) => {
                useEffect(() => {
                  if (
                    navigation.state === "loading" &&
                    navigation.json != null &&
                    navigation.formAction !== navigation.location.pathname
                  ) {
                    resetForm({
                      values: {
                        email: values.email,
                        name: values.name,
                        password: "",
                      },
                    });
                  }
                }, [navigation.state, navigation.formData]);

                return (
                  <div className="pt-4 flex gap-y-2 flex-col">
                    <h4 className="col-span-2 font-satoshi font-medium text-small leading-100 tracking-normal">
                      Personal Details
                    </h4>
                    <Form className="flex flex-col gap-y-4 p-4 bg-grey rounded">
                      <section className="flex flex-col gap-2">
                        <div className="flex flex-col md:flex-row md:flex-wrap justify-between gap-4 md:items-end">
                          <div className="flex flex-col md:flex-row md:flex-wrap gap-4">
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
                                disabled={isSubmitting}
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
                                htmlFor="password"
                                className="font-satoshi font-medium text-small leading-100 tracking-normal"
                              >
                                Current Password
                              </label>
                              <Field
                                id="password"
                                name="password"
                                type="password"
                                className={cn(
                                  "border border-greyborder focus:border-accent outline-none p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black",
                                  {
                                    "border-error focus:border-error":
                                      touched?.password && errors?.password,
                                  }
                                )}
                                placeholder="Password"
                                disabled={isSubmitting}
                              />
                              <ErrorMessage name="password">
                                {(msg) => (
                                  <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                                    {msg}
                                  </div>
                                )}
                              </ErrorMessage>
                            </div>
                          </div>
                          <div className="flex flex-grow justify-end">
                            <Button
                              type="submit"
                              className=" w-fit h-fit px-6 py-4 font-bold text-small"
                              disabled={!(dirty && isValid) || isSubmitting}
                            >
                              {isSubmitting ? "Updating ..." : "Update"}
                            </Button>
                          </div>
                        </div>
                      </section>
                    </Form>
                  </div>
                );
              }}
            </Formik>
          );
        }}
      </Await>
    </Suspense>
  );
};

function PersonalDetailsSkeleton() {
  return (
    <div className="pt-4 flex gap-y-2 flex-col">
      <h4 className="col-span-2 font-satoshi font-medium text-small leading-100 tracking-normal">
        Personal Details
      </h4>
      <div className="flex flex-col gap-y-4 p-4 bg-grey rounded">
        <section className="flex flex-col gap-2">
          <div className="flex flex-col md:flex-row md:flex-wrap justify-between gap-4 md:items-end">
            <div className="flex flex-col md:flex-row md:flex-wrap gap-4">
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
                  placeholder="Name"
                  className="border border-greyborder focus:border-accent outline-none p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black disabled:placeholder:text-greyborder"
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
                  className="border border-greyborder focus:border-accent outline-none p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black disabled:placeholder:text-greyborder"
                  placeholder="Email"
                  disabled
                />
              </div>
              <div className="md:w-[17.375rem] flex flex-col gap-y-2">
                <label
                  htmlFor="password"
                  className="font-satoshi font-medium text-small leading-100 tracking-normal"
                >
                  Current Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="border border-greyborder focus:border-accent outline-none p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black disabled:placeholder:text-greyborder"
                  placeholder="Password"
                  disabled
                />
              </div>
            </div>
            <div className="flex flex-grow justify-end">
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
      </div>
    </div>
  );
}

const OrganisationDetails = () => {
  const initialValues = {
    name: "",
    description: "",
  };

  const handleSubmit = (values) => {
    console.log("Values: ", values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ touched, errors, values, setFieldValue }) => {
        return (
          <div className="pt-4 flex gap-y-2 flex-col">
            <h4 className="col-span-2 font-satoshi font-medium text-small leading-100 tracking-normal">
              Organisation Details
            </h4>
            <Form className="flex flex-col gap-y-4 p-4 bg-grey rounded">
              <section className="flex flex-col gap-2 lg:pt-6">
                <div className="flex gap-4">
                  {values?.avatar_url ? (
                    <div className="relative w-24 group">
                      <button
                        className="cursor-pointer p-1 absolute -top-3 lg:-top-9 right-0 bg-grey w-fit h-fit rounded-full hidden lg:hidden lg:group-hover:flex justify-center items-center z-10 border border-greyborder"
                        onClick={() => {
                          setFieldValue("avatar_url", null);
                          setFieldValue("avatar", null);
                        }}
                      >
                        <AiOutlineClose
                          size={15}
                          className="text-greyborder group"
                        />
                      </button>
                      <img
                        src={values.avatar_url}
                        alt="avatar_url"
                        className="static bg-white lg:absolute -top-8 w-24 h-24 object-cover border border-greyborder"
                      />
                    </div>
                  ) : (
                    <label
                      htmlFor="avatar_url"
                      className={`${cn(
                        "bg-white border border-greyborder w-24 h-24 flex justify-center items-center cursor-pointer p-2 lg:-mt-7",
                        {
                          "border-error":
                            touched?.avatar_url && errors?.avatar_url,
                        }
                      )}`}
                    >
                      <input
                        type="file"
                        id="avatar_url"
                        name="logo"
                        className="hidden group"
                        accept="image/*"
                        onChange={(event) => {
                          if (event.currentTarget.files?.length > 0) {
                            getBase64(event.currentTarget.files[0]).then(
                              (base64) => setFieldValue("avatar_url", base64)
                            );
                            setFieldValue(
                              "avatar",
                              event.currentTarget.files[0]
                            );
                            return;
                          }

                          setFieldValue("avatar_url", null);
                          setFieldValue("avatar", null);
                        }}
                      />
                      <span className="text-center font-satoshi text-tiny leading-100 tracking-normal max-w-[3.75rem]">
                        Add Logo
                      </span>
                    </label>
                  )}
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
                    />
                    <ErrorMessage name="name">
                      {(msg) => (
                        <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                          {msg}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>
                <div className="flex flex-col gap-4 ">
                  <div className="w-full flex flex-col gap-y-2">
                    <label
                      htmlFor="description"
                      className="font-satoshi font-medium text-small leading-100 tracking-normal"
                    >
                      Description
                    </label>
                    <Field
                      id="description"
                      name="description"
                      type="text"
                      as="textarea"
                      rows={3}
                      className={cn(
                        "border border-greyborder focus:border-accent outline-none p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black resize-none",
                        {
                          "border-error focus:border-error":
                            touched?.description && errors?.description,
                        }
                      )}
                      placeholder="Description"
                    />
                    <ErrorMessage name="description">
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
                    >
                      Update
                    </Button>
                  </div>
                </div>
              </section>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

const Password = () => {
  const initialValues = {
    new_password: "",
    confirm_password: "",
    current_password: "",
  };
  const formikRef = useRef(null);
  const fetcher = useFetcher();

  const handleSubmit = (values) => {
    const formData = new FormData();
    console.log("These are my values", values);

    formData.append("new_password", values.new_password);
    formData.append("current_password", values.current_password);

    fetcher.submit(formData, {
      method: "POST",
      action: "/settings/account/change-password",
      replace: true,
    });
  };

  useEffect(() => {
    let mounted = true;

    if (mounted && fetcher.state === "idle" && fetcher.data?.success) {
      toast.success(fetcher.data?.message);
      formikRef.current?.resetForm({
        values: initialValues,
        touched: {},
        errors: {},
      });
    }

    if (mounted && fetcher.state === "idle" && fetcher.data?.error) {
      toast.error(fetcher.data?.error);
    }

    return () => {
      mounted = false;

      if (formikRef.current) {
        formikRef.current.resetForm({
          values: initialValues,
          touched: {},
          errors: {},
        });
      }
    };
  }, [fetcher.state, fetcher.data]);

  return (
    <Formik
      initialValues={initialValues}
      innerRef={formikRef}
      onSubmit={handleSubmit}
      validationSchema={passwordSchema}
    >
      {({ touched, errors, dirty, isValid }) => {
        return (
          <div className="pt-4 flex gap-y-2 flex-col">
            <h4 className="col-span-2 font-satoshi font-medium text-small leading-100 tracking-normal">
              Security
            </h4>
            <Form className="flex flex-col gap-y-4 p-4 bg-grey rounded">
              <section className="flex flex-col gap-2">
                <div className="flex flex-col md:flex-row md:flex-wrap justify-between gap-4 md:items-end">
                  <div className="flex flex-col md:flex-row md:flex-wrap gap-4">
                    <div className="md:w-[17.375rem] flex flex-col gap-y-2">
                      <label
                        htmlFor="new_password"
                        className="font-satoshi font-medium text-small leading-100 tracking-normal"
                      >
                        New Password
                      </label>
                      <Field
                        id="new_password"
                        name="new_password"
                        type="password"
                        className={cn(
                          "border border-greyborder focus:border-accent outline-none p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black",
                          {
                            "border-error focus:border-error":
                              touched?.new_password && errors?.new_password,
                          }
                        )}
                        placeholder="Password"
                      />
                      <ErrorMessage name="new_password">
                        {(msg) => (
                          <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>
                    <div className="md:w-[17.375rem] flex flex-col gap-y-2">
                      <label
                        htmlFor="confirm_password"
                        className="font-satoshi font-medium text-small leading-100 tracking-normal"
                      >
                        Confirm Password
                      </label>
                      <Field
                        id="confirm_password"
                        name="confirm_password"
                        type="password"
                        className={cn(
                          "border border-greyborder focus:border-accent outline-none p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black",
                          {
                            "border-error focus:border-error":
                              touched?.confirm_password &&
                              errors?.confirm_password,
                          }
                        )}
                        placeholder="Password"
                      />
                      <ErrorMessage name="confirm_password">
                        {(msg) => (
                          <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>
                    <div className="md:w-[17.375rem] flex flex-col gap-y-2">
                      <label
                        htmlFor="current_password"
                        className="font-satoshi font-medium text-small leading-100 tracking-normal"
                      >
                        Current Password
                      </label>
                      <Field
                        id="current_password"
                        name="current_password"
                        type="password"
                        className={cn(
                          "border border-greyborder focus:border-accent outline-none p-3 bg-white font-satoshi font-regular text-tiny placeholder:text-black",
                          {
                            "border-error focus:border-error":
                              touched?.current_password &&
                              errors?.current_password,
                          }
                        )}
                        placeholder="Current Password"
                      />
                      <ErrorMessage name="current_password">
                        {(msg) => (
                          <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>
                  </div>
                  <div className="flex flex-grow justify-end">
                    <Button
                      type="submit"
                      className="w-fit h-fit px-6 py-4 font-bold text-small"
                      disabled={
                        !(dirty && isValid) || fetcher.state === "submitting"
                      }
                      onClick={() => {
                        console.log("error: ", errors);
                      }}
                    >
                      {fetcher.state === "submitting"
                        ? "Updating ..."
                        : "Update"}
                    </Button>
                  </div>
                </div>
              </section>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

const ProfileSettings = () => {
  return (
    <main className="flex w-full flex-col h-fit">
      <h2 className="font-archivo font-normal text-lg lg:text-xl leading-110 tracking-normal pt-4 pb-2">
        Account Settings
      </h2>
      <div className="flex flex-col gap-y-4">
        <Avatar />
        <PersonalDetails />
        <Password />
      </div>
    </main>
  );
};

export default ProfileSettings;
