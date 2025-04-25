import { useState, memo, createElement } from "react";
import { HiChevronDown } from "react-icons/hi2";
import NavigationLink from "../NavigationLink.jsx";
import { SubMenu } from "./SubMenu.jsx";
import { CollapsedSubMenu } from "./CollapsedSubMenu.jsx";
import cn from "../../../utils/cn.js";
import { iconRegistry } from "../../../config/navigation.config.js";

export const MenuItem = memo(
  ({ item, expandedMenu, collapseMenu, isDesktop, onExpand, userRoles }) => {
    const isExpanded = expandedMenu === item.id;
    const hasSubMenu = item.children.length > 0;
    const [isHovered, setIsHovered] = useState(false);

    return (
      <li
        role="menuitem"
        className={cn("w-full relative group")}
        onMouseEnter={() => collapseMenu && hasSubMenu && setIsHovered(true)}
        onMouseLeave={() => collapseMenu && hasSubMenu && setIsHovered(false)}
      >
        <NavigationLink
          to={item.path}
          hasPagination={item.hasPagination}
          tooltip={item.tooltip}
          roles={item.roles}
          userRoles={userRoles}
          variant={hasSubMenu ? "primary" : "submenu"}
          className={cn(
            "flex items-center gap-x-2 justify-between pl-4 rounded-lg group-hover:bg-gray-50",
            collapseMenu && "px-4 py-3"
          )}
          onClick={() => {
            if (hasSubMenu && !isExpanded) {
              onExpand(item.id);
            }
          }}
        >
          <span
            className={cn(
              "flex w-full items-center gap-x-2",
              !collapseMenu && !hasSubMenu && "py-2",
              collapseMenu && "justify-center"
            )}
          >
            {iconRegistry[item.icon] &&
              createElement(iconRegistry[item.icon], {
                className: cn(
                  "w-4 h-4",
                  collapseMenu && "mr-0",
                  !hasSubMenu && "py-2 border border-red-500"
                ),
                variation: "black",
              })}
            {!collapseMenu && isDesktop
              ? item.label
              : !isDesktop
              ? item.label
              : null}
          </span>
          {hasSubMenu && !collapseMenu && (
            <button
              type="button"
              className={cn(
                "p-3.5 rounded-lg transition-transform",
                "hover:bg-gray-200",
                isExpanded ? "rotate-180 duration-200" : ""
              )}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onExpand(item.id);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.stopPropagation();
                  onExpand(item.id);
                }
              }}
              aria-expanded={isExpanded}
              aria-controls={`submenu-${item.id}`}
              aria-label={
                isExpanded
                  ? `Collapse ${item.label} submenu`
                  : `Expand ${item.label} submenu`
              }
            >
              <HiChevronDown size={14} />
            </button>
          )}
        </NavigationLink>
        {hasSubMenu && !collapseMenu && (
          <SubMenu
            items={item.children}
            isExpanded={isExpanded}
            collapseMenu={collapseMenu}
            isDesktop={isDesktop}
            parentId={item.id}
            userRoles={userRoles}
          />
        )}
        {hasSubMenu && collapseMenu && isHovered && (
          <CollapsedSubMenu items={item.children} userRoles={userRoles} />
        )}
      </li>
    );
  }
);
