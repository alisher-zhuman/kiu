import Image from "next/image";
import { useTranslations } from "next-intl";
import { PencilLine } from "lucide-react";

import { Link } from "@/i18n/navigation";

import { ArchiveNewsButton } from "@/features/archive-news";
import { DeleteNewsButton } from "@/features/delete-news";

import { type NewsItem } from "@/entities/news";

import { cn, formatDate, getPreviewText } from "@/shared/helpers";

import {
  ADMIN_NEWS_DESCRIPTION_PREVIEW_LIMIT,
  ADMIN_NEWS_TITLE_PREVIEW_LIMIT,
} from "../../constants";

interface Props {
  cardIndex: number;
  item: NewsItem;
  locale: string;
}

export const NewsCard = ({ cardIndex, item, locale }: Props) => {
  const t = useTranslations("AdminNewsPage.archive");
  const tEdit = useTranslations("AdminNewsPage.edit");

  const formattedDate = formatDate(item.dateOfPublication, locale);
  const previewImages = item.images.slice(0, 2);
  const previewTitle = getPreviewText(item.title, ADMIN_NEWS_TITLE_PREVIEW_LIMIT);
  const previewDescription = getPreviewText(
    item.description,
    ADMIN_NEWS_DESCRIPTION_PREVIEW_LIMIT,
  );

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white text-left shadow-[0_14px_32px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_18px_36px_rgba(0,0,0,0.08)]">
      <Link href={`/admin/news/${item.id}`} className="block">
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
                sizes={
                  previewImages.length > 1
                    ? "(min-width: 1280px) 20rem, (min-width: 768px) 25vw, 50vw"
                    : "(min-width: 1280px) 42rem, (min-width: 768px) 50vw, 100vw"
                }
                loading={cardIndex === 0 && index === 0 ? "eager" : "lazy"}
                className="aspect-4/3 w-full rounded-xl object-cover"
              />
            ))}
          </div>
        ) : null}

        <div className="flex flex-1 flex-col space-y-3 p-4 md:p-5">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-medium text-[#004C97] md:text-sm">
              {formattedDate}
            </p>

            {item.archived ? (
              <span className="inline-flex items-center rounded-full bg-[#004C97]/8 px-2 py-0.5 text-[10px] font-medium text-[#004C97] md:text-xs">
                {t("archived")}
              </span>
            ) : null}
          </div>

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
      </Link>

      <div className="mt-auto flex flex-wrap items-center gap-2 px-4 pb-4 md:px-5 md:pb-5">
        <Link
          href={`/admin/news/${item.id}/edit`}
          aria-label={tEdit("action")}
          className="inline-flex size-9 items-center justify-center rounded-full border border-[#004C97]/15 bg-[#004C97]/6 text-[#004C97] transition-colors hover:bg-[#004C97]/10 md:size-auto md:px-4 md:py-2 md:text-sm md:font-semibold"
        >
          <PencilLine className="size-4 md:hidden" />
          <span className="hidden md:inline">{tEdit("action")}</span>
        </Link>

        <ArchiveNewsButton
          archived={item.archived}
          id={item.id}
          iconOnlyOnMobile
        />

        <DeleteNewsButton id={item.id} iconOnlyOnMobile />
      </div>
    </article>
  );
};
