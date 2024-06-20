import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Labels } from "@/components/ui/labels";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { PhoneInput } from "@/components/ui/phone-input";
import { getCookie } from "cookies-next";
import { getUserName } from "@/app/(settings)/account/form/actions";

const BookingDetails = () => {
  const [showFamilyName, setShowFamilyName] = useState(false);

  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  // useEffect(() => {
  //   const getName = async () => {
  //     try {
  //       const token = getCookie("token") as string | undefined;
  //       if (token) {
  //         const data = await getUserName(token);
  //         setValue("bookingDetails.fullName", data.name);
  //         setValue("bookingDetails.phoneNumber", data.phoneNumber);
  //         setValue("bookingDetails.email", data.email);
  //       } else {
  //         console.error("Token not found");
  //       }
  //     } catch (err) {
  //       console.error("Error fetching user name:", err);
  //     }
  //   };

  //   getName();
  // }, [setValue]);

  return (
    <>
      <div>
        <FormLabel className="font-bold">Booking Details</FormLabel>
      </div>

      <div className="bg-black rounded-t-xl mt-3 text-white p-3">
        <Labels className="font-bold">Customer`s Details</Labels>
      </div>

      <div className="px-5 py-3">
        <FormField
          control={control}
          name="bookingDetails.fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold" htmlFor="fullName">
                Full Name
              </FormLabel>
              <FormControl>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage></FormMessage>
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
            control={control}
            name="bookingDetails.familyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold" htmlFor="familyName">
                  Family Name
                </FormLabel>
                <FormControl>
                  <Input
                    id="familyName"
                    type="text"
                    placeholder="Harry"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={control}
          name="bookingDetails.phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold" htmlFor="phoneNumber">
                Phone Number
              </FormLabel>
              <FormControl>
                <PhoneInput
                  id="phoneNumber"
                  autoComplete="off"
                  placeholder="875 7436 1473"
                  {...field}
                />
              </FormControl>
              <FormMessage style={{ marginTop: "1px" }} />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="bookingDetails.email"
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
                />
              </FormControl>
              <FormMessage style={{ marginTop: "1px" }} />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default BookingDetails;
