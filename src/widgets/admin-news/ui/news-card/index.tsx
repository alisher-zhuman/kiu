"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { type NewsItem } from "@/entities/news";

import { cn, formatDate } from "@/shared/helpers";

import { NewsDescriptionModal } from "../news-description-modal";

const TITLE_PREVIEW_LIMIT = 80;
const DESCRIPTION_PREVIEW_LIMIT = 160;

interface Props {
  cardIndex: number;
  item: NewsItem;
  locale: string;
}

export const NewsCard = ({ cardIndex, item, locale }: Props) => {
  const [isTextModalMounted, setIsTextModalMounted] = useState(false);
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);

  const animationFrameRef = useRef<number | null>(null);

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
  const hasExpandableText = isLongTitle || isLongDescription;

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const openModal = () => {
    setIsTextModalMounted(true);

    animationFrameRef.current = window.requestAnimationFrame(() => {
      setIsTextModalOpen(true);
    });
  };

  return (
    <>
      <article
        className={cn(
          "overflow-hidden rounded-2xl border border-black/10 bg-white text-left shadow-[0_14px_32px_rgba(0,0,0,0.04)]",
          hasExpandableText
            ? "cursor-pointer transition-shadow hover:shadow-[0_18px_36px_rgba(0,0,0,0.08)]"
            : "",
        )}
        onClick={
          hasExpandableText
            ? () => {
                openModal();
              }
            : undefined
        }
      >
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

      {isTextModalMounted ? (
        <NewsDescriptionModal
          description={item.description}
          formattedDate={formattedDate}
          isOpen={isTextModalOpen}
          title={item.title}
          onClose={() => {
            setIsTextModalOpen(false);
          }}
          onExited={() => {
            setIsTextModalMounted(false);
          }}
        />
      ) : null}
    </>
  );
};
