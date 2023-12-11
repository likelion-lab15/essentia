"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type TUserData = {
  user: object;
};

export const useUserStore = create<TState & TAction>()(
  persist(
    (set) => ({
      user: {},
      setUser: (userData: TUserData) => set(() => ({ user: userData })),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
