import { memo, useMemo } from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { AiOutlineEllipsis } from "react-icons/ai";
import PropTypes from "prop-types";
import { PaginationButton } from "./components/PaginationButton";
import { PageNumber } from "./components/PageNumber";
import { generatePageRange } from "./utils/paginationUtils";
import { usePaginationGestures } from "./hooks/usePaginationGestures";

export const Pagination = memo(function Pagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  onNextPage,
  onPreviousPage,
  onPageSelect,
  isLoading,
}) {
  const { handleTouchStart, handleTouchMove, handleTouchEnd, isSwiping } =
    usePaginationGestures(
      onNextPage,
      onPreviousPage,
      hasNextPage,
      hasPreviousPage,
      isLoading
    );

  const pageRange = useMemo(
    () => generatePageRange(currentPage, totalPages),
    [currentPage, totalPages]
  );

  const handleKeyDown = (e, pageNumber) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onPageSelect(Number(pageNumber));
    }
  };

  const renderPageButton = (pageNumber, index) => {
    if (pageNumber === "...") {
      return (
        <li key={`ellipsis-${index}`} className="px-0.5 md:px-2">
          <AiOutlineEllipsis className="text-black" />
        </li>
      );
    }

    return (
      <li key={`page-${pageNumber}`}>
        <PageNumber
          pageNumber={pageNumber}
          isCurrentPage={pageNumber === currentPage}
          onPageSelect={onPageSelect}
          isLoading={isLoading}
          isSwiping={isSwiping}
          handleKeyDown={handleKeyDown}
        />
      </li>
    );
  };

  if (totalPages < 0 || currentPage < 0) {
    return <div>Invalid pagination parameters</div>;
  }

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={`
        flex-1 min-w-fit flex-wrap 
        flex justify-center md:justify-end 
        items-center gap-1.5 py-2
        ${isSwiping ? "touch-pan-y" : ""}
      `}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      data-testid="pagination-nav"
    >
      {isSwiping && (
        <div
          className="fixed top-0 left-0 right-0 h-1 bg-accent opacity-50"
          role="presentation"
        />
      )}

      <PaginationButton
        onClick={onPreviousPage}
        disabled={!hasPreviousPage || isLoading}
        ariaLabel="Go to previous page"
        isSwiping={isSwiping}
      >
        <GrFormPrevious className="inline" />
        <span className="font-satoshi tracking-normal leading-100 text-tiny font-medium">
          Prev
        </span>
      </PaginationButton>

      {isLoading ? (
        <div className="flex items-center justify-center" role="status">
          <span className="font-satoshi tracking-normal leading-100 text-tiny">
            Loading...
          </span>
        </div>
      ) : (
        <ol className="flex gap-1 items-center">
          {pageRange.map((pageNumber, index) =>
            renderPageButton(pageNumber, index)
          )}
        </ol>
      )}

      <PaginationButton
        onClick={onNextPage}
        disabled={!hasNextPage || isLoading}
        ariaLabel="Go to next page"
        isSwiping={isSwiping}
      >
        <span className="font-satoshi tracking-normal leading-100 text-tiny font-medium">
          Next
        </span>
        <GrFormNext className="inline" />
      </PaginationButton>

      <div
        className="ml-4 font-satoshi tracking-normal leading-100 text-tiny text-black"
        role="status"
        aria-live="polite"
      >
        Page {currentPage + 1} of {totalPages}
      </div>
    </nav>
  );
});

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
  hasPreviousPage: PropTypes.bool.isRequired,
  onNextPage: PropTypes.func.isRequired,
  onPreviousPage: PropTypes.func.isRequired,
  onPageSelect: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

Pagination.defaultProps = {
  isLoading: false,
  currentPage: 0,
  totalPages: 1,
};
