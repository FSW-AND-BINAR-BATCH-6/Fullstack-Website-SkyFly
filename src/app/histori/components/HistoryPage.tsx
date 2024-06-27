"use client";

import "../../globals.css";
import { Button } from "@/components/ui/button";
import { Labels } from "@/components/ui/labels";
import { getCookie } from "cookies-next";
import {
  ArrowLeftIcon,
  ArrowUpDown,
  MoveRight,
  Search,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import {
  getAllTransactions,
  getFlightById,
  getTransactionById,
} from "./actions";
import toast from "react-hot-toast";

interface TransactionDetail {
  id: string;
  transactionId: string;
  totalPrice: number;
  name: string;
  passengerCategory: string;
  familyName: string;
  dob: string;
  citizenship: string;
  passport: string;
  issuingCountry: string;
  validityPeriod: string;
  flight: any;
  seat: any;
}

interface Transaction {
  id: string;
  orderId: string;
  userId: string;
  tax: number;
  totalPrice: number;
  status: string;
  booking: {
    date: string;
    time: string;
    code: string;
  };
  Transaction_Detail: TransactionDetail[];
}

interface DataItem {
  date: string;
  transactions: Transaction[];
}

interface Response {
  status: boolean;
  message: string;
  totalItems: number;
  pagination: {
    totalPage: number;
    currentPage: number;
    pageItems: number;
    nextPage: null | number;
    prevPage: null | number;
  };
  data: DataItem[];
}

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

export default function HistoryPages() {
  const [flightId, setFlightId] = useState<string | null>(null);
  const [flightsById, setFlightsById] = useState<any[]>([]);
  const [allTransaction, setAllTransaction] = useState<any[]>([]);
  const [transactionId, setTransactionId] = useState<string | null>(
    null
  );
  const [transactionDetail, setTransactionDetail] = useState<any[]>(
    []
  );
  const [data, setData] = useState<PriceDetails | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [hargaDewasa, setHargaDewasa] = useState<number>(0);
  const [hargaAnak, setHargaAnak] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  console.log(allTransaction);
  console.log(transactionDetail);

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
          // setError("Failed to fetch flight details");
        } finally {
          // setLoading(false);
        }
      } else {
        // setLoading(true);
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

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = getCookie("token");
      if (typeof token !== "string") {
        toast.error("Token is missing or invalid.", {
          style: {
            fontWeight: "bold",
          },
        });
        return;
      }

      const requestData = { token };

      try {
        const response = await getAllTransactions(requestData);
        setAllTransaction(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    const fetchTransactionById = async () => {
      const token = getCookie("token");
      if (typeof token !== "string") {
        toast.error("Token is missing or invalid.", {
          style: {
            fontWeight: "bold",
          },
        });
        return;
      }
      const requestData = { token, transactionId };

      try {
        const response = await getTransactionById(requestData);
        setTransactionDetail(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransactionById();
  }, [transactionId]);

  const transactionsByMonth = allTransaction.reduce((acc, item) => {
    const month = item.date;
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month] = acc[month].concat(item.transactions);
    return acc;
  }, {});

  function getStatusClass(status: string) {
    switch (status) {
      case "settlement":
        return "bg-green-700";
      case "pending":
        return "bg-gray-500";
      case "occupaid":
        return "bg-red-700";
      default:
        return "bg-red-700";
    }
  }

  const handleClick = (id: string) => {
    setTransactionId(id);
  };

  return (
    <>
      <div className="w-4/5 mx-auto py-7">
        <Labels className="font-bold text-xl">Booking History</Labels>
        <div className="mt-5 flex flex-row gap-3 items-center">
          <div className="w-full sm:w-4/5 bg-primaryPurple rounded-xl pl-5 p-3 flex items-center text-white shadow-lg">
            <Link href="/">
              <ArrowLeftIcon className="w-5 h-5 cursor-pointer" />
            </Link>
            <Labels className="ml-5">Home Page</Labels>
          </div>
          <div className="">
            <Button className="rounded-full bg-primaryPurple">
              <ArrowUpDown className="w-5 h-5 mr-2" />
              <Labels className="cursor-pointer">Filter</Labels>
            </Button>
          </div>
          <div className="">
            <Search className="w-5 h-5 text-violet font-bold cursor-pointer" />
          </div>
        </div>
      </div>

      <hr className="border-black/20" />

      <div className="w-full md:w-4/5 mx-auto mt-3 pb-20">
        <div className="flex flex-col md:flex-row items-start flex-wrap">
          <div className="grow-0 w-full md:w-3/5 p-3">
            <div className="flex flex-col">
              {Object.entries(transactionsByMonth).map(
                ([month, transactions]: any) => (
                  <div
                    key={month}
                    className="flex flex-col p-5 rounded-sm shadow-xl border border-black/20"
                  >
                    <div>
                      <Labels className="font-bold">{month}</Labels>
                    </div>

                    {transactions
                      .slice()
                      .reverse()
                      .map((transaction: any) => (
                        <div
                          key={transaction.id}
                          onClick={() => handleClick(transaction.id)}
                          className="mt-3 p-5 border border-black/20 rounded-sm cursor-pointer hover:shadow-xl transition duration-300 ease-in-out hover:border-violet active:bg-yellow-200 focus:outline-none focus:ring focus:ring-violet-300 active:ring-violet-700"
                        >
                          <div
                            className={`rounded-full p-2 text-white w-24 h-8 flex items-center justify-center ${getStatusClass(
                              transaction.status
                            )}`}
                          >
                            <span className="flex text-sm items-center justify-center">
                              {transaction.status}
                            </span>
                          </div>
                          <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row justify-between items-center mt-3">
                            <div className="flex flex-row mt-3">
                              <div>
                                <Image
                                  src="/assets/map.svg"
                                  alt="logo"
                                  width={50}
                                  height={50}
                                  className="w-5 h-5"
                                />
                              </div>
                              <div className="flex flex-col ml-2">
                                <Labels className="font-bold">
                                  {
                                    transaction.Transaction_Detail[0]
                                      .flight.departureAirport.city
                                  }
                                </Labels>

                                <Labels className="mt-1">
                                  {
                                    transaction.Transaction_Detail[0]
                                      .flight.departure.date
                                  }
                                </Labels>
                                <Labels className="mt-1">
                                  {
                                    transaction.Transaction_Detail[0]
                                      .flight.departure.time
                                  }
                                </Labels>
                              </div>
                            </div>
                            <div className="flex flex-col items-center justify-center mt-3 md:mt-0">
                              <Labels>
                                {
                                  transaction.Transaction_Detail[0]
                                    .flight.flightDuration
                                }
                              </Labels>
                              <span className="flex items-center justify-center">
                                <hr className="w-36 border border-slate-400" />
                                <MoveRight className="w-5 h-5 ml-[-3px] text-slate-400" />
                              </span>
                            </div>
                            <div className="flex flex-row mt-3">
                              <div>
                                <Image
                                  src="/assets/map.svg"
                                  alt="logo"
                                  width={50}
                                  height={50}
                                  className="w-5 h-5"
                                />
                              </div>
                              <div className="flex flex-col ml-2">
                                <Labels className="font-bold">
                                  {
                                    transaction.Transaction_Detail[0]
                                      .flight.destinationAirport.city
                                  }
                                </Labels>
                                <Labels className="mt-1">
                                  {
                                    transaction.Transaction_Detail[0]
                                      .flight.arrival.date
                                  }
                                </Labels>
                                <Labels className="mt-1">
                                  {
                                    transaction.Transaction_Detail[0]
                                      .flight.arrival.time
                                  }
                                </Labels>
                              </div>
                            </div>
                          </div>

                          <hr className="mt-5 border border-black/20" />

                          <div className="mt-3 flex flex-col sm:flex-row gap-3 items-center justify-between">
                            <div className="flex flex-col">
                              <Labels className="font-bold">
                                Booking Code:
                              </Labels>
                              <Labels className="mt-1">
                                {transaction.booking.code}
                              </Labels>
                            </div>
                            <div className="flex flex-col sm:ml-auto">
                              <Labels className="font-bold">
                                Class:
                              </Labels>
                              <Labels className="mt-1">
                                {
                                  transaction.Transaction_Detail[0]
                                    .seat.type
                                }
                              </Labels>
                            </div>
                            <div className="flex flex-col sm:ml-auto">
                              <Labels className="font-bold text-violet">
                                IDR{" "}
                                {transaction.totalPrice.toLocaleString()}
                              </Labels>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="w-full md:w-2/5 px-3">
            <div className="grow-0 w-full p-5 mt-3 rounded-sm shadow-xl border border-black/20">
              <div>
                <Labels className="font-bold">Booking Details</Labels>
              </div>
              <div className="flex flex-row gap-1 mt-2">
                <Labels>Booking Code:</Labels>
                <Labels className="text-violet font-bold">
                  6723y2GHK
                </Labels>
              </div>
              <div className="flex mt-3">
                <Labels className="font-bold">19:10</Labels>
                <Labels className="font-bold ml-auto text-violet">
                  Departure
                </Labels>
              </div>
              <Labels>5 June 2024</Labels>
              <Labels className="flex flex-col">
                Soekarno-Hatta International Airport
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
                      Jet Air
                    </Labels>
                    <Labels className="flex flex-col font-bold">
                      JT- 203
                    </Labels>
                  </div>
                  <div className="mt-5">
                    <Labels className="font-bold">
                      Information:
                    </Labels>
                    <Labels className="flex flex-col">
                      Penumpang 1: Mr. Harry Potter
                    </Labels>
                    <Labels>ID: 1234567</Labels>
                    <Labels className="flex flex-col">
                      Penumpang 2: Miss Hermione
                    </Labels>
                    <Labels>ID: 1234567</Labels>
                  </div>
                </div>
              </div>
              <hr className="mt-3 border border-black/20" />
              <div className="py-2">
                <div className="flex mt-3">
                  <Labels className="font-bold">21:10</Labels>
                  <Labels className="font-bold ml-auto text-violet">
                    Arrivals
                  </Labels>
                </div>
                <div>
                  <Labels>test</Labels>
                  <Labels className="flex flex-col">
                    5 June 2024
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
          </div>
        </div>
      </div>
    </>
  );
}
