import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { loginSchema } from "../../utils/validator";
import { useSubmit, useActionData } from "react-router-dom";
import Input from "../../../../components/forms/Input";
import Button from "../../../../components/forms/Button";
import { useNavigationLoadingState } from "../../../../hooks";
import { toast } from "react-toastify";

function Login() {
  const submit = useSubmit();
  const response = useActionData();
  if (response) console.log("Response: ", response);

  const { isLoading, isReloading, isRedirecting, isSubmitting } =
    useNavigationLoadingState();

  if (response?.error && isReloading)
    toast.error(response?.error?.message ?? "Unknown error occured");

  if (isRedirecting) toast.success("Successfully logged in");

  const handleLogin = async (values) =>
    submit(values, { method: "POST", action: "/login" });

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        {() => {
          return (
            <Form className="bg-white p-8 w-fit flex flex-col gap-y-8">
              <h2 className="font-normal font-archivo text-3xl leading-120 tracking-normal text-start">
                Login
              </h2>
              <Input
                id="email"
                name="email"
                label="Email"
                placeholder="Email"
              />
              <div className="flex flex-col gap-y-3 w-full">
                <Input
                  id="password"
                  name="password"
                  label="Password"
                  placeholder="Password"
                  type="password"
                />
                <Link
                  to="/forgot-password"
                  className="font-satoshi font-medium text-tiny leading-150 mb-2"
                >
                  ForgotPassword?
                </Link>
              </div>
              <Button
                type="submit"
                disabled={
                  isLoading || isReloading || isSubmitting || isRedirecting
                }
                className="text-large"
              >
                Login
              </Button>
              <p className="font-satoshi font-normal text-tiny leading-150 mb-2">
                <span className="font-normal">Don't have an account?</span>
                {"  "}
                <Link to="/signup" className="underline">
                  Signup here
                </Link>
              </p>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default Login;
