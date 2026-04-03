"use client";

import { type ChangeEvent, useRef } from "react";
import {
  type UseFormClearErrors,
  type UseFormGetValues,
  type UseFormSetError,
  type UseFormSetValue,
} from "react-hook-form";

import { DIRTY_FORM_VALUE_OPTIONS } from "@/shared/constants/form";
import { useFileTransfer } from "@/shared/hooks/useFileTransfer";

import {
  MAX_PROFESSOR_PHOTO_SIZE_BYTES,
} from "../model/constants";
import { type ProfessorFormValues } from "../model/types";

interface Params {
  clearErrors: UseFormClearErrors<ProfessorFormValues>;
  getValues: UseFormGetValues<ProfessorFormValues>;
  setError: UseFormSetError<ProfessorFormValues>;
  setValue: UseFormSetValue<ProfessorFormValues>;
  t: (key: string) => string;
}

export const useProfessorPhoto = ({
  clearErrors,
  getValues,
  setError,
  setValue,
  t,
}: Params) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const fileTransfer = useFileTransfer({
    deleteErrorMessage: t("errors.photo.delete"),
    deletePendingMessage: t("pending.delete"),
    uploadErrorMessage: t("errors.photo.upload"),
    uploadPendingMessage: t("pending.upload"),
  });

  const setPhotoValue = (photo: string) => {
    setValue("photo", photo, DIRTY_FORM_VALUE_OPTIONS);
  };

  const openFileDialog = () => {
    if (getValues("photo") || fileTransfer.isUploadPending) {
      return;
    }

    fileInputRef.current?.click();
  };

  const handlePhotoSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    event.target.value = "";

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("photo", {
        message: t("errors.photo.invalidType"),
        type: "manual",
      });

      return;
    }

    if (file.size > MAX_PROFESSOR_PHOTO_SIZE_BYTES) {
      setError("photo", {
        message: t("errors.photo.maxSize"),
        type: "manual",
      });

      return;
    }

    clearErrors("photo");

    const { url } = await fileTransfer.uploadFile(file);

    setPhotoValue(url);
  };

  const removePhoto = async () => {
    const photo = getValues("photo");

    if (!photo) {
      return;
    }

    await fileTransfer.deleteFile(photo);
    setPhotoValue("");
  };

  return {
    fileInputRef,
    handlePhotoSelect,
    isPhotoDeletePending: fileTransfer.isDeletePending,
    isPhotoUploadDisabled:
      Boolean(getValues("photo")) || fileTransfer.isUploadPending,
    isSubmittingPhoto: fileTransfer.isTransferring,
    openFileDialog,
    removePhoto,
  };
};
