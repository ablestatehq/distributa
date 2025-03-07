import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { signUpSchema } from "../../utils/validator";
import { useSubmit, useActionData } from "react-router-dom";
import Input from "../../../../components/common/forms/Input";
import Button from "../../../../components/common/forms/Button";
import { useNavigationLoadingState } from "../../../../hooks";
import { toast } from "react-toastify";

function SignUp() {
  const submit = useSubmit();
  const response = useActionData();
  if (response) console.log("Response: ", response);

  const { isLoading, isReloading, isRedirecting, isSubmitting } =
    useNavigationLoadingState();

  if (response?.error && isReloading)
    toast.error(response?.error?.message ?? "Unknown error occured");

  if (isRedirecting) toast.success("Successfully signed up");

  const handleSignUp = async (values) =>
    submit(values, { method: "POST", action: "/signup" });

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <div className=" min-h-screen flex justify-center items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={signUpSchema}
        onSubmit={handleSignUp}
      >
        {() => {
          return (
            <Form className="bg-white p-8 w-fit flex flex-col gap-y-8">
              <h2 className="font-normal font-archivo text-3xl leading-120 tracking-normal text-start">
                Signup
              </h2>
              <Input
                id="email"
                name="email"
                label="Email"
                placeholder="Email"
              />
              <Input
                id="password"
                name="password"
                label="Password"
                placeholder="Password"
                type="password"
              />
              <Button
                type="submit"
                disabled={
                  isLoading || isReloading || isSubmitting || isRedirecting
                }
                className="text-large"
              >
                Signup
              </Button>
              <p className="font-satoshi font-normal text-tiny leading-150 mb-2">
                <span className="font-normal">Have an account?</span>
                {"  "}
                <Link to="/login" className="underline">
                  Login here
                </Link>
              </p>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default SignUp;
