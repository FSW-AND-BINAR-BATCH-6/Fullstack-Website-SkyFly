"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Labels } from "@/components/ui/labels";
import { getFlights, Flight, Airline, getAirlines } from "./actions";
import ButtonBook from "./ButtonBook";
import { Skeleton } from "@/components/ui/skeleton";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const FlightDetail = () => {
  const [openStates, setOpenStates] = React.useState<{
    [key: string]: boolean;
  }>({});
  const [flights, setFlights] = React.useState<Flight[]>([]);
  const [airlines, setAirlines] = React.useState<Airline[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchFlights = async () => {
      try {
        const data = await getFlights();
        setFlights(data);
      } catch (err) {
        setError("Failed to fetch flights");
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  React.useEffect(() => {
    const fetchAirlinesData = async () => {
      try {
        const data = await getAirlines();
        setAirlines(data);
      } catch (err) {
        console.error("Failed to fetch airlines:", err);
      }
    };

    fetchAirlinesData();
  }, []);

  const getAirlineName = (planeId: string) => {
    const airline = airlines.find(
      (airline) => airline.id === planeId
    );
    return airline ? airline.name : "Jet Air";
  };

  const handleToggle = (flightId: string) => {
    setOpenStates((prev) => ({
      ...prev,
      [flightId]: !prev[flightId],
    }));
  };

  const renderSkeleton = () => (
    <div className="border border-gray-300 shadow-xl rounded-xl mb-5 pt-7 pb-9 px-5">
      <div className="flex items-center">
        <Skeleton className="w-[25px] h-[25px] bg-cover" />
        <div className="ml-3">
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="ml-auto mr-2 border border-gray-500 rounded-full">
          <Skeleton className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-9 ps-7">
        <div className="flex">
          <div className="flex mt-3 flex-col items-center">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="mt-2 h-5 w-10" />
          </div>

          <div className="mx-10 w-40">
            <div className="flex mt-3 flex-col items-center gap-1">
              <Skeleton className="h-5 w-20" />
              <div className="border-t border-gray-500 w-full"></div>
              <Skeleton className="h-5 w-16" />
            </div>
          </div>

          <div className="flex mt-3 flex-col items-center">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="mt-2 h-5 w-10" />
          </div>

          <div className="ml-5 flex items-start">
            <Skeleton className="w-[25px] h-[25px] mt-5 bg-cover" />
          </div>

          <div className="ml-auto flex flex-col items-start">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-10 w-20 mt-2" />
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div>
        {Array.from({ length: 3 }).map((_, index) => (
          <React.Fragment key={index}>
            {renderSkeleton()}
          </React.Fragment>
        ))}
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {flights.map((flight) => (
        <Collapsible
          key={flight.id}
          open={openStates[flight.id] || false}
          onOpenChange={() => handleToggle(flight.id)}
        >
          <div className="border border-gray-300 shadow-xl rounded-xl mb-5 pt-7 pb-9 px-5">
            <div className="flex items-center">
              <Image
                src="/assets/leaf.svg"
                alt="logo"
                width={150}
                height={150}
                className="w-[25px] bg-cover"
              />

              <div className="ml-3">
                <Label className="font-bold">
                  {getAirlineName(flight.planeId)} - Economy
                </Label>
              </div>

              <CollapsibleTrigger asChild>
                <div className="ml-auto mr-2 border border-gray-500 rounded-full">
                  <ChevronDown
                    className={`w-5 h-5 cursor-pointer text-gray-500 transition-transform duration-300 ${
                      openStates[flight.id] ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </CollapsibleTrigger>
            </div>

            <div className="mt-9 ps-7">
              <div className="flex">
                <div className="flex mt-3 flex-col items-center">
                  <Label className="font-bold">
                    {new Date(
                      flight.departureDate
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Label>
                  <Label className="mt-2">
                    {flight.departureAirport.code}
                  </Label>
                </div>

                <div className="mx-10 w-40">
                  <div className="flex mt-3 flex-col items-center gap-1">
                    <Label>
                      {Math.ceil(
                        (new Date(flight.arrivalDate).getTime() -
                          new Date(flight.departureDate).getTime()) /
                          (1000 * 60 * 60)
                      )}
                      h{" "}
                      {Math.ceil(
                        ((new Date(flight.arrivalDate).getTime() -
                          new Date(flight.departureDate).getTime()) /
                          (1000 * 60)) %
                          60
                      )}
                      m
                    </Label>
                    <div className="border-t border-gray-500 w-full"></div>
                    <Label>
                      {flight.transit ? "Transit" : "Direct"}
                    </Label>
                  </div>
                </div>

                <div className="flex mt-3 flex-col items-center">
                  <Label className="font-bold">
                    {new Date(flight.arrivalDate).toLocaleTimeString(
                      [],
                      { hour: "2-digit", minute: "2-digit" }
                    )}
                  </Label>
                  <Label className="mt-2">
                    {flight.destinationAirport.code}
                  </Label>
                </div>

                <div className="ml-5 flex items-start">
                  <Image
                    src="/assets/baggage.svg"
                    alt="logo"
                    width={50}
                    height={50}
                    className="w-[25px] mt-5 bg-cover"
                  />
                </div>

                <div className="ml-auto flex flex-col items-start">
                  <Label className="font-bold">
                    IDR {flight.price.toLocaleString("id-ID")}
                  </Label>
                  <ButtonBook flightId={flight.id} />
                </div>
              </div>
            </div>
            <CollapsibleContent className="transition-all duration-500 ease-in-out transform origin-top">
              <hr className="mt-10  border border-black/20" />
              <div className="flex flex-col px-5">
                <div className="mt-3">
                  <Labels className="font-bold">
                    Flight Details
                  </Labels>
                </div>
                <div className="flex mt-3">
                  <Labels className="font-bold">
                    {new Date(
                      flight.departureDate
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Labels>
                  <Labels className="font-bold ml-auto text-violet">
                    Departure
                  </Labels>
                </div>
                <Labels className="mt-1">
                  {formatDate(flight.departureDate)}
                </Labels>
                <Labels className="flex flex-col mt-1">
                  {flight.departureAirport.name}
                </Labels>

                <hr className="mt-3 w-[36rem] mx-auto border border-black/20" />

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
                      <Labels className="font-bold">
                        Information:
                      </Labels>
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

                <hr className="mt-3 w-[36rem] mx-auto border border-black/20" />

                <div className="py-2">
                  <div className="flex mt-3">
                    <Labels className="font-bold">
                      {new Date(
                        flight.arrivalDate
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
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
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      ))}
    </div>
  );
};
