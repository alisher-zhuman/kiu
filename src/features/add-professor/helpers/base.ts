import {
  type CreateProfessorPayload,
  type ProfessorDetail,
} from "@/entities/professors";

import { type AddProfessorFormValues } from "../types";

const getPositionLength = (professor: ProfessorDetail) =>
  Math.max(
    professor.positionsEn.length,
    professor.positionsKg.length,
    professor.positionsRu.length,
    1,
  );

export const createDefaultProfessorFormValues = (): AddProfessorFormValues => ({
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
  values: AddProfessorFormValues,
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
): AddProfessorFormValues => {
  const positions = Array.from({ length: getPositionLength(professor) }, (_, index) => ({
    en: professor.positionsEn[index] ?? "",
    kg: professor.positionsKg[index] ?? "",
    ru: professor.positionsRu[index] ?? "",
  }));

  return {
    fullName: professor.fullName,
    photo: professor.photo,
    positions,
    sections: professor.sections,
  };
};
