import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Labels } from "@/components/ui/labels";
import { Switch } from "@/components/ui/switch";

export default function BookingDetails() {
  return (
    <>
      <div>
        <Labels className="font-bold">Booking Details</Labels>
      </div>

      <div className="bg-black rounded-t-xl mt-3 text-white p-3">
        <Labels className="font-bold">Customer's Details</Labels>
      </div>

      <div className="px-5 py-3 borders border-black">
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

        <div className="py-3">
          <div className="flex flex-row">
            <div>
              <Labels>Have a Family Name?</Labels>
            </div>
            <div className="ml-auto">
              <Switch />
            </div>
          </div>
        </div>

        <div>
          <div>
            <Label className="font-bold">Family Name</Label>
          </div>

          <div>
            <Input
              id="from"
              name="from"
              type="text"
              // readOnly
              placeholder="Potter"
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
              Family Name is required
            </p>
            {/* )} */}
          </div>
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
      </div>
    </>
  );
}
