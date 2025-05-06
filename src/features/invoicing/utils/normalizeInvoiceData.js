/**
 * Normalizes invoice data by replacing null or undefined values with empty strings
 * This is specifically designed for invoice data structures
 *
 * @param {Object|Array|*} data - The invoice data to normalize
 * @returns {Object|Array|string} - The normalized invoice data
 */
export function normalizeInvoiceData(data) {
  if (data === null || data === undefined) {
    return "";
  }

  if (typeof data !== "object") {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map((item) => normalizeInvoiceData(item));
  }

  return Object.keys(data).reduce((acc, key) => {
    acc[key] = normalizeInvoiceData(data[key]);
    return acc;
  }, {});
}


