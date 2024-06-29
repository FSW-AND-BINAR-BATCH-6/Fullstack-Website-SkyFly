"use client";

import { Button } from "@/components/ui/button";
import { Labels } from "@/components/ui/labels";
import React, { FC, useCallback, useState } from "react";
import { getFlightsReset } from "./actions";
import toast from "react-hot-toast";

interface ButtonResetProps {}

const ButtonReset: FC<ButtonResetProps> = ({}) => {
  const [loading, setLoading] = useState(false);

  const resetFilter = useCallback(async () => {
    setLoading(true);
    try {
      setLoading(true);
      const url = new URL(window.location.href);
      url.search = "";
      window.history.replaceState({}, "", url.toString());

      await getFlightsReset();
      window.location.reload();
      toast.success("Filters Reset Successfully");
      setLoading(false);
    } catch (err) {
      console.error("Failed to reset filters", err);
      setLoading(false);
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
