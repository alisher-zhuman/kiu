import { useTranslations } from "next-intl";

import { Reveal } from "@/shared/ui/reveal";

import { Gallery } from "../gallery";
import { MissionBlock } from "../mission-block";

export const History = () => {
  const t = useTranslations("HistoryPage");

  return (
    <main className="mx-auto max-w-400 px-5 py-10 text-black md:px-10 md:py-16">
      <article className="relative overflow-hidden">
        <Reveal>
          <div className="border-l-2 border-black pl-3 md:pl-4">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-5xl">
              {t("title")}
            </h1>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-[minmax(0,1fr)_16rem] md:items-start md:gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="space-y-10 text-base leading-8 text-black/80 md:space-y-12 md:text-2xl md:leading-[1.6]">
            <Reveal delay={50}>
              <p>{t("introduction")}</p>
            </Reveal>

            <Reveal delay={100} className="md:hidden">
              <Gallery
                firstImageAlt={t("gallery.firstImageAlt")}
                secondImageAlt={t("gallery.secondImageAlt")}
              />
            </Reveal>

            <Reveal delay={150}>
              <MissionBlock
                mission={t("mission")}
                missionTitle={t("missionTitle")}
              />
            </Reveal>

            <Reveal delay={200}>
              <p className="whitespace-pre-line">{t("history")}</p>
            </Reveal>
          </div>

          <Reveal delay={100} className="hidden md:block">
            <Gallery
              firstImageAlt={t("gallery.firstImageAlt")}
              secondImageAlt={t("gallery.secondImageAlt")}
            />
          </Reveal>
        </div>
      </article>
    </main>
  );
};
