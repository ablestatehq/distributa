/**
 * Generates an array of page numbers with ellipsis
 * @param {number} currentPage - Current active page (0-based index)
 * @param {number} totalPages - Total number of pages
 * @returns {Array} Array of page numbers and ellipsis
 */
export const generatePageRange = (currentPage, totalPages) => {
  if (totalPages <= 1) return [0];
  if (totalPages < 0 || currentPage < 0) return [];

  const visiblePageRadius = 2;
  const pageNumbers = new Set();
  const pagesWithEllipsis = [];

  pageNumbers.add(0);

  for (
    let pageIndex = Math.max(1, currentPage - visiblePageRadius);
    pageIndex <= Math.min(currentPage + visiblePageRadius, totalPages - 2);
    pageIndex++
  ) {
    pageNumbers.add(pageIndex);
  }

  pageNumbers.add(totalPages - 1);

  const sortedPages = Array.from(pageNumbers).sort((a, b) => a - b);

  sortedPages.forEach((pageNumber, index) => {
    if (index > 0) {
      const gap = pageNumber - sortedPages[index - 1];
      if (gap > 1) {
        pagesWithEllipsis.push("...");
      }
    }
    pagesWithEllipsis.push(pageNumber);
  });

  return pagesWithEllipsis;
};

/**
 * Calculates swipe direction based on touch coordinates
 * @param {Object} touchStart - Starting touch coordinates
 * @param {number} touchStart.x - X coordinate of touch start
 * @param {Object} touchEnd - Ending touch coordinates
 * @param {number} touchEnd.x - X coordinate of touch end
 * @param {number} threshold - Minimum swipe distance
 * @returns {string|null} 'next', 'previous', or null
 */
export const calculateSwipeDirection = (
  touchStart,
  touchEnd,
  threshold = 50
) => {
  if (!touchStart.x) return null;

  const diff = touchStart.x - touchEnd.x;
  if (Math.abs(diff) < threshold) return null;

  return diff > 0 ? "next" : "previous";
};
