"use client";

import { useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
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
    control,
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
      positions: [{ en: "", kg: "", ru: "" }],
      sections: [],
    },
    mode: "onChange",
  });

  const {
    append: appendPosition,
    fields: positionFields,
    remove: removePosition,
  } = useFieldArray({
    control,
    name: "positions",
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
    mutationFn: (values: AddProfessorFormValues) =>
      createProfessor({
        fullName: values.fullName,
        photo: values.photo,
        positionsEn: values.positions.map((position) => position.en),
        positionsKg: values.positions.map((position) => position.kg),
        positionsRu: values.positions.map((position) => position.ru),
        sections: values.sections,
      }),
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
    addPosition: () => appendPosition({ en: "", kg: "", ru: "" }),
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
    positionFields,
    professorSectionOptions: PROFESSOR_SECTION_OPTIONS,
    register,
    removePhoto,
    removePosition,
    t,
  };
};
