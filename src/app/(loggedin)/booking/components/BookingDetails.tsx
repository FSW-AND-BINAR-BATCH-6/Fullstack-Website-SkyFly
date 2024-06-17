"use client";

import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Labels } from "@/components/ui/labels";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { Switch } from "@/components/ui/switch";
import { accountSchema } from "@/app/(settings)/account/form/validation";
import { getUserName } from "@/app/(settings)/account/form/actions";
import { PhoneInput } from "@/components/ui/phone-input";

export default function BookingDetails() {
  const [showFamilyName, setShowFamilyName] = useState(false);
  const form = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      fullname: "",
      familyName: "",
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
    console.log(data);
  };

  return (
    <>
      <div>
        <Labels className="font-bold">Booking Details</Labels>
      </div>

      <div className="bg-black rounded-t-xl mt-3 text-white p-3">
        <Labels className="font-bold">Customer`s Details</Labels>
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
                  <FormLabel className="font-bold" htmlFor="fullname">
                    Full Name
                  </FormLabel>
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
            <div className="py-3">
              <div className="flex flex-row">
                <div>
                  <Labels>Have a Family Name?</Labels>
                </div>
                <div className="ml-auto">
                  <Switch
                    onClick={() => setShowFamilyName(!showFamilyName)}
                  />
                </div>
              </div>
            </div>
            {showFamilyName && (
              <FormField
                control={form.control}
                name="familyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="font-bold"
                      htmlFor="familyName"
                    >
                      Family Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="familyName"
                        type="text"
                        placeholder="Harry"
                        autoComplete="off"
                        {...field}
                        className={
                          form.formState.errors.familyName
                            ? "border-red-700"
                            : ""
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className="font-bold"
                    htmlFor="phoneNumber"
                  >
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
                  <FormLabel className="font-bold" htmlFor="email">
                    Email
                  </FormLabel>
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
                  <FormMessage style={{ marginTop: "1px" }} />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </>
  );
}
