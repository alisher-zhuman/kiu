"use client";

import Image from "next/image";
import { Camera, Plus, X } from "lucide-react";

import { cn } from "@/shared/helpers";

import { useAddNewsForm } from "../../hooks/useAddNewsForm";
import { MAX_NEWS_IMAGES_COUNT } from "../../schemas";

export const AddNewsForm = () => {
  const {
    errors,
    fileInputRef,
    handleFilesSelect,
    images,
    isDeletePending,
    isUploadDisabled,
    openFileDialog,
    removeImage,
    t,
  } = useAddNewsForm();

  return (
    <form className="mx-auto w-full space-y-4 md:max-w-lg" noValidate>
      <div className="space-y-4">
        <h2 className="text-xl font-medium tracking-tight text-black md:text-2xl">
          {t("photosTitle")}
        </h2>

        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-4">
          <div className="grid max-w-60 grid-cols-2 gap-2.5 md:max-w-68 md:gap-3">
            {Array.from({ length: MAX_NEWS_IMAGES_COUNT }).map((_, index) => {
              const imageUrl = images[index];

              return (
                <div
                  key={`slot-${index}`}
                  className="relative aspect-square overflow-hidden rounded-[0.95rem] bg-black/6"
                >
                  {imageUrl ? (
                    <>
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
                        className="absolute top-1.5 right-1.5 cursor-pointer inline-flex size-6 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-black"
                      >
                        <X className="size-3" />
                      </button>
                    </>
                  ) : (
                    <div className="flex h-full items-center justify-center text-black/20">
                      <Camera className="size-10 stroke-[1.5] md:size-11" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {images.length < MAX_NEWS_IMAGES_COUNT ? (
            <div className="w-full max-w-44 md:min-w-40">
              <button
                type="button"
                onClick={openFileDialog}
                disabled={isUploadDisabled}
                className={cn(
                  "inline-flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-[0.95rem] bg-black/6 px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-black/8 md:px-4.5 md:py-3",
                  isUploadDisabled &&
                    "cursor-not-allowed opacity-55 hover:bg-black/6",
                )}
              >
                <Plus className="size-4" />
                {t("addPhoto")}
              </button>
            </div>
          ) : null}
        </div>

        {errors.images?.message ? (
          <p className="text-sm text-red-500 md:text-base">
            {errors.images.message}
          </p>
        ) : null}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        onChange={handleFilesSelect}
      />
    </form>
  );
};
