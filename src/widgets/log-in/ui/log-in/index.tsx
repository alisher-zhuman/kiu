import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

import { LogInForm } from "@/features/log-in";

import { LangSwitcher } from "@/shared/ui/lang-switcher";

export const LogIn = () => {
  const t = useTranslations("LogInPage");

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#004C97] px-5 py-6 sm:px-6 sm:py-8">
      <div
        aria-hidden="true"
        className="absolute -top-12 -left-12 size-48 rounded-full bg-white/14 md:size-72"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-12 -left-6 size-44 rounded-full bg-white/14 md:bottom-20 md:size-60"
      />
      <div
        aria-hidden="true"
        className="absolute right-8 bottom-16 size-40 rounded-full bg-white/14 md:size-56"
      />
      <div
        aria-hidden="true"
        className="absolute right-0 bottom-0 size-52 translate-x-1/4 translate-y-1/4 rounded-full bg-white/14 md:size-72"
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-3rem)] max-w-400 flex-col">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm font-medium text-white/90 transition-colors hover:text-white md:text-base"
          >
            {t("home")}
          </Link>

          <LangSwitcher className="text-white" />
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <section className="w-full max-w-2xl rounded-4xl bg-white px-6 py-8 shadow-[0_24px_60px_rgba(0,0,0,0.14)] sm:px-10 sm:py-10">
            <h1 className="text-center text-2xl font-semibold text-black md:text-4xl">
              {t("title")}
            </h1>

            <LogInForm />
          </section>
        </div>
      </div>
    </main>
  );
};
