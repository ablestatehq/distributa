import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "../../components/common/forms";
import cn from "../../utils/cn";
import getBase64 from "../../utils/getBase64";
import { AiOutlineClose } from "react-icons/ai";

const Avatar = () => {
  const initialValues = {
    avatar_url: null,
    avatar: null,
  };

  const handleSubmit = (values) => {
    console.log("Values: ", values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, setFieldValue, touched, errors }) => {
        return (
          <div className="pt-4 flex gap-y-2 flex-col">
            <h4 className="col-span-2 font-satoshi font-medium text-small leading-100 tracking-normal">
              Personal Details
            </h4>
            <Form className="flex flex-col gap-y-4 lg:pt-6">
              <div className="flex justify-between h-fit w-full p-4 bg-grey rounded lg:h-24 lg:min-h-fit flex-wrap gap-y-2 items-end lg:items-start">
                <section className="flex flex-1 lg:flex-none w-fit gap-x-4 h-fit">
                  {values?.avatar_url ? (
                    <div className="relative w-24 group">
                      <button
                        className="cursor-pointer p-1 absolute -top-3 lg:-top-10 -right-3 bg-grey w-fit h-fit rounded-full hidden lg:hidden lg:group-hover:flex justify-center items-center z-10 border border-greyborder"
                        onClick={() => {
                          setFieldValue("avatar_url", null);
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
                        Add Profile Picture
                      </span>
                    </label>
                  )}
                </section>
                <div className="flex lg:h-full items-end">
                  <Button
                    type="submit"
                    className=" w-fit h-fit px-6 py-4 font-bold text-small"
                    disabled={!values.avatar}
                  >
                    Update
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

const PersonalDetails = () => {
  const initialValues = {
    name: "",
    email: "",
  };

  const handleSubmit = (values) => {
    console.log("Values: ", values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ touched, errors }) => {
        return (
          <Form className="flex flex-col gap-y-4 p-4 bg-grey rounded">
            <section className="flex flex-col gap-2">
              {/* <h4 className="col-span-2 font-satoshi font-medium text-small leading-100 tracking-normal">
                Personal Information
              </h4> */}
              <div className="flex flex-col md:flex-row justify-between gap-4 md:items-end">
                <div className="flex flex-col md:flex-row gap-4">
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
                    />
                    <ErrorMessage name="email">
                      {(msg) => (
                        <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                          {msg}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>
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
        );
      }}
    </Formik>
  );
};

const Password = () => {
  const initialValues = {
    password: "",
    confirm_password: "",
  };

  const handleSubmit = (values) => {
    console.log("Values: ", values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ touched, errors }) => {
        return (
          <div className="pt-4 flex gap-y-2 flex-col">
            <h4 className="col-span-2 font-satoshi font-medium text-small leading-100 tracking-normal">
              Security
            </h4>
            <Form className="flex flex-col gap-y-4 p-4 bg-grey rounded">
              <section className="flex flex-col gap-2">
                <div className="flex flex-col md:flex-row justify-between gap-4 md:items-end">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-[17.375rem] flex flex-col gap-y-2">
                      <label
                        htmlFor="password"
                        className="font-satoshi font-medium text-small leading-100 tracking-normal"
                      >
                        New Password
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
                      />
                      <ErrorMessage name="password">
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
                      <ErrorMessage name="email">
                        {(msg) => (
                          <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="w-fit h-fit px-6 py-4 font-bold text-small"
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
const ProfileSettings = () => {
  return (
    <main className="flex w-full flex-col h-fit pt-2">
      <h2 className="font-archivo font-normal text-lg lg:text-xl leading-110 tracking-normal py-2">
        Profile
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
