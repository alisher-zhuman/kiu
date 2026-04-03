"use client";

import { useMemo } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "@/i18n/navigation";

import {
  createDefaultProfessorFormValues,
  createProfessor,
  createProfessorFormSchema,
  mapProfessorFormValuesToPayload,
  PROFESSOR_SECTION_OPTIONS,
  type ProfessorFormValues,
  toggleProfessorSectionValue,
  useProfessorPhoto,
} from "@/entities/professors";

import { LOCALE_OPTIONS, QUERY_KEYS } from "@/shared/constants";
import { getApiErrorMessage } from "@/shared/helpers";
import { useToastMutation } from "@/shared/hooks";

export const useAddProfessorForm = () => {
  const locale = useLocale();
  
  const router = useRouter();

  const t = useTranslations("AdminProfessorsPage.addForm");

  const schema = useMemo(() => createProfessorFormSchema(t), [t]);

  const {
    clearErrors,
    control,
    formState: { errors, isSubmitting },
    getValues,
    handleSubmit,
    register,
    setError,
    setValue,
  } = useForm<ProfessorFormValues>({
    resolver: zodResolver(schema),
    defaultValues: createDefaultProfessorFormValues(),
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

  const selectedSections = useWatch({
    control,
    defaultValue: [],
    name: "sections",
  });

  const {
    fileInputRef,
    handlePhotoSelect,
    isPhotoDeletePending,
    isPhotoUploadDisabled,
    isSubmittingPhoto,
    openFileDialog,
    removePhoto,
  } = useProfessorPhoto({
    clearErrors,
    getValues,
    setError,
    setValue,
    t,
  });

  const mutation = useToastMutation({
    mutationFn: (values: ProfessorFormValues) =>
      createProfessor(mapProfessorFormValuesToPayload(values)),
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

  const toggleSection = (
    section: (typeof PROFESSOR_SECTION_OPTIONS)[number],
  ) => {
    setValue("sections", toggleProfessorSectionValue(selectedSections, section), {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

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
    selectedSections,
    t,
    toggleSection,
  };
};
