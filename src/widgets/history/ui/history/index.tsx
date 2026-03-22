import { useTranslations } from "next-intl";

import { MissionBlock } from "../mission-block";

export const History = () => {
  const t = useTranslations("HistoryPage");

  return (
    <main className="mx-auto max-w-400 px-5 py-10 text-black md:px-10 md:py-16">
      <article className="relative overflow-hidden">
        <div className="border-l-2 border-black pl-3 md:pl-4">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-5xl">
            {t("title")}
          </h1>
        </div>

        <div className="relative mt-10 space-y-10 text-base leading-8 text-black/80 md:mt-14 md:space-y-12 md:text-2xl md:leading-[1.6]">
          <p>{t("introduction")}</p>

          <MissionBlock mission={t("mission")} missionTitle={t("missionTitle")} />

          <p className="whitespace-pre-line">{t("history")}</p>
        </div>
      </article>
    </main>
  );
};
