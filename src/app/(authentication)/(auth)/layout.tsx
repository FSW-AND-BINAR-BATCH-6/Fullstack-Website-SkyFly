import type { Metadata } from "next";
import Image from "next/image";
import "../../globals.css";
import Link from "next/link";

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
        <section className="grow-0 h-screen shadow">
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
        <section className="grow mr-5 min-h-screen pt-8 overflow-y-auto">
          {children}
        </section>
      </section>
    </body>
  );
}
