"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "@/i18n/navigation";

import {
  createProfessor,
  PROFESSOR_SECTION_OPTIONS,
} from "@/entities/professors";

import { LOCALE_OPTIONS, QUERY_KEYS } from "@/shared/constants";
import { getApiErrorMessage } from "@/shared/helpers";
import { useToastMutation } from "@/shared/hooks";

import { createAddProfessorFormSchema } from "../schemas";
import { type AddProfessorFormValues } from "../types";

import { useAddProfessorPhoto } from "./useAddProfessorPhoto";

export const useAddProfessorForm = () => {
  const locale = useLocale();
  const router = useRouter();

  const t = useTranslations("AdminProfessorsPage.addForm");

  const schema = useMemo(() => createAddProfessorFormSchema(t), [t]);

  const {
    clearErrors,
    formState: { errors, isSubmitting },
    getValues,
    handleSubmit,
    register,
    setError,
    setValue,
  } = useForm<AddProfessorFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: {
        en: "",
        kg: "",
        ru: "",
      },
      photo: "",
      position: "",
      section: PROFESSOR_SECTION_OPTIONS[0],
    },
    mode: "onChange",
  });

  const {
    fileInputRef,
    handlePhotoSelect,
    isPhotoDeletePending,
    isPhotoUploadDisabled,
    isSubmittingPhoto,
    openFileDialog,
    removePhoto,
  } = useAddProfessorPhoto({
    clearErrors,
    getValues,
    setError,
    setValue,
    t,
  });

  const mutation = useToastMutation({
    mutationFn: (values: AddProfessorFormValues) => createProfessor(values),
    invalidateKeys: [QUERY_KEYS.adminProfessors(locale)],
    pendingMessage: t("pending.submit"),
    successMessage: t("success"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, t("errors.submit")),
    onSuccess: () => {
      router.replace("/admin/professors");
    },
  });

  const onSubmit = handleSubmit((values) => {
    mutation.mutate(values);
  });

  return {
    errors,
    fileInputRef,
    handlePhotoSelect,
    isPhotoDeletePending,
    isPhotoUploadDisabled,
    isSubmitDisabled: isSubmittingPhoto || mutation.isPending || isSubmitting,
    localeOptions: LOCALE_OPTIONS,
    onSubmit,
    openFileDialog,
    photo: getValues("photo"),
    professorSectionOptions: PROFESSOR_SECTION_OPTIONS,
    register,
    removePhoto,
    t,
  };
};
