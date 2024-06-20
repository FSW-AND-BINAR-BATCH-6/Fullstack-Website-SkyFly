"use client";

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
import toast from "react-hot-toast";
import { getCookie, setCookie } from "cookies-next";
import { Labels } from "@/components/ui/labels";
import {
  getUserEmail,
  OtpData,
  OtpWithSms,
  ResendOtp,
} from "./actions";
import { deleteCookie } from "@/hooks/deleteCookie";
import useToastStore from "@/stores/toastStore";

export default function FormOtp() {
  const router = useRouter();
  const showToast = useToastStore((state) => state.showToast);
  const [emailUser, setEmailUser] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    const getName = async () => {
      try {
        const token = getCookie("token") as string | undefined;
        if (token) {
          const data = await getUserEmail(token);
          setEmailUser(data.email);
        } else {
          console.error("Token not found");
        }
        const phone = getCookie("phoneNumber") as string | undefined;
        if (phone) {
          setPhoneNumber(phone);
        }
      } catch (err) {
        console.error("Error fetching user name:", err);
      }
    };

    getName();
  }, []);

  const handleSubmit = async (
    data: z.infer<typeof FormOtpSchema>
  ) => {
    toast.loading("Sending Otp...");
    const token = getCookie("token");
    if (typeof token !== "string") {
      toast.error("Token is missing or invalid.", {
        style: {
          fontWeight: "bold",
        },
      });
      return;
    }

    const requestData = { ...data, token };

    try {
      const response = await OtpData(requestData);
      if (response.status) {
        toast.dismiss();
        toast.success(response.message, {
          style: {
            fontWeight: "bold",
          },
        });
        deleteCookie("phoneNumber");
        router.push("/login");
      } else {
        toast.error(response.message, {
          style: {
            fontWeight: "bold",
          },
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleResendOtp = async () => {
    const token = getCookie("token");
    if (typeof token !== "string") {
      toast.error("Token is missing or invalid.", {
        style: {
          fontWeight: "bold",
        },
      });
      return;
    }

    const requestData = { token };

    try {
      const response = await ResendOtp(requestData);
      if (response.status) {
        setCookie("token", response._token);
        setTimer(60);
        toast.success(response.message, {
          style: {
            fontWeight: "bold",
          },
        });
      } else {
        toast.error(response.message, {
          style: {
            fontWeight: "bold",
          },
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleResendOtpWithSms = async () => {
    setLoading(true);
    const token = getCookie("token");
    if (typeof token !== "string") {
      toast.error("Token is missing or invalid.", {
        style: {
          fontWeight: "bold",
        },
      });
      setLoading(false);
      return;
    }

    const requestData = { phoneNumber, token };

    try {
      const response = await OtpWithSms(requestData);
      if (response.status) {
        toast.success(response.message, {
          style: {
            fontWeight: "bold",
          },
        });
      } else {
        toast.error(response.message, {
          style: {
            fontWeight: "bold",
          },
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <nav className="border-b border-black/20 p-5">
        <div className="flex items-center justify-between">
          <Image
            src={"/assets/logo.svg"}
            alt="logo"
            width={100}
            height={100}
            priority={true}
            className="md:ml-14"
          />
        </div>
      </nav>

      <section className="mt-14 overflow-hidden px-5">
        <div className="mx-auto md:w-[30rem]">
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
              Type in the 6-digit code sent to{" "}
              <span className="font-bold">
                {emailUser.length === 0 ? "Loading......" : emailUser}
              </span>
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="flex justify-center">
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
                disabled={form.formState.isSubmitting}
                className="mt-8 w-[20rem] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {form.formState.isSubmitting
                  ? "Loading..."
                  : "Submit"}
              </Button>
            </form>
          </Form>
          <Button
            onClick={handleResendOtpWithSms}
            disabled={loading}
            className="mt-3 w-[20rem] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Resend OTP with SMS"}
          </Button>
        </section>
      </section>
    </section>
  );
}
