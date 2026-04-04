"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { LogOut } from "lucide-react";

import { Link, useRouter } from "@/i18n/navigation";

import { useAuthStore } from "@/shared/stores";
import { LangSwitcher } from "@/shared/ui/lang-switcher";

import { Menu } from "../menu";
import { MobileNavbar } from "../mobile-navbar";

interface Props {
  mode?: "site" | "admin";
}

export const Header = ({ mode = "site" }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  const logOut = useAuthStore((state) => state.logOut);

  const t = useTranslations("Header");

  const isAdmin = mode === "admin";

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogOut = () => {
    logOut();
    router.replace("/admin/log-in");
  };

  useEffect(() => {
    if (!isMenuOpen || isAdmin) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isAdmin, isMenuOpen]);

  return (
    <>
      <header className="relative z-40 max-w-400 m-auto flex items-center justify-between px-5 py-3 md:px-10 md:py-2">
        {isAdmin ? (
          <div className="flex size-10 shrink-0 items-center md:size-12 md:min-w-28">
            <button
              type="button"
              onClick={handleLogOut}
              aria-label={t("logoutLabel")}
              className="inline-flex size-10 cursor-pointer items-center justify-center text-black transition-colors hover:text-[#004C97] md:size-auto md:gap-2 md:text-sm md:font-medium"
            >
              <LogOut size={22} strokeWidth={1.75} />
              
              <span className="hidden md:inline">{t("logout")}</span>
            </button>
          </div>
        ) : (
          <Menu
            isOpen={isMenuOpen}
            menuLabel={t("menuLabel")}
            closeMenuLabel={t("closeMenuLabel")}
            onToggle={() => setIsMenuOpen((current) => !current)}
          />
        )}

        <Link
          href={isAdmin ? "/admin/news" : "/"}
          onClick={closeMenu}
          className="flex items-center gap-2 md:gap-4"
        >
          <Image
            src="/icons/logo.svg"
            alt={t("logoAlt")}
            className="w-10 h-10 md:w-23 md:h-23"
            width={92}
            height={92}
            sizes="92px"
          />

          <div className="h-10 md:h-18 w-px bg-black" />

          <p className="w-20 md:w-30 text-xs md:text-lg leading-tight font-light">
            {t("title")}
          </p>
        </Link>

        <LangSwitcher />
      </header>

      {!isAdmin ? <MobileNavbar isOpen={isMenuOpen} onNavigate={closeMenu} /> : null}
    </>
  );
};
