import Image from "next/image";

import { type NewsItem } from "@/entities/news";

import { formatDate } from "@/shared/helpers";

interface Props {
  item: NewsItem;
  locale: string;
}

export const NewsCard = ({ item, locale }: Props) => {
  const formattedDate = formatDate(item.dateOfPublication, locale);

  const previewImage = item.images[0];

  return (
    <article className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_18px_40px_rgba(0,0,0,0.04)]">
      {previewImage ? (
        <Image
          src={previewImage}
          alt={item.title}
          width={1200}
          height={675}
          className="aspect-video w-full object-cover"
        />
      ) : null}

      <div className="space-y-4 p-5 md:p-6">
        <p className="text-sm font-medium text-[#004C97]">{formattedDate}</p>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight text-black md:text-2xl">
            {item.title}
          </h2>

          <p className="text-sm leading-7 text-black/70 md:text-base">
            {item.description}
          </p>
        </div>
      </div>
    </article>
  );
};
