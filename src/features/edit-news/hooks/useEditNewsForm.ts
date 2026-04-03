"use client";

import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";

import { useRouter } from "@/i18n/navigation";

import {
  createDefaultNewsFormValues,
  createNewsFormSchema,
  getNewsByIdForEdit,
  mapEditableNewsToFormValues,
  mapNewsFormValuesToPayload,
  type NewsFormValues,
  updateNews,
  useNewsImages,
} from "@/entities/news";

import { LOCALE_OPTIONS, QUERY_KEYS } from "@/shared/constants";
import { getApiErrorMessage } from "@/shared/helpers";
import { useToastMutation } from "@/shared/hooks";

interface Params {
  id: number;
}

export const useEditNewsForm = ({ id }: Params) => {
  const locale = useLocale();
  
  const router = useRouter();

  const fieldsT = useTranslations("AdminNewsPage.addForm");
  const editT = useTranslations("AdminNewsPage.editForm");

  const schema = useMemo(() => createNewsFormSchema(fieldsT), [fieldsT]);

  const {
    clearErrors,
    control,
    formState: { errors, isSubmitting },
    getValues,
    handleSubmit,
    register,
    reset,
    setError,
    setValue,
  } = useForm<NewsFormValues>({
    resolver: zodResolver(schema),
    defaultValues: createDefaultNewsFormValues(),
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
  } = useNewsImages({
    clearErrors,
    getValues,
    images,
    setError,
    setValue,
    t: fieldsT,
  });

  const {
    data: news,
    error: newsError,
    isLoading: isNewsLoading,
  } = useQuery({
    queryKey: QUERY_KEYS.adminNewsFormById(locale, id),
    queryFn: () => getNewsByIdForEdit(id),
  });

  useEffect(() => {
    if (!news) {
      return;
    }

    reset(mapEditableNewsToFormValues(news));
  }, [news, reset]);

  const mutation = useToastMutation({
    mutationFn: (values: NewsFormValues) =>
      updateNews(id, mapNewsFormValuesToPayload(values)),
    invalidateKeys: [
      QUERY_KEYS.adminNews(locale),
      QUERY_KEYS.adminNewsById(locale, id),
      QUERY_KEYS.adminNewsFormById(locale, id),
    ],
    pendingMessage: editT("pending.submit"),
    successMessage: editT("success"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, editT("errors.submit")),
    onSuccess: () => {
      router.replace("/admin/news");
    },
  });

  const onSubmit = handleSubmit((values) => {
    mutation.mutate(values);
  });

  return {
    editT,
    errors,
    fileInputRef,
    handleFilesSelect,
    images,
    isDeletePending,
    isNewsLoading,
    isSubmitDisabled: isUploadingImages || mutation.isPending || isSubmitting,
    isUploadDisabled,
    localeOptions: LOCALE_OPTIONS,
    news,
    newsError,
    onSubmit,
    openFileDialog,
    removeImage,
    register,
    t: fieldsT,
  };
};
