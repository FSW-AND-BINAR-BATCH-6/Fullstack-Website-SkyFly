import { Button } from "@/components/ui/button";
import { Labels } from "@/components/ui/labels";
import React, { FC, useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ButtonResetProps {}

const ButtonReset: FC<ButtonResetProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const resetSort = useCallback(async () => {
    setLoading(true);
    try {
      const url = new URL(window.location.href);
      const fromParam = url.searchParams.get("from");
      const toParam = url.searchParams.get("to");
      const totalPassengers = url.searchParams.get("totalPassengers");
      const seatClass = url.searchParams.get("seatClass");
      const departureDate = url.searchParams.get("departureDate");

      url.searchParams.delete("sort");

      const params: Record<string, string | null> = {
        from: fromParam,
        to: toParam,
        totalPassengers,
        seatClass,
        departureDate,
      };

      const query = new URLSearchParams(
        Object.entries(params).filter(([, value]) => value !== null) as [string, string][]
      );

      router.push(`${url.pathname}?${query.toString()}`);

      toast.success("Sort filter removed successfully");
    } catch (err) {
      console.error("Failed to remove sort filter", err);
      toast.error("Failed to remove sort filter");
    } finally {
      setLoading(false);
    }
  }, [router]);

  return (
    <Button
      onClick={resetSort}
      disabled={loading}
      className="w-full md:w-1/5 bg-greens rounded-xl p-6 flex items-center justify-center text-white"
    >
      <Labels className="font-bold">
        {loading ? "Loading..." : "Reset Sort Filter"}
      </Labels>
    </Button>
  );
};

export default ButtonReset;
