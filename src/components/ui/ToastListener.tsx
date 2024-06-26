"use client";

import useToastStore from "@/stores/toastStore";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const ToastListener = () => {
  const { message, duration, isVisible, hideToast } = useToastStore();

  useEffect(() => {
    if (isVisible) {
      toast.success(message, {
        duration,
        style: {
          fontWeight: "bold",
        },
      });
      hideToast();
    }
  }, [isVisible, message, duration, hideToast]);

  return null;
};

export default ToastListener;
