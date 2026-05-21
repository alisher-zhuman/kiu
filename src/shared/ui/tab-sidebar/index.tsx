import { cn } from "@/shared/helpers";

interface Tab {
  key: string;
  label: string;
}

interface Props {
  activeKey: string;
  label: string;
  onSelect: (key: string) => void;
  tabs: ReadonlyArray<Tab>;
}

export const TabSidebar = ({ activeKey, label, onSelect, tabs }: Props) => (
  <nav aria-label={label} className="sticky top-10 w-52 shrink-0">
    {tabs.map((tab) => (
      <button
        key={tab.key}
        type="button"
        onClick={() => onSelect(tab.key)}
        className={cn(
          "block w-full border-l-2 py-3 pl-4 text-left text-sm transition-all duration-200",
          activeKey === tab.key
            ? "border-[#004C97] font-semibold text-[#004C97]"
            : "border-black/10 font-normal text-black/40 hover:border-black/25 hover:text-black/60",
        )}
      >
        {tab.label}
      </button>
    ))}
  </nav>
);
