import React from "react";
import { useField } from "formik";
import TextField from "../fields/TextField";

/**
 * A Formik-connected text input field component
 */
const FormikTextField = (props) => {
  const [field, meta] = useField(props);

  return (
    <TextField
      {...field}
      {...props}
      error={meta.error}
      touched={meta.touched}
    />
  );
};

export default FormikTextField;
