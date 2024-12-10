import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { useSubmit, useActionData } from "react-router-dom";
import Input from "../../../../components/common/forms/Input";
import Button from "../../../../components/common/forms/Button";
import { useNavigationLoadingState } from "../../../../hooks";
import { toast } from "react-toastify";
import { resetPasswordSchema } from "../../utils/validator";

function ResetPassword() {
  const submit = useSubmit();
  const response = useActionData();

  const { isLoading, isReloading, isRedirecting, isSubmitting } =
    useNavigationLoadingState();

  if (response?.error && isReloading)
    toast.error(response?.error?.response?.message || "Unknown error occured");

  if (isRedirecting) toast.success("Successfully updated password.");

  const handlePasswordReset = async (values) =>
    submit(values, { method: "POST", action: "/set-password" });

  const initialValues = {
    password: "",
    password_confirmation: "",
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={resetPasswordSchema}
        onSubmit={handlePasswordReset}
      >
        {() => {
          return (
            <Form className="bg-white p-8 w-fit flex flex-col gap-y-8">
              <h2 className="font-normal font-archivo text-3xl leading-120 tracking-normal text-start">
                Set <br />
                Password
              </h2>
              <Input
                id="password"
                name="password"
                label="Password"
                placeholder="Password"
              />
              <Input
                id="password_confirmation"
                name="password_confirmation"
                label="Confirm Password"
                placeholder="Confirm Password"
                type="password"
              />

              <Button
                type="submit"
                disabled={
                  isLoading || isReloading || isSubmitting || isRedirecting
                }
                className="text-large"
              >
                Set Password
              </Button>
              <p className="font-satoshi font-normal text-tiny leading-150 mb-2">
                <span className="font-normal">Remember Password?</span>
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

export default ResetPassword;
