"use client";

import { type ChangeEvent, type FormEventHandler, type RefObject } from "react";
import { type FieldErrors, type UseFormRegister } from "react-hook-form";

import { cn } from "@/shared/helpers";

import { type AddScheduleFormValues } from "../../types";
import { DateField } from "../date-field";
import { LevelField } from "../level-field";
import { ScheduleFileFieldset } from "../schedule-file-fieldset";
import { SectionField } from "../section-field";

interface Props {
  errors: FieldErrors<AddScheduleFormValues>;
  fileInputRef: RefObject<HTMLInputElement | null>;
  fileName: string;
  handleFileSelect: (event: ChangeEvent<HTMLInputElement>) => void;
  isFileDeletePending: boolean;
  isFileUploadDisabled: boolean;
  isSubmitDisabled: boolean;
  levelOptions: readonly string[];
  onSubmit: FormEventHandler<HTMLFormElement>;
  openFileDialog: () => void;
  register: UseFormRegister<AddScheduleFormValues>;
  removeFile: () => Promise<void>;
  sectionOptions: readonly string[];
  submitLabel: string;
  t: (key: string) => string;
}

export const ScheduleForm = ({
  errors,
  fileInputRef,
  fileName,
  handleFileSelect,
  isFileDeletePending,
  isFileUploadDisabled,
  isSubmitDisabled,
  levelOptions,
  onSubmit,
  openFileDialog,
  register,
  removeFile,
  sectionOptions,
  submitLabel,
  t,
}: Props) => (
  <form
    className="mx-auto w-full space-y-6 md:max-w-3xl"
    noValidate
    onSubmit={onSubmit}
  >
    <ScheduleFileFieldset
      errorMessage={errors.content?.message}
      fileInputRef={fileInputRef}
      fileName={fileName}
      handleFileSelect={handleFileSelect}
      isDeletePending={isFileDeletePending}
      isUploadDisabled={isFileUploadDisabled}
      openFileDialog={openFileDialog}
      removeFile={removeFile}
      t={t}
    />

    <div className="space-y-3">
      <label
        htmlFor="schedule-title"
        className="text-xl font-medium tracking-tight text-black md:text-2xl"
      >
        {t("titleLabel")}
      </label>

      <div className="space-y-2">
        <input
          id="schedule-title"
          {...register("title")}
          placeholder={t("placeholders.title")}
          className={cn(
            "w-full rounded-[0.95rem] border border-black/10 bg-white px-4 py-3 text-base text-black outline-none transition-colors placeholder:text-black/35 focus:border-[#004C97]",
            errors.title?.message && "border-red-500 focus:border-red-500",
          )}
        />

        {errors.title?.message ? (
          <p className="text-sm text-red-500 md:text-base">{errors.title.message}</p>
        ) : null}
      </div>
    </div>

    <LevelField errors={errors} levelOptions={levelOptions} register={register} t={t} />

    <SectionField errors={errors} register={register} sectionOptions={sectionOptions} t={t} />

    <DateField errors={errors} register={register} t={t} />

    <div className="flex">
      <button
        type="submit"
        disabled={isSubmitDisabled}
        className={cn(
          "inline-flex w-full cursor-pointer items-center justify-center rounded-[0.95rem] bg-[#004C97] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#002E5C] md:ml-auto md:w-auto md:min-w-40 md:text-base",
          isSubmitDisabled && "cursor-not-allowed opacity-55 hover:bg-[#004C97]",
        )}
      >
        {submitLabel}
      </button>
    </div>
  </form>
);
