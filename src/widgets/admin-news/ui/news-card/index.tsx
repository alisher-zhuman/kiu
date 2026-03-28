import Image from "next/image";

import { type NewsItem } from "@/entities/news";

import { formatDate } from "@/shared/helpers";

interface Props {
  item: NewsItem;
  locale: string;
}

export const NewsCard = ({ item, locale }: Props) => {
  const formattedDate = formatDate(item.dateOfPublication, locale);
  const previewImages = item.images.slice(0, 2);

  return (
    <article className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_14px_32px_rgba(0,0,0,0.04)]">
      {previewImages.length ? (
        <div
          className={`grid gap-1.5 p-1.5 ${
            previewImages.length > 1 ? "grid-cols-2" : "grid-cols-1"
          }`}
        >
          {previewImages.map((image, index) => (
            <Image
              key={`${item.id}-${index}`}
              src={image}
              alt={item.title}
              width={1200}
              height={900}
              className="aspect-4/3 w-full rounded-xl object-cover"
            />
          ))}
        </div>
      ) : null}

      <div className="space-y-3 p-4 md:p-5">
        <p className="text-xs font-medium text-[#004C97] md:text-sm">
          {formattedDate}
        </p>

        <div className="space-y-2.5">
          <h2 className="text-lg font-semibold tracking-tight text-black md:text-xl">
            {item.title}
          </h2>

          <p className="text-sm leading-6 text-black/70 md:text-[0.95rem]">
            {item.description}
          </p>
        </div>
      </div>
    </article>
  );
};
