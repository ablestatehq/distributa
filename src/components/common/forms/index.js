import * as Fields from './fields';
import * as Formik from './formik';
import Input from "./Input";
import Button from "./Button";
import CustomSelect from "./CustomSelect";
import CategorySelect from "./CategorySelect";
import PartySelect from "./PartySelect";
import CommonSelect from "./CommonSelect";
import CurrencySelect from "./CurrencySelect";
import InvoiceCurrencySelect from "./InvoiceCurrencySelect";
import CustomAsyncSelect from "./AsyncSelect";

export const selectComponents = {
  CustomSelect,
  CategorySelect,
  PartySelect,
  CommonSelect,
  CurrencySelect,
  InvoiceCurrencySelect,
};

export {
  Fields,
  Formik,
  Input,
  Button,
  CustomSelect,
  CategorySelect,
  PartySelect,
  CommonSelect,
  CurrencySelect,
  InvoiceCurrencySelect,
};

export { CustomSelect as Select };
export { CustomAsyncSelect as AsyncSelect };

export default CustomSelect;
