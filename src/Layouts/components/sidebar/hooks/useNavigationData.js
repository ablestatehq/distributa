import { useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  getNavigationTree,
  getNavigationMap,
  sidebarConfig,
} from "../../../../../config/navigation.config.js";

/**
 * Custom hook to manage navigation data
 * @param {Object} options - Configuration options
 * @param {Array} options.userRoles - User roles for permission checking
 * @param {boolean} options.collapseMenu - Whether menu is collapsed
 * @param {Function} options.setExpandedMenu - Function to set expanded menu
 * @returns {Object} Navigation data and related functions
 */
const useNavigationData = ({
  userRoles = [],
  collapseMenu = false,
  setExpandedMenu,
}) => {
  const location = useLocation();

  // Compute navigation data
  const navigationTree = useMemo(
    () => getNavigationTree(sidebarConfig.navigationItems, userRoles),
    [userRoles, collapseMenu]
  );

  const navigationMap = useMemo(
    () => getNavigationMap(sidebarConfig.navigationItems),
    []
  );

  // Auto-expand parent if a submenu or parent matches the current route
  useEffect(() => {
    const currentItem = navigationMap.get(location.pathname);
    if (currentItem) {
      const parentId = currentItem.parentId || currentItem.id;
      setExpandedMenu(parentId);
    } else {
      setExpandedMenu(null);
    }
  }, [location.pathname, navigationMap, setExpandedMenu]);

  return {
    navigationTree,
    navigationMap,
    location,
  };
};

export default useNavigationData;
