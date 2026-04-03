"use client";

import { useLocale, useTranslations } from "next-intl";

import { cn } from "@/shared/helpers";
import { useInView } from "@/shared/hooks";

import { STAT_KEYS } from "../../constants";

import { StatisticsCounter } from "./counter";

export const Statistics = () => {
  const locale = useLocale();

  const t = useTranslations("Statistics");
  
  const { ref, isInView } = useInView<HTMLElement>({
    threshold: 0.25,
  });

  return (
    <section
      ref={ref}
      aria-labelledby="statistics-title"
      className={cn(
        "mt-30 transition-all duration-500 ease-out motion-reduce:transform-none motion-reduce:transition-none",
        isInView
          ? "translate-y-0 opacity-100"
          : "translate-y-6 opacity-0 motion-reduce:opacity-100",
      )}
    >
      <h2
        id="statistics-title"
        className="max-w-400 m-auto px-5 text-4xl font-bold text-center md:px-10 md:text-6xl"
      >
        {t("title")}
      </h2>

      <div className="mt-10 bg-[#004C97] py-15">
        <ul className="max-w-400 m-auto flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:px-10 md:pb-0">
          {STAT_KEYS.map((key) => (
            <li
              key={key}
              className="min-w-64 shrink-0 snap-center rounded-3xl bg-white/5 px-5 py-6 text-center text-white md:min-w-0 md:rounded-none md:bg-transparent md:px-0 md:py-0"
            >
              <StatisticsCounter
                locale={locale}
                start={isInView}
                value={t(`items.${key}.value`)}
              />

              <p className="mt-3 text-lg leading-7">{t(`items.${key}.label`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
