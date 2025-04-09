import { Query } from "appwrite";

/**
 * Creates pagination queries
 * @param {Object} params
 * @param {number} params.page
 * @param {number} params.pageSize
 * @returns {import('appwrite').Query[]}
 */
export const createPaginationQueries = ({ page, pageSize }) => {
  return pageSize && page
    ? [Query.limit(pageSize), Query.offset(page * pageSize)]
    : [];
};

/**
 * Creates date range queries
 * @param {Object} params
 * @param {string} [params.startDate]
 * @param {string} [params.endDate]
 * @param {string} field
 * @returns {import('appwrite').Query[]}
 */
export const createDateRangeQueries = ({ startDate, endDate }) => {
  if (startDate && endDate)
    return [
      Query.greaterThanEqual("date", startDate),
      Query.lessThanEqual("date", endDate),
    ];

  if (startDate) return [Query.greaterThanEqual("date", startDate)];
  if (endDate) return [Query.lessThanEqual("date", endDate)];

  return [];
};

/**
 * Creates amount range queries
 * @param {Object} params
 * @param {number} [params.minAmount]
 * @param {number} [params.maxAmount]
 * @param {string} [field="amount"]
 * @returns {import('appwrite').Query[]}
 */
export const createAmountRangeQueries = (
  { minAmount, maxAmount },
  field = "amount"
) => {
  if (minAmount || maxAmount) {
    return [Query.between(field, minAmount || 0, maxAmount || Infinity)];
  }
  return [];
};

/**
 * Creates search queries
 * @param {Object} params
 * @param {string} [params.search]
 * @param {string[]} fields
 * @returns {import('appwrite').Query[]}
 */
export const createSearchQueries = ({ search }, fields) => {
  if (search) {
    const searchQueries = fields.map((field) => Query.equal(field, search));
    return [Query.or(searchQueries)];
  }
  return [];
};
