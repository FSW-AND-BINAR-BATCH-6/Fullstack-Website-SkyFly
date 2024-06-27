"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function BreadcrumbSection() {
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
              <span
                className={`cursor-default ${getClassNames(
                  "/booking"
                )}`}
              >
                Personal details
              </span>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span
                className={`cursor-default ${getClassNames(
                  "/payment"
                )}`}
              >
                Payment
              </span>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span
                className={`cursor-default ${getClassNames(
                  "/complete"
                )}`}
              >
                Completed
              </span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </section>
  );
}
