import PropTypes from "prop-types";

/**
 * Button component for pagination navigation
 * @param {Object} props - Component props
 * @returns {JSX.Element} PaginationButton component
 */
export const PaginationButton = ({
  onClick,
  disabled,
  ariaLabel,
  children,
  isSwiping,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel}
    data-testid={`pagination-button-${ariaLabel
      .toLowerCase()
      .replace(/\s+/g, "-")}`}
    className={`
      px-1 md:px-3 py-1 
      rounded outline-none
      transition-opacity duration-200
      hover:bg-grey focus:ring-2 focus:ring-accent
      disabled:cursor-not-allowed
      disabled:opacity-50
      ${isSwiping ? "pointer-events-none" : ""}
    `}
  >
    {children}
  </button>
);

PaginationButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  ariaLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isSwiping: PropTypes.bool,
};

PaginationButton.defaultProps = {
  disabled: false,
  isSwiping: false,
};
