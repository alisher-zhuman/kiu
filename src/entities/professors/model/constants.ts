import { FACULTY_SECTION_OPTIONS } from "@/shared/constants";

export const PROFESSOR_SECTION_OPTIONS = [
  "ADMINISTRATION",
  ...FACULTY_SECTION_OPTIONS,
] as const;

export const MAX_PROFESSOR_PHOTO_SIZE_BYTES = 5 * 1024 * 1024;
