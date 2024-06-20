import * as React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Labels } from "@/components/ui/labels";

const PassengersDetails = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div>
        <FormLabel className="font-bold">
          Passenger`s Details
        </FormLabel>
      </div>

      <div className="bg-black rounded-t-xl mt-3 text-white p-3">
        <Labels className="font-bold">
          Passenger`s Details 1 - Adult
        </Labels>
      </div>

      <div className="px-5 py-3">
        <FormField
          control={control}
          name="passengerDetails.title"
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
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="passengerDetails.fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold" htmlFor="fullName">
                Full Name
              </FormLabel>
              <FormControl>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter full name"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="passengerDetails.familyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold" htmlFor="familyName">
                Family Name
              </FormLabel>
              <FormControl>
                <Input
                  id="familyName"
                  type="text"
                  placeholder="Enter family name"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="passengerDetails.dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold" htmlFor="dateOfBirth">
                Date of Birth
              </FormLabel>
              <FormControl>
                <Input
                  id="dateOfBirth"
                  type="date"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="passengerDetails.citizenship"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold" htmlFor="citizenship">
                Citizenship
              </FormLabel>
              <FormControl>
                <Input
                  id="citizenship"
                  type="text"
                  placeholder="Enter citizenship"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="passengerDetails.passport"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold" htmlFor="passport">
                ID card / Passport
              </FormLabel>
              <FormControl>
                <Input
                  id="passport"
                  type="text"
                  placeholder="Enter passport"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="passengerDetails.country"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold" htmlFor="country">
                Country of Publication
              </FormLabel>
              <FormControl>
                <Input
                  id="country"
                  type="text"
                  placeholder="Enter country"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="passengerDetails.invalid"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold" htmlFor="invalid">
                Valid Until
              </FormLabel>
              <FormControl>
                <Input
                  id="invalid"
                  type="date"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default PassengersDetails;
