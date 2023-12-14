import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useTokenStore = create()(
  persist(
    (set) => ({
      token: null,
      setToken: (tokenData) => set(() => ({ token: tokenData })),
    }),
    {
      name: "token",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
