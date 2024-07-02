"use client";
import { Button } from "@/components/ui/button";
import { Labels } from "@/components/ui/labels";
import {
  ArrowLeftIcon,
  ArrowUpDown,
  MoveRight,
  Search,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import {
  getTransaction,
  Transaction,
  PrintTicket,
  VirtualAccount,
  TransactionDetail,
  Data,
  cancelPayment,
  handleContinuePayment,
} from "../actions";

export default function HistoryPage() {
  const [transactionHistory, setTransactionHistory] = useState<
    Data[]
  >([]);
  const [transactionIndex, setTransactionIndex] = useState<number>(0);
  const [transactionDetailCard, setTransactionDetailCard] =
    useState<Transaction>();
  const [transationStatus, setTrasactionStatus] = useState<
    string | undefined
  >(undefined);
  const [vaNumber, setVaNumber] = useState<string>();
  const [tickets, setTickets] = useState();

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    } as const;
    return date.toLocaleDateString("en-US", options);
  };

  const formatPrice = (price: number) => {
    const formattedPrice = price.toLocaleString("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return `IDR ${formattedPrice.replace(/,/g, ".")}`;
  };

  const handleSelectedTransactionHistory = (index: number) => {
    setTransactionIndex(index);
  };

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = getCookie("token") as string | undefined;
        if (token) {
          const data = await getTransaction(token);
          setTransactionHistory(data);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    getToken();
  }, [transationStatus]);

  const checkStatus = (status: string) => {
    const data = (className: string, status: string) => {
      return (
        <div className={className}>
          <Labels className="flex items-center justify-center">
            {status}
          </Labels>
        </div>
      );
    };
    if (status == "settlement" || status == "capture") {
      return data(
        "rounded-full bg-green-700 p-2 text-white w-16",
        "Issued"
      );
    }
    if (status == "expire" || status == "cancel") {
      return data(
        "rounded-full bg-red-700 p-2 text-white w-20",
        "Cancelled"
      );
    }
    if (status == "pending") {
      return data(
        "rounded-full bg-gray-600 p-2 text-white w-20",
        "Pending"
      );
    }
  };

  const calculatePassengerDetails = (
    transactionDetails: TransactionDetail
  ) => {
    const passengerCount = { adult: 0, children: 0, baby: 0 };
    const totalPrice = { adult: 0, children: 0, baby: 0, total: 0 };

    if (transactionDetails.passengerCategory === "ADULT") {
      passengerCount.adult++;
      totalPrice.adult += transactionDetails.totalPrice;
    } else if (transactionDetails.passengerCategory === "CHILD") {
      passengerCount.children++;
      totalPrice.children += transactionDetails.totalPrice;
    } else if (transactionDetails.passengerCategory === "BABY") {
      passengerCount.baby++;
      totalPrice.baby += transactionDetails.totalPrice;
    }
    totalPrice.total += transactionDetails.totalPrice;

    return {
      passengerCount,
      totalPrice,
    };
  };

  const handleCancelPayment = async (orderId: string) => {
    try {
      const token = getCookie("token") as string | undefined;
      if (token) {
        await cancelPayment(token, orderId);
        setTrasactionStatus("true");
        setVaNumber(undefined);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handlePrintTicket = async (orderId: string) => {
    try {
      const token = getCookie("token") as string | undefined;
      if (token) {
        const data = await PrintTicket(token, orderId);
        setTickets(data);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const continuePaymentBankTransfer = async (orderId: string) => {
    try {
      const token = getCookie("token") as string | undefined;
      if (token) {
        const response = await handleContinuePayment(token, orderId);
        const vaNumber = response.map(
          (data: VirtualAccount) => data.va_number
        );
        setVaNumber(vaNumber);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const printOrCancelButton = (
    status: string,
    orderId: string,
    transactionId: string
  ) => {
    if (status == "pending") {
      return (
        <>
          <Button
            className="w-40 bg-red-700"
            onClick={() => handleCancelPayment(orderId)}
          >
            Cancel payment
          </Button>
          <Button
            className="w-40"
            onClick={() => continuePaymentBankTransfer(orderId)}
          >
            Continue Payment
          </Button>
        </>
      );
    } else if (status == "settlement" || status == "capture") {
      return (
        <Button
          className="w-full"
          onClick={() => handlePrintTicket(transactionId)}
        >
          Print Ticket
        </Button>
      );
    }
  };

  const openInNewTab = (htmlContent: string) => {
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  useEffect(() => {
    if (tickets) {
      openInNewTab(tickets);
    }
  }, [tickets]);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleBookingDetail = (transaction: Transaction) => {
    setTransactionDetailCard(transaction);
    console.log(transactionDetailCard);
  };

  const bookingDetailCard = (transactionDetailCard: Transaction) => {
    return (
      <div className="w-full md:w-2/5 px-3">
        <div className="grow-0 w-full p-5 mt-3 rounded-sm shadow-xl border border-black/20">
          <div>
            <Labels className="font-bold">Flight Details</Labels>
          </div>
          <div>
            <Labels className="font-bold">
              Booking Code: {transactionDetailCard.booking.code}
            </Labels>
          </div>
          <div className="flex mt-3">
            <Labels className="font-bold">
              {
                transactionDetailCard.Transaction_Detail[0].flight
                  .departure.time
              }
            </Labels>
            <Labels className="font-bold ml-auto text-violet">
              Departure
            </Labels>
          </div>
          <Labels>
            {formatDate(
              transactionDetailCard.Transaction_Detail[0].flight
                .departure.date
            )}
          </Labels>
          <Labels className="flex flex-col">
            {
              transactionDetailCard.Transaction_Detail[0].flight
                .departureAirport.name
            }
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
                  {
                    transactionDetailCard.Transaction_Detail[0].flight
                      .airline.name
                  }{" "}
                  -{" "}
                  {
                    transactionDetailCard.Transaction_Detail[0].seat
                      .type
                  }
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
              <Labels className="font-bold">
                {
                  transactionDetailCard.Transaction_Detail[0].flight
                    .arrival.time
                }
              </Labels>
              <Labels className="font-bold ml-auto text-violet">
                Arrivals
              </Labels>
            </div>
            <div>
              <Labels>
                {formatDate(
                  transactionDetailCard.Transaction_Detail[0].flight
                    .arrival.date
                )}
              </Labels>
              <Labels className="flex flex-col">
                {
                  transactionDetailCard.Transaction_Detail[0].flight
                    .destinationAirport.name
                }
              </Labels>
            </div>
          </div>
          <hr className="mt-3 border border-black/20" />
          <div className="py-2">
            <Labels className="font-bold">Total Price</Labels>
            {transactionDetailCard.Transaction_Detail.map(
              (data: TransactionDetail) => {
                const passangerData = calculatePassengerDetails(data);
                return (
                  <React.Fragment key={data.id}>
                    {passangerData.passengerCount.adult > 0 && (
                      <div
                        className="flex mt-2"
                        key={`${data.id}-adult`}
                      >
                        <Labels>
                          {passangerData.passengerCount.adult} Adults
                        </Labels>
                        <Labels className="ml-auto">
                          {formatPrice(
                            passangerData.totalPrice.adult
                          )}
                        </Labels>
                      </div>
                    )}
                    {passangerData.passengerCount.children > 0 && (
                      <div
                        className="flex mt-2"
                        key={`${data.id}-children`}
                      >
                        <Labels>
                          {passangerData.passengerCount.children}{" "}
                          Children
                        </Labels>
                        <Labels className="ml-auto">
                          {formatPrice(
                            passangerData.totalPrice.children
                          )}
                        </Labels>
                      </div>
                    )}
                    {passangerData.passengerCount.baby > 0 && (
                      <div
                        className="flex mt-2"
                        key={`${data.id}-baby`}
                      >
                        <Labels>
                          {passangerData.passengerCount.baby} Baby
                        </Labels>
                        <Labels className="ml-auto">
                          {formatPrice(passangerData.totalPrice.baby)}
                        </Labels>
                      </div>
                    )}
                  </React.Fragment>
                );
              }
            )}

            <div className="flex mt-2">
              <Labels>Tax</Labels>
              <Labels className="ml-auto">
                {formatPrice(transactionDetailCard.tax)}
              </Labels>
            </div>
          </div>
          <hr className="mt-3 border border-black/20" />
          <div className="flex mt-3">
            <Labels className="font-bold text-lg">Total</Labels>
            <Labels className="ml-auto text-lg font-bold text-violet">
              {formatPrice(transactionDetailCard.totalPrice)}
            </Labels>
          </div>
          <div className="mt-5 flex justify-center space-x-4">
            {printOrCancelButton(
              transactionDetailCard.status,
              transactionDetailCard.orderId,
              transactionDetailCard.id
            )}
          </div>
          {vaNumber && (
            <div className="flex flex-col justify-center items-center mt-5">
              <Labels className="font-bold">
                Virtual Account Number
              </Labels>
              <Labels className="mt-2">{vaNumber}</Labels>
            </div>
          )}
        </div>
      </div>
    );
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
        {Array.isArray(transactionHistory) &&
        transactionHistory.length > 0 ? (
          transactionHistory.map((transaction, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-start flex-wrap"
            >
              <div className="grow-0 w-full md:w-3/5 p-3">
                <div className="flex flex-col">
                  <div className="flex flex-col p-5 rounded-sm shadow-xl border border-black/20">
                    <div>
                      <Labels className="font-bold">
                        {transaction.date}
                      </Labels>
                    </div>
                    {transaction.transactions.map(
                      (
                        transactionDetail: any,
                        transactionIndex: number
                      ) => (
                        <div
                          key={transactionIndex}
                          className="mt-3 p-5 border border-black/20 rounded-sm"
                          onClick={() => {
                            handleSelectedTransactionHistory(
                              transactionIndex
                            );
                            handleBookingDetail(transactionDetail);
                            scrollTop();
                          }}
                        >
                          {checkStatus(transactionDetail.status)}
                          {transactionDetail.Transaction_Detail.map(
                            (
                              flightData: any,
                              flightIndex: number
                            ) => (
                              <div
                                key={flightIndex}
                                className="flex flex-col gap-3 sm:gap-0 sm:flex-row justify-between items-center mt-3"
                              >
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
                                        flightData.flight
                                          .departureAirport.city
                                      }
                                    </Labels>
                                    <Labels className="mt-1">
                                      {formatDate(
                                        flightData.flight.departure
                                          .date
                                      )}
                                    </Labels>
                                    <Labels className="mt-1">
                                      {
                                        flightData.flight.departure
                                          .time
                                      }
                                    </Labels>
                                  </div>
                                </div>
                                <div className="flex flex-col items-center justify-center mt-3 md:mt-0">
                                  <Labels>
                                    {flightData.flight.flightDuration}
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
                                        flightData.flight
                                          .destinationAirport.city
                                      }
                                    </Labels>
                                    <Labels className="mt-1">
                                      {formatDate(
                                        flightData.flight.departure
                                          .date
                                      )}
                                    </Labels>
                                    <Labels className="mt-1">
                                      {
                                        flightData.flight.departure
                                          .time
                                      }
                                    </Labels>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                          <hr className="mt-5 border border-black/20" />

                          <div className="mt-3 flex flex-col sm:flex-row gap-3 items-center justify-between">
                            <div className="flex flex-col">
                              <Labels className="font-bold">
                                Booking Code:
                              </Labels>
                              <Labels className="mt-1">
                                {transactionDetail.booking.code}
                              </Labels>
                            </div>
                            <div className="flex flex-col sm:ml-auto">
                              <Labels className="font-bold">
                                Class:
                              </Labels>
                              <Labels className="mt-1">
                                Economy
                              </Labels>
                            </div>
                            <div className="flex flex-col sm:ml-auto">
                              <Labels className="font-bold text-violet">
                                {formatPrice(
                                  transactionDetail.totalPrice
                                )}
                              </Labels>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
              {transactionDetailCard && index == 0
                ? bookingDetailCard(transactionDetailCard)
                : ""}
            </div>
          ))
        ) : (
          <div className="w-full sm:w-4/5 mx-auto">
            <div className="px-5 sm:px-10 pt-10 pb-20 flex flex-col items-center justify-center">
              <Image
                src="/assets/payment-complete.svg"
                alt="logo"
                width={300}
                height={300}
                className="w-40 h-40 sm:w-50 sm:h-50 bg-cover"
              />
              <div className="mt-5 text-center">
                <Labels className="font-bold text-lg text-violet">
                  Oops! Order history is empty!
                </Labels>
                <Labels className="flex flex-col font-bold mt-1">
                  You have not made a flight booking
                </Labels>
              </div>
              <div className="mt-5 flex flex-col items-center">
                <Button className="mt-3 w-40 sm:w-60">
                  Find Other Flights
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
