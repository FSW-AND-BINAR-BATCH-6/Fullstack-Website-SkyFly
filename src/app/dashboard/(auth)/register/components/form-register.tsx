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

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(10, { message: "Invalid phone number" })
    .max(12, { message: "Invalid phone number" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export default function FormRegister() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const handleSubmit = () => {};

  return (
    <main className="w-[48%]">
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
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Jhone Doe"
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="jhondoe@gmail.com"
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0875 7436 1473"
                    {...field}
                    className={
                      form.formState.errors.phone
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
                <FormLabel>Password</FormLabel>
                <FormLabel className="float-end">
                  <Link
                    href="/dashboard/passwordreset"
                    className="text-blue-700"
                  >
                    Forgot Password?
                  </Link>
                </FormLabel>
                <FormControl>
                  <Input
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
        already have an account?{" "}
        <Link
          href="/dashboard/login"
          className="text-blue-700 font-bold"
        >
          Login here
        </Link>
      </div>
    </main>
  );
}
