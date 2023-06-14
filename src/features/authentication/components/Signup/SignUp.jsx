import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";

function SignUp() {
  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <div className="h-[calc(100vh-45px)] flex justify-center items-center">
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          console.log("values", values);
        }}
      >
        {() => {
          return (
            <Form className="shadow-md rounded-sm px-10 w-fit py-5">
              <h2 className="font-semibold text-center mt-3 text-xl text-gray-900">
                Sign Up
              </h2>
              <div className="mb-5">
                <label htmlFor="email" className="font-light text-sm">
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  type="text"
                  className="border border-gray-200 rounded w-full py-1.5 px-2 text-black focus:outline-none text-sm font-light flex items-center"
                  placeholder="johndoe@gmail.com"
                ></Field>
              </div>
              <div className="mb-5">
                <label htmlFor="password" className="font-light text-sm">
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="border border-gray-200 rounded w-full py-1.5 px-2 text-black focus:outline-none text-sm font-light flex items-center"
                  placeholder="********"
                ></Field>
              </div>
              <button
                className="text-white bg-[#007BFF] hover:bg-[#0B5ED7] text-sm py-2 rounded-sm cursor-pointer mb-3 w-full duration-200 ease-in-out"
                type="submit"
              >
                Sign Up
              </button>
              <div className="text-sm mb-5">
                <span className="font-light">Already have an account?</span>
                {"  "}
                <Link to="/login" className="underline text-blue-500">
                  Login
                </Link>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default SignUp;
