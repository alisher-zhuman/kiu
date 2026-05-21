import { type MutableRefObject, type RefObject, useEffect } from "react";

export const useTabScroll = (
  activeIndex: number,
  scrollContainerRef: RefObject<HTMLDivElement | null>,
  tabRefs: MutableRefObject<(HTMLElement | null)[]>,
) => {
  useEffect(() => {
    const container = scrollContainerRef.current;
    const tab = tabRefs.current[activeIndex];
    
    if (!container || !tab) return;

    const containerCenter = container.offsetWidth / 2;
    const tabCenter = tab.offsetLeft + tab.offsetWidth / 2;
    container.scrollTo({ left: tabCenter - containerCenter, behavior: "smooth" });
  }, [activeIndex]);
};
