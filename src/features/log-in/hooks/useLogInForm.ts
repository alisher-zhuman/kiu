"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "@/i18n/navigation";

import { logIn } from "@/entities/log-in";

import { getApiErrorMessage } from "@/shared/helpers";
import { useToastMutation } from "@/shared/hooks";
import { useAuthStore } from "@/shared/stores";

import { createLogInFormSchema } from "../schemas";
import { type LogInFormValues } from "../types";

export const useLogInForm = () => {
  const router = useRouter();

  const setAuthSession = useAuthStore((state) => state.setAuthSession);

  const t = useTranslations("LogInPage");

  const schema = useMemo(() => createLogInFormSchema(t), [t]);

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<LogInFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useToastMutation({
    mutationFn: ({ email, password }: LogInFormValues) =>
      logIn(email, password),
    onSuccess: (data) => {
      setAuthSession(data);
      router.replace("/admin/news");
    },
    errorMessage: (error: unknown) =>
      getApiErrorMessage(error, t("errors.submit")),
  });

  const onSubmit = handleSubmit((values) => {
    mutation.mutate(values);
  });

  return {
    errors,
    isPending: mutation.isPending || isSubmitting,
    onSubmit,
    register,
    t,
  };
};
