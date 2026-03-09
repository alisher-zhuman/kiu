import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { LangSwitcher } from "@/shared/ui/lang-switcher";

export const Header = async () => {
  const t = await getTranslations("Header");

  return (
    <header className="max-w-400 m-auto flex items-center justify-between px-5 py-3 md:py-2 md:px-10">
      <div />

      <Link href="/" className="flex items-center gap-2 md:gap-4">
        <Image
          src="/icons/logo.svg"
          alt={t("logoAlt")}
          loading="eager"
          className="w-10 h-10 md:w-23 md:h-23"
          width={92}
          height={92}
        />

        <div className="h-10 md:h-18 w-px bg-black" />

        <p className="w-20 md:w-30 text-xs md:text-lg leading-tight font-light">
          {t("title")}
        </p>
      </Link>

      <LangSwitcher />
    </header>
  );
};
