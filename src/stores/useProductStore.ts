import { create } from "zustand";

type TProduct = {
  name: string;
  price: number;
  brand: string;
  amount: [];
  content: string;
  image: string;
  selectedAmount?: string;
};

type TProductStore = {
  product: TProduct;
  // eslint-disable-next-line no-unused-vars
  setProduct: (product: TProduct) => void;
};

export const useProductStore = create<TProductStore>((set) => ({
  product: {
    name: "",
    price: 0,
    brand: "",
    amount: [],
    content: "",
    image: "",
    selectedAmount: "",
  },
  setProduct: (product) => set({ product }),
}));
