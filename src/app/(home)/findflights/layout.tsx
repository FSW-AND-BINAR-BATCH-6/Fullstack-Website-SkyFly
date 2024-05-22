import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  ArrowLeftIcon,
  ArrowUpDown,
  Box,
  ChevronRight,
  DollarSign,
  Heart,
} from "lucide-react";

export default function FindFlightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="w-4/5 mx-auto my-5">
        <Label className="text-xl font-bold">Choose a Flights</Label>
      </div>

      <div className="w-4/5 mx-auto mb-7">
        <div className="flex">
          <div className="w-4/5 bg-primaryPurple rounded-xl pl-5 p-3 flex items-center text-white shadow-lg">
            <ArrowLeftIcon className="w-5 h-5 cursor-pointer" />
            <Label className="ml-5 font-bold">
              JKT &#187; MLB - 2 Passengers - Economy
            </Label>
          </div>
          <Button className="w-1/5 bg-greens rounded-xl p-6 ml-3 flex items-center justify-center text-white">
            <Label className="font-bold">Reset Filters</Label>
          </Button>
        </div>
      </div>

      <div className="w-4/5 mx-auto">
        <div className="flex gap-5">
          <div className="border-r-2 border-gray-300  w-32">
            <Button className="flex flex-col text-xs py-6 bg-inherit text-black shadow-inherit hover:shadow-xl">
              <Label className="font-bold mb-1 cursor-pointer">
                Tuesday
              </Label>
              <span>01/03/2024</span>
            </Button>
          </div>
          <div className="border-r-2 border-gray-300  w-32">
            <Button className="flex flex-col text-xs py-6">
              <Label className="font-bold mb-1 cursor-pointer">
                Wednesday
              </Label>
              <span>02/03/2024</span>
            </Button>
          </div>
          <div className="border-r-2 border-gray-300  w-32">
            <Button className="flex flex-col text-xs py-6 bg-inherit text-black shadow-inherit hover:shadow-xl">
              <Label className="font-bold mb-1 cursor-pointer">
                Thursday
              </Label>
              <span>03/03/2024</span>
            </Button>
          </div>
          <div className="border-r-2 border-gray-300  w-32">
            <Button className="flex flex-col text-xs py-6 bg-inherit text-black shadow-inherit hover:shadow-xl">
              <Label className="font-bold mb-1 cursor-pointer">
                Friday
              </Label>
              <span>04/03/2024</span>
            </Button>
          </div>
          <div className="border-r-2 border-gray-300  w-32">
            <Button className="flex flex-col text-xs py-6 bg-inherit text-black shadow-inherit hover:shadow-xl">
              <Label className="font-bold mb-1 cursor-pointer">
                Saturday
              </Label>
              <span>05/03/2024</span>
            </Button>
          </div>
          <div className="border-r-2 border-gray-300  w-32">
            <Button className="flex flex-col text-xs py-6 bg-inherit text-black shadow-inherit hover:shadow-xl">
              <Label className="font-bold mb-1 cursor-pointer">
                Sunday
              </Label>
              <span>06/03/2024</span>
            </Button>
          </div>
          <div className="w-32">
            <Button className="flex flex-col text-xs py-6 bg-inherit text-black shadow-inherit hover:shadow-xl">
              <Label className="font-bold mb-1 cursor-pointer">
                Monday
              </Label>
              <span>07/03/2024</span>
            </Button>
          </div>
        </div>
      </div>

      <div>
        <div className="w-4/5 mx-auto border-t-2 border-gray-300 mt-5"></div>
      </div>

      <div className="w-4/5 mx-auto mt-5 flex items-center justify-end mb-7">
        <Button className="rounded-full bg-primaryPurple">
          <ArrowUpDown className="w-5 h-5 mr-2" />
          <Label className="cursor-pointer">Filter</Label>
        </Button>
      </div>

      <section className="flex flex-row gap-5 pb-20 items-start flex-nowrap">
        <section className="grow-0 h-screen ps-32 pe-14">
          <div className="border border-gray-300 shadow-xl p-5 w-56 rounded-xl">
            <div className="">
              <Label className="cursor-pointer font-bold">
                Filter
              </Label>
            </div>

            <div className="pt-5 flex items-center">
              <Box className="w-5 h-5 text-gray-500" />
              <Label className="cursor-pointer text-gray-500 font-bold ml-3">
                Transit
              </Label>
              <ChevronRight className="w-5 h-5 ml-auto text-gray-500" />
            </div>

            <hr className="border border-gray-300 mt-3 w-44" />

            <div className="pt-5 flex items-center">
              <Heart className="w-5 h-5 text-gray-500" />
              <Label className="cursor-pointer font-bold text-gray-500 ml-3">
                Facility
              </Label>
              <ChevronRight className="w-5 h-5 ml-auto text-gray-500" />
            </div>

            <hr className="border border-gray-300 mt-3 w-44" />

            <div className="pt-5 flex items-center">
              <DollarSign className="w-5 h-5 text-gray-500" />
              <Label className="cursor-pointer text-gray-500 font-bold ml-3">
                Price
              </Label>
              <ChevronRight className="w-5 h-5 ml-auto text-gray-500" />
            </div>
          </div>
        </section>
        <section className="grow pe-32">{children}</section>
      </section>
    </>
  );
}
