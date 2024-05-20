"use client";

import * as React from "react";
import {
  Baby,
  MapPin,
  Minus,
  Plus,
  User,
  Users,
  UsersRound,
} from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CalendarDaysIcon,
  PlaneLandingIcon,
  PlaneTakeoffIcon,
  CircleCheck,
  Ticket,
  TicketPercent,
  TicketSlash,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { formSchema } from "./validation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

type FormData = z.infer<typeof formSchema>;

export default function FormFindFlights() {
  const [openField, setOpenField] = React.useState<string | null>(
    null
  );
  const [openDepartur, setOpenDepartur] = React.useState(false);
  const [openReturn, setOpenReturn] = React.useState(false);
  const [openPassengers, setOpenPassengers] = React.useState(false);
  const [openSeatClass, setOpenSeatClass] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState<
    number | null
  >(null);
  const [departureDate, setDepartureDate] = React.useState<
    Date | undefined
  >(new Date());
  const [returnDate, setReturnDate] = React.useState<
    Date | undefined
  >(undefined);
  const [adults, setAdults] = React.useState(1);
  const [children, setChildren] = React.useState(0);
  const [babies, setBabies] = React.useState(0);
  const [seats, setSeats] = React.useState([
    {
      label: "Economy",
      price: "IDR 4.950.000",
      icon: <Ticket className="w-5 h-5 mr-4" />,
    },
    {
      label: "Business",
      price: "IDR 29.220.000",
      icon: <TicketSlash className="w-5 h-5 mr-4" />,
    },
    {
      label: "First Class",
      price: "IDR 87.620.000",
      icon: <TicketPercent className="w-5 h-5 mr-4" />,
    },
  ]);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleCommandItemClick = (
    field: keyof FormData,
    value: string
  ) => {
    setValue(field, value);
    if (value) {
      clearErrors(field);
    }
    setOpenField(null);
  };

  const handleItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleSaveSeatClass = () => {
    if (selectedIndex !== null) {
      const selectedSeat = seats[selectedIndex];
      setValue("seatClass", selectedSeat.label);
      clearErrors("seatClass");
      setOpenSeatClass(false);
    }
  };

  const handleSavePassengers = () => {
    const totalPassengers = adults + children + babies;
    const passengerDescriptions = [
      `${adults} adults`,
      `${children} children`,
      `${babies} babies`,
    ].filter((desc) => !desc.startsWith("0"));
    setValue("passengers", `${totalPassengers} People`);
    clearErrors("passengers");
    setOpenPassengers(false);
  };

  const renderCommandDialog = (field: keyof FormData) => (
    <CommandDialog
      open={openField === field}
      onOpenChange={(isOpen) => setOpenField(isOpen ? field : null)}
    >
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {[
            "Bekasi",
            "Melbourne",
            "Bogor",
            "Jakarta",
            "Kalimantan",
            "Jepang",
          ].map((location) => (
            <CommandItem
              key={location}
              onSelect={() => handleCommandItemClick(field, location)}
            >
              <MapPin className="mr-2 h-4 w-4" />
              <span>{location}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );

  const selectedClass =
    "hover:text-white rounded-md bg-violet text-white";
  const notSelectedClass =
    "flex items-center hover:bg-violet-500 hover:rounded-md hover:text-white justify-between cursor-pointer p-3 border-b border-slate-300";

  const onSubmit = (data: FormData) => {
    const totalPassengers = adults + children + babies;
    const passengerDescriptions = [
      `${adults} adults`,
      `${children} children`,
      `${babies} babies`,
    ].filter((desc) => !desc.startsWith("0"));

    const dataWithPassengers = {
      ...data,
      passengerDescriptions,
    };

    console.log("Form Data:", dataWithPassengers);

    window.location.href = "/result";
  };

  React.useEffect(() => {
    if (departureDate) {
      const formattedDate = departureDate.toLocaleDateString("en-CA"); // Format YYYY-MM-DD
      setValue("departureDate", formattedDate);
      clearErrors("departureDate");
    }
  }, [departureDate, setValue, clearErrors]);

  React.useEffect(() => {
    if (returnDate) {
      const formattedDate = returnDate.toLocaleDateString("en-CA");
      setValue("returnDate", formattedDate);
      clearErrors("returnDate");
    }
  }, [returnDate, setValue, clearErrors]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mx-10 my-5">
          <Label className="font-bold text-lg">
            Choose special flight schedules on
            <span className="text-violet ml-1">Tiketku!</span>
          </Label>
        </div>

        <div className="mx-10">
          <div className="flex">
            <div className="flex w-1/2 justify-center">
              <div className="flex pt-1">
                <PlaneTakeoffIcon size={24} />
                <Label className="ml-3 pt-2">From</Label>
              </div>
              <div>
                <Input
                  type="text"
                  readOnly
                  placeholder="Jakarta (JKTA)"
                  {...register("from")}
                  onClick={() => setOpenField("from")}
                  className={`ml-3 ${
                    errors.from ? "border-red-700" : ""
                  }`}
                />
                {errors.from && (
                  <p className="text-red-500 text-xs ml-3">
                    {errors.from.message}
                  </p>
                )}
                {renderCommandDialog("from")}
              </div>
            </div>

            <div className="flex w-1/2 justify-center">
              <div className="flex pt-1">
                <PlaneLandingIcon size={24} />
                <Label className="ml-3 pt-2">To</Label>
              </div>
              <div>
                <Input
                  type="text"
                  readOnly
                  placeholder="Melbourne (MLB)"
                  {...register("to")}
                  onClick={() => setOpenField("to")}
                  className={`ml-3 ${
                    errors.to ? "border-red-700" : ""
                  }`}
                />
                {errors.to && (
                  <p className="text-red-500 text-xs ml-3">
                    {errors.to.message}
                  </p>
                )}
                {renderCommandDialog("to")}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-10 mt-10 mb-10">
          <div className="flex">
            <div className="flex w-1/2 justify-center">
              <div className="flex items-center">
                <CalendarDaysIcon size={24} />
                <Label className="ml-3">Date</Label>
              </div>
              <div className="flex">
                <div className="ml-3 flex flex-col">
                  <Label className="mb-1">Departure</Label>
                  <Popover>
                    <PopoverTrigger>
                      <Input
                        type="date"
                        readOnly
                        value={departureDate?.toLocaleDateString(
                          "en-CA"
                        )}
                        {...register("departureDate")}
                        onClick={() => setOpenDepartur(true)}
                        className={`cursor-pointer ${
                          errors.departureDate
                            ? "border border-red-700"
                            : ""
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
                <div className="ml-3 flex flex-col">
                  <Label className="mb-1">Return</Label>
                  <Popover>
                    <PopoverTrigger>
                      <Input
                        type="date"
                        readOnly
                        value={returnDate?.toLocaleDateString(
                          "en-CA"
                        )}
                        {...register("returnDate")}
                        onClick={() => setOpenReturn(true)}
                        className={`cursor-pointer ${
                          errors.returnDate
                            ? "border border-red-700"
                            : ""
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
              </div>
            </div>

            <div className="flex w-1/2 justify-center">
              <div className="flex items-center">
                <Users size={24} />
                <Label className="ml-3">For</Label>
                <div className="ml-3 flex flex-col">
                  <Label className="mb-1">Passengers</Label>
                  <Input
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
                  <Dialog
                    open={openPassengers}
                    onOpenChange={setOpenPassengers}
                  >
                    <DialogContent className="sm:max-w-[425px]">
                      <div className="items-center justify-center flex flex-col gap-3 mt-5">
                        <div className="grid grid-cols-2 auto-rows-[50px]">
                          <div className="p-2 flex items-center justify-start">
                            <UsersRound className="w-5 h-5 mr-4" />
                            <div className="flex flex-col">
                              <Label className="font-bold mb-1">
                                Adults
                              </Label>
                              <p className="text-xs">
                                (12 years and older)
                              </p>
                            </div>
                          </div>
                          <div className="p-2 flex items-center justify-start">
                            <Counter
                              value={adults}
                              onChange={setAdults}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 auto-rows-[50px]">
                          <div className="p-2 flex items-center justify-start">
                            <User className="w-5 h-5 mr-4" />
                            <div className="flex flex-col">
                              <Label className="font-bold mb-1">
                                Children
                              </Label>
                              <p className="text-xs">
                                (2 - 11 years)
                              </p>
                            </div>
                          </div>
                          <div className="p-2 flex items-center justify-start">
                            <Counter
                              value={children}
                              onChange={setChildren}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 auto-rows-[50px]">
                          <div className="p-2 flex items-center justify-start">
                            <Baby className="w-5 h-5 mr-4" />
                            <div className="flex flex-col">
                              <Label className="font-bold mb-1">
                                Babies
                              </Label>
                              <p className="text-xs">
                                (Under 2 years)
                              </p>
                            </div>
                          </div>
                          <div className="p-2 flex items-center justify-start">
                            <Counter
                              value={babies}
                              onChange={setBabies}
                            />
                          </div>
                        </div>
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
                <div className="ml-3 flex flex-col">
                  <Label className="mb-1">Seat Class</Label>
                  <Input
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
                  <Dialog
                    open={openSeatClass}
                    onOpenChange={setOpenSeatClass}
                  >
                    <DialogContent className="sm:max-w-[425px]">
                      <div className="mt-5">
                        {seats.map((seat, index) => (
                          <div
                            key={index}
                            className={`${notSelectedClass} ${
                              selectedIndex === index
                                ? selectedClass
                                : ""
                            }`}
                            onClick={() => handleItemClick(index)}
                          >
                            <div className="flex py-2">
                              {seat.icon}
                              <div className="flex flex-col">
                                <Label className="font-bold mb-1 cursor-pointer">
                                  {seat.label}
                                </Label>
                                <p className="text-xs">
                                  {seat.price}
                                </p>
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
                        <Button
                          type="button"
                          onClick={handleSaveSeatClass}
                        >
                          Save changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-t-none w-full"
        >
          Find Flights
        </Button>
      </form>
    </>
  );
}

const Counter = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) => {
  return (
    <div className="flex items-center justify-center w-44">
      <Button
        onClick={() => onChange(value - 1)}
        disabled={value <= 0}
      >
        <Minus className="w-3 h-4 text-white" />
      </Button>
      <Input value={value} className="w-12 mx-3 text-center" />
      <Button
        onClick={() => onChange(value + 1)}
        disabled={value > 9}
      >
        <Plus className="w-3 h-4 text-white" />
      </Button>
    </div>
  );
};
