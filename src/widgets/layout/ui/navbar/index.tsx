import { useTranslations } from "next-intl";

import { NAVBAR_LINKS } from "@/shared/constants";
import { cn } from "@/shared/helpers";

import { NavigationLink } from "../navigation-link";

export const Navbar = () => {
  const t = useTranslations("Navbar");

  return (
    <nav className="z-20 hidden bg-[#004C97] md:block">
      <ul className="max-w-400 m-auto flex items-center justify-evenly gap-5 px-10 text-xs font-semibold text-white lg:text-lg">
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
              <NavigationLink href={href} className="-mx-2 block px-2 py-6">
                <span className="relative block text-white/92 transition-all duration-200 group-hover:-translate-y-px group-hover:text-[#ffea00] after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-0 after:-translate-x-1/2 after:bg-[#ffea00] after:transition-all after:duration-200 group-hover:after:w-full">
                  {t(labelKey)}
                </span>
              </NavigationLink>
            )}

            {links && (
              <div
                className={cn(
                  "pointer-events-none invisible absolute left-1/2 top-full z-20 w-72 -translate-x-1/2 translate-y-2 scale-95 rounded-[1.75rem] border border-white/15 bg-[#0a3f79]/96 p-3 opacity-0 shadow-[0_20px_45px_rgba(0,0,0,0.24)] backdrop-blur-sm transition-all duration-200 ease-out",
                  "group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100",
                )}
              >
                <div className="flex flex-col gap-1">
                  {links.map(
                    ({ href: nestedHref, labelKey: nestedLabelKey }) => (
                      <NavigationLink
                        key={nestedHref}
                        href={nestedHref}
                        className="rounded-2xl px-4 py-3 text-sm font-medium text-white/92 transition-colors duration-200 hover:bg-white/8 hover:text-[#ffea00]"
                      >
                        {t(nestedLabelKey)}
                      </NavigationLink>
                    ),
                  )}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
