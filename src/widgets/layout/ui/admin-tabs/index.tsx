"use client";

import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";

import { cn } from "@/shared/helpers";

import { ADMIN_TABS } from "../../constants";

export const AdminTabs = () => {
  const pathname = usePathname();

  const t = useTranslations("AdminLayout.navigation");

  return (
    <nav
      aria-label={t("label")}
      className="mx-auto w-full max-w-400 px-5 py-3 md:px-10 md:py-4"
    >
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
              {t(key)}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
