import Image from "next/image";
import { useTranslations } from "next-intl";

import { type NewsItem } from "@/entities/news";

import { formatDate } from "@/shared/helpers";
import { Reveal } from "@/shared/ui/reveal";

interface Props {
  hasError?: boolean;
  locale: string;
  newsItem: NewsItem | undefined;
}

export const NewsDetail = ({ hasError = false, locale, newsItem }: Props) => {
  const t = useTranslations("NewsPage");

  if (hasError) {
    return (
      <main className="mx-auto max-w-400 px-5 py-10 text-black md:px-10 md:py-16">
        <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-base text-red-600 md:px-6 md:py-5 md:text-lg">
          {t("error")}
        </div>
      </main>
    );
  }

  if (!newsItem) {
    return null;
  }

  const formattedDate = formatDate(newsItem.dateOfPublication, locale);

  return (
    <main className="mx-auto max-w-400 px-5 py-10 text-black md:px-10 md:py-16">
      <article className="space-y-8 md:space-y-10">
        <Reveal>
          <div className="space-y-4 md:space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#004C97]">
              {formattedDate}
            </p>

            <div className="border-l-2 border-black pl-3 md:pl-4">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-5xl">
                {newsItem.title}
              </h1>
            </div>
          </div>
        </Reveal>

        {newsItem.images.length ? (
          <Reveal delay={50}>
            <div className="grid gap-3 md:grid-cols-2 md:gap-4">
              {newsItem.images.map((image, index) => (
                <Image
                  key={`${newsItem.id}-${index}`}
                  src={image}
                  alt={newsItem.title}
                  width={1600}
                  height={1200}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="aspect-4/3 w-full rounded-3xl object-cover"
                />
              ))}
            </div>
          </Reveal>
        ) : null}

        <Reveal delay={100}>
          <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-[0_14px_32px_rgba(0,0,0,0.04)] md:p-7">
            <p className="whitespace-pre-line text-sm leading-7 text-black/75 md:text-base md:leading-8">
              {newsItem.description}
            </p>
          </div>
        </Reveal>
      </article>
    </main>
  );
};
