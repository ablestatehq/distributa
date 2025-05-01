import PropTypes from "prop-types";
import React from "react";

/**
 * A loading component for PDF content that displays a pulsing background
 * and optionally a spinning circular loader.
 *
 * @param {Object} props - Component props
 * @param {boolean} [props.showSpinner=true] - Whether to display the spinning loader
 * @returns {JSX.Element} - The rendered component
 */
const PdfLoader = ({ showSpinner = true }) => {
  return (
    <div
      className="flex w-full h-full items-center justify-center bg-grey animate-pulse"
      aria-label="Loading PDF content"
      role="status"
    >
      {showSpinner && (
        <div
          className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-accent-500"
          aria-hidden="true"
        />
      )}
    </div>
  );
};

PdfLoader.propTypes = {
  showSpinner: PropTypes.bool,
};

export default PdfLoader;
