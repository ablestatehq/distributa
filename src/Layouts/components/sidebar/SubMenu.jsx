import { memo } from "react";
import { motion } from "framer-motion";
import NavigationLink from "../NavigationLink";
import cn from "../../../utils/cn";

export const SubMenu = memo(
  ({ items, isExpanded, collapseMenu, isDesktop, parentId, userRoles }) => (
    <motion.ul
      initial={{ height: 0 }}
      animate={{ height: isExpanded ? "auto" : 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "pl-2 ml-7 hidden flex-col gap-y-2 border-l-2 overflow-hidden border-l-gray-200",
        isExpanded ? "flex mt-2" : "hidden"
      )}
      id={`submenu-${parentId}`}
      role="menu"
    >
      {items.map((sub) => (
        <li key={sub.id} role="menuitem">
          <NavigationLink
            to={sub.path}
            children={collapseMenu && isDesktop ? null : sub.label}
            hasPagination={sub.hasPagination}
            tooltip={sub.tooltip}
            roles={sub.roles}
            userRoles={userRoles}
            variant="submenu"
            className="text-sm py-1.5 px-3 rounded-lg"
          />
        </li>
      ))}
    </motion.ul>
  )
);
