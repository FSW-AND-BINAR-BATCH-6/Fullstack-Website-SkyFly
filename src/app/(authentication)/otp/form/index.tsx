"use client";

import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import "../../../globals.css";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
import Image from "next/image";
import { FormOtpSchema } from "./validation";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import { getCookie, setCookie } from "cookies-next";
import { ResendOtp, OtpData as sendOtpData } from "./actions";
import { Labels } from "@/components/ui/labels";

export default function FormOtp() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timer]);

  const form = useForm<z.infer<typeof FormOtpSchema>>({
    resolver: zodResolver(FormOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormOtpSchema>) => {
    setIsLoading(true);
    const token = getCookie("token");
    if (typeof token !== "string") {
      toast.error("Token is missing or invalid.");
      setIsLoading(false);
      return;
    }

    const requestData = { ...data, token };
    toast
      .promise(
        sendOtpData(requestData),
        {
          loading: "Verifying Otp...",
          success: (response) => {
            setCookie("isLogin", response.status, {
              maxAge: 60 * 60 * 24,
            });
            if (response.status) {
              router.push("/");
            }
            return <b>{response.message}</b>;
          },
          error: (error) => {
            console.error("Verifying Otp failed:", error);
            return (
              <b>
                {error.response?.data?.message ||
                  "Verifying Otp failed!"}
              </b>
            );
          },
        },
        {
          duration: 5000, // Set duration to 5 seconds
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleResendOtp = async () => {
    setTimer(60);
    setIsLoading(true);
    const token = getCookie("token");
    if (typeof token !== "string") {
      toast.error("Token is missing or invalid.");
      setIsLoading(false);
      return;
    }
    const requestData = { token };
    toast
      .promise(
        ResendOtp(requestData),
        {
          loading: "Resending Otp...",
          success: (response) => {
            if (response.status === false) {
              setCookie("isLogin", response._token, {
                maxAge: 60 * 60 * 24,
              });
            }
            return <b>{response.message}</b>;
          },
          error: (error) => {
            console.error("Resending Otp failed:", error);
            return (
              <b>
                {error.response?.data?.message ||
                  "Verifying Otp failed!"}
              </b>
            );
          },
        },
        {
          duration: 5000, // Set duration to 5 seconds
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section>
      <Toaster position="top-right" reverseOrder={false} />
      <nav className="border-b border-black/20 p-5">
        <div className="flex items-center justify-between">
          <Image
            src={"/assets/logo.svg"}
            alt="logo"
            width={100}
            height={100}
            priority={true}
            className="ml-14"
          />
        </div>
      </nav>

      <section className="mt-14">
        <div className="mx-auto w-[30rem]">
          <Link href="/register">
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

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {timer === 0 ? (
                <Labels
                  onClick={handleResendOtp}
                  className="mt-7 text-center font-bold flex flex-col cursor-pointer text-blue-700"
                >
                  Resend OTP
                </Labels>
              ) : (
                <p className="mt-7 text-center">
                  Resend OTP in {timer} seconds
                </p>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="mt-8 w-[20rem] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isLoading ? "Loading..." : "Verify"}
              </Button>
            </form>
          </Form>
        </section>
      </section>
    </section>
  );
}
