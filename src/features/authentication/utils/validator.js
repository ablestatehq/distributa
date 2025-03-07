import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(8, "Too Short!").required("Password is required"),
});

export const signUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(8, "Too Short!").required("Password is required"),
});

export const beneficiarySchema = Yup.object().shape({
  name: Yup.string().required("Name required"),
  percentage: Yup.number()
    .min(0, "Too low (Min: 0%)")
    .max(100, "To high (Max: 100%)"),
  amount: Yup.number().required("Amount is required"),
});

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string().min(8, "Too Short!").required("Password is required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});
