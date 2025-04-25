import React from "react";
import { motion } from "framer-motion";
import { HiMiniChevronDoubleRight } from "react-icons/hi2";
import Logo from "../../../components/common/Logos/Logo";
import LogoCondensed from "../../../components/common/Logos/LogoCondensed";

/**
 * Header component for the sidebar containing logo and collapse button
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isDesktop - Whether the current view is desktop
 * @param {boolean} props.collapseMenu - Whether the sidebar is collapsed
 * @param {Function} props.setCollapseMenu - Function to toggle collapse state
 */
export const SidebarHeader = ({ isDesktop, collapseMenu, setCollapseMenu }) => {
  if (!isDesktop) return null;

  return (
    <>
      <motion.button
        type="button"
        className="absolute top-16 -right-3.5 bg-white border border-gray-100 p-1 rounded-full"
        onClick={() => setCollapseMenu((prev) => !prev)}
        aria-label={collapseMenu ? "Expand sidebar" : "Collapse sidebar"}
        animate={{
          rotate: collapseMenu ? 0 : 180,
          x: collapseMenu ? -2 : 2,
        }}
        transition={{
          type: "tween",
          duration: 0.2,
          ease: "easeInOut",
        }}
      >
        <HiMiniChevronDoubleRight size={20} />
      </motion.button>

      <button
        onClick={() => isDesktop && setCollapseMenu((prev) => !prev)}
        disabled={!isDesktop}
        className="focus:outline-none"
        aria-label="Toggle sidebar logo"
      >
        {collapseMenu ? (
          <LogoCondensed className="fill-none w-[2.813rem] h-6" />
        ) : (
          <Logo
            className="w-[5.758rem] h-[1.125rem] md:w-32 md:h-6"
            variant="blue"
          />
        )}
      </button>
    </>
  );
};
