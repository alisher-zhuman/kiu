"use client";

import { deleteFile, uploadFile } from "@/shared/api/files";
import { getApiErrorMessage } from "@/shared/helpers";

import { useToastMutation } from "./useToastMutation";

interface Params {
  deleteErrorMessage: string;
  deletePendingMessage: string;
  uploadErrorMessage: string;
  uploadPendingMessage: string;
}

export const useFileTransfer = ({
  deleteErrorMessage,
  deletePendingMessage,
  uploadErrorMessage,
  uploadPendingMessage,
}: Params) => {
  const uploadMutation = useToastMutation({
    mutationFn: (file: File) => uploadFile(file),
    pendingMessage: uploadPendingMessage,
    errorMessage: (error: unknown) => getApiErrorMessage(error, uploadErrorMessage),
  });

  const deleteMutation = useToastMutation({
    mutationFn: (fileUrl: string) => deleteFile(fileUrl),
    pendingMessage: deletePendingMessage,
    errorMessage: (error: unknown) => getApiErrorMessage(error, deleteErrorMessage),
  });

  return {
    deleteFile: deleteMutation.mutateAsync,
    isDeletePending: deleteMutation.isPending,
    isTransferring: uploadMutation.isPending || deleteMutation.isPending,
    isUploadPending: uploadMutation.isPending,
    uploadFile: uploadMutation.mutateAsync,
  };
};
