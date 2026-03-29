"use client";

import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";

import { Link, usePathname } from "@/i18n/navigation";

import { cn } from "@/shared/helpers";

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

  const addButtonClass =
    "inline-flex items-center justify-center rounded-full bg-[#004C97] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#002E5C]";

  return (
    <nav
      aria-label={tNavigation("label")}
      className="mx-auto w-full max-w-400 px-5 py-3 md:px-10 md:py-4"
    >
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-4">
        <div className="grid grid-cols-3 gap-2 md:flex md:flex-wrap md:gap-3">
          {ADMIN_TABS.map(({ href, key }) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex min-w-0 items-center justify-center rounded-xl px-2 py-2 text-center text-[0.78rem] leading-tight font-medium tracking-tight transition-colors duration-200 md:min-w-40 md:rounded-2xl md:px-5 md:py-3 md:text-base md:tracking-normal",
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
