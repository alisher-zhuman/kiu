"use client";

import { useTranslations } from "next-intl";

import { AddNewsForm } from "@/features/add-news";

export const AddNews = () => {
  const t = useTranslations("AdminLayout.pages");

  return (
    <main className="mx-auto max-w-400 px-5 py-8 text-black md:px-10 md:py-10">
      <section className="space-y-8">
        <div className="border-l-2 border-black pl-3 md:pl-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {t("addNews")}
          </h1>
        </div>

        <AddNewsForm />
      </section>
    </main>
  );
};
