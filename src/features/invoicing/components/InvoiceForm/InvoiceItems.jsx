import React, { useState } from "react";
import { FieldArray, useFormikContext } from "formik";
import { FormikTextField } from "../../../../components/common/forms/FormikFields";
import { Button } from "../../../../components/common/forms";
import { useInvoiceCalculationsContext } from "../../../../pages/Invoices/hooks/useInvoiceCalculationsContext";

const InvoiceItems = ({ mode }) => {
  const { values } = useFormikContext();
  const [editIndex, setEditIndex] = useState(mode === "create" ? 0 : null);
  const [addItem, setAddItem] = useState(null);

  return (
    <FieldArray
      name="items"
      render={(arrayHelpers) => {
        return (
          <div className="bg-grey rounded p-4 w-full">
            <div className="overflow-x-auto max-h-fit">
              <table className="min-w-full table-auto max-w-full overflow-x-scroll">
                <thead>
                  <tr className="border-b border-b-greyborder">
                    <th className="text-start font-satoshi font-normal text-tiny md:text-small leading-100 tracking-normal pb-2">
                      Title
                    </th>
                    <th className="text-start font-satoshi font-normal text-tiny md:text-small leading-100 tracking-normal pb-2">
                      Quantity
                    </th>
                    <th className="text-start font-satoshi font-normal text-tiny md:text-small leading-100 tracking-normal pb-2">
                      Units
                    </th>
                    <th className="text-start font-satoshi font-normal text-tiny md:text-small leading-100 tracking-normal pb-2">
                      Price/Unit
                    </th>
                    <th
                      className="text-start font-satoshi font-normal text-tiny md:text-small leading-100 tracking-normal pb-2"
                      colSpan="2"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {values.items.map((_, index) => {
                    return editIndex === index ? (
                      <EditableRow
                        key={index}
                        index={index}
                        setEditIndex={setEditIndex}
                      />
                    ) : addItem === index ? (
                      <EditableRow
                        key={index}
                        index={index}
                        setEditIndex={setAddItem}
                      />
                    ) : (
                      <DisplayRow
                        key={index}
                        index={index}
                        setEditIndex={setEditIndex}
                        arrayHelpers={arrayHelpers}
                        addItem={addItem}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
            {addItem ? (
              <Button
                type="button"
                className="my-2 px-3 py-1.5 font-satoshi font-medium text-tiny leading-100 tracking-normal outline-none"
                onClick={() => {
                  arrayHelpers.pop();
                  setAddItem(() => null);
                }}
              >
                Cancel
              </Button>
            ) : addItem !== 0 && editIndex !== 0 ? (
              <Button
                type="button"
                className="my-2 px-3 py-1.5 font-satoshi font-medium text-tiny leading-100 tracking-normal outline-none"
                onClick={() => {
                  const totalItems = values.items.length;
                  arrayHelpers.push({
                    title: "",
                    quantity: "",
                    units: "",
                    price: "",
                  });
                  setAddItem(() => totalItems);
                }}
              >
                Add Item
              </Button>
            ) : null}
          </div>
        );
      }}
    />
  );
};

const ItemFieldWrapper = ({ children }) => {
  return (
    <div className="w-[4.5rem] md:min-w-[4.5rem] h-full md:w-full">
      {children}
    </div>
  );
};

const EditableRow = ({ index, setEditIndex }) => {
  const { touched, errors } = useFormikContext();
  const { updateCalculations } = useInvoiceCalculationsContext();

  return (
    <tr key={index}>
      <td className="pr-4 py-2 align-text-top">
        <ItemFieldWrapper>
          <FormikTextField
            name={`items.${index}.title`}
            type="text"
            placeholder="Title"
          />
        </ItemFieldWrapper>
      </td>
      <td className="pr-4 py-2 align-text-top">
        <ItemFieldWrapper>
          <FormikTextField
            name={`items.${index}.quantity`}
            type="text"
            placeholder="Quantity"
          />
        </ItemFieldWrapper>
      </td>
      <td className="pr-4 py-2 align-text-top">
        <ItemFieldWrapper>
          <FormikTextField
            name={`items.${index}.units`}
            type="text"
            placeholder="Units"
          />
        </ItemFieldWrapper>
      </td>
      <td className="pr-4 py-2 align-text-top">
        <ItemFieldWrapper>
          <FormikTextField
            name={`items.${index}.price`}
            type="text"
            placeholder="Price"
          />
        </ItemFieldWrapper>
      </td>
      <td
        className="text-start font-satoshi font-medium text-tiny leading-120 tracking-normal pr-4 py-2 align-text-top"
        colSpan={2}
      >
        <Button
          type="button"
          className="w-fit px-6 py-3 font-medium text-[0.5rem] lg:text-tiny outline-none underline"
          kind="plain"
          onClick={() => {
            updateCalculations();
            setEditIndex(() => null);
          }}
          disabled={
            !touched.items?.[index] ||
            (errors.items?.[index] && touched.items?.[index])
          }
        >
          Save
        </Button>
      </td>
    </tr>
  );
};

const DisplayRow = ({ index, setEditIndex, arrayHelpers, addItem }) => {
  const { values } = useFormikContext();
  const { updateCalculations } = useInvoiceCalculationsContext();

  return (
    <tr>
      <td className="text-start font-satoshi font-medium text-tiny leading-120 tracking-normal pr-4 py-2">
        {values.items[index]["title"]}
      </td>
      <td className="text-start font-satoshi font-medium text-tiny leading-120 tracking-normal pr-4 py-2">
        {values.items[index]["quantity"]}
      </td>
      <td className="text-start font-satoshi font-medium text-tiny leading-120 tracking-normal pr-4 py-2">
        {values.items[index]["units"]}
      </td>
      <td className="text-start font-satoshi font-medium text-tiny leading-120 tracking-normal pr-4 py-2">
        {values.items[index]["price"]}
      </td>
      <td className="text-start font-satoshi font-medium text-tiny leading-120 tracking-normal pr-4 py-2">
        <button
          type="button"
          className="font-satoshi font-normal underline text-error leading-100 tracking-normal capitalize text-tiny outline-none"
          onClick={() => {
            arrayHelpers.remove(index);
            updateCalculations();
          }}
          disabled={values.items?.length <= 1 || addItem}
        >
          Delete
        </button>
      </td>
      <td className="text-start font-satoshi font-medium text-tiny leading-120 tracking-normal pr-4 py-2">
        <button
          type="button"
          className="font-satoshi font-normal underline text-black leading-100 tracking-normal capitalize text-tiny"
          onClick={() => setEditIndex(() => index)}
          disabled={addItem}
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default InvoiceItems;
