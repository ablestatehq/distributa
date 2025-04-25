import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks";
import cn from "../../../utils/cn";

export const SidebarFooter = ({ collapseMenu, setIsOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <footer className="flex w-full flex-col gap-y-4 px-4">
      <nav aria-label="User actions" className="w-full">
        <ul role="menu" className="flex flex-col w-full gap-y-4">
          <li role="menuitem">
            <button
              className={cn(
                "text-black w-fit py-2 px-4 rounded-lg font-satoshi text-small tracking-normal leading-100",
                { "px-2": collapseMenu }
              )}
              onClick={async () => {
                await logout();
                navigate("/");
                setIsOpen(false);
              }}
            >
              Log Out
            </button>
          </li>
          <li role="menuitem">
            <button
              className={cn(
                "text-black w-fit py-2 px-4 rounded-lg font-satoshi text-small tracking-normal leading-100",
                { "px-2": collapseMenu }
              )}
              onClick={() => {
                navigate("/settings/account");
                setIsOpen(false);
              }}
            >
              Settings
            </button>
          </li>
        </ul>
      </nav>
    </footer>
  );
};
