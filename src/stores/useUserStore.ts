/* eslint-disable no-unused-vars */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type TUser = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  extra: {
    birthday: string;
    membershipClass: string;
    addressBook: {
      value: string;
      detail: string;
    };
  };
};

type TuseUserStore = {
  user: TUser | null;
  setUser: (user: TUser | null) => void;
};

export const useUserStore = create<TuseUserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
