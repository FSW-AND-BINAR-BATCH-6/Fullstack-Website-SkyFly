"use client";

import { ToastProvider, useToast } from "@/context/ToastContext";
import { Labels } from "@/components/ui/labels";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { deleteCookie } from "@/hooks/deleteCookie";

export default function Logout() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = () => {
    deleteCookie("token");
    deleteCookie("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");
    deleteCookie("bookingDetails");
    toast.success("Logout Successfully", {
      style: {
        fontWeight: "bold",
      },
    });
    router.push("/");
  };

  return (
    <ToastProvider>
      <div onClick={handleLogout} className="flex">
        <div>
          <Image
            src="/assets/fi_log-out.svg"
            width={100}
            height={100}
            alt="settings"
            className="cursor-pointer h-5 w-5 bg-cover"
          />
        </div>
        <div>
          <Labels className="ml-3 cursor-pointer">Logout</Labels>
        </div>
      </div>
    </ToastProvider>
  );
}
