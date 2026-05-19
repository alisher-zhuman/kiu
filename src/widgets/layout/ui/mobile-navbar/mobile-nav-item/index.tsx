import { ChevronDown } from "lucide-react";

import { cn } from "@/shared/helpers";

import { NavigationLink } from "../../navigation-link";

interface NavLink {
  href: string;
  labelKey: string;
}

interface Props {
  href: string;
  isOpen: boolean;
  label: string;
  links: ReadonlyArray<NavLink>;
  onNavigate: () => void;
  onToggle: () => void;
  t: (key: string) => string;
}

export const MobileNavItem = ({
  href,
  isOpen,
  label,
  links,
  onNavigate,
  onToggle,
  t,
}: Props) => (
  <div className="border-b border-white/15 pb-6">
    <button
      type="button"
      aria-expanded={isOpen}
      aria-controls={`${href}-links`}
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-4 py-1 text-left text-lg font-semibold text-white"
    >
      <span>{label}</span>

      <ChevronDown
        size={20}
        strokeWidth={1.75}
        className={cn(
          "shrink-0 transition-transform duration-200",
          isOpen && "rotate-180",
        )}
      />
    </button>

    <div
      id={`${href}-links`}
      className={cn(
        "grid transition-all duration-200 ease-out",
        isOpen
          ? "grid-rows-[1fr] pt-3 opacity-100"
          : "grid-rows-[0fr] pt-0 opacity-0",
      )}
    >
      <div className="flex min-h-0 flex-col gap-2 overflow-hidden pl-4">
        {links.map(({ href: nestedHref, labelKey: nestedLabelKey }) => (
          <NavigationLink
            key={nestedHref}
            href={nestedHref}
            onClick={onNavigate}
            className="text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            {t(nestedLabelKey)}
          </NavigationLink>
        ))}
      </div>
    </div>
  </div>
);
