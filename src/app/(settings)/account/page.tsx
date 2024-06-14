import { Button } from "@/components/ui/button";
import { Labels } from "@/components/ui/labels";
import { ArrowLeftIcon, ArrowUpDown, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Logout from "./integration/Logout";
import FormAccount from "./form";

export default function AccountPage() {
  return (
    <>
      <div className="w-4/5 mx-auto py-7">
        <Labels className="font-bold text-xl">Account</Labels>
        <div className="mt-5 flex flex-row items-center">
          <div className="w-4/5 bg-primaryPurple rounded-xl pl-5 p-3 flex items-center text-white shadow-lg">
            <Link href="/">
              <ArrowLeftIcon className="w-5 h-5 cursor-pointer" />
            </Link>
            <Labels className="ml-5">Home Page</Labels>
          </div>
          <div className="ml-auto">
            <Button className="rounded-full bg-primaryPurple">
              <ArrowUpDown className="w-5 h-5 mr-2" />
              <Labels className="cursor-pointer">Filter</Labels>
            </Button>
          </div>
          <div className="ml-10">
            <Search className="w-5 h-5 text-violet font-bold cursor-pointer" />
          </div>
        </div>
      </div>
      <hr className="border-black/20" />

      <div className="w-4/5 gap-5 flex pb-20 justify-center mx-auto mt-5">
        <div className="w-48 h-40 p-5 rounded-sm shadow-xl border border-black/20">
          <div className="flex">
            <div>
              <Image
                src="/assets/fi_edit.svg"
                width={100}
                height={100}
                alt="edit"
                className="cursor-pointer h-5 w-5 bg-cover"
              />
            </div>
            <div>
              <Labels className="ml-3">Edit Profile</Labels>
            </div>
          </div>

          <hr className="my-3 border border-black/20" />

          <div className="flex">
            <div>
              <Image
                src="/assets/fi_settings.svg"
                width={100}
                height={100}
                alt="settings"
                className="cursor-pointer h-5 w-5 bg-cover"
              />
            </div>
            <div>
              <Labels className="ml-3">Account Settings</Labels>
            </div>
          </div>

          <hr className="my-3 border border-black/20" />

          <Logout />
        </div>
        <div className="w-3/5 p-5 rounded-sm shadow-xl border border-black/20">
          <FormAccount />
        </div>
      </div>
    </>
  );
}
