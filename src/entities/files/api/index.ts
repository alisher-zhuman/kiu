import { api } from "@/shared/configs";
import { API_ROUTES } from "@/shared/constants";

import { UploadFileResponseSchema } from "../model/schemas";

export const uploadFile = async (file: File) => {
  const formData = new FormData();

  formData.append("file", file);

  const { data } = await api.post(API_ROUTES.IMAGES_UPLOAD, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return UploadFileResponseSchema.parse(data);
};

export const deleteFile = async (fileUrl: string) => {
  await api.delete(API_ROUTES.IMAGES_DELETE, {
    params: {
      fileUrl,
    },
  });
};
