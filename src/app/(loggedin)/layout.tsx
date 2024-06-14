import "../globals.css";
import { Input } from "@/components/ui/input";
import { Bell, List, Search, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Timer from "./booking/components/Timer";

export default function LoggedinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <nav className="border-b border-black/20 p-5 flex">
        <div className="flex bg-yellow-200s w-1/2">
          <div className="flex items-center justify-between ml-10">
            <Link href={"/"}>
              <Image
                src={"/assets/logo.svg"}
                alt="logo"
                width={100}
                height={100}
                priority={false}
                className="bg-cover w-20 h-12"
              />
            </Link>
          </div>

          <div className="flex items-center ml-[3rem] mt-1">
            <Input
              id="search"
              name="search"
              type="text"
              className="bg-gray-200 py-5 w-[20rem] pe-[3rem] rounded-xl"
              placeholder="Search here..."
            />
            <span>
              <Search className="w-5 h-5 ml-[-35px] text-gray-500" />
            </span>
          </div>
        </div>

        <div className="bg-red-200s w-1/2 flex items-center justify-end mr-14">
          <div className="flex items-center">
            <div>
              <Link href="/history">
                <List className="w-5 h-5 mr-4 cursor-pointer" />
              </Link>
            </div>
            <div>
              <Link href="/notifications">
                <Bell className="w-5 h-5 mr-4 cursor-pointer" />
              </Link>
            </div>
            <div>
              <Link href="/account">
                <User className="w-5 h-5 cursor-pointer" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section>
        <div className="w-4/5 mx-auto my-5 mb-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/booking">
                  Personal details
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/payment">
                  Payment
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/complete">
                  Completed
                </BreadcrumbLink>
                {/* <BreadcrumbPage>Completed</BreadcrumbPage> */}
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <Timer />

      <section>
        <div className="w-full mx-auto border-b mt-5 border-black/20"></div>
      </section>

      <section>{children}</section>
    </section>
  );
}
