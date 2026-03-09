"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";

import { Link } from "@/i18n/navigation";

import { LangSwitcher } from "@/shared/ui/lang-switcher";

import { MobileNavbar } from "../navbar/mobile";

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
      <header className="relative z-30 max-w-400 m-auto flex items-center justify-between px-5 py-3 md:px-10 md:py-2">
        <div className="size-10 shrink-0 md:size-12">
          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navbar"
            aria-label={isMenuOpen ? t("closeMenuLabel") : t("menuLabel")}
            onClick={() => setIsMenuOpen((current) => !current)}
            className="flex size-10 items-center justify-center text-black md:hidden"
          >
            {isMenuOpen ? (
              <X size={28} strokeWidth={1.75} />
            ) : (
              <Menu size={28} strokeWidth={1.75} />
            )}
          </button>
        </div>

        <Link href="/" onClick={closeMenu} className="flex items-center gap-2 md:gap-4">
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

      {isMenuOpen && <MobileNavbar onNavigate={closeMenu} />}
    </>
  );
};
