import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type TUserData = {
  user: object;
};

export const useUserStore = create()(
  persist(
    (set) => ({
      user: null,
      setUser: (userData: TUserData) => set(() => ({ user: userData })),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
