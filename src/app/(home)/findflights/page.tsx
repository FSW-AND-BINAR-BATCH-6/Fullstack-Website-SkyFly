import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function FindFlightsPage() {
  return (
    <>
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
            <Label className="font-bold">Jet Air - Economy</Label>
          </div>

          <div className="ml-auto mr-2 border border-gray-500 rounded-full">
            <ChevronDown className="w-5 h-5 cursor-pointer text-gray-500" />
          </div>
        </div>

        <div className="mt-9 ps-7">
          <div className="flex">
            <div className="flex mt-3 flex-col items-center">
              <Label className="font-bold">07:00</Label>
              <Label className="mt-2">JKT</Label>
            </div>

            <div className="mx-10 w-40">
              <div className="flex mt-3 flex-col items-center gap-1">
                <Label>4h 0m</Label>
                <div className="border-t border-gray-500 w-full"></div>
                <Label>Direct</Label>
              </div>
            </div>

            <div className="flex mt-3 flex-col items-center">
              <Label className="font-bold">11:00</Label>
              <Label className="mt-2">MLB</Label>
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
              <Label className="font-bold">IDR 4.950.000</Label>
              <Button className="mt-2">Book Now</Button>
            </div>
          </div>
        </div>
      </div>

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
            <Label className="font-bold">Jet Air - Economy</Label>
          </div>

          <div className="ml-auto mr-2 border border-gray-500 rounded-full">
            <ChevronDown className="w-5 h-5 cursor-pointer text-gray-500" />
          </div>
        </div>

        <div className="mt-9 ps-7">
          <div className="flex">
            <div className="flex mt-3 flex-col items-center">
              <Label className="font-bold">07:00</Label>
              <Label className="mt-2">JKT</Label>
            </div>

            <div className="mx-10 w-40">
              <div className="flex mt-3 flex-col items-center gap-1">
                <Label>4h 0m</Label>
                <div className="border-t border-gray-500 w-full"></div>
                <Label>Direct</Label>
              </div>
            </div>

            <div className="flex mt-3 flex-col items-center">
              <Label className="font-bold">11:00</Label>
              <Label className="mt-2">MLB</Label>
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
              <Label className="font-bold">IDR 4.950.000</Label>
              <Button className="mt-2">Book Now</Button>
            </div>
          </div>
        </div>
      </div>

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
            <Label className="font-bold">Jet Air - Economy</Label>
          </div>

          <div className="ml-auto mr-2 border border-gray-500 rounded-full">
            <ChevronDown className="w-5 h-5 cursor-pointer text-gray-500" />
          </div>
        </div>

        <div className="mt-9 ps-7">
          <div className="flex">
            <div className="flex mt-3 flex-col items-center">
              <Label className="font-bold">07:00</Label>
              <Label className="mt-2">JKT</Label>
            </div>

            <div className="mx-10 w-40">
              <div className="flex mt-3 flex-col items-center gap-1">
                <Label>4h 0m</Label>
                <div className="border-t border-gray-500 w-full"></div>
                <Label>Direct</Label>
              </div>
            </div>

            <div className="flex mt-3 flex-col items-center">
              <Label className="font-bold">11:00</Label>
              <Label className="mt-2">MLB</Label>
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
              <Label className="font-bold">IDR 4.950.000</Label>
              <Button className="mt-2">Book Now</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
