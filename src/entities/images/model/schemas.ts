import { z } from "zod";

export const UploadImageResponseSchema = z.object({
  url: z.url(),
});
