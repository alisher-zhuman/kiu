import Image from "next/image";

import { type NewsItem } from "@/entities/news";

import { formatDate, getPreviewText } from "@/shared/helpers";

import {
  NEWS_DESCRIPTION_PREVIEW_LIMIT,
  NEWS_TITLE_PREVIEW_LIMIT,
} from "../../constants";

interface Props {
  item: NewsItem;
  locale: string;
}

export const NewsCard = ({ item, locale }: Props) => {
  const formattedDate = formatDate(item.dateOfPublication, locale);
  const previewTitle = getPreviewText(item.title, NEWS_TITLE_PREVIEW_LIMIT);
  const previewDescription = getPreviewText(
    item.description,
    NEWS_DESCRIPTION_PREVIEW_LIMIT,
  );
  const previewImage = item.images[0];

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-4xl border border-black/10 bg-white shadow-[0_18px_38px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(0,0,0,0.08)]">
      {previewImage ? (
        <div className="relative aspect-16/10 overflow-hidden">
          <Image
            src={previewImage}
            alt={item.title}
            fill
            sizes="(min-width: 1280px) 42rem, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="aspect-16/10 bg-[linear-gradient(135deg,#004C97_0%,#0A6ACF_100%)]" />
      )}

      <div className="flex flex-1 flex-col space-y-4 p-5 md:space-y-5 md:p-7">
        <p className="text-sm font-medium text-[#004C97] md:text-base">
          {formattedDate}
        </p>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight text-black md:text-2xl">
            {previewTitle}
          </h2>

          <p className="whitespace-pre-line text-sm leading-7 text-black/70 md:text-base md:leading-8">
            {previewDescription}
          </p>
        </div>
      </div>
    </article>
  );
};
