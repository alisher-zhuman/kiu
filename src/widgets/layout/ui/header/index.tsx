import Image from "next/image";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

import { LangSwitcher } from "@/shared/ui/lang-switcher";

import { HeaderActions } from "../header-actions";

interface Props {
  mode?: "site" | "admin";
}

export const Header = ({ mode = "site" }: Props) => {
  const t = useTranslations("Header");

  const isAdmin = mode === "admin";

  return (
    <>
      <header className="relative z-40 max-w-400 m-auto flex items-center justify-between px-5 py-3 md:px-10 md:py-2">
        <HeaderActions
          closeMenuLabel={t("closeMenuLabel")}
          isAdmin={isAdmin}
          logout={t("logout")}
          logoutLabel={t("logoutLabel")}
          menuLabel={t("menuLabel")}
        />

        <Link href={isAdmin ? "/admin/news" : "/"} className="flex items-center gap-2 md:gap-4">
          <Image
            src="/icons/logo.svg"
            alt={t("logoAlt")}
            loading="eager"
            className="w-10 h-10 md:w-23 md:h-23"
            width={92}
            height={92}
            sizes="92px"
          />

          <div className="h-10 md:h-18 w-px bg-black" />

          <p className="w-20 md:w-30 text-xs md:text-lg leading-tight font-light">{t("title")}</p>
        </Link>

        <LangSwitcher />
      </header>
    </>
  );
};
