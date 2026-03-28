import { create } from "zustand";
import { persist } from "zustand/middleware";

import { type AuthResponse, type AuthSession, type AuthStore } from "@/shared/types";

const AUTH_INITIAL_STATE: AuthSession = {
  token: null,
  user: null,
};

const setAuthSession = (payload: AuthResponse): AuthSession => {
  return {
    token: payload.token,
    user: {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    },
  };
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...AUTH_INITIAL_STATE,
      isHydrated: false,
      setHydrated: (isHydrated) => set({ isHydrated }),
      setToken: (token) => set({ token }),
      setAuthSession: (payload) => set(setAuthSession(payload)),
      setUser: (user) => set({ user }),
      clearAuth: () => set(AUTH_INITIAL_STATE),
      logOut: () => set(AUTH_INITIAL_STATE),
    }),
    {
      name: "kiu-auth",
      partialize: ({ token, user }) => ({
        token,
        user,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
