"use client";

import { z } from "zod";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Labels } from "@/components/ui/labels";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { passengersSchema } from "./validation";

export default function PassengersDetails() {
  const [user, setUser] = useState<any>([1, 2, 3]);

  const [showFamilyName, setShowFamilyName] = useState(false);
  const form = useForm<z.infer<typeof passengersSchema>>({
    resolver: zodResolver(passengersSchema),
    defaultValues: {
      title: "",
      fullname: "",
      familyName: "",
      dateOfBirth: "",
      citizenship: "",
      passport: "",
      country: "",
      invalid: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof passengersSchema>) => {
    console.log(data);
  };

  return (
    <>
      <div>
        <Labels className="font-bold">Passenger`s Details</Labels>
      </div>

      <div className="bg-black rounded-t-xl mt-3 text-white p-3">
        <Labels className="font-bold">
          Passenger`s Details 1 - Adult
        </Labels>
      </div>

      <div className="px-5 py-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-1"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold" htmlFor="title">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="my-1">
                        <SelectValue placeholder="Select a title" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Title</SelectLabel>
                          <SelectItem value="mr">Mr</SelectItem>
                          <SelectItem value="mrs">Mrs</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage style={{ marginTop: "1px" }} />
                </FormItem>
              )}
            />
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
                  <FormMessage />
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
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className="font-bold"
                    htmlFor="dateOfBirth"
                  >
                    Date of Birth
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      placeholder="Harry"
                      autoComplete="off"
                      {...field}
                      className={
                        form.formState.errors.dateOfBirth
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
              name="citizenship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className="font-bold"
                    htmlFor="citizenship"
                  >
                    Citizenship
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="citizenship"
                      type="text"
                      placeholder="Indonesia"
                      autoComplete="off"
                      {...field}
                      className={
                        form.formState.errors.citizenship
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
              name="passport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold" htmlFor="passport">
                    ID card / Passport
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="passport"
                      type="text"
                      placeholder="07415395347"
                      autoComplete="off"
                      {...field}
                      className={
                        form.formState.errors.passport
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
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold" htmlFor="country">
                    Country of Publication
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="country"
                      type="text"
                      placeholder="Indonesia"
                      autoComplete="off"
                      {...field}
                      className={
                        form.formState.errors.country
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
              name="invalid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold" htmlFor="invalid">
                    Valid Until
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="invalid"
                      type="date"
                      placeholder="17/08/24"
                      autoComplete="off"
                      {...field}
                      className={
                        form.formState.errors.invalid
                          ? "border-red-700"
                          : ""
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </>
  );
}
