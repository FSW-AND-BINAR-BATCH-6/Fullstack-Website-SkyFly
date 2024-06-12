"use client";

import * as React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema } from "./validation";
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
import { forgotPassword, loginUser } from "./actions";
import Link from "next/link";
import { Labels } from "@/components/ui/labels";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { ToastProvider } from "@/context/ToastContext";
import { UseAction } from "@/hooks/useAction";

export default function FormLogin() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isLoading: loginLoading, handleAction: handleLogin } =
    UseAction(() => loginUser(form.getValues()), {
      loadingMessage: "Logging in...",
      duration: 10000,
      onSuccess: (response: any) => {
        ["isLogin", "token"].forEach((key, i) =>
          setCookie(
            key,
            i === 0 ? response.status : response._token,
            {
              maxAge: 60 * 60 * 24, // expires in 1 day
            }
          )
        );
        router.push("/");
      },
    });

  const { handleAction: handleForgotPassword } = UseAction(
    () => forgotPassword({ email: form.getValues().email }),
    {
      loadingMessage: "Sending email...",
      duration: 10000,
    }
  );

  return (
    <div className="w-[48%]">
      <ToastProvider>
        <Form {...form}>
          <form
            id="login-form"
            name="login-form"
            onSubmit={form.handleSubmit(handleLogin)}
            className="space-y-6"
          >
            <h1 className="text-[1.5rem] font-bold">Login</h1>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jhondoe@gmail.com"
                      autoComplete="off"
                      {...field}
                      className={
                        form.formState.errors.email
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Labels
                    onClick={handleForgotPassword}
                    className="float-end text-blue-700 cursor-pointer"
                  >
                    Forgot Password?
                  </Labels>
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
            <Button
              type="submit"
              disabled={loginLoading}
              className="w-full disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loginLoading ? "Loading..." : "Submit"}
            </Button>
          </form>
        </Form>
      </ToastProvider>
      <div className="text-center mt-7">
        don`t have an account?{" "}
        <Link href="/register" className="text-blue-700 font-bold">
          Register here
        </Link>
      </div>
    </div>
  );
}
