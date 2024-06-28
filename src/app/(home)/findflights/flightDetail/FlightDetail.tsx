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
import {
  getFlights,
  getRoundTrip,
  Flight,
  Airline,
  getAirlines,
  FlightData,
} from "./actions";
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

// get query data [Rizki]
interface FlightDetailProps {
  searchParams: {
    totalPassengers?: string;
    departureDate?: string;
    returnDate?: string;
    from?: string;
    to?: string;
    seatClass?: string;
  };
}

export const FlightDetail: React.FC<FlightDetailProps> = ({
  searchParams,
}) => {
  const [openStates, setOpenStates] = React.useState<{
    [key: string]: boolean;
  }>({});
  const [flights, setFlights] = React.useState<Flight[]>([]);
  const [returnFlights, setReturnFlights] = React.useState<Flight[]>(
    []
  );
  const [airlines, setAirlines] = React.useState<Airline[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const query = {
    departureAirport: searchParams.from,
    arrivalAirport: searchParams.to,
    departureDate: searchParams.departureDate,
    returnDate: searchParams.returnDate,
    seatClass: searchParams.seatClass,
  };

  const filteredQueryParams = Object.fromEntries(
    Object.entries(query).filter(
      ([_, value]) => value !== undefined && value !== ""
    ) as [string, string][]
  );

  const filterQuery = new URLSearchParams(
    filteredQueryParams
  ).toString();

  React.useEffect(() => {
    const fetchFlights = async () => {
      try {
        if (!searchParams.returnDate) {
          const flightData = await getFlights(filterQuery);
          setFlights(flightData);
        } else {
          const { derpartureFlights, returnFlights } =
            await getRoundTrip(filterQuery);
          // console.log(derpartureFlights);
          // console.log(returnFlights);
          setFlights(derpartureFlights);
          setReturnFlights(returnFlights);
        }
      } catch (err) {
        setError("Failed to fetch flights");
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [filterQuery, searchParams.returnDate]);

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

  const handleToggle = (flightId: string) => {
    setOpenStates((prev) => ({
      ...prev,
      [flightId]: !prev[flightId],
    }));
  };

  const renderSkeleton = () => (
    <div className="border border-gray-300 shadow-xl rounded-xl mb-5 pt-7 pb-9 px-5">
      <div className="flex flex-col sm:flex-row items-center">
        <Skeleton className="w-[25px] h-[25px] bg-cover" />
        <div className="ml-3 mt-3 sm:mt-0">
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="ml-auto mr-2 border border-gray-500 rounded-full mt-3 sm:mt-0">
          <Skeleton className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-9 px-0 sm:px-7">
        <div className="flex flex-col sm:flex-row">
          <div className="flex mt-3 flex-col items-center">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="mt-2 h-5 w-10" />
          </div>

          <div className="mx-0 sm:mx-10 w-full sm:w-40 mt-3 sm:mt-0">
            <div className="flex flex-col items-center gap-1">
              <Skeleton className="h-5 w-20" />
              <div className="border-t border-gray-500 w-full mt-3 sm:mt-0"></div>
              <Skeleton className="h-5 w-16 mt-3 sm:mt-0" />
            </div>
          </div>

          <div className="flex mt-3 flex-col items-center">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="mt-2 h-5 w-10" />
          </div>

          <div className="ml-0 sm:ml-5 flex items-start mt-3 sm:mt-0">
            <Skeleton className="w-[25px] h-[25px] bg-cover" />
          </div>

          <div className="ml-auto flex flex-col items-start mt-3 sm:mt-0">
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

  const returnFlightCard = (flight: Flight) => (
    <div className="mt-9 sm:ps-7">
      <div className="flex flex-col gap-2 items-center sm:flex-row">
        <div className="flex mt-3 flex-col items-center">
          <Label className="font-bold">{flight.departureTime}</Label>
          <Label className="mt-2">
            {flight.departureAirport.code}
          </Label>
        </div>

        <div className="sm:mx-10 w-40 flex flex-col items-center sm:gap-1">
          <Label>{flight.duration}</Label>
          <div className="border-t border-gray-500 w-full"></div>
          <Label>
            {flight.transit &&
            typeof flight.transit === "object" &&
            "status" in flight.transit
              ? flight.transit.status
                ? "Transit"
                : "Direct"
              : "Direct"}
          </Label>
        </div>

        <div className="flex mt-3 flex-col items-center">
          <Label className="font-bold">{flight.arrivalTime}</Label>
          <Label className="mt-2">
            {flight.destinationAirport.code}
          </Label>
        </div>

        <div className="sm:ml-5 flex items-start">
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
  );

  return (
    <div>
      {Array.isArray(flights) && flights.length > 0 ? (
        flights.map((flight) => (
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
                    {flight.plane.name} - Economy
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
              <div className="mt-9 sm:ps-7">
                <div className="flex flex-col gap-2 items-center sm:flex-row">
                  <div className="flex mt-3 flex-col items-center">
                    <Label className="font-bold">
                      {flight.departureTime}
                    </Label>
                    <Label className="mt-2">
                      {flight.departureAirport.code}
                    </Label>
                  </div>
                  <div className="sm:mx-10 w-40 flex flex-col items-center sm:gap-1">
                    <Label>{flight.duration}</Label>
                    <div className="border-t border-gray-500 w-full"></div>
                    <Label>
                      {flight.transit &&
                      typeof flight.transit === "object" &&
                      "status" in flight.transit
                        ? flight.transit.status
                          ? "Transit"
                          : "Direct"
                        : "Direct"}
                    </Label>
                  </div>
                  <div className="flex mt-3 flex-col items-center">
                    <Label className="font-bold">
                      {flight.arrivalTime}
                    </Label>
                    <Label className="mt-2">
                      {flight.destinationAirport.code}
                    </Label>
                  </div>
                  <div className="sm:ml-5 flex items-start">
                    <Image
                      src="/assets/baggage.svg"
                      alt="logo"
                      width={50}
                      height={50}
                      className="w-[25px] mt-5 bg-cover"
                    />
                  </div>
                  <div className="ml-auto flex flex-col items-start">
                    {returnFlights.length === 0 ? (
                      <>
                        <Label className="font-bold">
                          IDR {flight.price.toLocaleString("id-ID")}
                        </Label>
                        <ButtonBook flightId={flight.id} />
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
              {returnFlights.length > 0 && returnFlightCard(flight)}
              <CollapsibleContent className="transition-all duration-500 ease-in-out transform origin-top">
                <hr className="mt-10 border border-black/20" />
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
                    {flight.departureAirport.name} -{" "}
                    {flight.plane.terminal}
                  </Labels>
                  <hr className="mt-3 w-full mx-auto border border-black/20" />
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
                          {flight.plane.name} -{" "}
                          {searchParams.seatClass}
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
                  <hr className="mt-3 w-full mx-auto border border-black/20" />
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
                      <Labels>
                        {formatDate(flight.arrivalDate)}
                      </Labels>
                      <Labels className="flex flex-col">
                        {flight.destinationAirport.name}
                      </Labels>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        ))
      ) : (
        <>
          <div className="flex justify-center items-center mt-3">
            <Image
              src="/assets/img-notfound.svg"
              alt="logo"
              width={500}
              height={500}
              className="w-1/2 bg-cover"
            />
          </div>

          <div className="flex justify-center items-center mt-3">
            <Label className="text-center">
              Sorry, your search was not found
            </Label>
          </div>

          <div className="flex justify-center items-center mt-1">
            <Label className="text-center text-violet">
              Try to find another trip!
            </Label>
          </div>
        </>
      )}
    </div>
  );
};
