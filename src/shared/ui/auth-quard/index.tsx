"use client";

import { type ReactNode, useEffect, useState } from "react";

import { useRouter } from "@/i18n/navigation";

import { useAuthStore } from "@/shared/stores";

interface Props {
  children: ReactNode;
}

export const AuthGuard = ({ children }: Props) => {
  const [isHydrated, setIsHydrated] = useState(useAuthStore.persist.hasHydrated());

  const router = useRouter();

  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  const isAuthorized = Boolean(token && user?.role === "ADMIN");

  useEffect(() => {
    const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!isHydrated || isAuthorized) {
      return;
    }

    router.replace("/log-in");
  }, [isAuthorized, isHydrated, router]);

  if (!isHydrated || !isAuthorized) {
    return <div className="min-h-screen bg-white" />;
  }

  return children;
};
