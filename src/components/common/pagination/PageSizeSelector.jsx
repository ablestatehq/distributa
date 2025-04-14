import { memo } from "react";
import { DEFAULT_PAGE_SIZE } from "../../../data/constants/pagination";

export const PageSizeSelector = memo(function PageSizeSelector({
  pageSize,
  onPageSizeChange,
  pageSizeOptions = [DEFAULT_PAGE_SIZE, 25, 50, 100],
  currentPage,
  totalItems,
}) {
  return (
    <div className="inline-flex items-center gap-2">
      <select
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        className="block rounded w-12 outline-none py-2 text-center border border-greyborder focus:border-accent text-tiny font-satoshi leading-100 tracking-normal"
      >
        {pageSizeOptions.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      <span className="ml-4 font-satoshi tracking-normal leading-100 text-tiny text-gray-600">
        Showing {currentPage * pageSize + 1} -{" "}
        {Math.min((currentPage + 1) * pageSize, totalItems)} of {totalItems}
      </span>
    </div>
  );
});
