import { Button } from "@/components/ui/button";
import { Labels } from "@/components/ui/labels";
import { ArrowLeftIcon, ArrowUpDown, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NotificationPage() {
  return (
    <>
      <div className="w-4/5 mx-auto py-7">
        <Labels className="font-bold text-xl">Notifications</Labels>
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

      <div className="w-full px-5 md:w-4/5 mx-auto mt-5">
        <div className="w-full md:w-4/5 p-5 gap-3 flex flex-row rounded-sm shadow-xl border border-black/20">
          <div className="flex-shrink-0 md:mb-0 md:mr-4">
            <Image
              src="/assets/bell.svg"
              alt="logo"
              width={50}
              height={50}
              className="w-6 h-6 sm:w-12 sm:h-12 bg-cover"
            />
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-row">
              <div>
                <Labels className="text-gray-500">Promotion</Labels>
              </div>
              <div className="mt-2 md:mt-0 ml-auto flex flex-row">
                <Labels className="text-gray-500">
                  20 March, 14:04
                </Labels>
                <div className="w-3 h-3 rounded-full ml-2 bg-green-500"></div>
              </div>
            </div>
            <div className="my-1">
              <Labels className="text-base">
                Get 50% Off Tickets!
              </Labels>
            </div>
            <div>
              <Labels className="text-gray-500">
                Terms and Conditions apply!
              </Labels>
            </div>
          </div>
        </div>

        <div className="w-full md:w-4/5 mt-4 p-5 gap-3 flex flex-row rounded-sm shadow-xl border border-black/20">
          <div className="flex-shrink-0 md:mb-0 md:mr-4">
            <Image
              src="/assets/bell.svg"
              alt="logo"
              width={50}
              height={50}
              className="w-6 h-6 sm:w-12 sm:h-12 bg-cover"
            />
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-row">
              <div>
                <Labels className="text-gray-500">
                  Notifications
                </Labels>
              </div>
              <div className="mt-2 md:mt-0 ml-auto flex flex-row">
                <Labels className="text-gray-500">
                  5 March, 14:04
                </Labels>
                <div className="w-3 h-3 rounded-full ml-2"></div>
              </div>
            </div>
            <div className="my-1">
              <Labels className="text-sm">
                There is a change in the flight schedule for booking
                code 45GT6. Check your{" "}
                <br className="hidden md:block" /> travel schedule
                here!
              </Labels>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
