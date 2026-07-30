import { useTranslations } from "next-intl";

import { cn } from "@/shared/helpers";
import { PageTitle } from "@/shared/ui/page-title";

interface Props {
  compactTopPadding?: boolean;
  hideHeader?: boolean;
  title?: string;
}

export const InDevelopment = ({ compactTopPadding = false, hideHeader = false, title }: Props) => {
  const t = useTranslations("InDevelopment");

  return (
    <main
      className={cn(
        "mx-auto max-w-400 px-5 text-black md:px-10",
        compactTopPadding ? "pt-3 pb-10 md:pt-4 md:pb-16" : "py-10 md:py-16"
      )}
    >
      <section
        aria-label={hideHeader ? t("title") : undefined}
        aria-labelledby={!hideHeader ? "in-development-title" : undefined}
        className="space-y-8"
      >
        {!hideHeader ? (
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#004C97]">
              {t("eyebrow")}
            </p>

            <PageTitle id="in-development-title" className="text-3xl sm:text-4xl md:text-5xl">
              {title}
            </PageTitle>
          </div>
        ) : null}

        <div className="max-w-3xl space-y-4 text-base leading-8 text-black/70 sm:text-lg">
          <p>{t("title")}</p>
          <p>{t("description")}</p>
        </div>
      </section>
    </main>
  );
};
