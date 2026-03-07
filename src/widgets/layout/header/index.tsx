import Image from "next/image";

import { LangSwitcher } from "@/shared/ui/lang-switcher";

export const Header = () => {
  return (
    <header className="flex items-center justify-between py-2 px-10">
      <div />

      <div className="flex items-center gap-4">
        <Image
          src="/icons/logo.svg"
          alt="Сделай локализацию в alt"
          loading="eager"
          width={92}
          height={92}
        />

        <div className="h-18 w-px bg-black" />

        <p className="w-30 text-lg leading-tight font-light">
          Кыргызский Исламский Университет
        </p>
      </div>

      <LangSwitcher />
    </header>
  );
};
