import { useTranslations } from "next-intl";

export const Departments = () => {
  const t = useTranslations("Departments");

  return (
    <section
      aria-labelledby="departments-title"
      className="max-w-400 m-auto px-5 mt-10 md:mt-30 md:px-10"
    >
      <header>
        <h2
          id="departments-title"
          className="text-5xl md:text-6xl font-bold text-center"
        >
          {t("title")}
        </h2>
      </header>
    </section>
  );
};
