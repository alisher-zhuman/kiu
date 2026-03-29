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
        <h2 className="text-2xl font-medium tracking-tight text-black md:text-3xl">
          {t("photosTitle")}
        </h2>

        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-6">
          <div className="grid grid-cols-2 gap-3 md:max-w-[28rem] md:gap-4">
            {Array.from({ length: MAX_NEWS_IMAGES_COUNT }).map((_, index) => {
              const imageUrl = images[index];

              return (
                <div
                  key={`slot-${index}`}
                  className="relative aspect-square overflow-hidden rounded-[1.35rem] bg-black/6"
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
                        className="absolute top-2.5 right-2.5 inline-flex size-8 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-black"
                      >
                        <X className="size-4" />
                      </button>
                    </>
                  ) : (
                    <div className="flex h-full items-center justify-center text-black/20">
                      <Camera className="size-16 stroke-[1.5]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {images.length < MAX_NEWS_IMAGES_COUNT ? (
            <div className="md:min-w-56">
              <button
                type="button"
                onClick={openFileDialog}
                disabled={isUploadDisabled}
                className={cn(
                  "inline-flex w-full items-center justify-center gap-2 rounded-[1.35rem] bg-black/6 px-5 py-4 text-lg font-medium text-black transition-colors hover:bg-black/8",
                  isUploadDisabled &&
                    "cursor-not-allowed opacity-55 hover:bg-black/6",
                )}
              >
                <Plus className="size-5" />
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
