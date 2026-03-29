"use client";

import { cn } from "@/shared/helpers";

import { useAddNewsForm } from "../../hooks/useAddNewsForm";
import { DescriptionFields } from "../description-fields";
import { PhotosFieldset } from "../photos-fieldset";
import { TitleFields } from "../title-fields";

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
