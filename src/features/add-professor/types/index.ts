import { type z } from "zod";

import { type createAddProfessorFormSchema } from "../schemas";

export interface ProfessorPositionFormValue {
  en: string;
  kg: string;
  ru: string;
}

export type AddProfessorFormValues = z.infer<
  ReturnType<typeof createAddProfessorFormSchema>
>;
