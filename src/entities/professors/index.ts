export {
  createProfessor,
  deleteProfessor,
  getProfessorById,
  getProfessorByIdForEdit,
  getProfessors,
  updateProfessor,
} from "./api";
export { PROFESSOR_SECTION_OPTIONS } from "./model/constants";
export type {
  ProfessorFormValues,
  ProfessorPositionFormValue,
} from "./model/form";
export {
  createDefaultProfessorFormValues,
  createProfessorFormSchema,
  mapProfessorDetailToFormValues,
  mapProfessorFormValuesToPayload,
  toggleProfessorSectionValue,
} from "./model/form";
export type {
  CreateProfessorPayload,
  LocalizedProfessorName,
  LocalizedProfessorPosition,
  ProfessorDetail,
  ProfessorItem,
  ProfessorSection,
} from "./model/types";
