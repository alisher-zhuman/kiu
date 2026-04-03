export {
  createProfessor,
  deleteProfessor,
  getProfessorById,
  getProfessorByIdForEdit,
  getProfessors,
  updateProfessor,
} from "./api";
export { useProfessorPhoto } from "./hooks/useProfessorPhoto";
export {
  MAX_PROFESSOR_PHOTO_SIZE_BYTES,
  PROFESSOR_SECTION_OPTIONS,
} from "./model/constants";
export {
  createDefaultProfessorFormValues,
  mapProfessorDetailToFormValues,
  mapProfessorFormValuesToPayload,
  toggleProfessorSectionValue,
} from "./model/helpers";
export { createProfessorFormSchema } from "./model/schemas";
export type {
  CreateProfessorPayload,
  LocalizedProfessorName,
  LocalizedProfessorPosition,
  ProfessorDetail,
  ProfessorFormValues,
  ProfessorItem,
  ProfessorPositionFormValue,
  ProfessorSection,
} from "./model/types";
export { ProfessorForm } from "./ui/professor-form";
