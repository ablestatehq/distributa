/**
 * Formats invoice data for submission to the server
 * Converts string values to appropriate number types
 *
 * @param {Object} formValues - The raw invoice form values
 * @returns {Object} - The invoice data ready for server submission
 */
export const formatInvoiceData = (formValues) => {
  const formatted = { ...formValues };

  // Convert numeric string values to numbers
  formatted.discount = formatted.discount ? parseFloat(formatted.discount) : 0;
  formatted.tax = formatted.tax ? parseFloat(formatted.tax) : 0;
  formatted.shipping = formatted.shipping ? parseFloat(formatted.shipping) : 0;
  formatted.amount_paid = formatted.amount_paid
    ? parseFloat(formatted.amount_paid)
    : 0;

  // Process line items
  formatted.items = formatted.items.map((item) => ({
    ...item,
    price: item.price ? parseFloat(item.price) : 0,
    quantity: parseInt(item.quantity),
  }));

  // Handle email fields
  if (formatted.billed_from) {
    formatted.billed_from.email = formatted.billed_from.email || null;
  }

  if (formatted.billed_to) {
    formatted.billed_to.email = formatted.billed_to.email || null;
  }

  return formatted;
};
