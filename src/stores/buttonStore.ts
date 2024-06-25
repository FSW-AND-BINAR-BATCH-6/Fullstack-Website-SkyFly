import { create } from "zustand";

interface StoreState {
  showButton: boolean;
  setShowButton: (value: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  showButton: false,
  setShowButton: (value) => set({ showButton: value }),
}));
