import { type RefObject } from "react";

import { cn } from "@/shared/helpers";

interface Tab {
  key: string;
  label: string;
}

interface Props {
  activeKey: string;
  label: string;
  onSelect: (key: string) => void;
  scrollContainerRef: RefObject<HTMLDivElement | null>;
  tabRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>;
  tabs: ReadonlyArray<Tab>;
}

export const DocumentsMobileTabs = ({
  activeKey,
  label,
  onSelect,
  scrollContainerRef,
  tabRefs,
  tabs,
}: Props) => (
  <div
    ref={scrollContainerRef}
    role="tablist"
    aria-label={label}
    className="flex overflow-x-auto md:hidden"
  >
    {tabs.map((tab, index) => (
      <button
        key={tab.key}
        ref={(el) => { tabRefs.current[index] = el; }}
        type="button"
        role="tab"
        aria-selected={activeKey === tab.key}
        onClick={() => onSelect(tab.key)}
        className={cn(
          "shrink-0 border-b-2 px-4 py-3 text-center text-sm transition-all duration-200",
          activeKey === tab.key
            ? "border-[#004C97] font-semibold text-[#004C97]"
            : "border-black/10 font-normal text-black/40",
        )}
      >
        {tab.label}
      </button>
    ))}
  </div>
);
