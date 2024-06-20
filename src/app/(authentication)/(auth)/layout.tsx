import type { Metadata } from "next";
import Image from "next/image";
import "../../globals.css";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import ToastListener from "@/components/ui/ToastListener";

export const metadata: Metadata = {
  title: "Apps",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body suppressHydrationWarning={true}>
      <section className="flex flex-row items-start flex-nowrap">
        <section className="grow-0 hidden xl:block h-screen shadow">
          <Link href={"/"}>
            <Image
              src={"/assets/bg-auth.svg"}
              alt="logo"
              width={200}
              height={200}
              priority={true}
              className="w-full h-full bg-cover"
            />
          </Link>
        </section>
        <section className="grow sm:mr-5 min-h-screen pt-8 overflow-hidden">
          <Toaster position="top-right" reverseOrder={false} />
          <ToastListener />
          {children}
        </section>
      </section>
    </body>
  );
}
