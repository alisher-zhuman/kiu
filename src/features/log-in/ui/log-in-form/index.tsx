"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Eye, EyeOff } from "lucide-react";

export const LogInForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const t = useTranslations("LogInPage");

  return (
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
  );
};
