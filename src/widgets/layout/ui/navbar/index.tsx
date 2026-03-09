"use client";

import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

import { NAVBAR_LINKS } from "@/shared/constants";
import { cn } from "@/shared/helpers";

interface Props {
  isMobile?: boolean;
  onNavigate?: () => void;
}

export const Navbar = ({ isMobile = false, onNavigate }: Props) => {
  const t = useTranslations("Navbar");

  if (isMobile) {
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
  }

  return (
    <nav className="bg-[#004C97] sticky top-0 z-10 hidden md:block">
      <ul className="max-w-400 m-auto flex items-center justify-evenly gap-5 px-10 text-white font-semibold text-xs lg:text-lg">
        {NAVBAR_LINKS.map(({ href, labelKey, links }) => (
          <li
            key={href}
            className={cn("group relative", !links && "cursor-pointer")}
          >
            {links ? (
              <span className="block cursor-default py-6">
                <span className="relative block text-white/92 transition-all duration-200 group-hover:-translate-y-px group-hover:text-[#ffea00] after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-0 after:-translate-x-1/2 after:bg-[#ffea00] after:transition-all after:duration-200 group-hover:after:w-full">
                  {t(labelKey)}
                </span>
              </span>
            ) : (
              <Link href={href} className="-mx-2 block px-2 py-6">
                <span className="relative block text-white/92 transition-all duration-200 group-hover:-translate-y-px group-hover:text-[#ffea00] after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-0 after:-translate-x-1/2 after:bg-[#ffea00] after:transition-all after:duration-200 group-hover:after:w-full">
                  {t(labelKey)}
                </span>
              </Link>
            )}

            {links && (
              <div
                className={cn(
                  "pointer-events-none invisible absolute left-1/2 top-full z-20 w-72 -translate-x-1/2 translate-y-2 scale-95 rounded-[1.75rem] border border-white/15 bg-[#0a3f79]/96 p-3 opacity-0 shadow-[0_20px_45px_rgba(0,0,0,0.24)] backdrop-blur-sm transition-all duration-200 ease-out",
                  "group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100",
                )}
              >
                <div className="flex flex-col gap-1">
                  {links.map(({ href: nestedHref, labelKey: nestedLabelKey }) => (
                    <Link
                      key={nestedHref}
                      href={nestedHref}
                      className="rounded-2xl px-4 py-3 text-sm font-medium text-white/92 transition-colors duration-200 hover:bg-white/8 hover:text-[#ffea00]"
                    >
                      {t(nestedLabelKey)}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
