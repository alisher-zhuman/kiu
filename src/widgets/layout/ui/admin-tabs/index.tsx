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
      className="mx-auto w-full max-w-400 px-5 py-4 md:px-10 md:py-5"
    >
      <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-3 md:overflow-visible">
        {ADMIN_TABS.map(({ href, key }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex min-w-52 items-center justify-center rounded-[1.35rem] px-6 py-4 text-center text-xl font-medium whitespace-nowrap transition-colors duration-200 md:min-w-0 md:text-[1.05rem]",
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
