import "../globals.css";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import Timer from "./booking/components/Timer";
import BreadcrumbSection from "./booking/components/BreadsCrumb";
import IsLogin from "../(home)/IsLogin";

export default function LoggedinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <nav className="border-b border-black/20 p-5 flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col md:flex-row items-center w-full md:w-auto">
          <div className="flex items-center justify-center md:justify-between mb-4 md:mb-0">
            <Link href={"/"}>
              <Image
                src={"/assets/skyfly.svg"}
                alt="logo"
                width={100}
                height={100}
                priority={false}
                className="bg-cover w-20 h-12"
              />
            </Link>
          </div>
          <div className="flex items-center w-full md:w-auto justify-center ml-[1.5rem] md:ml-[3rem]">
            <Input
              id="search"
              name="search"
              type="text"
              className="bg-gray-200 py-2 md:py-5 w-full md:w-[20rem] pe-[3rem] rounded-xl"
              placeholder="Search here..."
            />
            <span className="relative right-8">
              <Search className="w-5 h-5 text-gray-500" />
            </span>
          </div>
        </div>
        <div className="mt-4 md:mt-0 md:ml-auto flex justify-center">
          <IsLogin />
        </div>
      </nav>

      <BreadcrumbSection />

      <Timer />

      <section>
        <div className="w-full mx-auto border-b mt-5 border-black/20"></div>
      </section>

      <section>{children}</section>
    </section>
  );
}
