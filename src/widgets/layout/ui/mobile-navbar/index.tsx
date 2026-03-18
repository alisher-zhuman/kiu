"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

import { Link } from "@/i18n/navigation";

import { moveResearchToEnd } from "@/widgets/layout/helpers";

import { NAVBAR_LINKS } from "@/shared/constants";
import { cn } from "@/shared/helpers";

interface Props {
  isOpen: boolean;
  onNavigate: () => void;
}

const MOBILE_NAVBAR_LINKS = moveResearchToEnd(NAVBAR_LINKS);

export const MobileNavbar = ({ isOpen, onNavigate }: Props) => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const t = useTranslations("Navbar");

  return (
    <div
      id="mobile-navbar"
      className={cn(
        "fixed inset-x-0 top-16 bottom-0 z-30 overflow-y-auto bg-[#004C97] px-5 py-6 text-white transition-all duration-300 ease-out md:hidden",
        isOpen
          ? "visible translate-y-0 opacity-100"
          : "pointer-events-none invisible translate-y-3 opacity-0",
      )}
    >
      <nav
        className={cn(
          "mx-auto flex max-w-md flex-col gap-6 transition-all duration-300 ease-out",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        )}
      >
        {MOBILE_NAVBAR_LINKS.map(({ href, labelKey, links }) =>
          links ? (
            <div key={href} className="border-b border-white/15 pb-6">
              <button
                type="button"
                aria-expanded={openSection === href}
                aria-controls={`${href}-links`}
                onClick={() =>
                  setOpenSection((current) => (current === href ? null : href))
                }
                className="flex w-full items-center justify-between gap-4 py-1 text-left text-lg font-semibold text-white"
              >
                <span>{t(labelKey)}</span>

                <ChevronDown
                  size={20}
                  strokeWidth={1.75}
                  className={cn(
                    "shrink-0 transition-transform duration-200",
                    openSection === href && "rotate-180",
                  )}
                />
              </button>

              <div
                id={`${href}-links`}
                className={cn(
                  "grid transition-all duration-200 ease-out",
                  openSection === href
                    ? "grid-rows-[1fr] pt-3 opacity-100"
                    : "grid-rows-[0fr] pt-0 opacity-0",
                )}
              >
                <div className="flex min-h-0 flex-col gap-2 overflow-hidden pl-4">
                  {links.map(
                    ({ href: nestedHref, labelKey: nestedLabelKey }) => (
                      <Link
                        key={nestedHref}
                        href={nestedHref}
                        onClick={onNavigate}
                        className="text-sm font-medium text-white/80 transition-colors hover:text-white"
                      >
                        {t(nestedLabelKey)}
                      </Link>
                    ),
                  )}
                </div>
              </div>
            </div>
          ) : (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className="border-b border-white/15 pb-4 text-lg font-semibold text-white transition-colors hover:text-white/80"
            >
              {t(labelKey)}
            </Link>
          ),
        )}
      </nav>
    </div>
  );
};
