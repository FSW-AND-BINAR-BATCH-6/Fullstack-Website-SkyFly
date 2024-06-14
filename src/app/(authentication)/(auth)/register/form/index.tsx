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
import Link from "next/link";
import { Labels } from "@/components/ui/labels";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { registerUser } from "./actions";
import { toast, Toaster } from "react-hot-toast";

export default function FormRegister() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    toast
      .promise(
        registerUser(data),
        {
          loading: "Sending Otp...",
          success: (response) => {
            setCookie("token", response._token, {
              maxAge: 60 * 60 * 24,
            });
            router.push("/otp");
            return <b>{response.message}</b>;
          },
          error: (error) => {
            console.error("Register failed:", error);
            return (
              <b>
                {error.response?.data?.message || "Register failed!"}
              </b>
            );
          },
        },
        {
          duration: 10000,
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
          className="space-y-1"
        >
          <h1 className="text-[1.5rem] font-bold">Register</h1>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormControl>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Jhone Doe"
                    autoComplete="off"
                    {...field}
                    className={
                      form.formState.errors.name
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
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="phoneNumber">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input
                    id="phoneNumber"
                    type="number"
                    placeholder="0875 7436 1473"
                    autoComplete="off"
                    {...field}
                    className={
                      form.formState.errors.phoneNumber
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
                <Labels className="float-end">
                  <Link
                    href="/passwordreset"
                    className="text-blue-700"
                  >
                    Forgot Password?
                  </Link>
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
            disabled={isLoading}
            className="w-full disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Form>
      <div className="text-center mt-7">
        already have an account?{" "}
        <Link href="/login" className="text-blue-700 font-bold">
          Login here
        </Link>
      </div>
    </div>
  );
}
