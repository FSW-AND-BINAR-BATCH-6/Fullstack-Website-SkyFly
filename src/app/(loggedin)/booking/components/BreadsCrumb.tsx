"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function BreadcrumbSection() {
  const router = useRouter();
  const pathname = usePathname();

  const getClassNames = (path: string) => {
    return pathname === path ||
      (pathname === "/payment" && path === "/booking") ||
      (pathname === "/complete" &&
        (path === "/booking" ||
          path === "/payment" ||
          path === "/complete"))
      ? "text-black font-bold"
      : "text-gray-500";
  };

  return (
    <section>
      <div className="w-full lg:w-4/5 mx-auto my-5 mb-3">
        <Breadcrumb>
          <BreadcrumbList className="flex flex-wrap justify-center lg:justify-start">
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/booking"
                className={getClassNames("/booking")}
              >
                Personal details
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/payment"
                className={getClassNames("/payment")}
              >
                Payment
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/complete"
                className={getClassNames("/complete")}
              >
                Completed
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </section>
  );
}
