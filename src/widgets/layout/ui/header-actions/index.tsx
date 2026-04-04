"use client";

import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";

import { useRouter } from "@/i18n/navigation";

import { useAuthStore } from "@/shared/stores";

import { Menu } from "../menu";
import { MobileNavbar } from "../mobile-navbar";

interface Props {
  closeMenuLabel: string;
  isAdmin: boolean;
  logout: string;
  logoutLabel: string;
  menuLabel: string;
}

export const HeaderActions = ({
  closeMenuLabel,
  isAdmin,
  logout,
  logoutLabel,
  menuLabel,
}: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  const logOut = useAuthStore((state) => state.logOut);

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

  const handleLogOut = () => {
    logOut();
    router.replace("/admin/log-in");
  };

  if (isAdmin) {
    return (
      <div className="flex size-10 shrink-0 items-center md:size-12 md:min-w-28">
        <button
          type="button"
          onClick={handleLogOut}
          aria-label={logoutLabel}
          className="inline-flex size-10 cursor-pointer items-center justify-center text-black transition-colors hover:text-[#004C97] md:size-auto md:gap-2 md:text-sm md:font-medium"
        >
          <LogOut size={22} strokeWidth={1.75} />

          <span className="hidden md:inline">{logout}</span>
        </button>
      </div>
    );
  }

  return (
    <>
      <Menu
        isOpen={isMenuOpen}
        menuLabel={menuLabel}
        closeMenuLabel={closeMenuLabel}
        onToggle={() => setIsMenuOpen((current) => !current)}
      />

      <MobileNavbar
        isOpen={isMenuOpen}
        onNavigate={() => setIsMenuOpen(false)}
      />
    </>
  );
};
