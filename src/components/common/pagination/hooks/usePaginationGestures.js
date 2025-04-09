import { useState } from "react";
import { calculateSwipeDirection } from "../utils/paginationUtils";

/**
 * Custom hook for handling pagination touch gestures
 * @param {Function} onNextPage - Handler for next page
 * @param {Function} onPreviousPage - Handler for previous page
 * @param {boolean} hasNextPage - Whether there is a next page
 * @param {boolean} hasPreviousPage - Whether there is a previous page
 * @param {boolean} isLoading - Loading state
 * @returns {Object} Touch handlers and state
 */
export const usePaginationGestures = (
  onNextPage,
  onPreviousPage,
  hasNextPage,
  hasPreviousPage,
  isLoading
) => {
  const [touchStart, setTouchStart] = useState({ x: null, y: null });
  const [isSwiping, setIsSwiping] = useState(false);

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setTouchStart({
      x: touch.clientX,
      y: touch.clientY,
    });
    setIsSwiping(true);
  };

  const handleTouchMove = (e) => {
    if (!touchStart.x || !touchStart.y) return;

    const touch = e.touches[0];
    const horizontalDiff = Math.abs(touch.clientX - touchStart.x);
    const verticalDiff = Math.abs(touch.clientY - touchStart.y);

    if (verticalDiff > horizontalDiff) {
      setTouchStart({ x: null, y: null });
      setIsSwiping(false);
    }
  };

  const handleTouchEnd = (e) => {
    if (!touchStart.x || !isSwiping) return;

    const touch = e.changedTouches[0];
    const direction = calculateSwipeDirection(touchStart, { x: touch.clientX });

    if (direction === "next" && hasNextPage && !isLoading) {
      onNextPage();
    } else if (direction === "previous" && hasPreviousPage && !isLoading) {
      onPreviousPage();
    }

    setTouchStart({ x: null, y: null });
    setIsSwiping(false);
  };

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    isSwiping,
    touchStart,
  };
};
