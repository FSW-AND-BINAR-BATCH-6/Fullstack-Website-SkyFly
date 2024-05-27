import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ValidUntilProps {
  register: any;
  departureDate: any;
  setDepartureDate: any;
  errors: any;
  setOpenDepartur: any;
}

export default function ValidUntil({
  register,
  departureDate,
  setDepartureDate,
  setOpenDepartur,
  errors,
}: ValidUntilProps) {
  return (
    <div className="mt-3 flex flex-col">
      <Label htmlFor="dateOfBirth" className="mb-1 font-bold">
        Valid Until
      </Label>
      <Popover>
        <PopoverTrigger>
          <Input
            id="dateOfBirth"
            // name="dateOfBirth"
            type="date"
            readOnly
            value={departureDate?.toLocaleDateString("en-CA")}
            {...register("dateOfBirth")}
            onClick={() => setOpenDepartur(true)}
            className={`cursor-pointer my-1 ${
              errors.departureDate ? "border border-red-700" : ""
            }`}
          />
          {/* {errors.departureDate && ( */}
          <p className="text-red-500 text-start ml-1 text-xs">
            Valid Until is required
          </p>
          {/* )} */}
        </PopoverTrigger>
        <PopoverContent className="bg-clip-content p-0 w-62">
          <Calendar
            mode="single"
            selected={departureDate}
            onSelect={setDepartureDate}
            className="rounded-md border shadow"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
