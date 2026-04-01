"use client";

import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";

import { Link } from "@/i18n/navigation";

import { EditDocumentForm } from "@/features/edit-document";

interface Props {
  id: number;
}

export const EditDocument = ({ id }: Props) => {
  const tLayout = useTranslations("Layout");

  return (
    <main className="mx-auto max-w-400 px-5 pt-3 pb-8 text-black md:px-10 md:pt-4 md:pb-10">
      <section className="space-y-6 md:space-y-8">
        <Link
          href="/admin/documents"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#004C97] transition-colors hover:text-[#002E5C] md:text-base"
        >
          <ArrowLeft className="size-4" strokeWidth={1.75} />
          {tLayout("back")}
        </Link>

        <EditDocumentForm id={id} />
      </section>
    </main>
  );
};
