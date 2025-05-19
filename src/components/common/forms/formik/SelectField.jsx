import React from "react";
import { useField } from "formik";
import SelectField from "../fields/SelectField";

/**
 * A Formik-connected select field component
 */
const FormikSelectField = (props) => {
  const [field, meta] = useField(props);

  return (
    <SelectField
      {...field}
      {...props}
      error={meta.error}
      touched={meta.touched}
    />
  );
};

export default FormikSelectField;
