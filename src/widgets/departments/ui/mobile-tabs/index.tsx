import { type RefObject } from "react";

import { cn } from "@/shared/helpers";

interface Department {
  name: string;
}

interface Props {
  activeIndex: number;
  departments: ReadonlyArray<Department>;
  label: string;
  onSelect: (index: number) => void;
  scrollContainerRef: RefObject<HTMLDivElement | null>;
  tabRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>;
}

export const DepartmentsMobileTabs = ({
  activeIndex,
  departments,
  label,
  onSelect,
  scrollContainerRef,
  tabRefs,
}: Props) => (
  <div
    ref={scrollContainerRef}
    role="tablist"
    aria-label={label}
    className="flex overflow-x-auto md:hidden"
  >
    {departments.map((dept, index) => (
      <button
        key={dept.name}
        ref={(el) => {
          tabRefs.current[index] = el;
        }}
        type="button"
        role="tab"
        aria-selected={activeIndex === index}
        onClick={() => onSelect(index)}
        className={cn(
          "shrink-0 border-b-2 px-4 py-3 text-center text-sm transition-all duration-200",
          activeIndex === index
            ? "border-[#004C97] font-semibold text-[#004C97]"
            : "border-black/10 font-normal text-black/40",
        )}
      >
        {dept.name}
      </button>
    ))}
  </div>
);
