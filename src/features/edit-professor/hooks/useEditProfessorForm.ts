"use client";

import { useEffect, useMemo } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";

import { useRouter } from "@/i18n/navigation";

import {
  createDefaultProfessorFormValues,
  createProfessorFormSchema,
  getProfessorByIdForEdit,
  mapProfessorDetailToFormValues,
  mapProfessorFormValuesToPayload,
  PROFESSOR_SECTION_OPTIONS,
  type ProfessorFormValues,
  toggleProfessorSectionValue,
  updateProfessor,
} from "@/entities/professors";
import { useProfessorPhoto } from "@/entities/professors/hooks/useProfessorPhoto";

import { LOCALE_OPTIONS, QUERY_KEYS } from "@/shared/constants";
import { getApiErrorMessage } from "@/shared/helpers";
import { useToastMutation } from "@/shared/hooks";

interface Params {
  id: number;
}

export const useEditProfessorForm = ({ id }: Params) => {
  const locale = useLocale();
  const router = useRouter();

  const fieldsT = useTranslations("AdminProfessorsPage.addForm");
  const editT = useTranslations("AdminProfessorsPage.editForm");

  const schema = useMemo(() => createProfessorFormSchema(fieldsT), [fieldsT]);

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
    t: fieldsT,
  });

  const {
    data: professor,
    error: professorError,
    isLoading: isProfessorLoading,
  } = useQuery({
    queryKey: QUERY_KEYS.adminProfessorById(locale, id),
    queryFn: () => getProfessorByIdForEdit(id),
  });

  useEffect(() => {
    if (!professor) {
      return;
    }

    reset(mapProfessorDetailToFormValues(professor));
  }, [professor, reset]);

  const mutation = useToastMutation({
    mutationFn: (values: ProfessorFormValues) =>
      updateProfessor(id, mapProfessorFormValuesToPayload(values)),
    invalidateKeys: [
      QUERY_KEYS.adminProfessorById(locale, id),
      QUERY_KEYS.adminProfessors(locale),
    ],
    pendingMessage: editT("pending.submit"),
    successMessage: editT("success"),
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, editT("errors.submit")),
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
    editT,
    errors,
    fieldsT,
    fileInputRef,
    handlePhotoSelect,
    isPhotoDeletePending,
    isPhotoUploadDisabled,
    isProfessorLoading,
    isSubmitDisabled: isSubmittingPhoto || mutation.isPending || isSubmitting,
    localeOptions: LOCALE_OPTIONS,
    onSubmit,
    openFileDialog,
    photo: getValues("photo"),
    positionFields,
    professor,
    professorError,
    professorSectionOptions: PROFESSOR_SECTION_OPTIONS,
    register,
    removePhoto,
    removePosition,
    selectedSections,
    toggleSection,
  };
};
