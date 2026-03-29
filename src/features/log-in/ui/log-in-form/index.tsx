"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/shared/helpers";

import { useLogInForm } from "../../hooks/useLogInForm";

export const LogInForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { errors, isPending, onSubmit, register, t } = useLogInForm();

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="mt-8 space-y-5 md:mt-10 md:space-y-6"
    >
      <div className="space-y-2">
        <label htmlFor="email" className="sr-only">
          {t("emailPlaceholder")}
        </label>

        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          placeholder={t("emailPlaceholder")}
          disabled={isPending}
          {...register("email")}
          className={cn(
            "w-full rounded-2xl border border-black/20 px-5 py-4 text-base text-black outline-none transition-colors placeholder:text-black/40 focus:border-[#004C97] md:text-lg",
            errors.email && "border-red-500 focus:border-red-500",
          )}
        />

        {errors.email?.message ? (
          <p className="text-sm text-red-500 md:text-base">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="sr-only">
          {t("passwordPlaceholder")}
        </label>

        <div className="relative">
          <input
            id="password"
            type={isPasswordVisible ? "text" : "password"}
            autoComplete="current-password"
            aria-invalid={Boolean(errors.password)}
            placeholder={t("passwordPlaceholder")}
            disabled={isPending}
            {...register("password")}
            className={cn(
              "w-full rounded-2xl border border-black/20 px-5 py-4 pr-14 text-base text-black outline-none transition-colors placeholder:text-black/40 focus:border-[#004C97] md:text-lg",
              errors.password && "border-red-500 focus:border-red-500",
            )}
          />

          <button
            type="button"
            disabled={isPending}
            onClick={() => setIsPasswordVisible((current) => !current)}
            aria-label={
              isPasswordVisible ? t("hidePassword") : t("showPassword")
            }
            className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-black/35 transition-colors hover:text-black/60"
          >
            {isPasswordVisible ? (
              <Eye size={20} strokeWidth={1.75} />
            ) : (
              <EyeOff size={20} strokeWidth={1.75} />
            )}
          </button>
        </div>

        {errors.password?.message ? (
          <p className="text-sm text-red-500 md:text-base">
            {errors.password.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full cursor-pointer rounded-2xl bg-[#004C97] px-5 py-4 text-lg font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-[#003f80]"
      >
        {isPending ? t("submitPending") : t("submit")}
      </button>
    </form>
  );
};
