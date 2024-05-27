import type { Metadata } from "next";
import "../globals.css";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Bell, List, Search, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
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
          </div>

          <div className="bg-red-200s w-1/2 flex items-center justify-end mr-14">
            <div className="flex items-center">
              <div>
                <Link href={"/history"}>
                  <List className="w-5 h-5 mr-4 cursor-pointer" />
                </Link>
              </div>
              <div>
                <Link href={"/notifications"}>
                  <Bell className="w-5 h-5 mr-4 cursor-pointer" />
                </Link>
              </div>
              <div>
                <Link href={"/account"}>
                  <User className="w-5 h-5 cursor-pointer" />
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </section>

      <section>{children}</section>
    </body>
  );
}
