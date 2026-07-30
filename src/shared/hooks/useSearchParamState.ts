"use client";

import { useCallback } from "react";
import { useSearchParams } from "next/navigation";

import { usePathname, useRouter } from "@/i18n/navigation";

export const useSearchParamState = (
  key: string,
  defaultValue: string,
  validValues?: readonly string[]
): [string, (value: string) => void] => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const raw = searchParams.get(key);
  const value = raw && (!validValues || validValues.includes(raw)) ? raw : defaultValue;

  const setValue = useCallback(
    (newValue: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, newValue);
      router.replace(`${pathname}?${params.toString()}`);
    },
    [key, pathname, router, searchParams]
  );

  return [value, setValue];
};
