"use client";

import { type ChangeEvent, useRef } from "react";
import {
  type UseFormClearErrors,
  type UseFormGetValues,
  type UseFormSetError,
  type UseFormSetValue,
} from "react-hook-form";

import { deleteImage, uploadImage } from "@/entities/images";

import { getApiErrorMessage } from "@/shared/helpers";
import { useToastMutation } from "@/shared/hooks";

import {
  MAX_NEWS_IMAGE_SIZE_BYTES,
  MAX_NEWS_IMAGES_COUNT,
} from "../schemas";
import { type AddNewsFormValues } from "../types";

interface Params {
  clearErrors: UseFormClearErrors<AddNewsFormValues>;
  getValues: UseFormGetValues<AddNewsFormValues>;
  images: string[];
  setError: UseFormSetError<AddNewsFormValues>;
  setValue: UseFormSetValue<AddNewsFormValues>;
  t: (key: string) => string;
}

export const useAddNewsImages = ({
  clearErrors,
  getValues,
  images,
  setError,
  setValue,
  t,
}: Params) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const uploadMutation = useToastMutation({
    mutationFn: (file: File) => uploadImage(file),
    pendingMessage: t("pending.upload"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, t("errors.images.upload")),
  });

  const deleteMutation = useToastMutation({
    mutationFn: (fileUrl: string) => deleteImage(fileUrl),
    pendingMessage: t("pending.delete"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, t("errors.images.delete")),
  });

  const isImageFile = (file: File) => file.type.startsWith("image/");

  const isWithinMaxFileSize = (file: File) =>
    file.size <= MAX_NEWS_IMAGE_SIZE_BYTES;

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

    if (files.some((file) => !isImageFile(file))) {
      return t("errors.images.invalidType");
    }

    if (files.some((file) => !isWithinMaxFileSize(file))) {
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

    const nextImages = getValues("images").filter((url) => url !== fileUrl);

    setImagesValue(nextImages);
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
