import { type z } from "zod";

import { type UploadImageResponseSchema } from "./schemas";

export type UploadImageResponse = z.infer<typeof UploadImageResponseSchema>;
