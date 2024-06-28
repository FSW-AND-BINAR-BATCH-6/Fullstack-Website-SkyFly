"use client";

import { Button } from "@/components/ui/button";
import { Labels } from "@/components/ui/labels";
import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Flight } from "./actions";
import Discount from "./Diskon";
import Paginations from "./Pagination";
import FormFindFlights from "../form";

export default function Home() {
  const [data, setData] = useState<Flight[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setitemPerPage] = useState(4);
  const [filteredIndexes, setFilteredIndexes] = useState<number[]>(
    []
  );
  const [filteredData, setFilteredData] = useState<Flight[]>([]);

  const lastItemIndex = currentPage * itemPerPage;
  const firstItemIndex = lastItemIndex - itemPerPage;
  const currentItems = filteredData.slice(
    firstItemIndex,
    lastItemIndex
  );

  let pages = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredData.length / itemPerPage);
    i++
  ) {
    pages.push(i);
  }

  const handleFilter = () => {
    const randomIndexes = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * data.length)
    );
    setFilteredIndexes(randomIndexes);
    const newFilteredData = data.filter((_, index) =>
      randomIndexes.includes(index)
    );
    setFilteredData(newFilteredData);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <main className="pb-20">
      <section className="flex md:flex-row">
        <div className="bg-primaryPurple min-h-40 mt-20 w-full md:w-1/2 -z-50"></div>
        <div className="bg-primaryPurple-foreground min-h-40 mt-20 w-full md:w-1/2 -z-50"></div>
      </section>

      <section className="w-[90%] mx-auto rounded-xl -z-40 mt-[-12rem] min-h-56 group relative flex flex-col md:flex-row justify-between overflow-hidden items-center shadow-xl">
        <Labels className="w-full flex items-center justify-start pl-14 -z-40 h-[40vh] bg-gradient-to-r from-cream from-40% to-transparent cursor-pointer">
          <span className="w-full md:w-2/3 text-2xl md:text-4xl font-bold font-poppins italic">
            <span className="block mb-2">Discount for today</span>
            <span className="text-violet font-bold">85%!</span>
          </span>
        </Labels>

        <Image
          src="/assets/bangkok.png"
          alt="logo"
          width={600}
          height={400}
          priority={false}
          className="w-full md:w-3/5 h-full object-cover absolute right-0 group-hover:scale-105 transition-transform duration-300 ease-in-out -z-50 "
        />
      </section>

      <section className="bg-white flex flex-col shadow-xl min-h-40 w-[90%] md:w-3/4 mx-auto rounded-xl mt-[-2rem] z-10">
        <FormFindFlights />
      </section>

      <section className="w-[90%] md:w-3/4 mx-auto mt-14">
        <p className="font-bold text-lg">Favorite Destinations</p>
      </section>

      <section className="w-[90%] md:w-3/4 mx-auto mt-5">
        <div className="flex flex-wrap gap-1 items-center sm:gap-4">
          <Button onClick={handleFilter}>
            <Search className="w-4 h-4 mr-1" />
            View All
          </Button>
          <Button onClick={handleFilter}>
            <Search className="w-4 h-4 mr-1" />
            Asian
          </Button>
          <Button onClick={handleFilter}>
            <Search className="w-4 h-4 mr-1" />
            American
          </Button>
          <Button onClick={handleFilter}>
            <Search className="w-4 h-4 mr-1" />
            Australian
          </Button>
          <Button onClick={handleFilter}>
            <Search className="w-4 h-4 mr-1" />
            Europe
          </Button>
          <Button onClick={handleFilter}>
            <Search className="w-4 h-4 mr-1" />
            Africa
          </Button>
        </div>
      </section>

      <section className="w-[90%] gap-3 md:w-3/4 mx-auto mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <Discount
            currentPage={currentPage}
            currentItems={currentItems}
            setData={setData}
            setCurrentPage={setCurrentPage}
            setFilteredData={setFilteredData}
          />
        </div>
      </section>

      <section className="w-[90%] md:w-3/4 mx-auto mt-10">
        <Paginations
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          pages={pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </section>
    </main>
  );
}
