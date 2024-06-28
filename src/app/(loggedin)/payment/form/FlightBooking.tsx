"use client";

import { getFlightById } from "@/app/(home)/findflights/flightDetail/actions";
import { Labels } from "@/components/ui/labels";
import { getCookie } from "cookies-next";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";

interface FlightBookingProps {}

interface ClassInfo {
  seatClass: string;
  seatPrice: number | null;
}

interface PriceDetails {
  adults: number;
  child: number;
  babies: number;
  tax: number;
}

const FlightBooking: FC<FlightBookingProps> = ({}) => {
  const [flightId, setFlightId] = useState<string | null>(null);
  const [flightsById, setFlightsById] = useState<any[]>([]);
  const [data, setData] = useState<PriceDetails | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [hargaDewasa, setHargaDewasa] = useState<number>(0);
  const [hargaAnak, setHargaAnak] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // console.log(flightsById);

  useEffect(() => {
    const bookingDetails = getCookie("bookingDetails");
    setFlightId(
      bookingDetails !== undefined ? (bookingDetails as string) : null
    );
  }, []);

  useEffect(() => {
    const fetchFlightsById = async () => {
      if (flightId) {
        try {
          const data = await getFlightById(flightId);
          setFlightsById([data]);
        } catch (err) {
          console.error("Failed to fetch flight details:", err);
          setError("Failed to fetch flight details");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(true);
      }
    };

    fetchFlightsById();
  }, [flightId]);

  useEffect(() => {
    const storedData = window.localStorage.getItem("bayik");
    if (storedData) {
      const parsedData: PriceDetails = JSON.parse(storedData);
      setData(parsedData);
    }
  }, []);

  useEffect(() => {
    if (data) {
      const hargaKuris = 1500000;
      const calculatedHargaDewasa = hargaKuris * data.adults;
      const calculatedHargaAnak = hargaKuris * data.child;
      const totalHarga =
        calculatedHargaDewasa + calculatedHargaAnak + 300000;

      setHargaDewasa(calculatedHargaDewasa);
      setHargaAnak(calculatedHargaAnak);
      setTotalPrice(totalHarga);
    }
  }, [data]);

  return (
    <div className="w-full lg:w-2/5 px-3">
      {flightsById.map((flight) => (
        <div
          key={flight.id}
          className="w-full p-5 mt-3 rounded-sm shadow-xl border border-black/20"
        >
          <div>
            <Labels className="font-bold">Flight Details</Labels>
          </div>
          <div className="flex mt-3">
            <Labels className="font-bold">
              {flight.departureTime}
            </Labels>
            <Labels className="font-bold ml-auto text-violet">
              Departure
            </Labels>
          </div>
          <Labels>{flight.departureDate}</Labels>
          <Labels className="flex flex-col">
            {flight.departureAirport.name}
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
                <Labels className="mt-3 flex flex-row font-bold">
                  {flight.plane.name} -
                  {flight.classInfo
                    .filter((c: ClassInfo) => c.seatPrice !== null)
                    .map((c: ClassInfo, i: number) => (
                      <span key={i} className="ps-1 flex flex-col">
                        {c.seatClass}
                      </span>
                    ))}
                </Labels>
                <Labels className="flex flex-col font-bold mt-1">
                  {flight.plane.code} - 203
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
              <Labels className="font-bold">
                {flight.arrivalTime}
              </Labels>
              <Labels className="font-bold ml-auto text-violet">
                Arrivals
              </Labels>
            </div>
            <div>
              <Labels>{flight.arrivalDate}</Labels>
              <Labels className="flex flex-col">
                {flight.destinationAirport.name}
              </Labels>
            </div>
          </div>

          <hr className="mt-3 border border-black/20" />

          <div className="py-2">
            <Labels className="font-bold">Total Price</Labels>
            {data?.adults !== undefined && data.adults > 0 && (
              <div className="flex mt-2">
                <Labels>{data?.adults} Adults</Labels>
                <Labels className="ml-auto">
                  IDR {hargaDewasa.toLocaleString()}
                </Labels>
              </div>
            )}
            {data?.child !== undefined && data.child > 0 && (
              <div className="flex mt-2">
                <Labels>{data?.child} Child</Labels>
                <Labels className="ml-auto">
                  IDR {hargaAnak.toLocaleString()}
                </Labels>
              </div>
            )}
            {data?.babies !== undefined && data.babies > 0 && (
              <div className="flex mt-2">
                <Labels>{data?.babies} Baby</Labels>
                <Labels className="ml-auto">IDR 0</Labels>
              </div>
            )}
            <div className="flex mt-2">
              <Labels>Tax</Labels>
              <Labels className="ml-auto">IDR 300.000</Labels>
            </div>
          </div>

          <hr className="mt-3 border border-black/20" />

          <div className="flex mt-3">
            <Labels className="font-bold text-lg">Total</Labels>
            <Labels className="ml-auto text-lg font-bold text-violet">
              IDR {totalPrice.toLocaleString()}
            </Labels>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightBooking;
