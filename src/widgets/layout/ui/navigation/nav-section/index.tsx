import { ChevronDown } from "lucide-react";

import { cn } from "@/shared/helpers";

import { NavigationLink } from "../../navigation-link";

interface NavLink {
  href: string;
  labelKey: string;
}

interface Props {
  getLabel: (key: string) => string;
  href: string;
  isOpen: boolean;
  label: string;
  links: ReadonlyArray<NavLink>;
  onToggle: () => void;
}

export const NavSection = ({
  getLabel,
  href,
  isOpen,
  label,
  links,
  onToggle,
}: Props) => (
  <div>
    <button
      type="button"
      aria-expanded={isOpen}
      aria-controls={`footer-${href}-links`}
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-4 border-b border-white/15 pb-4 text-left text-xl font-medium text-white md:hidden"
    >
      <span>{label}</span>

      <ChevronDown
        size={20}
        strokeWidth={1.75}
        className={cn(
          "shrink-0 transition-transform duration-300 ease-out",
          isOpen && "rotate-180",
        )}
      />
    </button>

    <div
      id={`footer-${href}-links`}
      className={cn(
        "grid transition-all duration-300 ease-out md:hidden",
        isOpen
          ? "grid-rows-[1fr] pt-3 opacity-100"
          : "grid-rows-[0fr] pt-0 opacity-0",
      )}
    >
      <ul className="min-h-0 space-y-2 overflow-hidden pl-4 text-base text-white/80">
        {links.map(({ href: nestedHref, labelKey: nestedLabelKey }) => (
          <li key={nestedHref}>
            <NavigationLink
              href={nestedHref}
              className="transition-colors hover:text-white"
            >
              {getLabel(nestedLabelKey)}
            </NavigationLink>
          </li>
        ))}
      </ul>
    </div>

    <div className="hidden md:block">
      <p className="text-xl font-medium text-white md:text-2xl">{label}</p>

      <ul className="mt-3 space-y-2 text-base text-white/80 md:text-lg">
        {links.map(({ href: nestedHref, labelKey: nestedLabelKey }) => (
          <li key={nestedHref}>
            <NavigationLink
              href={nestedHref}
              className="transition-colors hover:text-white"
            >
              {getLabel(nestedLabelKey)}
            </NavigationLink>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
