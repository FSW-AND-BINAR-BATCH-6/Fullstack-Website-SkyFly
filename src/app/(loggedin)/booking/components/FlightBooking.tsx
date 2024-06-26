"use client";

import {
  Airline,
  FlightById,
  getAirlines,
  getFlightById,
} from "@/app/(home)/findflights/flightDetail/actions";
import { formatDate } from "@/app/(home)/findflights/flightDetail/FlightDetail";
import { Labels } from "@/components/ui/labels";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useStore } from "@/stores/buttonStore";
import { usePriceStore } from "@/stores/priceStore";

interface FlightBookingProps {
  flightId: string | null;
}

interface PriceDetails {
  adults: number;
  child: number;
  babies: number;
  tax: number;
}

const FlightBooking: FC<FlightBookingProps> = ({ flightId }) => {
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [flightsById, setFlightsById] = useState<FlightById[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PriceDetails | null>(null);

  const setTotalPrice = usePriceStore((state) => state.setTotalPrice);

  const showButton = useStore((state) => state.showButton);

  const hargaKuris = 1500000;
  const hargaDewasa = hargaKuris * data?.adults!;
  const hargaAnak = hargaKuris * data?.child!;

  const totalHarga = hargaDewasa + hargaAnak + 300000;

  setTotalPrice(totalHarga);

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
    const fetchAirlinesData = async () => {
      try {
        const data = await getAirlines();
        setAirlines(data);
      } catch (err) {
        console.error("Failed to fetch airlines:", err);
        setError("Failed to fetch airlines");
      }
    };

    fetchAirlinesData();
  }, []);

  useEffect(() => {
    const storedData = window.localStorage.getItem("bayik");
    if (storedData) {
      const parsedData: PriceDetails = JSON.parse(storedData);
      setData(parsedData);
    }
  }, []);

  const handleNextPayment = () => {
    window.location.href = "/payment";
  };

  const getAirlineName = (planeId: string) => {
    const airline = airlines.find(
      (airline) => airline.id === planeId
    );
    return airline ? airline.name : "Jet Air";
  };

  const getAirlineCode = (planeId: string) => {
    const airline = airlines.find(
      (airline) => airline.id === planeId
    );
    return airline ? airline.code : "Unknown Code";
  };

  const renderSkeleton = () => (
    <div className="w-full lg:w-4/5 px-3">
      <div className="w-full p-5 mt-3 rounded-sm shadow-xl border border-black/20">
        <div>
          <Labels className="font-bold">Flight Details</Labels>
        </div>
        <div className="flex mt-3">
          <Skeleton className="h-5 w-20" />
          <Labels className="font-bold ml-auto text-violet">
            Departure
          </Labels>
        </div>
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-60" />

        <hr className="mt-3 border border-black/20" />

        <div className="flex my-2">
          <div className="flex items-center justify-center">
            <Skeleton className="h-7 w-7" />
          </div>
          <div className="flex flex-col ps-2">
            <div>
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-5 w-24" />
            </div>
            <div className="mt-5">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-36" />
            </div>
          </div>
        </div>

        <hr className="mt-3 border border-black/20" />

        <div className="py-2">
          <div className="flex mt-3">
            <Skeleton className="h-5 w-20" />
            <Labels className="font-bold ml-auto text-violet">
              Arrivals
            </Labels>
          </div>
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
        </div>

        <hr className="mt-3 border border-black/20" />

        <div className="py-2">
          <Skeleton className="h-5 w-full" />
          <div className="flex mt-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full ml-auto" />
          </div>
          <div className="flex mt-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full ml-auto" />
          </div>
          <div className="flex mt-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full ml-auto" />
          </div>
        </div>

        <hr className="mt-3 border border-black/20" />

        <div className="flex mt-3">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20 ml-auto" />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return renderSkeleton();
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full lg:w-4/5 px-3">
      <div className="w-full p-5 mt-3 rounded-sm shadow-xl border border-black/20">
        {flightsById.map((flight) => (
          <div key={flight.id}>
            <div>
              <Labels className="font-bold">Flight Details</Labels>
            </div>
            <div className="flex mt-3">
              <Labels className="font-bold">
                {new Date(flight.departureDate).toLocaleTimeString(
                  [],
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </Labels>
              <Labels className="font-bold ml-auto text-violet">
                Departure
              </Labels>
            </div>
            <Labels>{formatDate(flight.departureDate)}</Labels>
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
                  <Labels className="mt-3 font-bold">
                    {getAirlineName(flight.planeId)} - Economy
                  </Labels>
                  <Labels className="flex flex-col font-bold">
                    {getAirlineCode(flight.planeId)} - 203
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
                  {new Date(flight.arrivalDate).toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </Labels>
                <Labels className="font-bold ml-auto text-violet">
                  Arrivals
                </Labels>
              </div>
              <div>
                <Labels>{formatDate(flight.arrivalDate)}</Labels>
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
                IDR {totalHarga.toLocaleString()}
              </Labels>
            </div>
          </div>
        ))}
      </div>
      {showButton && (
        <Button
          onClick={handleNextPayment}
          className="mt-4 bg-red-700 hover:bg-red-500 w-full"
        >
          proceed with payment
        </Button>
      )}
    </div>
  );
};

export default FlightBooking;
