import React from "react";
import { MenuItem } from "./MenuItem.jsx";

/**
 * Navigation component for the sidebar containing menu items
 *
 * @param {Object} props - Component props
 * @param {Array} props.navigationTree - Navigation items to display
 * @param {string|null} props.expandedMenu - ID of the currently expanded menu
 * @param {boolean} props.collapseMenu - Whether the sidebar is collapsed
 * @param {boolean} props.isDesktop - Whether the current view is desktop
 * @param {Function} props.onExpand - Function to handle menu expansion
 * @param {Array<string>} props.userRoles - User roles for permission-based navigation
 */
export const SidebarNavigation = ({
  navigationTree,
  expandedMenu,
  collapseMenu,
  isDesktop,
  onExpand,
  userRoles,
}) => {
  return (
    <nav aria-label="Main navigation">
      <ul role="menu" className="flex flex-col gap-y-4 w-full pt-4 lg:pt-0">
        {navigationTree.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            expandedMenu={expandedMenu}
            collapseMenu={collapseMenu}
            isDesktop={isDesktop}
            onExpand={onExpand}
            userRoles={userRoles}
          />
        ))}
      </ul>
    </nav>
  );
};
