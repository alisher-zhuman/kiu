import Image from "next/image";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

import { DEPARTMENT_LINKS } from "@/shared/constants";

export const Departments = () => {
  const t = useTranslations("Departments");

  return (
    <section
      aria-labelledby="departments-title"
      className="relative max-w-400 m-auto px-5 mt-30 md:px-10"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-14 flex justify-center opacity-15 md:hidden"
      >
        <Image
          src="/icons/logo.svg"
          alt=""
          width={220}
          height={220}
          className="h-auto w-full p-5"
        />
      </div>

      <h2
        id="departments-title"
        className="relative z-10 text-5xl md:text-6xl font-bold text-center"
      >
        {t("title")}
      </h2>

      <nav aria-label={t("navLabel")} className="relative z-10">
        <ul className="flex flex-col md:flex-row justify-center items-center gap-5 mt-5 md:mt-10 md:gap-10">
          {DEPARTMENT_LINKS.map(({ href, labelKey }) => (
            <li key={href}>
              <Link
                href={href}
                className="bg-[#004C97] py-4 inline-block text-center w-50 md:w-auto md:py-5 md:px-20 rounded-xl text-white md:text-3xl font-medium"
              >
                {t(labelKey)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
};
