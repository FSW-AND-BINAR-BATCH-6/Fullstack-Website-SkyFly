"use client";

import { Button } from "@/components/ui/button";
import { Labels } from "@/components/ui/labels";
import { ArrowLeftIcon, ArrowUpDown, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Logout from "../integration/Logout";
import FormAccount from "../form";
import EditProfile from "./EditProfile";
import ResetPassword from "../form/ResetPassword";
import AccountSetting from "./AccountSetting";

export default function AccountPages() {
  const [isEdit, setIsEdit] = useState(false);
  const [editProfile, setEditProfile] = useState(true);
  const [resetPassword, setResetPassword] = useState(false);

  const handleEditProfile = () => {
    setEditProfile(true);
    setResetPassword(false);
  };

  const handleResetPassword = () => {
    setIsEdit(true);
    setEditProfile(false);
    setResetPassword(true);
  };

  return (
    <>
      <div className="w-full sm:w-4/5 mx-auto py-7 px-5">
        <Labels className="font-bold text-xl">Account</Labels>
        <div className="mt-5 flex flex-row gap-3 items-center">
          <div className="w-full sm:w-4/5 bg-primaryPurple rounded-xl pl-5 p-3 flex items-center text-white shadow-lg">
            <Link href="/">
              <ArrowLeftIcon className="w-5 h-5 cursor-pointer" />
            </Link>
            <Labels className="ml-5">Home Page</Labels>
          </div>
          <div className="">
            <Button className="rounded-full bg-primaryPurple">
              <ArrowUpDown className="w-5 h-5 mr-2" />
              <Labels className="cursor-pointer">Filter</Labels>
            </Button>
          </div>
          <div className="">
            <Search className="w-5 h-5 text-violet font-bold cursor-pointer" />
          </div>
        </div>
      </div>
      <hr className="border-black/20" />

      <div className="w-full px-5 sm:w-4/5 gap-5 flex flex-col sm:flex-row pb-20 justify-center mx-auto mt-5">
        <div className="w-full sm:w-48 h-auto sm:h-40 p-5 rounded-sm shadow-xl border border-black/20">
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
              <EditProfile
                setIsEdit={setIsEdit}
                handleEditProfile={handleEditProfile}
              />
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
              <AccountSetting
                handleResetPassword={handleResetPassword}
              />
            </div>
          </div>

          <hr className="my-3 border border-black/20" />

          <Logout />
        </div>
        <div className="w-full sm:w-3/5 p-5 rounded-sm shadow-xl border border-black/20">
          {editProfile && <FormAccount isEdit={isEdit} />}
          {resetPassword && <ResetPassword isEdit={isEdit} />}
        </div>
      </div>
    </>
  );
}
