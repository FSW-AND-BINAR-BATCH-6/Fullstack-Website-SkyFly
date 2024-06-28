"use client";

import { useEffect, useState } from "react";
import { Labels } from "@/components/ui/labels";

export default function Timer() {
  const [timer, setTimer] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const savedTimer = window.localStorage.getItem("timer");
      return savedTimer ? Number(savedTimer) : 60;
    }
    return 60;
  });
  const [pathname, setPathname] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTimer = window.localStorage.getItem("timer");
      if (savedTimer && Number(savedTimer) <= 0) {
        setTimer(60);
        window.localStorage.setItem("timer", "60");
      }
    }
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer - 1;
          if (typeof window !== "undefined") {
            window.localStorage.setItem("timer", newTimer.toString());
          }
          return newTimer;
        });
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timer]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname);
    }
  }, []);

  if (pathname === null) {
    return null;
  }

  const bgColor = pathname.includes("/complete")
    ? "bg-green-700"
    : "bg-red-700";

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <section className="w-full px-4">
      <div
        className={`w-full max-w-md md:max-w-xl lg:max-w-2xl mx-auto ${bgColor} text-white flex items-center justify-center rounded-2xl mb-5 py-3 px-5`}
      >
        <Labels className="font-bold text-sm">
          {pathname.includes("/complete")
            ? "Thank you for the transaction payment"
            : `Please Complete it in 00:${
                minutes < 10 ? `0${minutes}` : minutes
              }:${seconds < 10 ? `0${seconds}` : seconds} minutes`}
        </Labels>
      </div>
    </section>
  );
}
