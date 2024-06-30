"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Labels } from "@/components/ui/labels";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema, passwordSchema } from "./validation";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createElement, useEffect, useState } from "react";
import { getUserName, passwordReset } from "./actions";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Box } from "@/components/ui/box";

export default function ResetPassword({
  isEdit,
}: {
  isEdit: boolean;
}) {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(false);
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const getName = async () => {
      try {
        const token = getCookie("token") as string | undefined;
        if (token) {
          const data = await getUserName(token);
          form.setValue("password", data.password);
          form.setValue("confirmPassword", data.confirmPassword);
        } else {
          console.error("Token not found");
        }
      } catch (err) {
        console.error("Error fetching user name:", err);
      }
    };

    getName();
  }, [form]);

  const onSubmit = async (data: z.infer<typeof passwordSchema>) => {
    // console.log(data);
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
      const response = await passwordReset(requestData);
      // console.log(response);
      if (response.status) {
        toast.success("Password updated successfully.", {
          style: {
            fontWeight: "bold",
          },
        });
      } else {
        toast.error("Password update failed.", {
          style: {
            fontWeight: "bold",
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col">
      <div>
        <Labels className="font-bold">Edit Profile Data</Labels>
      </div>
      <div className="bg-black rounded-t-xl mt-3 text-white p-3">
        <Labels className="font-bold">Personal Data</Labels>
      </div>
      <div className="px-5 py-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-1"
          >
            {/* <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="text"
                      placeholder="Harry"
                      autoComplete="off"
                      disabled={!isEdit}
                      {...field}
                      className={
                        form.formState.errors.password
                          ? "border-red-700"
                          : ""
                      }
                    />
                  </FormControl>
                  <FormMessage style={{ marginTop: "1px" }} />
                </FormItem>
              )}
            /> */}
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
                        type={
                          passwordVisibility ? "text" : "password"
                        }
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
                        style={{ marginBottom: "7px" }}
                      />
                      <Box
                        className="absolute inset-y-0 right-0 flex cursor-pointer items-center p-3 text-muted-foreground"
                        onClick={() =>
                          setConfirmPasswordVisibility(
                            !confirmPasswordVisibility
                          )
                        }
                      >
                        {createElement(
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
                  <FormMessage
                    style={{ marginBottom: "7px", marginTop: "1px" }}
                  />
                </FormItem>
              )}
            />
            {/* <FormField
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
                      placeholder="875 7436 1473"
                      disabled={!isEdit}
                      {...field}
                      className={
                        form.formState.errors.phoneNumber
                          ? "border-red-700"
                          : ""
                      }
                    />
                  </FormControl>
                  <FormMessage style={{ marginTop: "1px" }} />
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
                      disabled={!isEdit}
                      readOnly
                      {...field}
                      className={
                        form.formState.errors.email
                          ? "border-red-700"
                          : ""
                      }
                      style={{ marginBottom: "7px" }}
                    />
                  </FormControl>
                  <FormMessage
                    style={{ marginBottom: "7px", marginTop: "1px" }}
                  />
                </FormItem>
              )}
            /> */}
            {isEdit && (
              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
