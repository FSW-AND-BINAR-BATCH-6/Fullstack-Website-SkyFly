import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DepartureDateProps {
  register: any;
  errors: any;
  setOpenDepartur: any;
  departureDate: any;
  setDepartureDate: any;
}

export default function DepartureDate({
  register,
  setOpenDepartur,
  errors,
  departureDate,
  setDepartureDate,
}: DepartureDateProps) {
  return (
    <>
      <div className="ml-3 flex flex-col">
        <Label htmlFor="departureDate" className="mb-1">
          Departure
        </Label>
        <Popover>
          <PopoverTrigger>
            <Input
              id="departureDate"
              name="departureDate"
              type="date"
              readOnly
              value={departureDate?.toLocaleDateString("en-CA")}
              {...register("departureDate")}
              onClick={() => setOpenDepartur(true)}
              className={`cursor-pointer ${
                errors.departureDate ? "border border-red-700" : ""
              }`}
            />
            {errors.departureDate && (
              <p className="text-red-500 text-xs">
                {errors.departureDate.message}
              </p>
            )}
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
    </>
  );
}
