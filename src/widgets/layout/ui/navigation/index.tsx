import { ChevronDown } from "lucide-react";

import { Link } from "@/i18n/navigation";

import { cn } from "@/shared/helpers";

import { FOOTER_NAVBAR_LINKS } from "../../constants";

interface Props {
  getLabel: (key: string) => string;
  menuTitle: string;
  onToggleSection: (href: string) => void;
  openSection: string | null;
}

export const Navigation = ({
  getLabel,
  menuTitle,
  onToggleSection,
  openSection,
}: Props) => (
  <nav aria-label={menuTitle} className="mt-10 md:pt-12">
    <ul className="mt-6 flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-10 md:text-center">
      {FOOTER_NAVBAR_LINKS.map(({ href, labelKey, links }) => (
        <li key={href}>
          {links ? (
            <div>
              <button
                type="button"
                aria-expanded={openSection === href}
                aria-controls={`footer-${href}-links`}
                onClick={() => onToggleSection(href)}
                className="flex w-full items-center justify-between gap-4 border-b border-white/15 pb-4 text-left text-xl font-medium text-white md:hidden"
              >
                <span>{getLabel(labelKey)}</span>

                <ChevronDown
                  size={20}
                  strokeWidth={1.75}
                  className={cn(
                    "shrink-0 transition-transform duration-300 ease-out",
                    openSection === href && "rotate-180",
                  )}
                />
              </button>

              <div
                id={`footer-${href}-links`}
                className={cn(
                  "grid transition-all duration-300 ease-out md:hidden",
                  openSection === href
                    ? "grid-rows-[1fr] pt-3 opacity-100"
                    : "grid-rows-[0fr] pt-0 opacity-0",
                )}
              >
                <ul className="min-h-0 space-y-2 overflow-hidden pl-4 text-base text-white/80">
                  {links.map(
                    ({ href: nestedHref, labelKey: nestedLabelKey }) => (
                      <li key={nestedHref}>
                        <Link
                          href={nestedHref}
                          className="transition-colors hover:text-white"
                        >
                          {getLabel(nestedLabelKey)}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <div className="hidden md:block">
                <p className="text-xl font-medium text-white md:text-2xl">
                  <span>{getLabel(labelKey)}</span>
                </p>

                <ul className="mt-3 space-y-2 text-base text-white/80 md:text-lg">
                  {links.map(
                    ({ href: nestedHref, labelKey: nestedLabelKey }) => (
                      <li key={nestedHref}>
                        <Link
                          href={nestedHref}
                          className="transition-colors hover:text-white"
                        >
                          {getLabel(nestedLabelKey)}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          ) : (
            <Link
              href={href}
              className="block border-b border-white/15 pb-4 text-xl font-medium transition-colors hover:text-white/75 md:border-0 md:pb-0 md:text-2xl"
            >
              {getLabel(labelKey)}
            </Link>
          )}
        </li>
      ))}
    </ul>
  </nav>
);
