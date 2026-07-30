import { type z } from "zod";

import { type createAddDocumentFormSchema } from "../schemas";

export type AddDocumentFormValues = z.infer<ReturnType<typeof createAddDocumentFormSchema>>;
