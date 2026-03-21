import Image from "next/image";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

import { DEPARTMENT_LINKS } from "../../constants";

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
          height={315}
          className="h-100 w-full p-5"
        />
      </div>

      <h2
        id="departments-title"
        className="relative z-10 text-4xl md:text-6xl font-bold text-center"
      >
        {t("title")}
      </h2>

      <nav aria-label={t("navLabel")} className="relative z-10">
        <ul className="flex flex-col md:flex-row justify-center flex-wrap items-center gap-5 mt-5 md:mt-10 md:gap-10">
          {DEPARTMENT_LINKS.map(({ href, labelKey }) => (
            <li key={href}>
              <Link
                href={href}
                className="inline-block w-50 rounded-xl bg-[#004C97] py-4 text-center font-medium text-white transition-colors duration-200 hover:bg-[#002E5C] md:w-auto md:px-20 md:py-5 md:text-3xl"
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
