import React from "react";
import Logo from "../../../components/common/Logos/Logo";
import { CircleX, Menu } from "../../../components/common/icons";

export const MobileHeader = ({ isOpen, toggleSidebar }) => (
  <header className="fixed top-0 left-0 right-0 z-[60] bg-white">
    <div className="flex items-center justify-between py-4 px-6">
      <Logo className="w-[5.758rem] h-[1.125rem]" variant="black" />
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleSidebar();
        }}
        className="p-2 bg-white rounded-lg"
        aria-label={isOpen ? "Close main navigation" : "Open main navigation"}
      >
        {isOpen ? <CircleX variation="black" /> : <Menu variation="black" />}
      </button>
    </div>
  </header>
);
