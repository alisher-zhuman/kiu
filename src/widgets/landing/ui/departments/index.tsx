import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

import { DEPARTMENT_LINKS } from "@/shared/constants";

export const Departments = () => {
  const t = useTranslations("Departments");

  return (
    <section
      aria-labelledby="departments-title"
      className="max-w-400 m-auto px-5 mt-10 md:mt-30 md:px-10"
    >
      <h2
        id="departments-title"
        className="text-5xl md:text-6xl font-bold text-center"
      >
        {t("title")}
      </h2>

      <nav aria-label={t("navLabel")}>
        <ul className="flex flex-col md:flex-row justify-center items-center gap-5 mt-5 md:gap-10">
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
