import { useTranslations } from "next-intl";

import { Content } from "../content";

export const NotFound = () => {
  const t = useTranslations("NotFoundPage");

  return (
    <main className="mx-auto max-w-400 px-5 py-10 text-black md:px-10 md:py-16">
      <section aria-labelledby="not-found-title">
        <Content
          action={t("action")}
          description={t("description")}
          title={t("title")}
        />
      </section>
    </main>
  );
};
