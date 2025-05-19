import React from "react";
import { useField } from "formik";
import TextAreaField from "../fields/TextAreaField";

/**
 * A Formik-connected textarea field component
 */
const FormikTextAreaField = (props) => {
  const [field, meta] = useField(props);

  return (
    <TextAreaField
      {...field}
      {...props}
      error={meta.error}
      touched={meta.touched}
    />
  );
};

export default FormikTextAreaField;
