"use client";

import { type ReactNode, useEffect } from "react";

import { useRouter } from "@/i18n/navigation";

import { useAuthStore } from "@/shared/stores";

interface Props {
  children: ReactNode;
}

export const AuthGuard = ({ children }: Props) => {
  const router = useRouter();

  const isHydrated = useAuthStore((state) => state.isHydrated);
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  const isAuthorized = Boolean(token && user?.role === "ADMIN");

  useEffect(() => {
    if (!isHydrated || isAuthorized) {
      return;
    }

    router.replace("/admin/log-in");
  }, [isAuthorized, isHydrated, router]);

  if (!isHydrated || !isAuthorized) {
    return <div className="min-h-screen bg-white" />;
  }

  return children;
};
