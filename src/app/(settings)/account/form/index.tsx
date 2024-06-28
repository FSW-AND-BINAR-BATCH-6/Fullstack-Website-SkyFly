"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Labels } from "@/components/ui/labels";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema } from "./validation";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";
import { getUserName } from "./actions";
import { getCookie } from "cookies-next";
import { PhoneInput } from "@/components/ui/phone-input";

export default function FormAccount() {
  const form = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      fullname: "",
      phoneNumber: "",
      email: "",
    },
  });

  useEffect(() => {
    const getName = async () => {
      try {
        const token = getCookie("token") as string | undefined;
        if (token) {
          const data = await getUserName(token);
          form.setValue("fullname", data.name);
          form.setValue("phoneNumber", data.phoneNumber);
          form.setValue("email", data.email);
        } else {
          console.error("Token not found");
        }
      } catch (err) {
        console.error("Error fetching user name:", err);
      }
    };

    getName();
  }, [form]);

  const onSubmit = async (data: z.infer<typeof accountSchema>) => {
    // console.log(data);
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
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="fullname">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      id="fullname"
                      type="text"
                      placeholder="Harry"
                      autoComplete="off"
                      {...field}
                      className={
                        form.formState.errors.fullname
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
            />
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
