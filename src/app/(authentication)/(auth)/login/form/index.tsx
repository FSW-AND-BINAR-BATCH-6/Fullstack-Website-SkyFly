"use client";

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
import toast from "react-hot-toast";
import Image from "next/image";
import { Box } from "@/components/ui/box";
import { EyeOffIcon, EyeIcon } from "lucide-react";
import { createElement, useState } from "react";

export default function FormLogin() {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: z.infer<typeof formSchema>) => {
    try {
      const promise = loginUser(data);

      await toast.promise(
        promise.then((response) => {
          if (!response.status) {
            throw new Error(response.message);
          }
          return response;
        }),
        {
          loading: "Logging in...",
          success: (response) => {
            if (response.status) {
              setCookie("token", response._token, {
                maxAge: 60 * 60 * 24,
              });
              setCookie(
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
                "eyJpZCI6ImNseGVsd3lpMDAwMHVod2ljZWRocGluZ3MiLCJuYW1lIjoiRmFyaXMiL",
                {
                  maxAge: 60 * 60 * 24,
                }
              );
              router.push("/");
            }
            return response.message;
          },
          error: (err) => err.message,
        },
        {
          success: {
            style: {
              fontWeight: "bold",
            },
          },
          error: {
            style: {
              fontWeight: "bold",
            },
          },
        }
      );

      const response = await promise;
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const handleForgotPassword = async () => {
    try {
      const email = form.getValues("email");
      if (!email) {
        toast.error("Please enter your email to reset password.", {
          style: {
            fontWeight: "bold",
          },
        });
        return;
      }

      const promise = forgotPassword({ email });

      await toast.promise(
        promise.then((response) => {
          if (!response.status) {
            throw new Error(response.message);
          }
          return response;
        }),
        {
          loading: "Sending email...",
          success: (response) => {
            if (response.status) {
              setCookie("token", response._token, {
                maxAge: 60 * 60 * 24,
              });
              router.push("/passwordreset");
            }
            return response.message;
          },
          error: (err) => err.message,
        },
        {
          success: {
            style: {
              fontWeight: "bold",
            },
          },
          error: {
            style: {
              fontWeight: "bold",
            },
          },
        }
      );

      const response = await promise;
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLoginWithGoogle = () => {
    router.push(
      "https://backend-skyfly-c1.vercel.app/api/v1/auth/google"
    );
  };

  return (
    <div className="w-[90%] sm:w-[48%]">
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
                  className="float-right text-blue-700 cursor-pointer"
                >
                  Forgot Password?
                </Labels>
                <FormControl>
                  <Box className="relative">
                    <Input
                      id="password"
                      {...field}
                      type={passwordVisibility ? "text" : "password"}
                      autoComplete="on"
                      placeholder="********"
                      className={`pr-12 ${
                        form.formState.errors.password &&
                        "border-red-700"
                      }`}
                    />
                    <Box
                      className="absolute inset-y-0 right-0 flex cursor-pointer items-center p-3 text-muted-foreground"
                      onClick={() =>
                        setPasswordVisibility(!passwordVisibility)
                      }
                    >
                      {createElement(
                        passwordVisibility ? EyeOffIcon : EyeIcon,
                        {
                          className: "h-6 w-6",
                        }
                      )}
                    </Box>
                  </Box>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {form.formState.isSubmitting ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Form>
      <Button
        onClick={handleLoginWithGoogle}
        className="flex items-center justify-center mt-4 mx-auto px-4 py-2 bg-white border border-gray-300 rounded shadow hover:shadow-md text-gray-700 text-lg"
      >
        <Image
          className="w-10 h-10 mr-2"
          width={100}
          height={100}
          src="/assets/google-logo.png"
          alt="Google Logo"
        />
        Login with Google
      </Button>
      <div className="text-center mt-5">
        don`t have an account?{" "}
        <Link href="/register" className="text-blue-700 font-bold">
          Register here
        </Link>
      </div>
    </div>
  );
}
