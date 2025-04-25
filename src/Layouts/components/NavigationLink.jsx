import { NavLink, useLocation } from "react-router-dom";
import { useMemo, useCallback } from "react";
import cn from "../../utils/cn";
import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE,
} from "../../data/constants/pagination";
import { Popover, PopoverPanel, Transition } from "@headlessui/react";
import { Fragment } from "react";
import React from "react";

const getPaginatedLink = (path) => ({
  pathname: path,
  search: `?page=${DEFAULT_PAGE}&pageSize=${DEFAULT_PAGE_SIZE}`,
});

const NavigationLink = React.memo(
  ({
    to,
    Icon,
    children,
    hasPagination = false,
    tooltip,
    disabled = false,
    roles = [],
    userRoles = [],
    variant = "primary",
    className, // Explicitly include end prop
    ...props
  }) => {
    const location = useLocation();

    // Memoize the link object
    const linkTo = useMemo(
      () => (hasPagination ? getPaginatedLink(to) : to),
      [to, hasPagination]
    );

    // Check if user has required roles
    const isAccessible =
      roles.length === 0 || roles.some((role) => userRoles.includes(role));

    // Prevent navigation if disabled or not accessible
    const handleClick = useCallback(
      (e) => {
        if (disabled || !isAccessible) {
          e.preventDefault();
        }
      },
      [disabled, isAccessible]
    );

    // Skip rendering if not accessible
    if (!isAccessible) {
      return null;
    }

    // Base styles for variants
    const baseStyles = {
      primary: "font-satoshi font-normal text-medium leading-100 tracking-normal",
      submenu: "font-satoshi font-normal text-medium leading-100 tracking-normal",
    };

    return (
      <Popover as="div" className="relative text-small">
        {({ open }) => (
          <>
            <NavLink
              to={linkTo}
              onClick={handleClick}
              className={({ isActive }) =>
                cn(
                  "flex w-full rounded-lg transition-colors duration-150",
                  baseStyles[variant],
                  {
                    "bg-grey border border-greyborder":
                      isActive && variant === "submenu",
                    "border border-transparent hover:bg-gray-50": !isActive,
                    "justify-center": !children,
                    "opacity-50 cursor-not-allowed": disabled,
                    "focus:outline-none focus:ring-none": !disabled,
                  },
                  className
                )
              }
              role="menuitem"
              aria-current={location.pathname === to ? "page" : undefined}
              aria-disabled={disabled ? "true" : undefined}
              {...props}
            >
              {children && (
                <span className="flex w-full gap-x-4 justify-between">{children}</span>
              )}
            </NavLink>
            {tooltip && (
              <Transition
                as={Fragment}
                show={open}
                enter="transition ease-out duration-100"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <PopoverPanel
                  static
                  className="absolute border z-10 left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded shadow-sm"
                >
                  {tooltip}
                </PopoverPanel>
              </Transition>
            )}
          </>
        )}
      </Popover>
    );
  }
);

export default NavigationLink;
