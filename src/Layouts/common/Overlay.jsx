import React from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Reusable overlay component for modals, drawers, and mobile menus
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isVisible - Whether the overlay is visible
 * @param {Function} props.onClick - Click handler for the overlay
 * @param {number} [props.zIndex=30] - Z-index for the overlay
 */
export const Overlay = ({ isVisible, onClick, zIndex = 40 }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`fixed inset-0 bg-black/10 z-${zIndex}`}
          onClick={onClick}
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
  );
};
