"use client";

import { ToastProvider, useToast } from "@/context/ToastContext";
import { Labels } from "@/components/ui/labels";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Logout() {
  const router = useRouter();
  const { toast } = useToast();

  const deleteCookie = (name: any) => {
    setCookie(name, "", { maxAge: -1 });
  };

  const handleLogout = () => {
    deleteCookie("token");
    deleteCookie("isLogin");
    toast.success("Logout Successfully");
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
