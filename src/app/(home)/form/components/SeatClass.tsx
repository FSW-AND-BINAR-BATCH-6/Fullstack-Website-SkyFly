import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleCheck } from "lucide-react";

interface SeatClassProps {
  register: any;
  errors: any;
  setOpenSeatClass: any;
  seats: any;
  selectedIndex: any;
  handleItemClick: any;
  handleSaveSeatClass: any;
  openSeatClass: any;
}

const selectedClass =
  "hover:text-white rounded-md bg-violet text-white";
const notSelectedClass =
  "flex items-center hover:bg-violet-500 hover:rounded-md hover:text-white justify-between cursor-pointer p-3 border-b border-slate-300";

export default function SeatClass({
  register,
  errors,
  setOpenSeatClass,
  seats,
  selectedIndex,
  handleItemClick,
  handleSaveSeatClass,
  openSeatClass,
}: SeatClassProps) {
  return (
    <div className="ml-3 flex flex-col">
      <Label htmlFor="seatClass" className="mb-1">
        Seat Class
      </Label>
      <Input
        id="seatClass"
        name="seatClass"
        type="text"
        readOnly
        placeholder="Business"
        onClick={() => setOpenSeatClass(true)}
        {...register("seatClass")}
        className={`w-32 ${
          errors.seatClass ? "border border-red-700" : ""
        }`}
      />
      {errors.seatClass && (
        <p className="text-red-500 text-xs">
          {errors.seatClass.message}
        </p>
      )}
      <Dialog open={openSeatClass} onOpenChange={setOpenSeatClass}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="mt-5">
            {seats.map((seat: any, index: any) => (
              <div
                key={index}
                className={`${notSelectedClass} ${
                  selectedIndex === index ? selectedClass : ""
                }`}
                onClick={() => handleItemClick(index)}
              >
                <div className="flex py-2">
                  {seat.icon}
                  <div className="flex flex-col">
                    <Label className="font-bold mb-1 cursor-pointer">
                      {seat.label}
                    </Label>
                    <p className="text-xs">{seat.price}</p>
                  </div>
                </div>
                <div>
                  {selectedIndex === index && (
                    <CircleCheck className="w-6 h-6 bg-green-500 text-white rounded-full font-bold" />
                  )}
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSaveSeatClass}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
