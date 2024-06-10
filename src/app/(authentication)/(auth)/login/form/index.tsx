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
import { loginUser } from "./actions";
import Link from "next/link";
import { Labels } from "@/components/ui/labels";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

export default function FormLogin() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await loginUser(data);
      setCookie("token", response._token, { maxAge: 60 * 60 * 24 }); // expires 1 day
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="w-[48%]">
      <Form {...form}>
        <form
          id="login-form"
          name="login-form"
          onSubmit={form.handleSubmit(handleSubmit)}
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
          <Button type="submit" className="w-full">
            Submit
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
