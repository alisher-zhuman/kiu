import {
  type CreateProfessorPayload,
  type ProfessorDetail,
  type ProfessorFormValues,
  type ProfessorSection,
} from "./types";

const getPositionLength = (professor: ProfessorDetail) =>
  Math.max(
    professor.positionsEn.length,
    professor.positionsKg.length,
    professor.positionsRu.length,
    1
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
  values: ProfessorFormValues
): CreateProfessorPayload => ({
  fullName: values.fullName,
  photo: values.photo,
  positionsEn: values.positions.map((position) => position.en),
  positionsKg: values.positions.map((position) => position.kg),
  positionsRu: values.positions.map((position) => position.ru),
  sections: values.sections,
});

export const mapProfessorDetailToFormValues = (professor: ProfessorDetail): ProfessorFormValues => {
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

export const toggleProfessorSectionValue = (
  selectedSections: ProfessorSection[],
  section: ProfessorSection
) => {
  return selectedSections.includes(section)
    ? selectedSections.filter((currentSection) => currentSection !== section)
    : [...selectedSections, section];
};
