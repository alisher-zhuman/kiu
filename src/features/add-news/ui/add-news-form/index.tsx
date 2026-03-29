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
    <form className="space-y-4" noValidate>
      <div className="space-y-5">
        <div className="space-y-1">
          <h2 className="text-2xl font-medium tracking-tight text-black md:text-3xl">
            {t("photosTitle")}
          </h2>

          <p className="text-sm text-black/35 md:text-base">{t("photosHint")}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-8">
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {Array.from({ length: MAX_NEWS_IMAGES_COUNT }).map((_, index) => {
              const imageUrl = images[index];

              return (
                <div
                  key={`slot-${index}`}
                  className="relative aspect-square overflow-hidden rounded-[1.75rem] bg-black/6"
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
                        className="absolute top-3 right-3 inline-flex size-9 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-black"
                      >
                        <X className="size-4" />
                      </button>
                    </>
                  ) : (
                    <div className="flex h-full items-center justify-center text-black/20">
                      <Camera className="size-20 stroke-[1.5]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="space-y-3 md:min-w-72">
            <button
              type="button"
              onClick={openFileDialog}
              disabled={isUploadDisabled}
              className={cn(
                "inline-flex w-full items-center justify-center gap-2 rounded-[1.75rem] bg-black/6 px-6 py-5 text-xl font-medium text-black transition-colors hover:bg-black/8 md:min-w-72",
                isUploadDisabled && "cursor-not-allowed opacity-55 hover:bg-black/6",
              )}
            >
              <Plus className="size-5" />
              {t("addPhoto")}
            </button>

            <p className="text-lg text-black/22 md:text-[2rem] md:leading-none">
              {t("maxPhotosHint")}
            </p>
          </div>
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
