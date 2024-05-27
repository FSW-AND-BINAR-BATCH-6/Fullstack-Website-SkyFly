"use client";

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

const formSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    repeatPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
  });

export default function FormReset() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      repeatPassword: "",
    },
  });

  const handleSubmit = () => {};

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
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="newPassword">
                  Enter New Password
                </FormLabel>
                <FormControl>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="********"
                    {...field}
                    className={
                      form.formState.errors.newPassword
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
            name="repeatPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="repeatPassword">
                  Repeat New Password
                </FormLabel>
                <FormControl>
                  <Input
                    id="repeatPassword"
                    type="password"
                    placeholder="********"
                    {...field}
                    className={
                      form.formState.errors.repeatPassword
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
        don't have an account?{" "}
        <Link href="/register" className="text-blue-700 font-bold">
          Register here
        </Link>
      </div>
    </div>
  );
}
