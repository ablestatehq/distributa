import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { loginSchema } from "../../utils/validator";
import { useAuth } from "../../../../hooks";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from ?? "/dashboard";

  console.log("from: ", from)

  const initialValues = {
    email: "",
    password: "",
  };

  const handleLogin = async (
    { email, password },
    { resetForm, setSubmitting }
  ) => {
    try {
      const session = await login(email, password);
      if (session) navigate(from, { replace: true });
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setSubmitting(false);
      resetForm({ values: { email: "", password: "" } });
    }
  };

  return user ? (
    navigate(from, { replace: true })
  ) : (
    <div className="h-[calc(100vh-45px)] flex justify-center items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        {() => {
          return (
            <Form className="shadow-md rounded-sm px-10 w-fit py-5">
              <h2 className="font-semibold text-center mt-3 text-xl text-gray-900">
                Login
              </h2>
              <div>
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
                <div className="h-5">
                  <ErrorMessage name="email">
                    {(msg) => (
                      <div className="text-red-500 text-xs font-light">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
              </div>
              <div>
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
                <div className="h-5">
                  <ErrorMessage name="password">
                    {(msg) => (
                      <div className="text-red-500 text-xs font-light">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
              </div>
              <button
                className="text-white bg-[#007BFF] hover:bg-[#0B5ED7] text-sm py-2 rounded-sm cursor-pointer mb-3 w-full duration-200 ease-in-out"
                type="submit"
              >
                Login
              </button>
              <div className="text-sm mb-5">
                <span className="font-light">Don't have an account?</span>
                {"  "}
                <Link to="/signup" className="underline text-blue-500">
                  Sign Up
                </Link>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default Login;
