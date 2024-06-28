import { create } from "zustand";

interface StorePriceState {
  totalPrice: number;
  setTotalPrice: (price: number) => void;
}

export const usePriceStore = create<StorePriceState>((set) => ({
  totalPrice: 0,
  setTotalPrice: (price) => set({ totalPrice: price }),
}));
