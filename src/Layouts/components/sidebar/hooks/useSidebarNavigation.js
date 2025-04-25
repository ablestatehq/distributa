import { useMemo } from "react";
import {
  getNavigationTree,
  sidebarConfig,
} from "../../../../config/navigation.config.js";

/**
 * Custom hook for managing sidebar navigation
 *
 * @param {Array<string>} userRoles - User roles for permission-based navigation
 * @returns {Object} Navigation data
 */
export const useSidebarNavigation = (userRoles) => {
  // Generate navigation tree based on user roles
  const navigationTree = useMemo(
    () => getNavigationTree(sidebarConfig.navigationItems, userRoles),
    [userRoles]
  );

  return { navigationTree };
};
