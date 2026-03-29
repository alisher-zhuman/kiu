"use client";

import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";

import { LOCALE_OPTIONS } from "@/shared/constants";

import {
  createAddNewsFormSchema,
} from "../schemas";
import { type AddNewsFormValues } from "../types";

import { useAddNewsImages } from "./useAddNewsImages";

export const useAddNewsForm = () => {
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

  const {
    fileInputRef,
    handleFilesSelect,
    isDeletePending,
    isUploadDisabled,
    isUploadingImages,
    openFileDialog,
    removeImage,
  } = useAddNewsImages({
    clearErrors,
    getValues,
    images,
    setError,
    setValue,
    t,
  });

  const onSubmit = handleSubmit((values) => {
    console.warn("add news payload", values);
  });

  return {
    errors,
    fileInputRef,
    handleFilesSelect,
    images,
    isDeletePending,
    isSubmitDisabled: isUploadingImages,
    isUploadDisabled,
    localeOptions: LOCALE_OPTIONS,
    onSubmit,
    openFileDialog,
    removeImage,
    register,
    t,
  };
};
