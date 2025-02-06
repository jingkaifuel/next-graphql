"use client";

import { create } from "zustand";
import { User } from "@/gql/graphql";
import { createJSONStorage, persist } from "zustand/middleware";

// Define store state
interface AuthState {
  token: string | null;
  user?: User;
  setToken: (token: string) => void;
  reset: () => void;
}

// Decode JWT token
const decodeToken = (token: string): User | null => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

// Create Zustand store
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: undefined,
      setToken: (token) => {
        const user = decodeToken(token);
        set({ token, user: user || undefined });
      },
      reset: () => set({ token: null, user: undefined }),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
export default useAuthStore;
