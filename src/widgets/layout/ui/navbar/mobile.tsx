"use client";

import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

import { NAVBAR_LINKS } from "@/shared/constants";

interface Props {
  onNavigate: () => void;
}

export const MobileNavbar = ({ onNavigate }: Props) => {
  const t = useTranslations("Navbar");

  return (
    <div
      id="mobile-navbar"
      className="fixed inset-x-0 top-16 bottom-0 z-20 overflow-y-auto bg-[#004C97] px-5 py-6 text-white md:hidden"
    >
      <nav className="mx-auto flex max-w-md flex-col gap-6">
        {NAVBAR_LINKS.map(({ href, labelKey, links }) =>
          links ? (
            <div key={href} className="space-y-3 border-b border-white/15 pb-6">
              <p className="text-lg font-semibold text-[#ffea00]">
                {t(labelKey)}
              </p>

              <div className="flex flex-col gap-2 pl-4">
                {links.map(({ href: nestedHref, labelKey: nestedLabelKey }) => (
                  <Link
                    key={nestedHref}
                    href={nestedHref}
                    onClick={onNavigate}
                    className="text-sm font-medium text-white/90 transition-colors hover:text-[#ffea00]"
                  >
                    {t(nestedLabelKey)}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className="border-b border-white/15 pb-4 text-lg font-semibold text-white transition-colors hover:text-[#ffea00]"
            >
              {t(labelKey)}
            </Link>
          ),
        )}
      </nav>
    </div>
  );
};
