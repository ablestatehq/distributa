import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { forgotPasswordSchema } from "../../utils/validator";
import { useSubmit, useActionData } from "react-router-dom";
import Input from "../../../../components/common/forms/Input";
import Button from "../../../../components/common/forms/Button";
import { useNavigationLoadingState } from "../../../../hooks";
import { toast } from "react-toastify";

function ForgotPassword() {
  const submit = useSubmit();
  const response = useActionData();

  const { isLoading, isReloading, isRedirecting, isSubmitting } =
    useNavigationLoadingState();

  if (response?.error && isReloading)
    toast.error(response?.error?.response?.message || "Unknown error occured");

  if (response?.success && isReloading) {
    toast.success("Password reset link sent to your email");
  }

  const handleSubmit = async (values) =>
    submit(values, { method: "POST", action: "/forgot-password" });

  const initialValues = {
    email: "",
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={forgotPasswordSchema}
        onSubmit={handleSubmit}
      >
        {() => {
          return (
            <Form className="bg-white p-8 w-fit flex flex-col gap-y-8">
              <h2 className="font-normal font-archivo text-3xl leading-120 tracking-normal text-start">
                Forgot
                <br />
                Password
              </h2>
              <Input
                id="email"
                name="email"
                label="Email"
                placeholder="Email"
              />
              <Button
                type="submit"
                disabled={
                  isLoading || isReloading || isSubmitting || isRedirecting
                }
                className="text-large "
              >
                Submit
              </Button>
              <p className="font-satoshi font-normal text-tiny leading-150 mb-2">
                <span className="font-normal">Remember Password?</span>
                {"  "}
                <Link to="/login" className="underline">
                  Login
                </Link>
              </p>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default ForgotPassword;
