import Image from "next/image";

import { Link } from "@/i18n/navigation";

import { type NewsItem } from "@/entities/news";

import { cn, formatDate } from "@/shared/helpers";

const TITLE_PREVIEW_LIMIT = 80;
const DESCRIPTION_PREVIEW_LIMIT = 160;

interface Props {
  cardIndex: number;
  item: NewsItem;
  locale: string;
}

export const NewsCard = ({ cardIndex, item, locale }: Props) => {
  const formattedDate = formatDate(item.dateOfPublication, locale);
  const previewImages = item.images.slice(0, 2);
  const isLongTitle = item.title.trim().length > TITLE_PREVIEW_LIMIT;
  const isLongDescription =
    item.description.trim().length > DESCRIPTION_PREVIEW_LIMIT;
  const previewTitle = isLongTitle
    ? `${item.title.slice(0, TITLE_PREVIEW_LIMIT).trimEnd()}...`
    : item.title;
  const previewDescription = isLongDescription
    ? `${item.description.slice(0, DESCRIPTION_PREVIEW_LIMIT).trimEnd()}...`
    : item.description;

  return (
    <Link
      href={`/admin/news/${item.id}`}
      className="block rounded-2xl transition-shadow hover:shadow-[0_18px_36px_rgba(0,0,0,0.08)]"
    >
      <article className="overflow-hidden rounded-2xl border border-black/10 bg-white text-left shadow-[0_14px_32px_rgba(0,0,0,0.04)]">
        {previewImages.length ? (
          <div
            className={cn(
              "grid gap-1.5 p-1.5",
              previewImages.length > 1 ? "grid-cols-2" : "grid-cols-1",
            )}
          >
            {previewImages.map((image, index) => (
              <Image
                key={`${item.id}-${index}`}
                src={image}
                alt={item.title}
                width={1200}
                height={900}
                loading={cardIndex === 0 && index === 0 ? "eager" : "lazy"}
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
              {previewTitle}
            </h2>

            <div className="space-y-1.5">
              <p className="text-sm leading-6 text-black/70 md:text-[0.95rem]">
                {previewDescription}
              </p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};
