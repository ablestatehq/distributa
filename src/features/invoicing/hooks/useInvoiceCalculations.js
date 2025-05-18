import { useFormikContext } from "formik";
import getValidNumber from "../../../utils/getValidNumber";
import formatCurrency from "../../../utils/format.currency";
import { CURRENCY_LOCALE_MAP } from "../../../data/constants";

/**
 * Custom hook that combines invoice calculations with Formik context
 * @returns {Object} Object containing calculation functions and handlers
 */
export const useInvoiceCalculations = () => {
  const { values, setFieldValue } = useFormikContext();

  /**
   * Calculate the subtotal from line items
   * @param {Array} items - Array of line items with quantity and price
   * @returns {number} The calculated subtotal
   */
  const calculateSubTotal = (items) =>
    items.reduce((acc, { quantity, price }) => {
      const total = quantity * price;
      return acc + total;
    }, 0);

  /**
   * Calculate the amount due
   * @param {Object} params - Object containing tax, shipping, discount, and sub_total
   * @returns {number} The calculated amount due
   */
  const calculateAmountDue = ({ tax, shipping, discount, sub_total }) =>
    getValidNumber(sub_total) +
    getValidNumber(tax) +
    getValidNumber(shipping) -
    getValidNumber(discount);

  /**
   * Calculate the balance due
   * @param {Object} params - Object containing sub_total, discount, tax, shipping, and amount_paid
   * @returns {number} The calculated balance due
   */
  const calculateBalanceDue = ({
    sub_total,
    discount,
    tax,
    shipping,
    amount_paid,
  }) =>
    getValidNumber(sub_total) -
    getValidNumber(discount) +
    getValidNumber(tax) +
    getValidNumber(shipping) -
    getValidNumber(amount_paid);

  /**
   * Format a number as currency
   * @param {number} amount - The amount to format
   * @returns {string} The formatted currency string
   */
  const formatAmount = (amount) => {
    if (!values.currency) return amount;

    return formatCurrency(amount, {
      decimals: CURRENCY_LOCALE_MAP[values.currency]?.defaultDecimals,
      locale: CURRENCY_LOCALE_MAP[values.currency]?.defaultLocale,
      code: values.currency,
    });
  };

  /**
   * Handle changes to discount, tax, or shipping fields
   * @param {string} name - Field name
   * @param {string} value - New field value
   */
  const handleSummaryFieldChange = (name, value) => {
    const updatedValues = { ...values, [name]: value };
    const amount_due = calculateAmountDue(updatedValues);
    const balance_due = calculateBalanceDue({
      ...updatedValues,
      amount_due,
    });

    setFieldValue("amount_due", amount_due);
    setFieldValue("balance_due", balance_due);
  };

  /**
   * Handle changes to amount_paid field
   * @param {string} value - New amount_paid value
   */
  const handleAmountPaidChange = (value) => {
    const balance_due = calculateBalanceDue({
      ...values,
      amount_paid: value,
    });

    setFieldValue("balance_due", balance_due);
  };

  /**
   * Update calculations after line items change
   */
  const updateCalculations = () => {
    const sub_total = calculateSubTotal(values.items);
    const amount_due = calculateAmountDue({
      ...values,
      sub_total,
    });
    const balance_due = calculateBalanceDue({
      ...values,
      sub_total,
      amount_due,
    });

    setFieldValue("sub_total", sub_total);
    setFieldValue("amount_due", amount_due);
    setFieldValue("balance_due", balance_due);
  };

  return {
    calculateSubTotal,
    calculateAmountDue,
    calculateBalanceDue,
    formatAmount,
    handleSummaryFieldChange,
    handleAmountPaidChange,
    updateCalculations,
  };
};
