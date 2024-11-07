import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ContentViewAreaWrapper } from "..";

const Settings = () => {
  return (
    <ContentViewAreaWrapper>
      <header className="flex flex-col gap-y-2">
        <h1 className="font-archivo font-normal text-xl lg:text-4xl leading-110 tracking-normal">
          Settings
        </h1>
        <nav className="flex gap-x-2">
          <NavLink to="/settings/profile">Profile</NavLink>
          <NavLink to="/settings/billing">Billing</NavLink>
          <NavLink to="/settings/categories">Categories</NavLink>
        </nav>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </ContentViewAreaWrapper>
  );
};

export default Settings;
