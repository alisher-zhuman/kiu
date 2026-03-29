"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { type NewsItem } from "@/entities/news";

import { cn, formatDate } from "@/shared/helpers";

import { NewsDescriptionModal } from "../news-description-modal";

const DESCRIPTION_PREVIEW_LIMIT = 160;

interface Props {
  item: NewsItem;
  locale: string;
}

export const NewsCard = ({ item, locale }: Props) => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  const t = useTranslations("AdminNewsPage");

  const formattedDate = formatDate(item.dateOfPublication, locale);
  const previewImages = item.images.slice(0, 2);
  const isLongDescription =
    item.description.trim().length > DESCRIPTION_PREVIEW_LIMIT;
  const previewDescription = isLongDescription
    ? `${item.description.slice(0, DESCRIPTION_PREVIEW_LIMIT).trimEnd()}...`
    : item.description;

  return (
    <>
      <article className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_14px_32px_rgba(0,0,0,0.04)]">
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

            <div className="space-y-1.5">
              <p className="text-sm leading-6 text-black/70 md:text-[0.95rem]">
                {previewDescription}
              </p>

              {isLongDescription ? (
                <button
                  type="button"
                  aria-label={t("openFullText")}
                  className="inline-flex text-sm font-semibold text-[#004C97] transition-colors hover:text-[#002E5C]"
                  onClick={() => {
                    setIsDescriptionOpen(true);
                  }}
                >
                  ...
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </article>

      {isDescriptionOpen ? (
        <NewsDescriptionModal
          description={item.description}
          formattedDate={formattedDate}
          title={item.title}
          onClose={() => {
            setIsDescriptionOpen(false);
          }}
        />
      ) : null}
    </>
  );
};
