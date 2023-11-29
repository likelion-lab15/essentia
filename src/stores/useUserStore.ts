"use client";

import { create } from "zustand";

type TUser = {
  user: object;
  setUser: (userData: object) => void;
};

export const useUserStore = create<TUser>()((set) => ({
  user: {},
  setUser: (userData) => set(() => ({ user: userData })),
}));
