import * as React from "react";
import { useToast } from "@/context/ToastContext";

interface ActionOptions {
  loadingMessage: string;
  duration?: number;
  onSuccess?: any;
}

export const UseAction = (
  actionFunction: () => Promise<any>,
  options: ActionOptions
) => {
  const { loadingMessage, duration, onSuccess } = options;
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleAction = async () => {
    setIsLoading(true);

    toast
      .promise(
        actionFunction(),
        {
          loading: loadingMessage,
          success: (response) => {
            if (response.status) {
              if (onSuccess) {
                onSuccess(response);
              }
              console.log(response.message);
              return response.message;
            } else {
              throw new Error(response.message);
            }
          },
          error: (err) => err.message,
        },
        {
          success: {
            style: {
              fontWeight: "bold",
            },
            duration,
          },
          error: {
            style: {
              fontWeight: "bold",
            },
            duration, // Set duration to 10 seconds 10000
          },
        }
      )
      .finally(() => setIsLoading(false));
  };

  return { isLoading, handleAction };
};
