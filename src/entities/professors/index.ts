export {
  createProfessor,
  deleteProfessor,
  getProfessorById,
  getProfessors,
  updateProfessor,
} from "./api";
export { PROFESSOR_SECTION_OPTIONS } from "./model/constants";
export type {
  CreateProfessorPayload,
  LocalizedProfessorName,
  LocalizedProfessorPosition,
  ProfessorDetail,
  ProfessorItem,
  ProfessorSection,
} from "./model/types";
