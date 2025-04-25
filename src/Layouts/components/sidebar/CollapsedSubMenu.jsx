import { memo } from "react";
import { motion } from "framer-motion";
import NavigationLink from "../NavigationLink";

export const CollapsedSubMenu = memo(({ items, userRoles }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, x: -10 }}
    animate={{ opacity: 1, scale: 1, x: 0 }}
    exit={{ opacity: 0, scale: 0.95, x: -10 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
    className="absolute left-full whitespace-nowrap top-0 bg-white shadow-lg rounded-lg p-2 z-20 flex flex-col gap-y-1.5"
    role="menu"
  >
    {items.map((sub) => (
      <div key={sub.id} role="menuitem">
        <NavigationLink
          to={sub.path}
          children={sub.label}
          hasPagination={sub.hasPagination}
          tooltip={sub.tooltip}
          roles={sub.roles}
          userRoles={userRoles}
          variant="submenu"
          className="text-small font-satoshi py-1.5 px-3 block w-full text-left hover:bg-gray-50"
        />
      </div>
    ))}
  </motion.div>
));
