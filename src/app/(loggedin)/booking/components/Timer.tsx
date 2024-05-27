"use client";

import { Labels } from "@/components/ui/labels";
import { useEffect, useState } from "react";

export default function Timer() {
  const [timer, setTimer] = useState(900); // Set to 900 seconds (15 minutes)

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timer]);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <Labels className="font-bold">
      Please Complete it in 00:
      {minutes < 10 ? `0${minutes}` : minutes}:
      {seconds < 10 ? `0${seconds}` : seconds} minutes
    </Labels>
  );
}
