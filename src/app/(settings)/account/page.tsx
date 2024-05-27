import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Labels } from "@/components/ui/labels";
import { ArrowLeftIcon, ArrowUpDown, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

          <div className="flex">
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
              <Labels className="ml-3">Logout</Labels>
            </div>
          </div>
        </div>
        <div className="w-3/5 p-5 rounded-sm shadow-xl border border-black/20">
          <div className="flex flex-col">
            <div>
              <Labels className="font-bold">Edit Profile Data</Labels>
            </div>
            <div className="bg-black rounded-t-xl mt-3 text-white p-3">
              <Labels className="font-bold">Personal Data</Labels>
            </div>
            <div className="px-5 py-3">
              <div>
                <Label className="font-bold">Full Name</Label>
              </div>

              <div>
                <Input
                  id="from"
                  name="from"
                  type="text"
                  // readOnly
                  placeholder="Harry"
                  className="my-1"
                  // {...register("from")}
                  // onClick={() => setOpenField("from")}
                  // className={`ml-3 ${
                  //   errors.from ? "border-red-700" : ""
                  // }`}
                />
                {/* {errors.from && ( */}
                <p className="text-red-500 text-xs ml-1">
                  {/* {errors.from.message} */}
                  Fullname is required
                </p>
                {/* )} */}
              </div>

              <div className="mt-3">
                <div>
                  <Label className="font-bold">Phone Number</Label>
                </div>

                <div>
                  <Input
                    id="from"
                    name="from"
                    type="number"
                    // readOnly
                    placeholder="0875 7436 1473"
                    className="my-1"
                    // {...register("from")}
                    // onClick={() => setOpenField("from")}
                    // className={`ml-3 ${
                    //   errors.from ? "border-red-700" : ""
                    // }`}
                  />
                  {/* {errors.from && ( */}
                  <p className="text-red-500 text-xs ml-1">
                    {/* {errors.from.message} */}
                    Phone Number is required
                  </p>
                  {/* )} */}
                </div>
              </div>

              <div className="mt-3">
                <div>
                  <Label className="font-bold">Email</Label>
                </div>

                <div>
                  <Input
                    id="from"
                    name="from"
                    type="email"
                    // readOnly
                    placeholder="jhondoe@gmail.com"
                    className="my-1"
                    // {...register("from")}
                    // onClick={() => setOpenField("from")}
                    // className={`ml-3 ${
                    //   errors.from ? "border-red-700" : ""
                    // }`}
                  />
                  {/* {errors.from && ( */}
                  <p className="text-red-500 text-xs ml-1">
                    {/* {errors.from.message} */}
                    Email is required
                  </p>
                  {/* )} */}
                </div>
              </div>
              <Button className="mt-5 w-full">Save Changes</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
