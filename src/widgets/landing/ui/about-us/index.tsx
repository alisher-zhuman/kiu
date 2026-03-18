import { useTranslations } from "next-intl";

import { cn } from "@/shared/helpers";

const ABOUT_US_CARD_KEYS = ["education", "environment", "values"] as const;

export const AboutUs = () => {
  const t = useTranslations("AboutUs");

  return (
    <section aria-labelledby="about-us-title" className="bg-slate-50 px-5 py-14 md:px-10 md:py-20">
      <div className="max-w-400 m-auto">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]">
          <div className="relative overflow-hidden rounded-4xl bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-10 md:py-12">
            <div className="absolute top-0 right-0 h-28 w-28 rounded-bl-4xl bg-[#004C97]/8" />

            <div className="relative">
              <div className="flex items-center gap-3 text-xs font-semibold tracking-widest uppercase text-[#004C97]">
                <span className="h-px w-10 bg-[#004C97]" />
                <span>{t("eyebrow")}</span>
              </div>

              <h2
                id="about-us-title"
                className="mt-6 max-w-4xl text-3xl leading-none font-bold text-black md:text-5xl"
              >
                {t("title")}
              </h2>

              <div className="mt-8 grid gap-5 text-sm leading-7 text-black/70 md:grid-cols-2 md:text-base md:leading-8">
                <p>{t("descriptionPrimary")}</p>
                <p>{t("descriptionSecondary")}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {ABOUT_US_CARD_KEYS.map((key, index) => (
              <article
                key={key}
                className={cn(
                  "rounded-4xl px-6 py-6 md:px-7 md:py-7",
                  index === 0
                    ? "bg-[#004C97] text-white"
                    : "bg-white text-black shadow-sm ring-1 ring-black/5",
                )}
              >
                <div
                  className={cn(
                    "inline-flex size-10 items-center justify-center rounded-full text-sm font-semibold",
                    index === 0
                      ? "bg-white/15 text-white"
                      : "bg-[#004C97]/10 text-[#004C97]",
                  )}
                >
                  0{index + 1}
                </div>

                <h3 className="mt-5 text-xl leading-tight font-semibold md:text-2xl">
                  {t(`cards.${key}.title`)}
                </h3>

                <p
                  className={cn(
                    "mt-3 text-sm leading-7 md:text-base md:leading-8",
                    index === 0 ? "text-white/80" : "text-black/65",
                  )}
                >
                  {t(`cards.${key}.description`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
