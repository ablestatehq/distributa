import React from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FocusTrap } from "focus-trap-react";

import { useSidebarState } from "./hooks/useSidebarState.js";
import { useSidebarNavigation } from "./hooks/useSidebarNavigation.js";
import { SidebarHeader } from "./SidebarHeader.jsx";
import { SidebarNavigation } from "./SidebarNavigation.jsx";
import { SidebarFooter } from "./SidebarFooter.jsx";
import { MobileHeader } from "./MobileHeader.jsx";
import { Overlay } from "../../common/Overlay.jsx";

import cn from "../../../utils/cn";

/**
 * Main sidebar component that handles the layout and state of the navigation sidebar
 *
 * @param {Object} props - Component props
 * @param {Array<string>} props.userRoles - User roles for permission-based navigation
 */
function SideBar({ userRoles = ["admin", "user"] }) {
  const location = useLocation();
  const {
    isOpen,
    collapseMenu,
    isDesktop,
    expandedMenu,
    sidebarRef,
    toggleSidebar,
    closeSidebar,
    setCollapseMenu,
    handleExpand,
  } = useSidebarState(location);

  const { navigationTree } = useSidebarNavigation(userRoles, location);

  // Configure FocusTrap options
  const focusTrapOptions = {
    clickOutsideDeactivates: true,
    allowOutsideClick: (e) => {
      const toggleButton = document.querySelector(
        '[aria-label="Close main navigation"]'
      );
      return toggleButton && toggleButton.contains(e.target);
    },
  };

  return (
    <>
      {/* Mobile Header */}
      {!isDesktop && (
        <MobileHeader isOpen={isOpen} toggleSidebar={toggleSidebar} />
      )}

      {/* Overlay for mobile */}
      <Overlay isVisible={!isDesktop && isOpen} onClick={closeSidebar} />

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {(isOpen || isDesktop) && (
          <FocusTrap
            active={!isDesktop && isOpen}
            focusTrapOptions={focusTrapOptions}
          >
            <motion.aside
              ref={sidebarRef}
              initial={{ x: isDesktop ? 0 : "100%" }}
              animate={{ x: isOpen || isDesktop ? 0 : "100%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className={cn(
                "fixed inset-y-0 right-0 bg-white border-r border-r-gray-100 z-40 min-w-fit flex flex-col",
                isDesktop ? "relative py-16" : "shadow-lg pt-20 pb-16",
                isDesktop && collapseMenu ? "w-16" : "w-64"
              )}
              role="region"
              aria-label={
                isDesktop ? "Sidebar navigation" : "Mobile navigation"
              }
            >
              <div className="flex flex-col justify-between items-center h-full">
                <section className="flex flex-col gap-y-8 px-4 w-full">
                  {/* Sidebar Header with Logo */}
                  <SidebarHeader
                    isDesktop={isDesktop}
                    collapseMenu={collapseMenu}
                    setCollapseMenu={setCollapseMenu}
                  />

                  {/* Navigation Menu */}
                  <SidebarNavigation
                    navigationTree={navigationTree}
                    expandedMenu={expandedMenu}
                    collapseMenu={collapseMenu}
                    isDesktop={isDesktop}
                    onExpand={handleExpand}
                    userRoles={userRoles}
                  />
                </section>

                <SidebarFooter
                  collapseMenu={collapseMenu}
                  setIsOpen={closeSidebar}
                />
              </div>
            </motion.aside>
          </FocusTrap>
        )}
      </AnimatePresence>
    </>
  );
}

export default SideBar;
