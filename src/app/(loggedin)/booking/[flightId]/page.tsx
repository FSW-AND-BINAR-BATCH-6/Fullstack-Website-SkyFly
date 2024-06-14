"use client";

import * as React from "react";
import { Labels } from "@/components/ui/labels";
import { Button } from "@/components/ui/button";
import BookingDetails from "../components/BookingDetails";
import PassengersDetails from "../passengersDetails/PassengersDetails";
import FlightBooking from "../flightBooking/FlightBooking";
import Link from "next/link";

interface Seat {
  id: number;
  label: string;
  reserved: boolean;
}

// Generate seat data for 72 seats
const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];
  const rows = 12;
  const cols = ["A", "B", "C", "D", "E", "F"];

  for (let i = 1; i <= rows; i++) {
    for (let j = 0; j < cols.length; j++) {
      seats.push({
        id: seats.length + 1,
        label: `${i}${cols[j]}`,
        reserved: Math.random() > 0.7, // Randomly reserve some seats
      });
    }
  }
  return seats;
};

const seats = generateSeats();

const SeatSelector: React.FC<{
  seats: Seat[];
  selectedSeats: number[];
  handleSeatChange: (seatId: number) => void;
}> = ({ seats, selectedSeats, handleSeatChange }) => {
  const renderSeats = (seatGroup: Seat[]) => (
    <>
      {seatGroup.map((seat) => (
        <div className="relative seat" key={seat.id}>
          <input
            type="checkbox"
            className="absolute opacity-0 peer"
            id={`seat-${seat.id}`}
            checked={selectedSeats.includes(seat.id)}
            onChange={() => handleSeatChange(seat.id)}
            disabled={seat.reserved}
          />
          <label
            htmlFor={`seat-${seat.id}`}
            className={`block w-full text-center text-sm font-bold leading-6 py-1 rounded text-black hover:cursor-pointer hover:shadow-[0_0_0_2px_green] peer-checked:bg-violet peer-checked:text-white ${
              seat.reserved
                ? "bg-gray-400 text-gray-500 cursor-not-allowed"
                : "bg-green-400"
            }`}
          >
            {seat.label}
          </label>
        </div>
      ))}
    </>
  );

  return (
    <div className="gap-[4.5rem] mt-3 mx-auto flex">
      <div className="grid grid-cols-3 gap-4 w-[10rem]">
        <span className="text-center">A</span>
        <span className="text-center">B</span>
        <span className="text-center">C</span>
        {renderSeats(
          seats.filter(
            (seat) =>
              seat.label.endsWith("A") ||
              seat.label.endsWith("B") ||
              seat.label.endsWith("C")
          )
        )}
      </div>
      <div className="grid grid-cols-3 gap-4 w-[10rem]">
        <span className="text-center">D</span>
        <span className="text-center">E</span>
        <span className="text-center">F</span>
        {renderSeats(
          seats.filter(
            (seat) =>
              seat.label.endsWith("D") ||
              seat.label.endsWith("E") ||
              seat.label.endsWith("F")
          )
        )}
      </div>
    </div>
  );
};

export default function LoggedinPage({
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
