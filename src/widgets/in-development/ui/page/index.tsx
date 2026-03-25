import { useTranslations } from "next-intl";

interface Props {
  title: string;
}

export const InDevelopment = ({ title }: Props) => {
  const t = useTranslations("InDevelopment");

  return (
    <main className="mx-auto max-w-400 px-5 py-10 text-black md:px-10 md:py-16">
      <section aria-labelledby="in-development-title" className="space-y-8">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#004C97]">
            {t("eyebrow")}
          </p>

          <div className="border-l-2 border-black pl-3 md:pl-4">
            <h1
              id="in-development-title"
              className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
            >
              {title}
            </h1>
          </div>
        </div>

        <div className="max-w-3xl space-y-4 text-base leading-8 text-black/70 sm:text-lg">
          <p>{t("title")}</p>
          <p>{t("description")}</p>
        </div>
      </section>
    </main>
  );
};
