import { z } from "zod";

import { PROFESSOR_SECTION_OPTIONS } from "@/entities/professors";

export const createAddProfessorFormSchema = (
  t: (key: string) => string,
) => {
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
    sections: z.array(
      z.enum(PROFESSOR_SECTION_OPTIONS, {
        error: () => t("errors.section.required"),
      }),
    ).min(1, t("errors.section.required")),
  });
};
