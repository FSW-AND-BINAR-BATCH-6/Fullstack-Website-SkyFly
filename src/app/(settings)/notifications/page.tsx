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

      <div className="w-4/5 mx-auto mt-5">
        <div className="w-4/5 p-5 flex rounded-sm shadow-xl border border-black/20">
          <div className="flex flex-col">
            <Image
              src="/assets/bell.svg"
              alt="logo"
              width={50}
              height={50}
              className="w-5 h-5 bg-cover"
            />
          </div>
          <div className="flex flex-col w-full ml-3">
            <div className="flex flex-row">
              <div>
                <Labels className="text-gray-500 float-start">
                  Promotion
                </Labels>
              </div>
              <div className="ml-auto flex flex-row">
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
              <Labels className="text-gray-500 float-start">
                Terms and Conditions apply!
              </Labels>
            </div>
          </div>
        </div>

        <div className="w-4/5 mt-4 p-5 flex rounded-sm shadow-xl border border-black/20">
          <div className="flex flex-col">
            <Image
              src="/assets/bell.svg"
              alt="logo"
              width={50}
              height={50}
              className="w-5 h-5 bg-cover"
            />
          </div>
          <div className="flex flex-col w-full ml-3">
            <div className="flex flex-row">
              <div>
                <Labels className="text-gray-500 float-start">
                  Notifications
                </Labels>
              </div>
              <div className="ml-auto flex flex-row">
                <Labels className="text-gray-500">
                  5 March, 14:04
                </Labels>
                <div className="w-3 h-3 rounded-full ml-2 bg-red-500"></div>
              </div>
            </div>
            <div className="my-1">
              <Labels className="text-base">
                There is a change in the flight schedule for booking
                code 45GT6. Check your <br /> travel schedule here!
              </Labels>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
