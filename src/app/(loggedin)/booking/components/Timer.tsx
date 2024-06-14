"use client";

import { useEffect, useState } from "react";
import { Labels } from "@/components/ui/labels";

export default function Timer() {
  const [timer, setTimer] = useState(900); // Set to 900 seconds (15 minutes)
  const [pathname, setPathname] = useState<string | null>(null); // Initialize as string | null

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timer]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if window is available
      setPathname(window.location.pathname); // Set pathname from window.location
    }
  }, []);

  if (pathname === null) {
    // Render null or a placeholder while pathname is not set
    return null;
  }

  const bgColor = pathname.includes("/complete")
    ? "bg-green-700"
    : "bg-reds";

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <section>
      <div
        className={`w-4/5 mx-auto ${bgColor} text-white flex items-center justify-center rounded-2xl mb-5 py-4 px-5`}
      >
        <Labels className="font-bold">
          {pathname.includes("/complete")
            ? "Thank you for the transaction payment"
            : `Please Complete it in 00: ${
                minutes < 10 ? `0${minutes}` : minutes
              }:${seconds < 10 ? `0${seconds}` : seconds} minutes`}
        </Labels>
      </div>
    </section>
  );
}
