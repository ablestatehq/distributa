import { useState, useEffect, useCallback, useRef } from "react";
import useMediaQuery from "../../../../hooks/useMediaQuery";
import { findParentForPath } from "../../../../config/.js";

/**
 * Custom hook for managing sidebar state
 *
 * @param {Object} location - Current location from react-router
 * @returns {Object} Sidebar state and handlers
 */
export const useSidebarState = (location) => {
  const [isOpen, setIsOpen] = useState(false);
  const [collapseMenu, setCollapseMenu] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const sidebarRef = useRef(null);

  // Set expanded menu based on current path
  useEffect(() => {
    const parentId = findParentForPath(location.pathname);
    if (parentId) {
      setExpandedMenu(parentId);
    }
  }, [location.pathname]);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    if (isDesktop) {
      setIsOpen(false);
    }
  }, [isDesktop]);

  // Handle menu expansion
  const handleExpand = useCallback((id) => {
    setExpandedMenu((prev) => (prev === id ? null : id));
  }, []);

  // Toggle sidebar visibility
  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Close sidebar
  const closeSidebar = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    collapseMenu,
    isDesktop,
    expandedMenu,
    sidebarRef,
    toggleSidebar,
    closeSidebar,
    setCollapseMenu,
    handleExpand,
  };
};
