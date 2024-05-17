"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";

export default function OtpPage() {
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timer]);

  return (
    <section>
      <nav className="border-b border-black/20 p-5">
        <div className="flex items-center justify-between">
          <span className="font-bold text-primary">Dashboard</span>
        </div>
      </nav>

      <section className="mt-14">
        <div className="mx-auto w-[30rem]">
          <Link href="/dashboard/register">
            <Button size="sm" className="pe-4">
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back
            </Button>
          </Link>
        </div>

        <section className="flex flex-col items-center justify-between">
          <div className="mt-6 mb-7">
            <h1 className="font-bold text-2xl mb-2">
              Input OTP Code
            </h1>
            <p className="text-gray text-sm">
              Type in the 6-digit code sent to J*****@gmail.com
            </p>
          </div>

          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          <p className="mt-7">Resend OTP in {timer} seconds</p>

          <Button className="mt-8 w-[20rem]" disabled={timer === 0}>
            Verify
          </Button>
        </section>
      </section>
    </section>
  );
}
