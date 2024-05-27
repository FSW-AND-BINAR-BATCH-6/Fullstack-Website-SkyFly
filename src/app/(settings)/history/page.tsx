import { Button } from "@/components/ui/button";
import { Labels } from "@/components/ui/labels";
import {
  ArrowLeftIcon,
  ArrowRight,
  ArrowUpDown,
  MapPin,
  MoveRight,
  Search,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HistoryPage() {
  return (
    <>
      <div className="w-4/5 mx-auto py-7">
        <Labels className="font-bold text-xl">Booking History</Labels>
        <div className="mt-5 flex flex-row items-center">
          <div className="w-4/5 bg-primaryPurple rounded-xl pl-5 p-3 flex items-center text-white shadow-lg">
            <Link href="/">
              <ArrowLeftIcon className="w-5 h-5 cursor-pointer" />
            </Link>
            <Labels className="ml-5">Home Page</Labels>
          </div>
          <div className="ml-auto">
            <Button className="rounded-full bg-primaryPurple">
              <ArrowUpDown className="w-5 h-5 mr-2" />
              <Labels className="cursor-pointer">Filter</Labels>
            </Button>
          </div>
          <div className="ml-10">
            <Search className="w-5 h-5 text-violet font-bold cursor-pointer" />
          </div>
        </div>
      </div>
      <hr className="border-black/20" />

      <div className="w-4/5 mx-auto mt-3 pb-20">
        <div className="flex flex-row items-start flex-nowrap">
          <div className="grow-0 w-3/5 p-3 borders border-black">
            <div className="flex flex-col">
              <div className="flex flex-col p-5 rounded-sm shadow-xl border border-black/20">
                <div>
                  <Labels className="font-bold">March 2024</Labels>
                </div>
                <div className="mt-3 p-5 border border-black/20 rounded-sm">
                  <div className="rounded-full bg-green-700 p-2 text-white w-16">
                    <Labels className="flex items-center justify-center">
                      Issued
                    </Labels>
                  </div>
                  <div className="flex flex-row justify-between items-center mt-3">
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
                        <Labels className="font-bold">Jakarta</Labels>
                        <Labels className="mt-1">5 March 2024</Labels>
                        <Labels className="mt-1">19:10</Labels>
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-col items-center justify-center">
                        <Labels>4h 0m</Labels>
                        <span className="flex items-center justify-center">
                          <hr className="w-36 border border-slate-400" />
                          <MoveRight className="w-5 h-5 ml-[-3px] text-slate-400" />
                        </span>
                      </div>
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
                          Melbourne
                        </Labels>
                        <Labels className="mt-1">5 March 2024</Labels>
                        <Labels className="mt-1">21:10</Labels>
                      </div>
                    </div>
                  </div>

                  <hr className="mt-5 border border-black/20" />

                  <div className="mt-3 flex flex-row items-center">
                    <div className="flex flex-col">
                      <Labels className="font-bold">
                        Booking Code:
                      </Labels>
                      <Labels className="mt-1">6723y2GHK</Labels>
                    </div>
                    <div className="flex flex-col ml-auto">
                      <Labels className="font-bold">Class:</Labels>
                      <Labels className="mt-1">Economy</Labels>
                    </div>
                    <div className="flex flex-col ml-auto">
                      <Labels className="font-bold text-violet">
                        IDR 9.850.000
                      </Labels>
                    </div>
                  </div>
                </div>
              </div>
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
    </>
  );
}
