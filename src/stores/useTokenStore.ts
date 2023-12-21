/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type TToken = {
  accessToken: string;
  refreshToken: string;
};

type TuseTokenStore = {
  token: TToken | null;
  setToken: (token: TToken | null) => void;
};

export const useTokenStore = create<TuseTokenStore>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
    }),
    {
      name: "token",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
