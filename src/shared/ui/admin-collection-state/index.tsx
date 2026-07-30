"use client";

import { type ReactNode } from "react";

import { getApiErrorMessage } from "@/shared/helpers";

interface Props {
  children: ReactNode;
  emptyLabel: string;
  error: unknown;
  errorLabel: string;
  isEmpty: boolean;
  isLoading: boolean;
  loadingLabel: string;
}

export const AdminCollectionState = ({
  children,
  emptyLabel,
  error,
  errorLabel,
  isEmpty,
  isLoading,
  loadingLabel,
}: Props) => {
  if (isLoading) {
    return <p className="text-base text-black/60 md:text-lg">{loadingLabel}</p>;
  }

  if (error) {
    return (
      <p className="text-base text-red-600 md:text-lg">{getApiErrorMessage(error, errorLabel)}</p>
    );
  }

  if (isEmpty) {
    return <p className="text-base text-black/60 md:text-lg">{emptyLabel}</p>;
  }

  return children;
};
