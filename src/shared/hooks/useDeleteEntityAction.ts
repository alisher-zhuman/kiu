"use client";

import { type QueryKey } from "@tanstack/react-query";

import { useToastMutation } from "./useToastMutation";

interface Params {
  errorMessage: (error: unknown) => string;
  invalidateKeys: QueryKey[];
  mutationFn: () => Promise<unknown>;
  onSuccess?: (() => void) | undefined;
  pendingMessage: string;
  successMessage: string;
}

export const useDeleteEntityAction = ({
  errorMessage,
  invalidateKeys,
  mutationFn,
  onSuccess,
  pendingMessage,
  successMessage,
}: Params) => {
  const mutation = useToastMutation({
    mutationFn,
    invalidateKeys,
    pendingMessage,
    successMessage,
    errorMessage,
    onSuccess,
  });

  return {
    isPending: mutation.isPending,
    onDelete: () => mutation.mutate(),
  };
};
