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
    isSubmitDisabled,
    isUploadDisabled,
    localeOptions,
    onSubmit,
    openFileDialog,
    removeImage,
    register,
    t,
  } = useAddNewsForm();

  return (
    <form
      className="mx-auto w-full space-y-6 md:max-w-5xl"
      noValidate
      onSubmit={onSubmit}
    >
      <div className="space-y-6 lg:grid lg:grid-cols-2 lg:items-start lg:gap-8 lg:space-y-0 xl:gap-10">
        <div className="space-y-4 lg:hidden">
          <h2 className="text-xl font-medium tracking-tight text-black md:text-2xl">
            {t("photosTitle")}
          </h2>

          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-4">
            <div className="grid max-w-60 grid-cols-2 gap-2.5 md:max-w-68 md:gap-3">
              {Array.from({ length: MAX_NEWS_IMAGES_COUNT }).map((_, index) => {
                const imageUrl = images[index];

                return (
                  <div
                    key={`mobile-slot-${index}`}
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

        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-xl font-medium tracking-tight text-black md:text-2xl">
              {t("titleSectionTitle")}
            </h2>

            <div className="space-y-3">
              {localeOptions.map((locale) => (
                <div key={`title-${locale}`} className="space-y-1.5">
                  <label
                    htmlFor={`title-${locale}`}
                    className="text-sm font-medium text-black/65"
                  >
                    {t(`locales.${locale}`)}
                  </label>

                  <input
                    id={`title-${locale}`}
                    type="text"
                    {...register(`title.${locale}`)}
                    className={cn(
                      "w-full rounded-[0.95rem] border border-black/12 px-4 py-3 text-sm text-black outline-none transition-colors placeholder:text-black/30 focus:border-[#004C97] md:text-base",
                      errors.title?.[locale] &&
                        "border-red-500 focus:border-red-500",
                    )}
                  />

                  {errors.title?.[locale]?.message ? (
                    <p className="text-sm text-red-500">
                      {errors.title[locale]?.message}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="hidden space-y-4 lg:block">
            <h2 className="text-xl font-medium tracking-tight text-black md:text-2xl">
              {t("photosTitle")}
            </h2>

            <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-4">
              <div className="grid max-w-60 grid-cols-2 gap-2.5 md:max-w-68 md:gap-3">
                {Array.from({ length: MAX_NEWS_IMAGES_COUNT }).map((_, index) => {
                  const imageUrl = images[index];

                  return (
                    <div
                      key={`desktop-slot-${index}`}
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
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-medium tracking-tight text-black md:text-2xl">
            {t("descriptionSectionTitle")}
          </h2>

          <div className="space-y-3">
            {localeOptions.map((locale) => (
              <div key={`description-${locale}`} className="space-y-1.5">
                <label
                  htmlFor={`description-${locale}`}
                  className="text-sm font-medium text-black/65"
                >
                  {t(`locales.${locale}`)}
                </label>

                <textarea
                  id={`description-${locale}`}
                  rows={5}
                  {...register(`description.${locale}`)}
                  className={cn(
                    "w-full resize-y rounded-[0.95rem] border border-black/12 px-4 py-3 text-sm text-black outline-none transition-colors placeholder:text-black/30 focus:border-[#004C97] md:text-base",
                    errors.description?.[locale] &&
                      "border-red-500 focus:border-red-500",
                  )}
                />

                {errors.description?.[locale]?.message ? (
                  <p className="text-sm text-red-500">
                    {errors.description[locale]?.message}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex">
        <button
          type="submit"
          disabled={isSubmitDisabled}
          className={cn(
            "inline-flex w-full items-center justify-center rounded-[0.95rem] bg-[#004C97] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#002E5C] md:ml-auto md:w-auto md:min-w-40 md:text-base",
            isSubmitDisabled && "cursor-not-allowed opacity-55 hover:bg-[#004C97]",
          )}
        >
          {t("submit")}
        </button>
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
