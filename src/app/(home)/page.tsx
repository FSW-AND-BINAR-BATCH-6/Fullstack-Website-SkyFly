"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowRightIcon,
  CalendarDaysIcon,
  PlaneLandingIcon,
  PlaneTakeoffIcon,
  Search,
  Users,
} from "lucide-react";
import Image from "next/image";

import FormFindFlights from "./form";

export default function Home() {
  return (
    <main className="pb-40">
      <section className="flex">
        <div className="bg-primaryPurple min-h-40 mt-20 w-1/2 -z-50"></div>
        <div className="bg-primaryPurple-foreground min-h-40 mt-20 w-1/2 -z-50"></div>
      </section>

      <section className="w-[90%] mx-auto rounded-xl -z-40 mt-[-12rem] min-h-56 group relative flex justify-between overflow-hidden items-center shadow-xl">
        <Label className="w-full flex items-center justify-start pl-14 -z-40 h-[40vh] bg-gradient-to-r from-cream from-40% to-transparent cursor-pointer">
          <span className="w-2/3 text-4xl font-bold font-poppins italic">
            <span className="block mb-2">Discount for today</span>
            <span className="text-violet font-bold">85%!</span>
          </span>
        </Label>

        <Image
          src="/assets/bangkok.png"
          alt="logo"
          width={600}
          height={400}
          className="w-3/5 h-full object-cover absolute right-0 group-hover:scale-105 transition-transform duration-300 ease-in-out -z-50 "
        />
      </section>

      <section className="bg-white flex flex-col shadow-xl min-h-40 w-3/4 mx-auto rounded-xl mt-[-2rem] z-10">
        <FormFindFlights />
      </section>

      <section className="bg-red-200s w-3/4 mx-auto mt-14">
        <p className="font-bold text-lg">Favorite Destinations</p>
      </section>

      <section className="w-3/4 mx-auto mt-5">
        <div className="flex items-center gap-4">
          <Button>
            <Search className="w-4 h-4 mr-1" />
            View All
          </Button>
          <Button>
            <Search className="w-4 h-4 mr-1" />
            Asian
          </Button>
          <Button>
            <Search className="w-4 h-4 mr-1" />
            American
          </Button>
          <Button>
            <Search className="w-4 h-4 mr-1" />
            Australian
          </Button>
          <Button>
            <Search className="w-4 h-4 mr-1" />
            Europe
          </Button>
          <Button>
            <Search className="w-4 h-4 mr-1" />
            Africa
          </Button>
        </div>
      </section>

      <section className="w-3/4 mx-auto mt-10">
        <div className="flex gap-3">
          <div className="border border-gray-300 rounded-xl shadow-xl w-1/4 p-3 hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
            <Label className="bg-primaryPurple p-2 text-xs mb-[-35px] font-bold relative z-50 rounded-l-lg text-white float-end cursor-pointer">
              50% OFF
            </Label>
            <Image
              src="/assets/bangkok-card-image.png"
              alt="logo"
              width={300}
              height={200}
              className="object-cover mb-7 shadow-xl "
            />
            <Label className="font-bold flex items-center cursor-pointer">
              <span>Jakarta</span>
              <ArrowRightIcon className="h-4 w-4 mx-2" />
              <span>Bangkok</span>
            </Label>
            <Label className="text-xs font-bold text-violet cursor-pointer">
              AirAsia
            </Label>
            <Label className="block text-xs font-bold mt-2 cursor-pointer">
              20 - 30 March 2024
            </Label>
            <Label className="block text-xs font-bold mt-1 cursor-pointer">
              <span>Starting From</span>
              <span className="text-red-600 ml-3">IDR 950.000</span>
            </Label>
          </div>

          {/* looping card */}

          <div className="border border-gray-300 rounded-xl shadow-xl w-1/4 p-3 hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
            <Label className="bg-primaryPurple p-2 text-xs mb-[-35px] font-bold relative z-50 rounded-l-lg text-white float-end cursor-pointer">
              50% OFF
            </Label>
            <Image
              src="/assets/sydney-card-image.png"
              alt="logo"
              width={300}
              height={200}
              className="object-cover mb-7 shadow-xl "
            />
            <Label className="font-bold flex items-center cursor-pointer">
              <span>Jakarta</span>
              <ArrowRightIcon className="h-4 w-4 mx-2" />
              <span>Bangkok</span>
            </Label>
            <Label className="text-xs font-bold text-violet cursor-pointer">
              AirAsia
            </Label>
            <Label className="block text-xs font-bold mt-2 cursor-pointer">
              20 - 30 March 2024
            </Label>
            <Label className="block text-xs font-bold mt-1 cursor-pointer">
              <span>Starting From</span>
              <span className="text-red-600 ml-3">IDR 950.000</span>
            </Label>
          </div>

          <div className="border border-gray-300 rounded-xl shadow-xl w-1/4 p-3 hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
            <Label className="bg-primaryPurple p-2 text-xs mb-[-35px] font-bold relative z-50 rounded-l-lg text-white float-end cursor-pointer">
              50% OFF
            </Label>
            <Image
              src="/assets/bangkok-card-image.png"
              alt="logo"
              width={300}
              height={200}
              className="object-cover mb-7 shadow-xl "
            />
            <Label className="font-bold flex items-center cursor-pointer">
              <span>Jakarta</span>
              <ArrowRightIcon className="h-4 w-4 mx-2" />
              <span>Bangkok</span>
            </Label>
            <Label className="text-xs font-bold text-violet cursor-pointer">
              AirAsia
            </Label>
            <Label className="block text-xs font-bold mt-2 cursor-pointer">
              20 - 30 March 2024
            </Label>
            <Label className="block text-xs font-bold mt-1 cursor-pointer">
              <span>Starting From</span>
              <span className="text-red-600 ml-3">IDR 950.000</span>
            </Label>
          </div>

          <div className="border border-gray-300 rounded-xl shadow-xl w-1/4 p-3 hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
            <Label className="bg-primaryPurple p-2 text-xs mb-[-35px] font-bold relative z-50 rounded-l-lg text-white float-end cursor-pointer">
              50% OFF
            </Label>
            <Image
              src="/assets/sydney-card-image.png"
              alt="logo"
              width={300}
              height={200}
              className="object-cover mb-7 shadow-xl "
            />
            <Label className="font-bold flex items-center cursor-pointer">
              <span>Jakarta</span>
              <ArrowRightIcon className="h-4 w-4 mx-2" />
              <span>Bangkok</span>
            </Label>
            <Label className="text-xs font-bold text-violet cursor-pointer">
              AirAsia
            </Label>
            <Label className="block text-xs font-bold mt-2 cursor-pointer">
              20 - 30 March 2024
            </Label>
            <Label className="block text-xs font-bold mt-1 cursor-pointer">
              <span>Starting From</span>
              <span className="text-red-600 ml-3">IDR 950.000</span>
            </Label>
          </div>
        </div>
      </section>
    </main>
  );
}
