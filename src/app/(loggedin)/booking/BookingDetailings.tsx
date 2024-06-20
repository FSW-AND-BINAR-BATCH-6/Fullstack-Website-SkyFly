"use client";

import { useEffect, useState } from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
} from "react-hook-form";
import { getCookie } from "cookies-next";
import { Button } from "@/components/ui/button";
import BookingDetails from "./components/BookingDetails";
import PassengersDetails from "./components/passengersDetails/PassengersDetails";
import SeatSelector from "./components/SeatSelector";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Labels } from "@/components/ui/labels";
import FlightBooking from "./components/FlightBooking";
import { bookingUser } from "./actionsBooking";
import toast from "react-hot-toast";

const formSchema = z.object({
  bookingDetails: z.object({
    fullName: z.string().nonempty(),
    familyName: z.string().optional(),
    phoneNumber: z.string().nonempty(),
    email: z.string().nonempty(),
  }),
  passengerDetails: z.object({
    title: z.string().nonempty(),
    fullName: z.string().nonempty(),
    familyName: z.string().optional(),
    dateOfBirth: z.string().nonempty(),
    citizenship: z.string().nonempty(),
    passport: z.string().nonempty(),
    country: z.string().nonempty(),
    invalid: z.string().nonempty(),
  }),
  selectedSeats: z.array(z.string()),
});

type FormValues = z.infer<typeof formSchema>;

export default function BookingDetailings() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookingDetails: {
        fullName: "",
        familyName: "",
        phoneNumber: "",
        email: "",
      },
      passengerDetails: {
        title: "",
        fullName: "",
        familyName: "",
        dateOfBirth: "",
        citizenship: "",
        passport: "",
        country: "",
        invalid: "",
      },
      selectedSeats: [],
    },
  });

  const [flightId, setFlightId] = useState<string | null>(null);

  useEffect(() => {
    const bookingDetails = getCookie("bookingDetails");
    setFlightId(
      bookingDetails !== undefined ? (bookingDetails as string) : null
    );
  }, []);

  const onSubmit: SubmitHandler<FormValues> = async (
    data: FormValues
  ) => {
    try {
      const bookingDetails = getCookie("bookingDetails");
      if (typeof bookingDetails !== "string") {
        toast.error("Booking details are missing or invalid.");
        return;
      }

      const token = getCookie("token");
      if (typeof token !== "string") {
        toast.error("Token is missing or invalid.");
        return;
      }

      const requestData: any = {
        ...data,
        bookingDetails,
        token,
      };

      const response = await bookingUser(requestData);
      if (response.status) {
        toast.success("Booking successful!");
      } else {
        toast.error(response.message);
        console.error(response.message);
      }
    } catch (err) {
      toast.error("An error occurred during booking.");
      console.error(err);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="w-full lg:w-4/5 mx-auto mt-3 pb-20">
          <div className="flex flex-col lg:flex-row items-start lg:flex-nowrap">
            <div className="w-full lg:w-3/5 p-3 mb-5 lg:mb-0">
              <div className="flex flex-col">
                <div className="flex flex-col p-5 rounded-sm shadow-xl border border-black/20 mb-5">
                  <BookingDetails />
                </div>
                <div className="flex flex-col p-5 rounded-sm shadow-xl border border-black/20 mb-5">
                  <PassengersDetails />
                </div>
                <div className="flex flex-col p-5 rounded-sm shadow-xl border border-black/20 mb-5">
                  <div>
                    <Labels className="font-bold">
                      Choose a Seat
                    </Labels>
                  </div>
                  <div className="bg-green-700 flex justify-center items-center rounded-sm mt-3 text-white p-3">
                    <Labels className="font-bold">
                      Economy - 64 Seats Available
                    </Labels>
                  </div>
                  <SeatSelector
                    selectedSeats={methods.watch("selectedSeats")}
                    handleSeatChange={(seatId) => {
                      const selectedSeats =
                        methods.getValues("selectedSeats");
                      methods.setValue(
                        "selectedSeats",
                        selectedSeats.includes(seatId)
                          ? selectedSeats.filter(
                              (id) => id !== seatId
                            )
                          : [...selectedSeats, seatId]
                      );
                    }}
                  />
                </div>
                <Button type="submit" className="mt-5 w-full">
                  Save Changes
                </Button>
              </div>
            </div>
            <FlightBooking flightId={flightId} />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
