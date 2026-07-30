"use client";

import { type ChangeEvent, type FormEventHandler, type RefObject } from "react";
import { type FieldErrors, type UseFormRegister } from "react-hook-form";
import { useTranslations } from "next-intl";

import { type AppLocale } from "@/i18n/routing";

import { cn } from "@/shared/helpers";

import { type CreateProfessorPayload, type ProfessorFormValues } from "../../index";
import { FullNameFields } from "../full-name-fields";
import { PhotoFieldset } from "../photo-fieldset";
import { PositionFields } from "../position-fields";
import { SectionsSelect } from "../sections-select";

type ProfessorSection = CreateProfessorPayload["sections"][number];

interface Props {
  addPosition: () => void;
  errors: FieldErrors<ProfessorFormValues>;
  fileInputRef: RefObject<HTMLInputElement | null>;
  handlePhotoSelect: (event: ChangeEvent<HTMLInputElement>) => void;
  isPhotoDeletePending: boolean;
  isPhotoUploadDisabled: boolean;
  isSubmitDisabled: boolean;
  localeOptions: readonly AppLocale[];
  onSubmit: FormEventHandler<HTMLFormElement>;
  openFileDialog: () => void;
  photo: string;
  positionFields: Array<{ id: string }>;
  professorSectionOptions: readonly ProfessorSection[];
  register: UseFormRegister<ProfessorFormValues>;
  removePhoto: () => Promise<void>;
  removePosition: (index: number) => void;
  selectedSections: ProfessorSection[];
  submitLabel: string;
  t: (key: string) => string;
  toggleSection: (section: ProfessorSection) => void;
}

export const ProfessorForm = ({
  addPosition,
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
  positionFields,
  professorSectionOptions,
  register,
  removePhoto,
  removePosition,
  selectedSections,
  submitLabel,
  t,
  toggleSection,
}: Props) => {
  const sectionsT = useTranslations("AdminProfessorsPage");

  return (
    <form className="mx-auto w-full space-y-6 md:max-w-5xl" noValidate onSubmit={onSubmit}>
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
            <p className="text-xl font-medium tracking-tight text-black md:text-2xl">
              {t("sectionLabel")}
            </p>

            <SectionsSelect
              errorMessage={errors.sections?.message}
              options={professorSectionOptions}
              placeholder={t("sectionsPlaceholder")}
              sectionLabel={(section) => sectionsT(`sections.${section}`)}
              selectedSections={selectedSections}
              toggleSection={toggleSection}
            />
          </div>
        </div>

        <div className="space-y-6">
          <FullNameFields
            errors={errors.fullName ?? {}}
            localeOptions={localeOptions}
            register={register}
            t={t}
          />

          <PositionFields
            addPosition={addPosition}
            errors={errors.positions}
            localeOptions={localeOptions}
            positionFields={positionFields}
            register={register}
            removePosition={removePosition}
            t={t}
          />
        </div>
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
};
