import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { LangSwitcher } from "@/shared/ui/lang-switcher";

export const Header = async () => {
  const t = await getTranslations("Header");

  return (
    <header className="flex items-center justify-between py-2 px-10">
      <div />

      <Link href="/" className="flex items-center gap-4">
        <Image
          src="/icons/logo.svg"
          alt={t("logoAlt")}
          loading="eager"
          width={92}
          height={92}
        />

        <div className="h-18 w-px bg-black" />

        <p className="w-30 text-lg leading-tight font-light">{t("title")}</p>
      </Link>

      <LangSwitcher />
    </header>
  );
};
