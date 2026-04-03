"use client";

import { type ReactNode } from "react";

import { getApiErrorMessage } from "@/shared/helpers";

interface Props<TItem> {
  emptyLabel: string;
  error: unknown;
  errorLabel: string;
  isLoading: boolean;
  item: TItem | null | undefined;
  loadingLabel: string;
  render: (item: TItem) => ReactNode;
}

export const AsyncItemState = <TItem,>({
  emptyLabel,
  error,
  errorLabel,
  isLoading,
  item,
  loadingLabel,
  render,
}: Props<TItem>) => {
  if (isLoading) {
    return <p className="text-base text-black/60 md:text-lg">{loadingLabel}</p>;
  }

  if (error) {
    return (
      <p className="text-base text-red-600 md:text-lg">
        {getApiErrorMessage(error, errorLabel)}
      </p>
    );
  }

  if (!item) {
    return <p className="text-base text-black/60 md:text-lg">{emptyLabel}</p>;
  }

  return render(item);
};
