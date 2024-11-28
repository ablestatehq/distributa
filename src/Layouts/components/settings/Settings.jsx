import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ContentViewAreaWrapper } from "..";
import cn from "../../../utils/cn";

const Settings = () => {
  return (
    <ContentViewAreaWrapper>
      <header className="flex flex-col gap-y-2">
        <h1 className="font-archivo font-normal text-xl lg:text-4xl leading-110 tracking-normal">
          Settings
        </h1>
        <nav className="flex gap-x-2 w-full overflow-x-auto">
          <NavLink
            to="/settings/account"
            className={({ isActive }) =>
              cn(
                "px-0.5 pb-1 pt-3 font-satoshi font-normal leading-100 tracking-normal ease-in-out delay-75 transition-all",
                {
                  "border-b border-b-black": isActive,
                  "border-b border-b-transparent": !isActive,
                }
              )
            }
          >
            Account
          </NavLink>
          <NavLink
            to="/settings/categories"
            className={({ isActive }) =>
              cn(
                "px-0.5 pb-1 pt-3 font-satoshi font-normal leading-100 tracking-normal ease-in-out delay-75 transition-all",
                {
                  "border-b border-b-black": isActive,
                  "border-b border-b-transparent": !isActive,
                }
              )
            }
          >
            Categories
          </NavLink>
          <NavLink
            to="/settings/parties"
            className={({ isActive }) =>
              cn(
                "px-0.5 pb-1 pt-3 font-satoshi font-normal leading-100 tracking-normal ease-in-out delay-75 transition-all",
                {
                  "border-b border-b-black": isActive,
                  "border-b border-b-transparent": !isActive,
                }
              )
            }
          >
            Parties
          </NavLink>
          <NavLink
            to="/settings/currency"
            className={({ isActive }) =>
              cn(
                "px-0.5 pb-1 pt-3 font-satoshi font-normal leading-100 tracking-normal ease-in-out delay-75 transition-all",
                {
                  "border-b border-b-black": isActive,
                  "border-b border-b-transparent": !isActive,
                }
              )
            }
          >
            Currency
          </NavLink>
          <NavLink
            to="/settings/organisation"
            className={({ isActive }) =>
              cn(
                "px-0.5 pb-1 pt-3 font-satoshi font-normal leading-100 tracking-normal ease-in-out delay-75 transition-all",
                {
                  "border-b border-b-black": isActive,
                  "border-b border-b-transparent": !isActive,
                }
              )
            }
          >
            Organisation
          </NavLink>
        </nav>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </ContentViewAreaWrapper>
  );
};

export default Settings;
