"use client";

import { type ChangeEvent, type RefObject } from "react";
import Image from "next/image";
import { Camera, X } from "lucide-react";

import { cn } from "@/shared/helpers";

import { MAX_NEWS_IMAGES_COUNT } from "../../schemas";

interface Props {
  errorMessage: string | undefined;
  fileInputRef: RefObject<HTMLInputElement | null>;
  handleFilesSelect: (event: ChangeEvent<HTMLInputElement>) => void;
  images: string[];
  isDeletePending: boolean;
  isUploadDisabled: boolean;
  openFileDialog: () => void;
  removeImage: (fileUrl: string) => Promise<void>;
  t: (key: string) => string;
}

export const PhotosFieldset = ({
  errorMessage,
  fileInputRef,
  handleFilesSelect,
  images,
  isDeletePending,
  isUploadDisabled,
  openFileDialog,
  removeImage,
  t,
}: Props) => (
  <div className="space-y-4">
    <h2 className="text-xl font-medium tracking-tight text-black md:text-2xl">
      {t("photosTitle")}
    </h2>

    <div className="grid max-w-60 grid-cols-2 gap-2.5 md:max-w-68 md:gap-3">
        {Array.from({ length: MAX_NEWS_IMAGES_COUNT }).map((_, index) => {
          const imageUrl = images[index];

          if (imageUrl) {
            return (
              <div
                key={`slot-${index}`}
                className="relative aspect-square overflow-hidden rounded-[0.95rem] bg-black/6"
              >
                <Image
                  src={imageUrl}
                  alt={`${t("photoPreviewAlt")} ${index + 1}`}
                  fill
                  className="object-cover"
                />

                <button
                  type="button"
                  onClick={() => removeImage(imageUrl)}
                  disabled={isDeletePending}
                  aria-label={t("removePhoto")}
                  className="absolute top-1.5 right-1.5 inline-flex size-6 cursor-pointer items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-black"
                >
                  <X className="size-3" />
                </button>
              </div>
            );
          }

          return (
            <button
              key={`slot-${index}`}
              type="button"
              onClick={openFileDialog}
              disabled={isUploadDisabled}
              className={cn(
                "flex aspect-square flex-col items-center justify-center gap-2 overflow-hidden rounded-[0.95rem] bg-black/6 px-3 text-center text-black/35 transition-colors",
                "cursor-pointer hover:bg-black/8",
                isUploadDisabled &&
                  "cursor-not-allowed opacity-55 hover:bg-black/6",
              )}
            >
              <Camera className="size-10 stroke-[1.5] md:size-11" />
              <span className="text-[11px] font-medium leading-4 md:text-xs">
                {t("photoHint")}
              </span>
            </button>
          );
        })}
    </div>

    {errorMessage ? (
      <p className="text-sm text-red-500 md:text-base">{errorMessage}</p>
    ) : null}

    <input
      ref={fileInputRef}
      type="file"
      accept="image/*"
      multiple
      className="sr-only"
      onChange={handleFilesSelect}
    />
  </div>
);
