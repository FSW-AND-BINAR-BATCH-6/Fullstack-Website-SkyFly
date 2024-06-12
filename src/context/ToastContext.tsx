"use client";

import { createContext, useContext, ReactNode } from "react";
import { Toaster, toast } from "react-hot-toast";

const ToastContext = createContext<{ toast: typeof toast }>({
  toast,
});

export const ToastProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <ToastContext.Provider value={{ toast }}>
      <Toaster position="top-right" reverseOrder={false} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
