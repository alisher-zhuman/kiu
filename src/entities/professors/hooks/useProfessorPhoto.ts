"use client";

import { type ChangeEvent, useRef } from "react";
import {
  type UseFormClearErrors,
  type UseFormGetValues,
  type UseFormSetError,
  type UseFormSetValue,
} from "react-hook-form";

import { deleteFile, uploadFile } from "@/shared/api/files";
import { getApiErrorMessage } from "@/shared/helpers";
import { useToastMutation } from "@/shared/hooks";

import {
  MAX_PROFESSOR_PHOTO_SIZE_BYTES,
  type ProfessorFormValues,
} from "../model/form";

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

  const uploadMutation = useToastMutation({
    mutationFn: (file: File) => uploadFile(file),
    pendingMessage: t("pending.upload"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, t("errors.photo.upload")),
  });

  const deleteMutation = useToastMutation({
    mutationFn: (fileUrl: string) => deleteFile(fileUrl),
    pendingMessage: t("pending.delete"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, t("errors.photo.delete")),
  });

  const setPhotoValue = (photo: string) => {
    setValue("photo", photo, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const openFileDialog = () => {
    if (getValues("photo") || uploadMutation.isPending) {
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

    const { url } = await uploadMutation.mutateAsync(file);

    setPhotoValue(url);
  };

  const removePhoto = async () => {
    const photo = getValues("photo");

    if (!photo) {
      return;
    }

    await deleteMutation.mutateAsync(photo);
    setPhotoValue("");
  };

  return {
    fileInputRef,
    handlePhotoSelect,
    isPhotoDeletePending: deleteMutation.isPending,
    isPhotoUploadDisabled:
      Boolean(getValues("photo")) || uploadMutation.isPending,
    isSubmittingPhoto: uploadMutation.isPending || deleteMutation.isPending,
    openFileDialog,
    removePhoto,
  };
};
