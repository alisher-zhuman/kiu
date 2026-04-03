import { z } from "zod";

import { PROFESSOR_SECTION_OPTIONS } from "./constants";
import {
  type CreateProfessorPayload,
  type ProfessorDetail,
  type ProfessorSection,
} from "./types";

export interface ProfessorPositionFormValue {
  en: string;
  kg: string;
  ru: string;
}

export const MAX_PROFESSOR_PHOTO_SIZE_BYTES = 5 * 1024 * 1024;

export const createProfessorFormSchema = (t: (key: string) => string) => {
  return z.object({
    fullName: z.object({
      en: z.string().trim().min(1, t("errors.fullName.required")),
      kg: z.string().trim().min(1, t("errors.fullName.required")),
      ru: z.string().trim().min(1, t("errors.fullName.required")),
    }),
    photo: z.string().trim().min(1, t("errors.photo.required")),
    positions: z
      .array(
        z.object({
          en: z.string().trim().min(1, t("errors.position.required")),
          kg: z.string().trim().min(1, t("errors.position.required")),
          ru: z.string().trim().min(1, t("errors.position.required")),
        }),
      )
      .min(1, t("errors.position.min")),
    sections: z
      .array(
        z.enum(PROFESSOR_SECTION_OPTIONS, {
          error: () => t("errors.section.required"),
        }),
      )
      .min(1, t("errors.section.required")),
  });
};

export type ProfessorFormValues = z.infer<
  ReturnType<typeof createProfessorFormSchema>
>;

const getPositionLength = (professor: ProfessorDetail) =>
  Math.max(
    professor.positionsEn.length,
    professor.positionsKg.length,
    professor.positionsRu.length,
    1,
  );

export const createDefaultProfessorFormValues = (): ProfessorFormValues => ({
  fullName: {
    en: "",
    kg: "",
    ru: "",
  },
  photo: "",
  positions: [{ en: "", kg: "", ru: "" }],
  sections: [],
});

export const mapProfessorFormValuesToPayload = (
  values: ProfessorFormValues,
): CreateProfessorPayload => ({
  fullName: values.fullName,
  photo: values.photo,
  positionsEn: values.positions.map((position) => position.en),
  positionsKg: values.positions.map((position) => position.kg),
  positionsRu: values.positions.map((position) => position.ru),
  sections: values.sections,
});

export const mapProfessorDetailToFormValues = (
  professor: ProfessorDetail,
): ProfessorFormValues => {
  const positions = Array.from(
    { length: getPositionLength(professor) },
    (_, index) => ({
      en: professor.positionsEn[index] ?? "",
      kg: professor.positionsKg[index] ?? "",
      ru: professor.positionsRu[index] ?? "",
    }),
  );

  return {
    fullName: professor.fullName,
    photo: professor.photo,
    positions,
    sections: professor.sections,
  };
};

export const toggleProfessorSectionValue = (
  selectedSections: ProfessorSection[],
  section: ProfessorSection,
) => {
  return selectedSections.includes(section)
    ? selectedSections.filter((currentSection) => currentSection !== section)
    : [...selectedSections, section];
};
