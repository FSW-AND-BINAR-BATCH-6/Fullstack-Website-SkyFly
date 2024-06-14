import { Labels } from "@/components/ui/labels";
import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ButtonCheckout from "./ButtonCheckout";

export default function PaymentPage() {
  return (
    <div className="w-4/5 mx-auto mt-3 pb-20">
      <div className="flex flex-row items-start flex-nowrap">
        <div className="grow-0 w-3/5 p-3 borders border-black">
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
                            Payment Code
                          </Labels>
                        </div>
                        <div className="mt-3 flex flex-row items-center">
                          <Labels className="font-bold">
                            10713013081210
                          </Labels>
                          <Labels className="font-bold cursor-pointer ml-auto text-violet">
                            Copy
                          </Labels>
                        </div>
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
                      <div className="px-20 mt-5">
                        <Label className="font-bold mb-1">
                          Card Number
                        </Label>
                        <Input
                          type="number"
                          placeholder="4480 0000 0000 0000"
                          className="w-full mb-3"
                        />
                        <Label className="font-bold mb-1">
                          Card Holder Name
                        </Label>
                        <Input
                          type="text"
                          placeholder="John Doe"
                          className="w-full"
                        />
                      </div>
                      <div className="px-20 mt-5 flex gap-3">
                        <div className="flex flex-col w-1/2">
                          <Label className="font-bold mb-1">
                            CVV
                          </Label>
                          <Input
                            type="number"
                            placeholder="000"
                            className="w-full mb-3"
                          />
                        </div>
                        <div className="flex flex-col w-1/2">
                          <Label className="font-bold mb-1">
                            Expiry date
                          </Label>
                          <Input
                            type="number"
                            placeholder="07/24"
                            className="w-full mb-3"
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            <ButtonCheckout />
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
