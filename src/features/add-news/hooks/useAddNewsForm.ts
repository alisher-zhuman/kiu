"use client";

import { type ChangeEvent, useMemo, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";

import { deleteImage, uploadImage } from "@/entities/images";

import { LOCALE_OPTIONS } from "@/shared/constants";
import { getApiErrorMessage } from "@/shared/helpers";
import { useToastMutation } from "@/shared/hooks";

import {
  createAddNewsFormSchema,
  MAX_NEWS_IMAGE_SIZE_BYTES,
  MAX_NEWS_IMAGES_COUNT,
} from "../schemas";
import { type AddNewsFormValues } from "../types";

export const useAddNewsForm = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const t = useTranslations("AdminNewsPage.addForm");

  const schema = useMemo(() => createAddNewsFormSchema(t), [t]);

  const {
    clearErrors,
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setError,
    setValue,
  } = useForm<AddNewsFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      images: [],
        title: {
        en: "",
        kg: "",
        ru: "",
      },
      description: {
        en: "",
        kg: "",
        ru: "",
      },
    
    },
    mode: "onChange",
  });

  const images = useWatch({
    control,
    defaultValue: [],
    name: "images",
  });

  const uploadMutation = useToastMutation({
    mutationFn: (file: File) => uploadImage(file),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, t("errors.images.upload")),
  });

  const deleteMutation = useToastMutation({
    mutationFn: (fileUrl: string) => deleteImage(fileUrl),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, t("errors.images.delete")),
  });

  const isImageFile = (file: File) => file.type.startsWith("image/");

  const isWithinMaxFileSize = (file: File) =>
    file.size <= MAX_NEWS_IMAGE_SIZE_BYTES;

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

  const setImagesValue = (nextImages: string[]) => {
    setValue("images", nextImages, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
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

  const onSubmit = handleSubmit((values) => {
    console.warn("add news payload", values);
  });

  return {
    errors,
    fileInputRef,
    handleFilesSelect,
    images,
    isDeletePending: deleteMutation.isPending,
    isSubmitDisabled: uploadMutation.isPending || deleteMutation.isPending,
    isUploadDisabled:
      uploadMutation.isPending || images.length >= MAX_NEWS_IMAGES_COUNT,
    localeOptions: LOCALE_OPTIONS,
    onSubmit,
    openFileDialog,
    removeImage,
    register,
    t,
  };
};
