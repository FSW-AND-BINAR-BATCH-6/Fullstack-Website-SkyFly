import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ReturnDateProps {
  register: any;
  setOpenReturn: any;
  errors: any;
  returnDate: any;
  setReturnDate: any;
}

export default function ReturnDate({
  register,
  setOpenReturn,
  errors,
  returnDate,
  setReturnDate,
}: ReturnDateProps) {
  return (
    <>
      <div className="ml-3 flex flex-col">
        <Label className="mb-1">Return</Label>
        <Popover>
          <PopoverTrigger>
            <Input
              type="date"
              readOnly
              value={returnDate?.toLocaleDateString("en-CA")}
              {...register("returnDate")}
              onClick={() => setOpenReturn(true)}
              className={`cursor-pointer ${
                errors.returnDate ? "border border-red-700" : ""
              }`}
            />
            {errors.returnDate && (
              <p className="text-red-500 text-xs">
                {errors.returnDate.message}
              </p>
            )}
          </PopoverTrigger>
          <PopoverContent className="bg-clip-content p-0 w-62">
            <Calendar
              mode="single"
              selected={returnDate}
              onSelect={setReturnDate}
              className="rounded-md border shadow"
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
