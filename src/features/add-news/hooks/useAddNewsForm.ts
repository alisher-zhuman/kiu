"use client";

import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "@/i18n/navigation";

import { createNews } from "@/entities/news";

import { LOCALE_OPTIONS, QUERY_KEYS } from "@/shared/constants";
import { getApiErrorMessage } from "@/shared/helpers";
import { useToastMutation } from "@/shared/hooks";

import { createAddNewsFormSchema } from "../schemas";
import { type AddNewsFormValues } from "../types";

import { useAddNewsImages } from "./useAddNewsImages";

export const useAddNewsForm = () => {
  const locale = useLocale();
  const router = useRouter();

  const t = useTranslations("AdminNewsPage.addForm");

  const schema = useMemo(() => createAddNewsFormSchema(t), [t]);

  const {
    clearErrors,
    control,
    formState: { errors, isSubmitting },
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

  const mutation = useToastMutation({
    mutationFn: (values: AddNewsFormValues) => createNews(values),
    invalidateKeys: [QUERY_KEYS.adminNews(locale)],
    pendingMessage: t("pending.submit"),
    successMessage: t("success"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, t("errors.submit")),
    onSuccess: () => {
      router.replace("/admin/news");
    },
  });

  const onSubmit = handleSubmit((values) => {
    mutation.mutate(values);
  });

  return {
    errors,
    fileInputRef,
    handleFilesSelect,
    images,
    isDeletePending,
    isSubmitDisabled: isUploadingImages || mutation.isPending || isSubmitting,
    isUploadDisabled,
    localeOptions: LOCALE_OPTIONS,
    onSubmit,
    openFileDialog,
    removeImage,
    register,
    t,
  };
};
