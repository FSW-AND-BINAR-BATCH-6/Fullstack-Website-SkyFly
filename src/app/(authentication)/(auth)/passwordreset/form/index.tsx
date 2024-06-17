"use client";

import * as React from "react";
import toast from "react-hot-toast";
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
import { Box } from "@/components/ui/box";
import { EyeOffIcon, EyeIcon } from "lucide-react";

export default function FormReset() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [passwordVisibility, setPasswordVisibility] =
    React.useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    React.useState(false);
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
      return;
    }

    const requestData = { ...data, token };

    try {
      const promise = passwordReset(requestData);

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
              router.push("/login");
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[48%]">
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
                      {React.createElement(
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="confirmPassword">
                  Repeat New Password
                </FormLabel>
                <FormControl>
                  <Box className="relative">
                    <Input
                      id="confirmPassword"
                      {...field}
                      type={
                        confirmPasswordVisibility
                          ? "text"
                          : "password"
                      }
                      autoComplete="on"
                      placeholder="********"
                      className={`pr-12 ${
                        form.formState.errors.confirmPassword &&
                        "border-red-700"
                      }`}
                    />
                    <Box
                      className="absolute inset-y-0 right-0 flex cursor-pointer items-center p-3 text-muted-foreground"
                      onClick={() =>
                        setConfirmPasswordVisibility(
                          !confirmPasswordVisibility
                        )
                      }
                    >
                      {React.createElement(
                        confirmPasswordVisibility
                          ? EyeOffIcon
                          : EyeIcon,
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
