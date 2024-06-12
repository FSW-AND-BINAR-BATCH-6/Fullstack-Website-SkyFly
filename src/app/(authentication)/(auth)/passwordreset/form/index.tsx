"use client";

import * as React from "react";
import { toast, Toaster } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { newPasswordSchema } from "./validation";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { passwordReset } from "./actions";

export default function FormReset() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (
    data: z.infer<typeof newPasswordSchema>
  ) => {
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
        passwordReset(requestData),
        {
          loading: "Sending new password...",
          success: (response) => {
            return (
              <b>
                {response?.message || "Password Reset Successfully!"}
              </b>
            );
          },
          error: (error) => {
            console.error("Reset Password failed:", error);
            return (
              <b>
                {error.response?.data?.message ||
                  "Reset Password failed!"}
              </b>
            );
          },
        },
        {
          duration: 10000, // Set duration to 10 seconds
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="w-[48%]">
      <Toaster position="top-right" reverseOrder={false} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          <h1 className="text-[1.5rem] font-bold">Password Reset</h1>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">
                  Enter New Password
                </FormLabel>
                <FormControl>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    {...field}
                    className={
                      form.formState.errors.password
                        ? "border-red-700"
                        : ""
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="confirmPassword">
                  Repeat New Password
                </FormLabel>
                <FormControl>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="********"
                    {...field}
                    className={
                      form.formState.errors.confirmPassword
                        ? "border-red-700"
                        : ""
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Form>
      <div className="text-center mt-7">
        don`t have an account?{" "}
        <Link href="/register" className="text-blue-700 font-bold">
          Register here
        </Link>
      </div>
    </div>
  );
}
