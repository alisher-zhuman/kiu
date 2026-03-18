import { useTranslations } from "next-intl";

const STAT_KEYS = ["books", "teachers", "employment", "students"] as const;

export const Statistics = () => {
  const t = useTranslations("Statistics");

  return (
    <section aria-labelledby="statistics-title" className="mt-30">
      <h2
        id="statistics-title"
        className="text-4xl md:text-6xl font-bold text-center max-w-400 m-auto px-5 md:px-10"
      >
        {t("title")}
      </h2>

      <div className="bg-[#004C97] py-15 mt-10">
        <ul className="max-w-400 m-auto px-5 md:px-10 grid gap-10 md:grid-cols-4 md:gap-6">
          {STAT_KEYS.map((key) => (
            <li key={key} className="text-center text-white">
              <h3 className="text-6xl font-bold">{t(`items.${key}.value`)}</h3>

              <p className="mt-3 text-lg leading-7">{t(`items.${key}.label`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
