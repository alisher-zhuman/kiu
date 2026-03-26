"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";

import { createLogInFormSchema } from "../schemas";
import { type LogInFormValues } from "../types";

export const useLogInForm = () => {
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

  const onSubmit = handleSubmit((values) => {
    void values;
  });

  return {
    errors,
    isPending: isSubmitting,
    onSubmit,
    register,
    t,
  };
};
