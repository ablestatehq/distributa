import React from "react";
import PropTypes from "prop-types";

/**
 * Component to display PDF rendering errors
 */
const PdfError = ({ error }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <p className="text-error font-bold">Error rendering PDF</p>
      <p className="text-error">{error.message}</p>
    </div>
  );
};

PdfError.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }).isRequired,
};

export default PdfError;
