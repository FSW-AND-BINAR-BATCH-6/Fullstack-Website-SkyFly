"use client";

import { Labels } from "@/components/ui/labels";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import React, { FC, useCallback, useEffect } from "react";
import { Flight, getFlights } from "./actions";
import { Skeleton } from "@/components/ui/skeleton";

interface DiscountProps {
  currentPage: number;
  currentItems: Flight[];
  setData: React.Dispatch<React.SetStateAction<Flight[]>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setFilteredData: React.Dispatch<React.SetStateAction<Flight[]>>;
}

const Discount: FC<DiscountProps> = ({
  currentPage,
  currentItems,
  setData,
  setCurrentPage,
  setFilteredData,
}) => {
  const fetchFlights = useCallback(async () => {
    try {
      const response = await getFlights(currentPage);
      // console.log(response);
      setData(response.data);
      setCurrentPage(response.pagination.currentPage);
      setFilteredData(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [currentPage, setData, setCurrentPage, setFilteredData]);

  useEffect(() => {
    fetchFlights();
  }, [currentPage, fetchFlights]);

  return (
    <>
      {currentItems && currentItems.length > 0 ? (
        currentItems.map((item, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-xl shadow-xl p-3 hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
          >
            <Labels className="bg-primaryPurple p-2 text-xs mb-[-35px] font-bold relative z-50 rounded-l-lg text-white float-end cursor-pointer">
              50% OFF
            </Labels>
            <Image
              src={
                index % 2 === 0
                  ? "/assets/bangkok-card-image.png"
                  : "/assets/sydney-card-image.png"
              }
              alt="logo"
              width={300}
              height={200}
              className="object-cover mb-7 shadow-xl w-full"
            />
            <Labels className="font-bold flex items-center cursor-pointer">
              <span>{item.departureAirport.city}</span>
              <ArrowRightIcon className="h-4 w-4 mx-2" />
              <span>{item.destinationAirport.city}</span>
            </Labels>
            <Labels className="text-xs font-bold text-violet cursor-pointer">
              AirAsia
            </Labels>
            <Labels className="block text-xs font-bold mt-2 cursor-pointer">
              20 - 30 March 2024
            </Labels>
            <Labels className="block text-xs font-bold mt-1 cursor-pointer">
              <span>Starting From</span>
              <span className="text-red-600 ml-3">IDR 950.000</span>
            </Labels>
          </div>
        ))
      ) : (
        <>
          {[...Array(4)].map((_, idx: number) => (
            <div
              key={idx}
              className="border border-gray-300 rounded-xl shadow-xl p-3 hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
            >
              <Labels className="bg-primaryPurple p-2 text-xs mb-[-35px] font-bold relative z-50 rounded-l-lg text-white float-end cursor-pointer">
                50% OFF
              </Labels>
              <Image
                src="/assets/bangkok-card-image.png"
                alt="logo"
                width={300}
                height={200}
                className="object-cover mb-7 shadow-xl w-full"
              />
              <Labels className="font-bold flex items-center cursor-pointer">
                <Skeleton className="h-5 w-20" />
                <ArrowRightIcon className="h-4 w-4 mx-2" />
                <span>Bangkok</span>
              </Labels>
              <Labels className="text-xs font-bold text-violet cursor-pointer">
                AirAsia
              </Labels>
              <Labels className="block text-xs font-bold mt-2 cursor-pointer">
                20 - 30 March 2024
              </Labels>
              <Labels className="block text-xs font-bold mt-1 cursor-pointer">
                <span>Starting From</span>
                <span className="text-red-600 ml-3">IDR 950.000</span>
              </Labels>
            </div>
          ))}
        </>
      )}
    </>
  );
};
export default Discount;
