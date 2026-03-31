"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";

import { InDevelopment } from "@/widgets/in-development";

import { getProfessors } from "@/entities/professors";

import { QUERY_KEYS } from "@/shared/constants";

export const AdminProfessors = () => {
  const locale = useLocale();

  const { data } = useQuery({
    queryKey: QUERY_KEYS.adminProfessors(locale),
    queryFn: getProfessors,
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    console.warn("admin professors", data);
  }, [data]);

  return <InDevelopment compactTopPadding hideHeader />;
};
