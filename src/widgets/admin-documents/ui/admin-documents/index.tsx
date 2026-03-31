"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";

import { InDevelopment } from "@/widgets/in-development";

import { getDocuments } from "@/entities/documents";

import { QUERY_KEYS } from "@/shared/constants";

export const AdminDocuments = () => {
  const locale = useLocale();

  const { data } = useQuery({
    queryKey: QUERY_KEYS.adminDocuments(locale),
    queryFn: getDocuments,
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    console.warn("admin documents", data);
  }, [data]);

  return <InDevelopment compactTopPadding hideHeader />;
};
