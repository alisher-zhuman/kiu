import { useTranslations } from "next-intl";

import { Content } from "../content";

export const NotFound = () => {
  const t = useTranslations("NotFoundPage");

  return (
    <main className="relative overflow-hidden bg-[#004C97] text-white">
      <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-white/10 to-transparent" />
      <div className="absolute -top-24 -right-16 size-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-0 -left-24 size-72 rounded-full bg-[#ffea00]/10 blur-3xl" />

      <section className="relative mx-auto flex max-w-400 items-center px-5 py-20 md:px-10 md:py-40">
        <Content
          action={t("action")}
          description={t("description")}
          title={t("title")}
        />
      </section>
    </main>
  );
};
