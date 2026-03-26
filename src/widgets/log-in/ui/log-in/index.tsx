"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Eye, EyeOff } from "lucide-react";

import { Link } from "@/i18n/navigation";

import { LangSwitcher } from "@/shared/ui/lang-switcher";

export const LogIn = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
          <section className="w-full max-w-2xl rounded-[2rem] bg-white px-6 py-8 shadow-[0_24px_60px_rgba(0,0,0,0.14)] sm:px-10 sm:py-10">
            <h1 className="text-center text-2xl font-semibold text-black md:text-4xl">
              {t("title")}
            </h1>

            <form
              onSubmit={(event) => event.preventDefault()}
              className="mt-8 space-y-5 md:mt-10 md:space-y-6"
            >
              <div className="space-y-2">
                <label htmlFor="login" className="sr-only">
                  {t("loginPlaceholder")}
                </label>

                <input
                  id="login"
                  type="text"
                  placeholder={t("loginPlaceholder")}
                  className="w-full rounded-2xl border border-black/20 px-5 py-4 text-base text-black outline-none transition-colors placeholder:text-black/40 focus:border-[#004C97] md:text-lg"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="sr-only">
                  {t("passwordPlaceholder")}
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder={t("passwordPlaceholder")}
                    className="w-full rounded-2xl border border-black/20 px-5 py-4 pr-14 text-base text-black outline-none transition-colors placeholder:text-black/40 focus:border-[#004C97] md:text-lg"
                  />

                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible((current) => !current)}
                    aria-label={
                      isPasswordVisible ? t("hidePassword") : t("showPassword")
                    }
                    className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-black/35 transition-colors hover:text-black/60"
                  >
                    {isPasswordVisible ? (
                      <EyeOff size={20} strokeWidth={1.75} />
                    ) : (
                      <Eye size={20} strokeWidth={1.75} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer rounded-2xl bg-[#004C97] px-5 py-4 text-lg font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-[#003f80]"
              >
                {t("submit")}
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
};
