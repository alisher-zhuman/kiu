import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

const NotFoundPage = () => {
  const t = useTranslations("NotFoundPage");

  return (
    <main className="relative overflow-hidden bg-[#004C97] text-white">
      <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-white/10 to-transparent" />
      <div className="absolute -top-24 -right-16 size-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-0 -left-24 size-72 rounded-full bg-[#ffea00]/10 blur-3xl" />

      <section className="relative mx-auto flex max-w-400 items-center px-5 py-20 md:px-10 md:py-40">
        <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-end md:gap-16">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#ffea00]">
              404
            </p>
            <p className="text-8xl leading-none font-light text-white/15 sm:text-9xl">
              404
            </p>
          </div>

          <div className="max-w-2xl space-y-6">
            <div className="h-px w-24 bg-[#ffea00]" />

            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t("title")}
            </h1>

            <p className="max-w-xl text-base leading-8 text-white/80 sm:text-lg">
              {t("description")}
            </p>

            <Link
              href="/"
              className="inline-flex items-center rounded-full bg-[#ffea00] px-6 py-3 text-sm font-semibold text-[#004C97] transition-colors hover:bg-white"
            >
              {t("action")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFoundPage;
