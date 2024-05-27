import type { Metadata } from "next";
import "../globals.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogInIcon, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
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
              <Link href="/login">
                <Button className="">
                  <LogInIcon className="w-5 h-5 mr-2" />
                  Login
                </Button>
              </Link>
            </div>
          </nav>

          <section>{children}</section>
        </section>
      </body>
    </html>
  );
}
