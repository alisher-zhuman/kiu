"use client";

import {
  type UseFormClearErrors,
  type UseFormGetValues,
  type UseFormSetError,
  type UseFormSetValue,
} from "react-hook-form";

import { useSingleFileFieldTransfer } from "@/shared/hooks";

import { MAX_PROFESSOR_PHOTO_SIZE_BYTES } from "../model/constants";
import { type ProfessorFormValues } from "../model/types";

interface Params {
  clearErrors: UseFormClearErrors<ProfessorFormValues>;
  getValues: UseFormGetValues<ProfessorFormValues>;
  setError: UseFormSetError<ProfessorFormValues>;
  setValue: UseFormSetValue<ProfessorFormValues>;
  t: (key: string) => string;
}

export const useProfessorPhoto = ({ clearErrors, getValues, setError, setValue, t }: Params) => {
  const {
    fileInputRef,
    handleFileSelect,
    isDeletePending,
    isTransferDisabled,
    isTransferring,
    openFileDialog,
    removeFile,
  } = useSingleFileFieldTransfer({
    clearErrors,
    deleteErrorMessage: t("errors.photo.delete"),
    deletePendingMessage: t("pending.delete"),
    fieldName: "photo",
    getValues,
    setError,
    setValue,
    uploadErrorMessage: t("errors.photo.upload"),
    uploadPendingMessage: t("pending.upload"),
    validateFile: (file) => {
      if (!file.type.startsWith("image/")) {
        return t("errors.photo.invalidType");
      }

      if (file.size > MAX_PROFESSOR_PHOTO_SIZE_BYTES) {
        return t("errors.photo.maxSize");
      }

      return null;
    },
  });

  return {
    fileInputRef,
    handlePhotoSelect: handleFileSelect,
    isPhotoDeletePending: isDeletePending,
    isPhotoUploadDisabled: isTransferDisabled,
    isSubmittingPhoto: isTransferring,
    openFileDialog,
    removePhoto: removeFile,
  };
};
