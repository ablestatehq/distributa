import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

/**
 * Custom hook to handle URL parameters
 * @param {Object} options - Configuration options
 * @param {boolean} options.cleanupParams - Whether to clean up params after reading
 * @param {string[]} options.paramsToWatch - List of param names to watch
 * @returns {Object} - URL parameters and utility functions
 */
export const useUrlParams = ({
  cleanupParams = false,
  paramsToWatch = [],
} = {}) => {
  const location = useLocation();
  const [params, setParams] = useState({});

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const extractedParams = {};

    // Extract all watched params
    paramsToWatch.forEach((param) => {
      const value = searchParams.get(param);
      if (value !== null) {
        extractedParams[param] = value;
      }
    });

    // Only update state if we found any params
    if (Object.keys(extractedParams).length > 0) {
      setParams(extractedParams);

      // Clean up URL if requested
      if (cleanupParams && window.history && window.history.replaceState) {
        const newUrl = `${window.location.pathname}${window.location.hash}`;
        window.history.replaceState({}, "", newUrl);
      }
    }
  }, [location, cleanupParams, paramsToWatch]);

  /**
   * Check if a specific parameter exists and has a specific value
   * @param {string} paramName - Parameter name to check
   * @param {string} value - Value to compare against
   * @returns {boolean} - True if parameter exists and matches value
   */
  const hasParam = (paramName, value) => {
    return params[paramName] === value;
  };

  /**
   * Get a specific parameter value
   * @param {string} paramName - Parameter name to get
   * @returns {string|null} - Parameter value or null if not found
   */
  const getParam = (paramName) => {
    return params[paramName] || null;
  };

  return {
    params,
    hasParam,
    getParam,
  };
};
