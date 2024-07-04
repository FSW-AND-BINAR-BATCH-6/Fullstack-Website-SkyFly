"use client";

import { Labels } from "@/components/ui/labels";
import Image from "next/image";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
import {
  paymentBank,
  paymentCreditCard,
  paymentGopay,
  statusTransaction,
} from "./actions";
import FlightBooking from "./FlightBooking";

const creditCardSchema = z.object({
  card_number: z
    .string()
    .length(16, "Card number must be 16 digits")
    .max(16),
  card_exp_month: z.string().min(1).max(2),
  card_exp_year: z.string().length(4, "Year must be 4 digits").max(4),
  card_cvv: z.string().length(3, "CVV must be 3 digits").max(4),
});

interface PaymentData {
  token: string;
  flightId: string;
  orderer: {
    familyName: string;
    phoneNumber: string;
    fullName: string;
    email: string;
  };
  passengers: {
    title: string;
    fullName: string;
    dob: string;
    validityPeriod: string;
    familyName: string;
    citizenship: string;
    passport: string;
    issuingCountry: string;
  }[];
}

interface CreditCardData {
  card_number: string;
  card_exp_month: string;
  card_exp_year: string;
  card_cvv: string;
}

const PaymentPage = () => {
  const [data, setData] = useState<PaymentData | null>(null);
  const [bank, setBank] = useState("");
  const [creditCardData, setCreditCardData] =
    useState<CreditCardData | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "gopay" | "bank" | "creditCard" | null
  >(null);
  const [vaNumber, setVaNumber] = useState("");
  const [urlBarcode, setUrlBarcode] = useState("");
  const [urlCreditCard, setUrlCreditCard] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");
  const [isPolling, setIsPolling] = useState(true);
  const [checkoutDisabled, setCheckoutDisabled] = useState(false);
  const [isGopayDisabled, setGopayDisabled] = useState(false);
  const [isBankDisabled, setBankDisabled] = useState(false);
  const [isCreditCardDisabled, setCreditCardDisabled] =
    useState(false);

  const handleSelectPaymentMethod = (
    method: "gopay" | "bank" | "creditCard"
  ) => {
    toast.success(`Lets Checkout with ${method}!`);
    setSelectedPaymentMethod(method);
    setGopayDisabled(true);
    setBankDisabled(true);
    setCreditCardDisabled(true);
  };

  const form = useForm<z.infer<typeof creditCardSchema>>({
    resolver: zodResolver(creditCardSchema),
    defaultValues: {
      card_number: "",
      card_exp_month: "",
      card_exp_year: "",
      card_cvv: "",
    },
  });

  useEffect(() => {
    const data = window.localStorage.getItem("DataUsers");
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        // console.log(parsedData);
        setData(parsedData);
      } catch (error) {
        console.error("Failed to parse booking data", error);
      }
    }
  }, []);

  const fetchStatus = useCallback(async () => {
    const token = getCookie("token");
    if (typeof token !== "string") {
      toast.error("Token is missing or invalid.", {
        style: {
          fontWeight: "bold",
        },
      });
      return;
    }

    try {
      const requestData = { token, transactionId };
      const response = await statusTransaction(requestData);
      if (response.status) {
        const status = response.data.transaction_status;
        setTransactionStatus(status);
      }
    } catch (error) {
      console.error(error);
    }
  }, [transactionId]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isPolling) {
        fetchStatus();
      }
    }, 3000);

    const timeoutId = setTimeout(() => {
      setIsPolling(false);
      clearInterval(intervalId);
    }, 300000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [transactionId, isPolling, fetchStatus]);

  useEffect(() => {
    if (
      transactionStatus === "settlement" ||
      transactionStatus === "capture"
    ) {
      toast.success("Transaction is settled!", {
        style: {
          fontWeight: "bold",
        },
      });
      window.location.href = "/complete";
    }
  }, [transactionStatus]);

  const handleSelectChange = (value: string) => {
    setBank(value);
  };

  const handleSubmitFormCreditCard: SubmitHandler<CreditCardData> = (
    data
  ) => {
    setCreditCardData(data);
    // console.log(data);
    setCreditCardDisabled(true);
    setGopayDisabled(true);
    setBankDisabled(true);
    setSelectedPaymentMethod("creditCard");
    toast.success(`Lets Checkout with Credit Card!`);
  };

  const handleGopay = async () => {
    const token = getCookie("token");
    if (typeof token !== "string") {
      toast.error("Token is missing or invalid.", {
        style: {
          fontWeight: "bold",
        },
      });
      return;
    }

    const flightId = getCookie("bookingDetails");
    if (typeof flightId !== "string") {
      toast.error("Flight ID is missing or invalid.");
      return;
    }

    if (data) {
      const requestData = { ...data, token, flightId };

      try {
        const response = await paymentGopay(requestData);
        if (response.status) {
          toast.success(response.message, {
            style: {
              fontWeight: "bold",
            },
          });
          const url = response.data.action[0].url;
          setUrlBarcode(url);
          setTransactionId(response.data.transaction_id);
          setCheckoutDisabled(true);
        } else {
          toast.error(response.message, {
            style: {
              fontWeight: "bold",
            },
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (urlBarcode) {
      window.open(urlBarcode, "_blank");
    } else {
      return;
    }
  }, [urlBarcode]);

  const handleBank = async () => {
    const token = getCookie("token");
    if (typeof token !== "string") {
      toast.error("Token is missing or invalid.", {
        style: {
          fontWeight: "bold",
        },
      });
      return;
    }

    const flightId = getCookie("bookingDetails");
    if (typeof flightId !== "string") {
      toast.error("Flight ID is missing or invalid.");
      return;
    }

    if (data) {
      const requestData = { ...data, token, bank, flightId };
      // console.log(requestData);

      try {
        const response = await paymentBank(requestData);
        if (response.status) {
          toast.success(response.message, {
            style: {
              fontWeight: "bold",
            },
          });
          setVaNumber(response.data.va_numbers[0].va_number);
          setTransactionId(response.data.transaction_id);
          setCheckoutDisabled(true);
        } else {
          toast.error(response.message, {
            style: {
              fontWeight: "bold",
            },
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (vaNumber) {
      window.open(
        `https://simulator.sandbox.midtrans.com/bca/va/index`,
        "_blank"
      );
    } else {
      return;
    }
  }, [vaNumber]);

  const handleCreditCard = async () => {
    const token = getCookie("token");
    if (typeof token !== "string") {
      toast.error("Token is missing or invalid.", {
        style: {
          fontWeight: "bold",
        },
      });
      return;
    }

    const flightId = getCookie("bookingDetails");
    if (typeof flightId !== "string") {
      toast.error("Flight ID is missing or invalid.");
      return;
    }

    if (data && creditCardData) {
      const requestData = {
        ...data,
        token,
        ...creditCardData,
        flightId,
      };
      console.log(requestData);

      try {
        const response = await paymentCreditCard(requestData);
        if (response.status) {
          toast.success(response.message, {
            style: {
              fontWeight: "bold",
            },
          });
          setTransactionId(response.data.transaction_id);
          setUrlCreditCard(response.data.redirect_url);
          setCheckoutDisabled(true);
        } else {
          toast.error(response.message, {
            style: {
              fontWeight: "bold",
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (urlCreditCard) {
      window.open(urlCreditCard, "_blank");
    } else {
      return;
    }
  }, [urlCreditCard]);

  return (
    <div className="w-full sm:w-4/5 mx-auto mt-3 pb-20">
      <div className="flex flex-col lg:flex-row items-start lg:flex-nowrap">
        <div className="w-full lg:w-3/5 p-3">
          <div className="flex flex-col">
            <div className="flex flex-col p-5 rounded-sm shadow-xl border border-black/20">
              <div>
                <Labels className="font-bold">Payment Details</Labels>
              </div>
              <div className="mt-3 px-3">
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="bg-black text-white px-3 rounded-xl">
                      Gopay
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="py-3 px-10">
                        <div className="flex items-center">
                          <Labels className="font-bold text-xl">
                            GoPay
                          </Labels>
                          <Image
                            src={"/assets/gopay.svg"}
                            alt="logo"
                            width={200}
                            height={200}
                            className="w-10 h-10 ml-auto bg-cover"
                          />
                        </div>
                        <div className="flex items-center justify-center">
                          <Image
                            src={"/assets/qrcode.png"}
                            alt="logo"
                            width={200}
                            height={200}
                            className="w-50 h-50 bg-cover"
                          />
                        </div>
                        <div>{urlBarcode && <p>{urlBarcode}</p>}</div>
                        <Button
                          onClick={() =>
                            handleSelectPaymentMethod("gopay")
                          }
                          disabled={isGopayDisabled}
                          className="w-full mt-5"
                        >
                          Pay With Gopay
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="bg-black text-white px-3 mt-2 rounded-xl">
                      Virtual Account
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="py-3 px-10">
                        <div className="flex items-center">
                          <div>
                            <Image
                              src={"/assets/payment-full.svg"}
                              alt="logo"
                              width={200}
                              height={200}
                              className="w-60 h-10 bg-cover"
                            />
                          </div>
                        </div>
                        <div className="mt-3">
                          <Labels className="font-bold">
                            Choose Bank
                          </Labels>
                        </div>
                        <div className="mt-3 flex flex-row items-center">
                          <Select
                            value={bank}
                            onValueChange={handleSelectChange}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a Bank" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>
                                  Select a Bank
                                </SelectLabel>
                                <SelectItem value="bca">
                                  BCA
                                </SelectItem>
                                <SelectItem value="bri">
                                  BRI
                                </SelectItem>
                                <SelectItem value="bni">
                                  BNI
                                </SelectItem>
                                <SelectItem value="permata">
                                  Permata
                                </SelectItem>
                                <SelectItem value="cimb">
                                  CIMB
                                </SelectItem>
                                <SelectItem value="mandiri">
                                  MANDIRI
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        {vaNumber && (
                          <div className="flex flex-col justify-center items-center mt-5">
                            <Labels className="font-bold">
                              Virtual Account Number
                            </Labels>
                            <Labels className="mt-2">
                              {vaNumber}
                            </Labels>
                          </div>
                        )}
                        <Button
                          onClick={() =>
                            handleSelectPaymentMethod("bank")
                          }
                          disabled={isBankDisabled}
                          className="w-full mt-5"
                        >
                          Pay With Virtual Account
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="bg-violet text-white px-3 mt-2 rounded-xl">
                      Credit Card
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex items-center justify-center gap-3 mt-3">
                        <Image
                          src={"/assets/mastercard.svg"}
                          alt="logo"
                          width={200}
                          height={200}
                          className="w-10 h-10"
                        />
                        <Image
                          src={"/assets/visa.svg"}
                          alt="logo"
                          width={200}
                          height={200}
                          className="w-10 h-10"
                        />
                        <Image
                          src={"/assets/amex.svg"}
                          alt="logo"
                          width={200}
                          height={200}
                          className="w-10 h-10"
                        />
                        <Image
                          src={"/assets/paypal.svg"}
                          alt="logo"
                          width={200}
                          height={200}
                          className="w-10 h-10"
                        />
                      </div>
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(
                            handleSubmitFormCreditCard
                          )}
                        >
                          <div className="px-5 sm:px-20 mt-5">
                            <FormField
                              control={form.control}
                              name="card_number"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor="card_number">
                                    Card Number
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      id="card_number"
                                      {...field}
                                      type="number"
                                      placeholder="5264 2210 3887 4659"
                                      maxLength={16}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="px-5 sm:px-20 mt-5 flex gap-3">
                            <div className="flex flex-col w-1/2">
                              <FormField
                                control={form.control}
                                name="card_exp_month"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel htmlFor="card_exp_month">
                                      Exp Month
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        id="card_exp_month"
                                        {...field}
                                        type="number"
                                        placeholder="10"
                                        maxLength={2}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="flex flex-col w-1/2">
                              <FormField
                                control={form.control}
                                name="card_exp_year"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel htmlFor="card_exp_year">
                                      Exp Year
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        id="card_exp_year"
                                        {...field}
                                        type="number"
                                        placeholder="2025"
                                        maxLength={4}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="flex flex-col w-1/2">
                              <FormField
                                control={form.control}
                                name="card_cvv"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel htmlFor="card_cvv">
                                      CVV
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        id="card_cvv"
                                        {...field}
                                        type="number"
                                        placeholder="123"
                                        maxLength={4}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                          <div className="w-full px-5 sm:px-20 mt-5">
                            <Button
                              type="submit"
                              disabled={isCreditCardDisabled}
                              className="w-full"
                            >
                              Pay With Credit Card
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {selectedPaymentMethod === "gopay" && (
              <Button className="w-full mt-5" onClick={handleGopay}>
                Checkout With Gopay
              </Button>
            )}
            {selectedPaymentMethod === "bank" && (
              <Button
                className="w-full mt-5"
                disabled={checkoutDisabled}
                onClick={handleBank}
              >
                Checkout With Virtual Account
              </Button>
            )}
            {selectedPaymentMethod === "creditCard" && (
              <Button
                className="w-full mt-5"
                onClick={handleCreditCard}
              >
                Checkout With Credit Card
              </Button>
            )}
            {selectedPaymentMethod === null && (
              <Button className="w-full mt-5" disabled>
                Checkout
              </Button>
            )}
          </div>
        </div>

        <FlightBooking />
      </div>
    </div>
  );
};

export default PaymentPage;
