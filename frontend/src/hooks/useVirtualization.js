import { useState, useCallback, useMemo } from "react";

const useVirtualization = ({ totalItems, rowHeight, containerHeight, bufferCount = 5 }) => {
  const [scrollTop, setScrollTop] = useState(0);

  const onScroll = useCallback((e) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  const totalHeight = totalItems * rowHeight;

  const { startIndex, endIndex, offsetY } = useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / rowHeight) - bufferCount);
    const visibleCount = Math.ceil(containerHeight / rowHeight);
    const end = Math.min(totalItems - 1, start + visibleCount + bufferCount * 2);
    const offset = start * rowHeight;

    return { startIndex: start, endIndex: end, offsetY: offset };
  }, [scrollTop, rowHeight, containerHeight, totalItems, bufferCount]);

  return { totalHeight, startIndex, endIndex, offsetY, onScroll };
};

export { useVirtualization };
