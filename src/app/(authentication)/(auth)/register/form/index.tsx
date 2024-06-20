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
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { registerUser } from "./actions";
import toast from "react-hot-toast";
import { PhoneInput } from "@/components/ui/phone-input";
import { Box } from "@/components/ui/box";
import { EyeOffIcon, EyeIcon } from "lucide-react";
import useToastStore from "@/stores/toastStore";

export default function FormRegister() {
  const router = useRouter();
  const showToast = useToastStore((state) => state.showToast);
  const [passwordVisibility, setPasswordVisibility] =
    React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
  });

  const handleRegister = async (data: z.infer<typeof formSchema>) => {
    toast.loading("Registering...");

    try {
      const response = await registerUser(data);
      if (response.status) {
        setCookie("token", response._token, {
          maxAge: 60 * 60 * 24,
        });
        setCookie("phoneNumber", data.phoneNumber, {
          maxAge: 60 * 60,
        });
        toast.dismiss();
        toast.success(response.message, {
          style: {
            fontWeight: "bold",
          },
        });
        router.push("/otp");
      } else {
        toast.dismiss();
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

  return (
    <div className="w-[90%] sm:w-[48%]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleRegister)}
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
                  <PhoneInput
                    id="phoneNumber"
                    autoComplete="off"
                    defaultCountry="ID"
                    placeholder="875 7436 1473"
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
                      style={{ marginBottom: "1rem" }}
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
                <FormMessage style={{ marginTop: "-1rem" }} />
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
      <div className="text-center mt-7">
        already have an account?{" "}
        <Link href="/login" className="text-blue-700 font-bold">
          Login here
        </Link>
      </div>
    </div>
  );
}
