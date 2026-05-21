"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";

import { Link, usePathname } from "@/i18n/navigation";

import { cn } from "@/shared/helpers";
import { useTabScroll } from "@/shared/hooks";

import { ADMIN_TABS } from "../../constants";

export const AdminTabs = () => {
  const pathname = usePathname();

  const tNavigation = useTranslations("AdminLayout.navigation");
  const tActions = useTranslations("AdminLayout.actions");

  const activeTab =
    ADMIN_TABS.find(
      ({ href }) => pathname === href || pathname.startsWith(`${href}/`),
    ) ?? ADMIN_TABS[0];
  const shouldShowAddButton = pathname !== activeTab.addHref;

  const activeIndex = ADMIN_TABS.indexOf(activeTab);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useTabScroll(activeIndex, scrollContainerRef, tabRefs);

  const addButtonClass =
    "inline-flex items-center justify-center rounded-full bg-[#004C97] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#002E5C]";

  return (
    <nav
      aria-label={tNavigation("label")}
      className="mx-auto w-full max-w-400 px-5 py-3 md:px-10 md:py-4"
    >
      <div className="flex items-center justify-between gap-4">
        <div
          ref={scrollContainerRef}
          className="flex flex-1 gap-2 overflow-x-auto md:hidden"
        >
          {ADMIN_TABS.map(({ href, key }, index) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                ref={(el) => { tabRefs.current[index] = el; }}
                href={href}
                className={cn(
                  "shrink-0 rounded-xl px-4 py-2 text-center text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "bg-[#004C97] text-white"
                    : "bg-black/6 text-black hover:bg-black/8",
                )}
              >
                {tNavigation(key)}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex md:flex-1 md:flex-wrap md:gap-3">
          {ADMIN_TABS.map(({ href, key }) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex min-w-40 items-center justify-center rounded-2xl px-5 py-3 text-center text-base font-medium tracking-normal transition-colors duration-200",
                  isActive
                    ? "bg-[#004C97] text-white"
                    : "bg-black/6 text-black hover:bg-black/8",
                )}
              >
                {tNavigation(key)}
              </Link>
            );
          })}
        </div>

        {shouldShowAddButton ? (
          <div className="hidden md:flex md:shrink-0">
            <Link href={activeTab.addHref} className={addButtonClass}>
              {tActions("add")}
            </Link>
          </div>
        ) : null}
      </div>

      {shouldShowAddButton ? (
        <Link
          href={activeTab.addHref}
          aria-label={tActions("add")}
          className="fixed right-5 bottom-5 z-40 inline-flex size-14 items-center justify-center rounded-full bg-[#004C97] text-white shadow-lg transition-colors hover:bg-[#002E5C] md:hidden"
        >
          <Plus className="size-6" />
        </Link>
      ) : null}
    </nav>
  );
};
