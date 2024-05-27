"use client";

import * as React from "react";
import { Labels } from "@/components/ui/labels";

import BookingDetails from "./components/BookingDetails";
import PassengersDetails from "./components/PassengersDetails";
import Seat from "./SeatComponents.tsx/Seat";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function LoggedinPage() {
  const [seat, setSeat] = React.useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);

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

              <div className="flex justify-center mt-3 gap-28">
                <div className="flex gap-12">
                  <span>A</span>
                  <span>B</span>
                  <span>C</span>
                </div>
                <div className="flex gap-12">
                  <span>D</span>
                  <span>E</span>
                  <span>F</span>
                </div>
              </div>

              {seat.map((seats: any, index: number) => (
                <Seat key={index} index={index} />
              ))}
            </div>

            <Button className="mt-5">Save Changes</Button>
          </div>
        </div>

        <div className="grow-0 w-2/5 p-5 mt-3 rounded-sm shadow-xl border border-black/20">
          <div>
            <Labels className="font-bold">Flight Details</Labels>
          </div>
          <div className="flex mt-3">
            <Labels className="font-bold">07:00</Labels>
            <Labels className="font-bold ml-auto text-violet">
              Departure
            </Labels>
          </div>
          <Labels>3 March 2024</Labels>
          <Labels className="flex flex-col">
            Soekarno Hatta - Terminal 1A Domestik
          </Labels>

          <hr className="mt-3 border border-black/20" />

          <div className="flex my-2">
            <div className="flex items-center justify-center">
              <Image
                src="/assets/leaf.svg"
                alt="logo"
                width={50}
                height={50}
                className="w-7 h-7"
              />
            </div>
            <div className="flex flex-col ps-2">
              <div>
                <Labels className="mt-3 font-bold">
                  Jet Air - Economy
                </Labels>
                <Labels className="flex flex-col font-bold">
                  JT - 203
                </Labels>
              </div>
              <div className="mt-5">
                <Labels className="font-bold">Information:</Labels>
                <Labels className="flex flex-col">
                  Baggage 20 kg
                </Labels>
                <Labels>Cabin baggage 7 kg</Labels>
                <Labels className="flex flex-col">
                  In Flight Entertainment
                </Labels>
              </div>
            </div>
          </div>

          <hr className="mt-3 border border-black/20" />

          <div className="py-2">
            <div className="flex mt-3">
              <Labels className="font-bold">11:00</Labels>
              <Labels className="font-bold ml-auto text-violet">
                Arrivals
              </Labels>
            </div>
            <div>
              <Labels>3 March 2024</Labels>
              <Labels className="flex flex-col">
                Melbourne International Airport
              </Labels>
            </div>
          </div>

          <hr className="mt-3 border border-black/20" />

          <div className="py-2">
            <Labels className="font-bold">Total Price</Labels>
            <div className="flex mt-2">
              <Labels>2 Adults</Labels>
              <Labels className="ml-auto">IDR 9.550.000</Labels>
            </div>
            <div className="flex mt-2">
              <Labels>1 Baby</Labels>
              <Labels className="ml-auto">IDR 0</Labels>
            </div>
            <div className="flex mt-2">
              <Labels>Tax</Labels>
              <Labels className="ml-auto">IDR 300.000</Labels>
            </div>
          </div>

          <hr className="mt-3 border border-black/20" />

          <div className="flex mt-3">
            <Labels className="font-bold text-lg">Total</Labels>
            <Labels className="ml-auto text-lg font-bold text-violet">
              IDR 9.850.000
            </Labels>
          </div>
        </div>
      </div>
    </div>
  );
}
