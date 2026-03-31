import { z } from "zod";

export const UploadFileResponseSchema = z.object({
  url: z.url(),
});
