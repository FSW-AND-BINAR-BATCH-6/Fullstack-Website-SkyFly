"use client";

import { Button } from "@/components/ui/button";
import { Labels } from "@/components/ui/labels";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpDown,
  Box,
  ChevronRight,
  DollarSign,
  Heart,
} from "lucide-react";
import ButtonReset from "../components/ButtonReset";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { format, addDays, isSameDay } from "date-fns";
import clsx from "clsx";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export default function FindFlightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const totalPassengers = searchParams.get("totalPassengers") ?? "1";
  const fromCity = searchParams.get("from");
  const toCity = searchParams.get("to");
  const seatClass = searchParams.get("seatClass") ?? "Economy";
  const departureDateParam = searchParams.get("departureDate");

  const [fromCode, setFromCode] = useState("");
  const [toCode, setToCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [departureDate, setDepartureDate] = useState(new Date());
  //
  const [selectedSort, setSelectedSort] = useState<string>("");
  // const [showStatusBar, setShowStatusBar] = useState<Checked>(true);
  // const [showActivityBar, setShowActivityBar] = useState<Checked>(false);
  // const [showPanel, setShowPanel] = useState<Checked>(false);

  useEffect(() => {
    async function fetchAirportCodes() {
      try {
        const response = await fetch(
          "https://backend-skyfly-c1.vercel.app/api/v1/airports"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch airport data");
        }
        const responseData = await response.json();

        if (
          !responseData ||
          !responseData.data ||
          !Array.isArray(responseData.data)
        ) {
          throw new Error("Airport data is not in the expected format");
        }

        const fromAirport = responseData.data.find(
          (airport: any) => airport.city === fromCity
        );
        const toAirport = responseData.data.find(
          (airport: any) => airport.city === toCity
        );

        if (fromAirport) {
          setFromCode(fromAirport.code);
        } else {
          setFromCode("");
        }
        if (toAirport) {
          setToCode(toAirport.code);
        } else {
          setToCode("");
        }
      } catch (error) {
        console.error("Error fetching airport data:", error);
      }
    }

    if (!fromCity || !toCity) {
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
      return;
    }

    fetchAirportCodes();
  }, [fromCity, toCity]);

  useEffect(() => {
    if (departureDateParam) {
      setDepartureDate(new Date(departureDateParam));
    }
  }, [departureDateParam]);

  const handleDateSelect = (selectedDate: Date) => {
    const query = new URLSearchParams(
      searchParams as unknown as URLSearchParams
    );
    query.set("departureDate", selectedDate.toISOString().split("T")[0]);
    router.replace(`/findflights?${query.toString()}`);
  };

  const handlePrevDate = () => {
    const newDate = addDays(departureDate, -7);
    setDepartureDate(newDate);
    handleDateSelect(newDate);
  };

  const handleNextDate = () => {
    const newDate = addDays(departureDate, 7);
    setDepartureDate(newDate);
    handleDateSelect(newDate);
  };

  const generateDateButtons = (startDate: Date) => {
    const daysOfWeek = Array.from({ length: 7 }).map((_, i) => {
      const date = addDays(startDate, i);
      const dayName = format(date, "EEEE");
      const formattedDate = format(date, "dd/MM/yyyy");
      const isActive = isSameDay(date, departureDate);

      return (
        <div
          key={i}
          className="flex justify-center w-full md:w-32 mb-3 md:mb-0"
        >
          <Button
            className={clsx(
              `focus:ring-0 flex flex-col text-xs py-6 bg-inherit text-black shadow-inherit hover:shadow-xl border-b-2 md:border-b-0 md:border-r-2 border-gray-300 ${
                isActive ? "bg-primaryPurple text-white" : ""
              }`
            )}
            onClick={() => handleDateSelect(date)}
          >
            <Labels
              className={`font-bold mb-1 cursor-pointer text-center md:text-left ${
                isActive ? "text-white" : ""
              }`}
            >
              {dayName}
            </Labels>
            <span
              className={`text-center md:text-left ${
                isActive ? "text-white" : ""
              }`}
            >
              {formattedDate}
            </span>
          </Button>
        </div>
      );
    });
    return daysOfWeek;
  };

  const handleSortChange = (sortValue: string) => {
    setSelectedSort(sortValue);
    const currentQuery = new URLSearchParams(Array.from(searchParams.entries()));
    currentQuery.set('sort', sortValue);
    
    router.push(`http://localhost:3000/findflights?${currentQuery.toString()}`);
  };



  return (
    <>
      <div className="w-full md:w-4/5 mx-auto my-5 px-4">
        <Labels className="text-xl font-bold text-center">
          Choose a Flights
        </Labels>
      </div>

      <div className="w-full md:w-4/5 mx-auto mb-7 px-4">
        <div className="flex flex-col md:flex-row items-center md:items-start sm:gap-4">
          <div className="w-full md:w-4/5 bg-primaryPurple rounded-xl p-3 flex items-center text-white shadow-lg mb-3 md:mb-0">
            <Link href="/">
              <ArrowLeftIcon className="w-5 h-5 cursor-pointer text-white" />
            </Link>
            <Labels className="ml-5 font-bold text-center md:text-left">
              {fromCity} {fromCode} &#187; {toCity} {toCode} - {totalPassengers}{" "}
              Passengers - {seatClass} Class
            </Labels>
          </div>
          <ButtonReset />
        </div>
      </div>

      <div className="w-full md:w-4/5 mx-auto px-4">
        <div className="flex items-center justify-between mb-3">
          <Button
            className="text-gray-600 hover:text-black"
            onClick={handlePrevDate}
          >
            <ArrowLeftIcon className="w-5 h-5 text-white" />
          </Button>
          <div className="flex flex-wrap justify-center gap-5">
            {generateDateButtons(departureDate)}
          </div>
          <Button
            className="text-gray-600 hover:text-black"
            onClick={handleNextDate}
          >
            <ArrowRightIcon className="w-5 h-5 text-white" />
          </Button>
        </div>
      </div>

      <div className="w-full md:w-4/5 mx-auto border-t-2 border-gray-300 mt-5 px-4"></div>

      <div className="w-full md:w-4/5 mx-auto mt-5 flex items-center justify-end mb-7 px-4">
        <div className="">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full bg-primaryPurple">
                <ArrowUpDown className="w-5 h-5 mr-2" />
                <Labels className="cursor-pointer">Filter</Labels>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 p-3 bg-red-700 text-white rounded-md">
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={selectedSort === "lowest-price"}
                onCheckedChange={() => handleSortChange("lowest-price")}
              >
                Price - Cheapest
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={selectedSort === "shortest-duration"}
                onCheckedChange={() => handleSortChange("shortest-duration")}
              >
                Duration - Shortest
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={selectedSort === "latest-departure"}
                onCheckedChange={() => handleSortChange("latest-departure")}
              >
                Departure - Latest
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={selectedSort === "earliest-arrival"}
                onCheckedChange={() => handleSortChange("earliest-arrival")}
              >
                Arrival - Earliest
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={selectedSort === "latest-arrival"}
                onCheckedChange={() => handleSortChange("latest-arrival")}
              >
                Arrival - Latest
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <section className="flex flex-col lg:flex-row gap-5 pb-20 items-start flex-nowrap px-4">
        <section className="w-full lg:grow-0 lg:w-auto h-auto lg:h-screen ps-0 lg:ps-32 pe-0 lg:pe-14 mb-5 lg:mb-0">
          <div className="border border-gray-300 shadow-xl p-5 w-full lg:w-56 rounded-xl mb-5 lg:mb-0">
            <div>
              <Labels className="cursor-pointer font-bold">Filter</Labels>
            </div>

            <div className="pt-5 flex items-center">
              <Box className="w-5 h-5 text-gray-500" />
              <Labels className="cursor-pointer text-gray-500 font-bold ml-3">
                Transit
              </Labels>
              <ChevronRight className="w-5 h-5 ml-auto text-gray-500" />
            </div>

            <hr className="border border-gray-300 mt-3 w-full lg:w-44" />

            <div className="pt-5 flex items-center">
              <Heart className="w-5 h-5 text-gray-500" />
              <Labels className="cursor-pointer font-bold text-gray-500 ml-3">
                Facility
              </Labels>
              <ChevronRight className="w-5 h-5 ml-auto text-gray-500" />
            </div>

            <hr className="border border-gray-300 mt-3 w-full lg:w-44" />

            <div className="pt-5 flex items-center">
              <DollarSign className="w-5 h-5 text-gray-500" />
              <Labels className="cursor-pointer text-gray-500 font-bold ml-3">
                Price
              </Labels>
              <ChevronRight className="w-5 h-5 ml-auto text-gray-500" />
            </div>
          </div>
        </section>
        <section className="w-full lg:grow lg:pe-32">{children}</section>
      </section>
    </>
  );
}
