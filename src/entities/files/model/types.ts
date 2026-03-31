import { type z } from "zod";

import { type UploadFileResponseSchema } from "./schemas";

export type UploadFileResponse = z.infer<typeof UploadFileResponseSchema>;
