"use client";

import { type ChangeEvent, type FormEventHandler, type RefObject } from "react";
import { type FieldErrors, type UseFormRegister } from "react-hook-form";

import { type AppLocale } from "@/i18n/routing";

import { cn } from "@/shared/helpers";

import { type NewsFormValues } from "../../model/types";
import { DescriptionFields } from "../description-fields";
import { PhotosFieldset } from "../photos-fieldset";
import { TitleFields } from "../title-fields";

interface Props {
  errors: FieldErrors<NewsFormValues>;
  fileInputRef: RefObject<HTMLInputElement | null>;
  handleFilesSelect: (event: ChangeEvent<HTMLInputElement>) => void;
  images: string[];
  isDeletePending: boolean;
  isSubmitDisabled: boolean;
  isUploadDisabled: boolean;
  localeOptions: readonly AppLocale[];
  onSubmit: FormEventHandler<HTMLFormElement>;
  openFileDialog: () => void;
  removeImage: (fileUrl: string) => Promise<void>;
  register: UseFormRegister<NewsFormValues>;
  submitLabel: string;
  t: (key: string) => string;
}

export const NewsForm = ({
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
  submitLabel,
  t,
}: Props) => (
  <form className="mx-auto w-full space-y-6 md:max-w-5xl" noValidate onSubmit={onSubmit}>
    <div className="space-y-6 lg:grid lg:grid-cols-2 lg:items-start lg:gap-8 lg:space-y-0 xl:gap-10">
      <div className="lg:hidden">
        <PhotosFieldset
          errorMessage={errors.images?.message}
          fileInputRef={fileInputRef}
          handleFilesSelect={handleFilesSelect}
          images={images}
          isDeletePending={isDeletePending}
          isUploadDisabled={isUploadDisabled}
          openFileDialog={openFileDialog}
          removeImage={removeImage}
          t={t}
        />
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <label
            htmlFor="news-date-of-publication"
            className="block text-xl font-medium tracking-tight text-black md:text-2xl"
          >
            {t("dateLabel")}
          </label>

          <div className="space-y-1.5">
            <input
              id="news-date-of-publication"
              type="date"
              {...register("dateOfPublication")}
              aria-invalid={!!errors.dateOfPublication}
              aria-describedby={
                errors.dateOfPublication ? "news-date-of-publication-error" : undefined
              }
              className={cn(
                "w-full rounded-[0.95rem] border border-black/12 px-4 py-3 text-sm text-black outline-none transition-colors focus:border-[#004C97] focus-visible:ring-2 focus-visible:ring-[#004C97] focus-visible:ring-offset-2 md:text-base",
                errors.dateOfPublication && "border-red-500 focus:border-red-500"
              )}
            />

            {errors.dateOfPublication?.message ? (
              <p id="news-date-of-publication-error" className="text-sm text-red-500">
                {errors.dateOfPublication.message}
              </p>
            ) : null}
          </div>
        </div>

        <TitleFields
          errors={errors.title}
          localeOptions={localeOptions}
          register={register}
          t={t}
        />

        <div className="hidden lg:block">
          <PhotosFieldset
            errorMessage={errors.images?.message}
            fileInputRef={fileInputRef}
            handleFilesSelect={handleFilesSelect}
            images={images}
            isDeletePending={isDeletePending}
            isUploadDisabled={isUploadDisabled}
            openFileDialog={openFileDialog}
            removeImage={removeImage}
            t={t}
          />
        </div>
      </div>

      <DescriptionFields
        errors={errors.description}
        localeOptions={localeOptions}
        register={register}
        t={t}
      />
    </div>

    <div className="flex">
      <button
        type="submit"
        disabled={isSubmitDisabled}
        className={cn(
          "inline-flex w-full cursor-pointer items-center justify-center rounded-[0.95rem] bg-[#004C97] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#002E5C] md:ml-auto md:w-auto md:min-w-40 md:text-base",
          isSubmitDisabled && "cursor-not-allowed opacity-55 hover:bg-[#004C97]"
        )}
      >
        {submitLabel}
      </button>
    </div>
  </form>
);
