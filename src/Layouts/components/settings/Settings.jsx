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
        <nav className="flex gap-x-2">
          <NavLink
            to="/settings/profile"
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
            Profile
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
        </nav>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </ContentViewAreaWrapper>
  );
};

export default Settings;
