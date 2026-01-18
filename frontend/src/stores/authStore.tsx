import { create } from "zustand";

interface AuthStoreType {
   // states
   token: string | null;

   // actions
   setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthStoreType>((set) => ({
   // states
   token: null,

   // actions
   setToken: (token: string | null) => set(() => ({ token })),
}));