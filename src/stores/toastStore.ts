import create from "zustand";

interface ToastState {
  message: string;
  duration: number;
  isVisible: boolean;
  showToast: (message: string, duration: number) => void;
  hideToast: () => void;
}

const useToastStore = create<ToastState>((set) => ({
  message: "",
  duration: 0,
  isVisible: false,
  showToast: (message: string, duration: number) =>
    set({ message, duration, isVisible: true }),
  hideToast: () => set({ isVisible: false }),
}));

export default useToastStore;
