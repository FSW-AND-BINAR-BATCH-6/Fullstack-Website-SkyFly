import { Button } from "@/components/ui/button";
import { Labels } from "@/components/ui/labels";
import React, { FC, useCallback, useState } from "react";
import toast from "react-hot-toast";

interface ButtonResetProps {}

const ButtonReset: FC<ButtonResetProps> = ({}) => {
  const [loading, setLoading] = useState(false);

  const resetFilter = useCallback(async () => {
    setLoading(true);
    try {
      const url = new URL(window.location.href);
      const fromParam = url.searchParams.get("from");
      const toParam = url.searchParams.get("to");
      const totalPassengers = url.searchParams.get("totalPassengers");
      const seatClass = url.searchParams.get("seatClass");
      const params = new URLSearchParams();
      if (fromParam !== null) {
        params.append("from", fromParam);
      }
      if (toParam !== null) {
        params.append("to", toParam);
      }
      if (totalPassengers !== null) {
        params.append("totalPassengers", totalPassengers);
      }
      if (seatClass !== null) {
        params.append("seatClass", seatClass);
      }
      url.search = params.toString();
      window.history.replaceState({}, "", url.toString());

      window.location.reload();

      toast.success("Filters Reset Successfully");
    } catch (err) {
      console.error("Failed to reset filters", err);
      toast.error("Failed to reset filters");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <Button
      onClick={resetFilter}
      disabled={loading}
      className="w-full md:w-1/5 bg-greens rounded-xl p-6 flex items-center justify-center text-white"
    >
      <Labels className="font-bold">
        {loading ? "Loading..." : "Reset Filters"}
      </Labels>
    </Button>
  );
};

export default ButtonReset;
