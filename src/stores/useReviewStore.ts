import { create } from "zustand";

export const useReviewStore = create()((set) => ({
  review: null,
  setReview: (reviewData) => set(() => ({ review: reviewData })),
}));
