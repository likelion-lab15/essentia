/* eslint-disable no-unused-vars */

import { create } from "zustand";

type TReview = {
  order_id: number;
  product_id: number;
  name: string;
  brand: string;
  image: {
    path: string;
    name: string;
    originalname: string;
  };
};

type TuseReviewStore = {
  review: TReview | null;
  setReview: (reviewData: TReview | null) => void;
};

export const useReviewStore = create<TuseReviewStore>()((set) => ({
  review: null,
  setReview: (reviewData) => set({ review: reviewData }),
}));
