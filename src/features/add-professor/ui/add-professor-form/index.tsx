"use client";

import { useTranslations } from "next-intl";

import { cn } from "@/shared/helpers";

import { useAddProfessorForm } from "../../hooks/useAddProfessorForm";
import { FullNameFields } from "../full-name-fields";
import { PhotoFieldset } from "../photo-fieldset";

export const AddProfessorForm = () => {
  const sectionsT = useTranslations("AdminProfessorsPage");

  const {
    errors,
    fileInputRef,
    handlePhotoSelect,
    isPhotoDeletePending,
    isPhotoUploadDisabled,
    isSubmitDisabled,
    localeOptions,
    onSubmit,
    openFileDialog,
    photo,
    professorSectionOptions,
    register,
    removePhoto,
    t,
  } = useAddProfessorForm();

  return (
    <form
      className="mx-auto w-full space-y-6 md:max-w-5xl"
      noValidate
      onSubmit={onSubmit}
    >
      <div className="space-y-6 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-8 lg:space-y-0 xl:gap-10">
        <div className="space-y-6">
          <PhotoFieldset
            errorMessage={errors.photo?.message}
            fileInputRef={fileInputRef}
            handlePhotoSelect={handlePhotoSelect}
            isDeletePending={isPhotoDeletePending}
            isUploadDisabled={isPhotoUploadDisabled}
            openFileDialog={openFileDialog}
            photo={photo}
            removePhoto={removePhoto}
            t={t}
          />

          <div className="space-y-3">
            <label
              htmlFor="professor-section"
              className="text-xl font-medium tracking-tight text-black md:text-2xl"
            >
              {t("sectionLabel")}
            </label>

            <div className="space-y-2">
              <select
                id="professor-section"
                {...register("section")}
                className={cn(
                  "w-full rounded-[0.95rem] border border-black/10 bg-white px-4 py-3 text-base text-black outline-none transition-colors focus:border-[#004C97]",
                  errors.section?.message &&
                    "border-red-500 focus:border-red-500",
                )}
              >
                {professorSectionOptions.map((sectionOption) => (
                  <option key={sectionOption} value={sectionOption}>
                    {sectionsT(`sections.${sectionOption}`)}
                  </option>
                ))}
              </select>

              {errors.section?.message ? (
                <p className="text-sm text-red-500 md:text-base">
                  {errors.section.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="space-y-3">
            <label
              htmlFor="professor-position"
              className="text-xl font-medium tracking-tight text-black md:text-2xl"
            >
              {t("positionLabel")}
            </label>

            <div className="space-y-2">
              <input
                id="professor-position"
                {...register("position")}
                className={cn(
                  "w-full rounded-[0.95rem] border border-black/10 bg-white px-4 py-3 text-base text-black outline-none transition-colors placeholder:text-black/35 focus:border-[#004C97]",
                  errors.position?.message &&
                    "border-red-500 focus:border-red-500",
                )}
              />

              {errors.position?.message ? (
                <p className="text-sm text-red-500 md:text-base">
                  {errors.position.message}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <FullNameFields
          errors={errors.fullName ?? {}}
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
            isSubmitDisabled &&
              "cursor-not-allowed opacity-55 hover:bg-[#004C97]",
          )}
        >
          {t("submit")}
        </button>
      </div>
    </form>
  );
};
