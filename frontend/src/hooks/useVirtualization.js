import { useState, useCallback, useMemo } from "react";

const useVirtualization = ({
  totalItems,
  rowHeight,
  containerHeight,
  bufferCount = 5,
}) => {
  const [scrollTop, setScrollTop] = useState(0);

  const onScroll = useCallback((e) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  const totalHeight = totalItems * rowHeight;

  const { startIndex, endIndex, offsetY } = useMemo(() => {
    if (totalItems === 0) {
      return { startIndex: 0, endIndex: 0, offsetY: 0 };
    }

    const visibleCount = Math.ceil(containerHeight / rowHeight);

    const startIndex = Math.max(
      0,
      Math.floor(scrollTop / rowHeight) - bufferCount
    );

    const endIndex = Math.min(
      totalItems,
      startIndex + visibleCount + bufferCount * 2
    );

    const offsetY = startIndex * rowHeight;

    return { startIndex, endIndex, offsetY };
  }, [scrollTop, totalItems, rowHeight, containerHeight, bufferCount]);

  return {
    totalHeight,
    startIndex,
    endIndex,
    offsetY,
    onScroll,
  };
};

export { useVirtualization };