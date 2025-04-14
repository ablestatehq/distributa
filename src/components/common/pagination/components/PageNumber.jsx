import PropTypes from "prop-types";

/**
 * Individual page number button component
 * @param {Object} props - Component props
 * @returns {JSX.Element} PageNumber component
 */
export const PageNumber = ({
  pageNumber,
  isCurrentPage,
  onPageSelect,
  isLoading,
  isSwiping,
  handleKeyDown,
}) => {
  const displayPageNumber = Number(pageNumber) + 1;

  return (
    <button
      onClick={() => onPageSelect(Number(pageNumber))}
      onKeyDown={(e) => handleKeyDown(e, pageNumber)}
      disabled={isLoading || isCurrentPage}
      aria-current={isCurrentPage ? "page" : undefined}
      aria-label={`Go to page ${displayPageNumber}`}
      data-testid={`page-button-${pageNumber}`}
      className={`
        font-satoshi tracking-normal leading-100 text-tiny
        w-8 h-8 rounded
        transition-colors duration-200
        ${
          isCurrentPage
            ? "bg-accent text-white"
            : "hover:bg-grey focus:ring-2 focus:ring-accent"
        } 
        disabled:cursor-not-allowed 
        ${isSwiping ? "pointer-events-none" : ""}
      `}
    >
      {displayPageNumber}
    </button>
  );
};

PageNumber.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  isCurrentPage: PropTypes.bool.isRequired,
  onPageSelect: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  isSwiping: PropTypes.bool,
  handleKeyDown: PropTypes.func.isRequired,
};

PageNumber.defaultProps = {
  isLoading: false,
  isSwiping: false,
};
