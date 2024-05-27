import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Baby, User, UsersRound } from "lucide-react";
import Counter from "./Counter";

interface PassengersProps {
  register: any;
  errors: any;
  setOpenPassengers: (open: boolean) => void;
  openPassengers: boolean;
  adults: number;
  setAdults: (value: number) => void;
  children: number;
  setChildren: (value: number) => void;
  babies: number;
  setBabies: (value: number) => void;
  handleSavePassengers: () => void;
}

export default function Passengers({
  register,
  errors,
  setOpenPassengers,
  openPassengers,
  adults,
  setAdults,
  children,
  setChildren,
  babies,
  setBabies,
  handleSavePassengers,
}: PassengersProps) {
  return (
    <div className="ml-3 flex flex-col">
      <Label htmlFor="passengers" className="mb-1">
        Passengers
      </Label>
      <Input
        id="passengers"
        name="passengers"
        type="text"
        readOnly
        placeholder="1 People"
        onClick={() => setOpenPassengers(true)}
        {...register("passengers")}
        className={`w-32 ${
          errors.passengers ? "border border-red-700" : ""
        }`}
      />
      {errors.passengers && (
        <p className="text-red-500 text-xs">
          {errors.passengers.message}
        </p>
      )}
      <Dialog open={openPassengers} onOpenChange={setOpenPassengers}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="items-center justify-center flex flex-col gap-3 mt-5">
            <PassengerType
              icon={UsersRound}
              label="Adults"
              description="(12 years and older)"
              value={adults}
              onChange={setAdults}
            />
            <PassengerType
              icon={User}
              label="Children"
              description="(2 - 11 years)"
              value={children}
              onChange={setChildren}
            />
            <PassengerType
              icon={Baby}
              label="Babies"
              description="(Under 2 years)"
              value={babies}
              onChange={setBabies}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={handleSavePassengers}
              className="mr-3 w-40"
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const PassengerType = ({
  icon: Icon,
  label,
  description,
  value,
  onChange,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
  value: number;
  onChange: (value: number) => void;
}) => (
  <div className="grid grid-cols-2 auto-rows-[50px]">
    <div className="p-2 flex items-center justify-start">
      <Icon className="w-5 h-5 mr-4" />
      <div className="flex flex-col">
        <Label className="font-bold mb-1">{label}</Label>
        <p className="text-xs">{description}</p>
      </div>
    </div>
    <div className="p-2 flex items-center justify-start">
      <Counter value={value} onChange={onChange} />
    </div>
  </div>
);
