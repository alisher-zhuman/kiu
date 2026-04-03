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
  MAX_NEWS_IMAGE_SIZE_BYTES,
  MAX_NEWS_IMAGES_COUNT,
} from "../model/constants";
import { type NewsFormValues } from "../model/types";

interface Params {
  clearErrors: UseFormClearErrors<NewsFormValues>;
  getValues: UseFormGetValues<NewsFormValues>;
  images: string[];
  setError: UseFormSetError<NewsFormValues>;
  setValue: UseFormSetValue<NewsFormValues>;
  t: (key: string) => string;
}

export const useNewsImages = ({
  clearErrors,
  getValues,
  images,
  setError,
  setValue,
  t,
}: Params) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const uploadMutation = useToastMutation({
    mutationFn: (file: File) => uploadFile(file),
    pendingMessage: t("pending.upload"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, t("errors.images.upload")),
  });

  const deleteMutation = useToastMutation({
    mutationFn: (fileUrl: string) => deleteFile(fileUrl),
    pendingMessage: t("pending.delete"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, t("errors.images.delete")),
  });

  const setImagesValue = (nextImages: string[]) => {
    setValue("images", nextImages, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const validateSelectedFiles = (files: File[]) => {
    if (!files.length) {
      return null;
    }

    if (images.length + files.length > MAX_NEWS_IMAGES_COUNT) {
      return t("errors.images.max");
    }

    if (files.some((file) => !file.type.startsWith("image/"))) {
      return t("errors.images.invalidType");
    }

    if (files.some((file) => file.size > MAX_NEWS_IMAGE_SIZE_BYTES)) {
      return t("errors.images.maxSize");
    }

    return null;
  };

  const openFileDialog = () => {
    if (images.length >= MAX_NEWS_IMAGES_COUNT || uploadMutation.isPending) {
      return;
    }

    fileInputRef.current?.click();
  };

  const handleFilesSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);

    event.target.value = "";

    const validationError = validateSelectedFiles(selectedFiles);

    if (validationError) {
      setError("images", {
        message: validationError,
        type: "manual",
      });

      return;
    }

    clearErrors("images");

    const nextImages = [...getValues("images")];

    for (const file of selectedFiles) {
      const { url } = await uploadMutation.mutateAsync(file);

      nextImages.push(url);
      setImagesValue(nextImages);
    }
  };

  const removeImage = async (fileUrl: string) => {
    await deleteMutation.mutateAsync(fileUrl);

    setImagesValue(getValues("images").filter((url) => url !== fileUrl));
  };

  return {
    fileInputRef,
    handleFilesSelect,
    isDeletePending: deleteMutation.isPending,
    isUploadDisabled:
      uploadMutation.isPending || images.length >= MAX_NEWS_IMAGES_COUNT,
    isUploadingImages: uploadMutation.isPending || deleteMutation.isPending,
    openFileDialog,
    removeImage,
  };
};
