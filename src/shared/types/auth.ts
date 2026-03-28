export interface AuthUser {
  id: number;
  email: string;
  role: string;
}

export interface AuthSession {
  token: string | null;
  user: AuthUser | null;
}

export interface AuthResponse {
  token: string;
  id: number;
  email: string;
  role: string;
}

export interface AuthStore extends AuthSession {
  isHydrated: boolean;
  setHydrated: (isHydrated: boolean) => void;
  setToken: (token: string | null) => void;
  setAuthSession: (payload: AuthResponse) => void;
  setUser: (user: AuthUser | null) => void;
  clearAuth: () => void;
  logOut: () => void;
}
