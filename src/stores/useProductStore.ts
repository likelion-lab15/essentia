import { create } from "zustand";

type TProduct = {
  name: string;
  price: number;
  brand: string;
  amount: number;
  content: string;
  image: string;
  selectedAmount?: string;
};

type TProductStore = {
  product: TProduct;
  setProduct: (product: TProduct) => void;
};

export const useProductStore = create<TProductStore>((set) => ({
  product: {
    name: "",
    price: 0,
    brand: "",
    amount: 0,
    content: "",
    image: "",
    selectedAmount: "",
  },
  setProduct: (product) => set({ product }),
}));
