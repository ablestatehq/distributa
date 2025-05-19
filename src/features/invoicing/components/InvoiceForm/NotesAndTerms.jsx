import { FormikTextAreaField } from "../../../../components/common/forms/FormikFields";

const NotesAndTerms = () => {
  return (
    <div className="lg:col-span-4 grid grid-cols-1 lg:grid-cols-2 gap-4 bg-grey rounded p-4">
      <FormikTextAreaField
        id="notes"
        name="notes"
        label="Notes"
        placeholder="Notes - any relevant information not already covered"
        rows={4}
      />

      <FormikTextAreaField
        id="terms"
        name="terms"
        label="Terms & Conditions"
        placeholder="Terms & conditions - late fees, payment methods, delivery schedule"
        rows={4}
      />
    </div>
  );
};

export default NotesAndTerms;
