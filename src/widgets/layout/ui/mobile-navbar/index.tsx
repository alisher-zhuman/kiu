"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { NAVBAR_LINKS } from "@/shared/constants";
import { cn } from "@/shared/helpers";

import { moveScienceToEnd } from "../../helpers";
import { MobileNavItem } from "../mobile-nav-item";
import { NavigationLink } from "../navigation-link";

interface Props {
  isOpen: boolean;
  onNavigate: () => void;
}

const MOBILE_NAVBAR_LINKS = moveScienceToEnd(NAVBAR_LINKS);

export const MobileNavbar = ({ isOpen, onNavigate }: Props) => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const t = useTranslations("Navbar");

  return (
    <nav
      id="mobile-navbar"
      className={cn(
        "fixed inset-x-0 top-16 bottom-0 z-30 overflow-y-auto bg-[#004C97] px-5 py-6 text-white transition-all duration-300 ease-out md:hidden",
        isOpen
          ? "visible translate-y-0 opacity-100"
          : "pointer-events-none invisible translate-y-3 opacity-0"
      )}
    >
      <nav
        className={cn(
          "mx-auto flex max-w-md flex-col gap-6 transition-all duration-300 ease-out",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        )}
      >
        {MOBILE_NAVBAR_LINKS.map(({ href, labelKey, links }) =>
          links ? (
            <MobileNavItem
              key={href}
              href={href}
              isOpen={openSection === href}
              label={t(labelKey)}
              links={links}
              onNavigate={onNavigate}
              onToggle={() => setOpenSection((current) => (current === href ? null : href))}
              t={t}
            />
          ) : (
            <NavigationLink
              key={href}
              href={href}
              onClick={onNavigate}
              className="border-b border-white/15 pb-4 text-lg font-semibold text-white transition-colors hover:text-white/80"
            >
              {t(labelKey)}
            </NavigationLink>
          )
        )}
      </nav>
    </nav>
  );
};
