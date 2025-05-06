import React from "react";
import PropTypes from "prop-types";

/**
 * Component for toggling letterhead visibility
 */
const LetterheadToggle = ({ showLetterhead, onToggle }) => {
  return (
    <div className="flex justify-between w-full">
      <h4 className="font-archivo font-normal text-medium leading-140 tracking-0">
        Add A Letterhead
      </h4>
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={showLetterhead}
          onChange={onToggle}
          className="sr-only peer"
        />
        <div className="relative w-11 h-6 ring-1 ring-black peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-black rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-black after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-black after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-white peer-checked:bg-accent"></div>
      </label>
    </div>
  );
};

LetterheadToggle.propTypes = {
  showLetterhead: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default LetterheadToggle;
