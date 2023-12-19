import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type TState = {
  user: object;
};

type TAction = {
  setUser: (newUser: TState) => void;
};

export const useUserStore = create<TState & TAction>()(
  persist(
    (set) => ({
      user: {},
      setUser: (newUser) => set(() => ({ user: newUser })),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
