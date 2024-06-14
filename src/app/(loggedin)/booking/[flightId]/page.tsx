"use client";

import * as React from "react";
import { Labels } from "@/components/ui/labels";
import { Button } from "@/components/ui/button";
import BookingDetails from "../components/BookingDetails";
import PassengersDetails from "../components/passengersDetails/PassengersDetails";
import FlightBooking from "../components/FlightBooking";
import Link from "next/link";
import { SeatSelector } from "../components/SeatSelector";
import { generateSeats } from "../components/generateSeats";

export default function BookingDetailings({
  params,
}: {
  params: { flightId: string };
}) {
  const [selectedSeats, setSelectedSeats] = React.useState<number[]>(
    []
  );

  const handleSeatChange = (seatId: number) => {
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatId)
        ? prevSelectedSeats.filter((id) => id !== seatId)
        : [...prevSelectedSeats, seatId]
    );
  };

  const seats = React.useMemo(() => generateSeats(), []);

  return (
    <div className="w-4/5 mx-auto mt-3 pb-20">
      <div className="flex flex-row items-start flex-nowrap">
        <div className="grow-0 w-3/5 p-3 borders border-black">
          <div className="flex flex-col">
            <div className="flex flex-col p-5 rounded-sm shadow-xl border border-black/20">
              <BookingDetails />
            </div>
            <div className="flex flex-col p-5 mt-5 rounded-sm shadow-xl border border-black/20">
              <PassengersDetails />
            </div>
            <div className="flex flex-col p-5 mt-5 rounded-sm shadow-xl border border-black/20">
              <div>
                <Labels className="font-bold">Choose a Seat</Labels>
              </div>
              <div className="bg-green-700 flex justify-center items-center rounded-sm mt-3 text-white p-3">
                <Labels className="font-bold">
                  Economy - 64 Seats Available
                </Labels>
              </div>
              <SeatSelector
                seats={seats}
                selectedSeats={selectedSeats}
                handleSeatChange={handleSeatChange}
              />
            </div>
            <Link href={"/payment"}>
              <Button className="mt-5 w-full">Save Changes</Button>
            </Link>
          </div>
        </div>
        <FlightBooking flightId={params.flightId} />
      </div>
    </div>
  );
}
