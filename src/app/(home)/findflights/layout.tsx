import { Button } from "@/components/ui/button";
import { Labels } from "@/components/ui/labels";
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
      <div className="w-full md:w-4/5 mx-auto my-5 px-4">
        <Labels className="text-xl font-bold text-center">
          Choose a Flights
        </Labels>
      </div>

      <div className="w-full md:w-4/5 mx-auto mb-7 px-4">
        <div className="flex flex-col md:flex-row items-center md:items-start sm:gap-4">
          <div className="w-full md:w-4/5 bg-primaryPurple rounded-xl p-3 flex items-center text-white shadow-lg mb-3 md:mb-0">
            <ArrowLeftIcon className="w-5 h-5 cursor-pointer" />
            <Labels className="ml-5 font-bold text-center md:text-left">
              JKT &#187; MLB - 2 Passengers - Economy
            </Labels>
          </div>
          <Button className="w-full md:w-1/5 bg-greens rounded-xl p-6 flex items-center justify-center text-white">
            <Labels className="font-bold">Reset Filters</Labels>
          </Button>
        </div>
      </div>

      <div className="w-full md:w-4/5 mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-5">
          <div className="flex justify-center w-full md:w-32 mb-3 md:mb-0">
            <Button className="flex flex-col text-xs py-6 bg-inherit text-black shadow-inherit hover:shadow-xl border-b-2 md:border-b-0 md:border-r-2 border-gray-300">
              <Labels className="font-bold mb-1 cursor-pointer text-center md:text-left">
                Tuesday
              </Labels>
              <span className="text-center md:text-left">
                01/03/2024
              </span>
            </Button>
          </div>
          <div className="flex justify-center w-full md:w-32 mb-3 md:mb-0">
            <Button className="flex flex-col text-xs py-6 bg-inherit text-black shadow-inherit hover:shadow-xl border-b-2 md:border-b-0 md:border-r-2 border-gray-300">
              <Labels className="font-bold mb-1 cursor-pointer text-center md:text-left">
                Wednesday
              </Labels>
              <span className="text-center md:text-left">
                02/03/2024
              </span>
            </Button>
          </div>
          <div className="flex justify-center w-full md:w-32 mb-3 md:mb-0">
            <Button className="flex flex-col text-xs py-6 bg-inherit text-black shadow-inherit hover:shadow-xl border-b-2 md:border-b-0 md:border-r-2 border-gray-300">
              <Labels className="font-bold mb-1 cursor-pointer text-center md:text-left">
                Thursday
              </Labels>
              <span className="text-center md:text-left">
                03/03/2024
              </span>
            </Button>
          </div>
          <div className="flex justify-center w-full md:w-32 mb-3 md:mb-0">
            <Button className="flex flex-col text-xs py-6 bg-inherit text-black shadow-inherit hover:shadow-xl border-b-2 md:border-b-0 md:border-r-2 border-gray-300">
              <Labels className="font-bold mb-1 cursor-pointer text-center md:text-left">
                Friday
              </Labels>
              <span className="text-center md:text-left">
                04/03/2024
              </span>
            </Button>
          </div>
          <div className="flex justify-center w-full md:w-32 mb-3 md:mb-0">
            <Button className="flex flex-col text-xs py-6 bg-inherit text-black shadow-inherit hover:shadow-xl border-b-2 md:border-b-0 md:border-r-2 border-gray-300">
              <Labels className="font-bold mb-1 cursor-pointer text-center md:text-left">
                Saturday
              </Labels>
              <span className="text-center md:text-left">
                05/03/2024
              </span>
            </Button>
          </div>
          <div className="flex justify-center w-full md:w-32 mb-3 md:mb-0">
            <Button className="flex flex-col text-xs py-6 bg-inherit text-black shadow-inherit hover:shadow-xl border-b-2 md:border-b-0 md:border-r-2 border-gray-300">
              <Labels className="font-bold mb-1 cursor-pointer text-center md:text-left">
                Sunday
              </Labels>
              <span className="text-center md:text-left">
                06/03/2024
              </span>
            </Button>
          </div>
          <div className="flex justify-center w-full md:w-32 mb-3 md:mb-0">
            <Button className="flex flex-col text-xs py-6 bg-inherit text-black shadow-inherit hover:shadow-xl">
              <Labels className="font-bold mb-1 cursor-pointer text-center md:text-left">
                Monday
              </Labels>
              <span className="text-center md:text-left">
                07/03/2024
              </span>
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full md:w-4/5 mx-auto border-t-2 border-gray-300 mt-5 px-4"></div>

      <div className="w-full md:w-4/5 mx-auto mt-5 flex items-center justify-end mb-7 px-4">
        <Button className="rounded-full bg-primaryPurple flex items-center justify-center">
          <ArrowUpDown className="w-5 h-5 mr-2" />
          <Labels className="cursor-pointer">Filter</Labels>
        </Button>
      </div>

      <section className="flex flex-col lg:flex-row gap-5 pb-20 items-start flex-nowrap px-4">
        <section className="w-full lg:grow-0 lg:w-auto h-auto lg:h-screen ps-0 lg:ps-32 pe-0 lg:pe-14 mb-5 lg:mb-0">
          <div className="border border-gray-300 shadow-xl p-5 w-full lg:w-56 rounded-xl mb-5 lg:mb-0">
            <div>
              <Labels className="cursor-pointer font-bold">
                Filter
              </Labels>
            </div>

            <div className="pt-5 flex items-center">
              <Box className="w-5 h-5 text-gray-500" />
              <Labels className="cursor-pointer text-gray-500 font-bold ml-3">
                Transit
              </Labels>
              <ChevronRight className="w-5 h-5 ml-auto text-gray-500" />
            </div>

            <hr className="border border-gray-300 mt-3 w-full lg:w-44" />

            <div className="pt-5 flex items-center">
              <Heart className="w-5 h-5 text-gray-500" />
              <Labels className="cursor-pointer font-bold text-gray-500 ml-3">
                Facility
              </Labels>
              <ChevronRight className="w-5 h-5 ml-auto text-gray-500" />
            </div>

            <hr className="border border-gray-300 mt-3 w-full lg:w-44" />

            <div className="pt-5 flex items-center">
              <DollarSign className="w-5 h-5 text-gray-500" />
              <Labels className="cursor-pointer text-gray-500 font-bold ml-3">
                Price
              </Labels>
              <ChevronRight className="w-5 h-5 ml-auto text-gray-500" />
            </div>
          </div>
        </section>
        <section className="w-full lg:grow lg:pe-32">
          {children}
        </section>
      </section>
    </>
  );
}
