import { cn } from "@/shared/helpers";

interface Department {
  name: string;
}

interface Props {
  activeIndex: number;
  departments: ReadonlyArray<Department>;
  label: string;
  onSelect: (index: number) => void;
}

export const DepartmentsSidebar = ({
  activeIndex,
  departments,
  label,
  onSelect,
}: Props) => (
  <nav aria-label={label} className="sticky top-10 w-52 shrink-0">
    {departments.map((dept, index) => (
      <button
        key={dept.name}
        type="button"
        onClick={() => onSelect(index)}
        className={cn(
          "block w-full border-l-2 py-3 pl-4 text-left text-sm transition-all duration-200",
          activeIndex === index
            ? "border-[#004C97] font-semibold text-[#004C97]"
            : "border-black/10 font-normal text-black/40 hover:border-black/25 hover:text-black/60",
        )}
      >
        {dept.name}
      </button>
    ))}
  </nav>
);
