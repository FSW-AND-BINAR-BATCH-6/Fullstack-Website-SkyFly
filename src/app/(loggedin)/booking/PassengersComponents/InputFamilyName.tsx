import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputFamilyName() {
  return (
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
  );
}
