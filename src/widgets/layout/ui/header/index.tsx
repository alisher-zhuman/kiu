"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

import { LangSwitcher } from "../lang-switcher";
import { Menu } from "../menu";
import { MobileNavbar } from "../mobile-navbar";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const t = useTranslations("Header");

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="relative z-40 max-w-400 m-auto flex items-center justify-between px-5 py-3 md:px-10 md:py-2">
        <Menu
          isOpen={isMenuOpen}
          menuLabel={t("menuLabel")}
          closeMenuLabel={t("closeMenuLabel")}
          onToggle={() => setIsMenuOpen((current) => !current)}
        />

        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-2 md:gap-4"
        >
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

      <MobileNavbar isOpen={isMenuOpen} onNavigate={closeMenu} />
    </>
  );
};
