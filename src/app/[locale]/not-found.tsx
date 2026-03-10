import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

const NotFoundPage = async () => {
  const t = await getTranslations("NotFoundPage");
  const headerT = await getTranslations("Header");

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#004C97] text-white">
      <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-white/10 to-transparent" />
      <div className="absolute -top-24 -right-16 size-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-0 -left-24 size-72 rounded-full bg-[#ffea00]/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8 sm:px-10 lg:px-12">
        <Link href="/" className="flex items-center gap-3 self-start sm:gap-4">
          <Image
            src="/icons/logo.svg"
            alt={headerT("logoAlt")}
            width={64}
            height={64}
            className="h-12 w-12 sm:h-16 sm:w-16"
          />

          <div className="h-10 w-px bg-white/30 sm:h-14" />

          <p className="max-w-40 text-sm leading-tight font-light text-white/90 sm:max-w-52 sm:text-base">
            {headerT("title")}
          </p>
        </Link>

        <section className="my-auto grid gap-10 py-16 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-16">
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
        </section>
      </div>
    </main>
  );
};

export default NotFoundPage;
