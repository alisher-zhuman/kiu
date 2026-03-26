import { type z } from "zod";

import { type createLogInFormSchema } from "../schemas";

export type LogInFormValues = z.infer<ReturnType<typeof createLogInFormSchema>>;
