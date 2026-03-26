import { z } from "zod";

export const createLogInFormSchema = (t: (key: string) => string) => {
  return z.object({
    email: z
      .string()
      .min(1, t("errors.email.required"))
      .pipe(z.email(t("errors.email.invalid"))),
    password: z.string().min(1, t("errors.password.required")),
  });
};
